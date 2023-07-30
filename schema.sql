-- Postgres schema
-- 101 school is an online system for creating and attending courses. It's essentially an online university. Students can enroll in various subjects and learn about them.

-- Drop tables
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS course_modules CASCADE;
DROP TABLE IF EXISTS course_module_units CASCADE;

-- Enable uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable full text search
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Table: users
-- Columns: emails, last_sign_in_at

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Array of strings, default []
  emails TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,

  -- UTC timestamp
  last_sign_in_at TIMESTAMP
);

CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  title TEXT NOT NULL,
  description TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,

  content TEXT,

  parsed_content JSONB,

  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Index title/desc so we can search it
CREATE INDEX courses_title_index ON courses USING GIN (to_tsvector('english', title));
CREATE INDEX courses_description_index ON courses USING GIN (to_tsvector('english', description));

CREATE TABLE course_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Equiv to the week number
  number INT NOT NULL,

  title TEXT NOT NULL,
  content TEXT NOT NULL,
  course_id UUID REFERENCES courses(id) NOT NULL,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

  UNIQUE (course_id, number)
);

CREATE TABLE course_module_units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  number INT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  module_id UUID REFERENCES course_modules(id) NOT NULL,

  wikipedia_urls TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,

  image JSONB,

  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

  UNIQUE (module_id, number)
);

-- Index content so we can search it
CREATE INDEX course_module_units_content_index ON course_module_units USING GIN (to_tsvector('english', content));

CREATE TABLE user_courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  course_id UUID REFERENCES courses(id) NOT NULL,

  enrolled_at TIMESTAMP NOT NULL DEFAULT NOW(),

  -- Create a unique index to ensure a user can enroll in a course only once
  UNIQUE (user_id, course_id),

  completed_unit_ids UUID[] DEFAULT '{}'::UUID[] NOT NULL
);

CREATE INDEX user_courses_user_id_index ON user_courses(user_id);
CREATE INDEX user_courses_course_id_index ON user_courses(course_id);

-- Trigger to update updated_at column
CREATE OR REPLACE FUNCTION touch_updated_at()   
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;   
END;
$$ language 'plpgsql';

CREATE TRIGGER users_touch_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE touch_updated_at();
CREATE TRIGGER courses_touch_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE PROCEDURE touch_updated_at();
CREATE TRIGGER course_modules_touch_updated_at BEFORE UPDATE ON course_modules FOR EACH ROW EXECUTE PROCEDURE touch_updated_at();
CREATE TRIGGER course_module_units_touch_updated_at BEFORE UPDATE ON course_module_units FOR EACH ROW EXECUTE PROCEDURE touch_updated_at();


-- Create view of courses with an image (taken from the course's first module unit)

CREATE OR REPLACE VIEW course_images AS
SELECT
  course_module_units.image, course_id
FROM course_module_units
LEFT JOIN course_modules ON course_modules.id = course_module_units.module_id
WHERE course_module_units.image IS NOT NULL AND course_module_units.number = 1 AND course_modules.number = 1
GROUP BY course_id, course_module_units.image;


CREATE OR REPLACE VIEW course_module_units_next AS
WITH ordered_units AS (
  SELECT 
      course_module_units.id, 
      course_module_units.module_id,
      course_module_units.number AS unit_number, 
      course_modules.number AS module_number,
      course_modules.course_id AS course_id
  FROM 
      course_module_units 
  JOIN 
      course_modules ON course_module_units.module_id = course_modules.id 
  ORDER BY 
      course_modules.course_id,
      course_modules.number, 
      course_module_units.number
)
SELECT 
    id, 
    course_id,
    module_id,
    LEAD(id) OVER (PARTITION BY course_id ORDER BY module_number, unit_number) AS next_id,
    LEAD(module_id) OVER (PARTITION BY course_id ORDER BY module_number, unit_number) AS next_module_id,
    LEAD(course_id) OVER (PARTITION BY course_id ORDER BY module_number, unit_number) AS next_course_id,
FROM 
    ordered_units
