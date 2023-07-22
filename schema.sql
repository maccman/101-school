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
  -- uuid id
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Array of jsonb objects, default []
  emails JSONB DEFAULT '[]'::JSONB,

  -- UTC timestamp
  last_sign_in_at TIMESTAMP
);

CREATE TABLE courses (
  -- uuid id
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  title TEXT NOT NULL,
  description TEXT NOT NULL,

  body TEXT NOT NULL,
);

-- Each module is spread over 13 weeks
CREATE TABLE modules (
  -- uuid id
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  week INT NOT NULL,

  title TEXT NOT NULL,
  body TEXT NOT NULL,
  course_id UUID REFERENCES courses(id) NOT NULL,
);

-- Each section has 2-4 sessions
CREATE TABLE units (
  -- uuid id
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  title TEXT NOT NULL,
  body TEXT NOT NULL,
  module_id UUID REFERENCES modules(id) NOT NULL,
);