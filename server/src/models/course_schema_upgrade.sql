-- Upgrade courses table with more metadata
ALTER TABLE courses ADD COLUMN IF NOT EXISTS education_level VARCHAR(100);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS instructor_name VARCHAR(255);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS department VARCHAR(255);
