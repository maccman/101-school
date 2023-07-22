-- Postgres schema
-- 101 school is an online system for creating and attending courses. It's essentially an online university. Students can enroll in various subjects and learn about them.

-- Drop tables

-- Enable uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable full text search
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Table: users
-- Columns: emails, last_sign_in_at

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Array of jsonb objects, default []
  emails TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,

  -- UTC timestamp
  last_sign_in_at TIMESTAMP
);

CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  title TEXT NOT NULL,
  description TEXT NOT NULL,

  body TEXT,

  parsed_body JSONB,

  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE course_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  week INT NOT NULL,

  title TEXT NOT NULL,
  body TEXT NOT NULL,
  course_id UUID REFERENCES courses(id) NOT NULL,
  
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE course_module_units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  title TEXT NOT NULL,
  body TEXT NOT NULL,
  module_id UUID REFERENCES course_modules(id) NOT NULL,

  wikipedia_urls TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,

  images JSONB DEFAULT '[]'::JSONB,

  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

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
CREATE TRIGGER units_touch_updated_at BEFORE UPDATE ON units FOR EACH ROW EXECUTE PROCEDURE touch_updated_at();

