-- Add locking to sections
ALTER TABLE course_sections ADD COLUMN IF NOT EXISTS is_locked BOOLEAN DEFAULT true;

-- Ensure at least one section can be unlocked initially (handled in logic, but schema supports it)

-- Track lesson completion per student
CREATE TABLE IF NOT EXISTS lesson_completions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, lesson_id)
);

-- Submissions table - handle existing table from lms_schema_update.sql
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='submissions' AND column_name='lesson_id') THEN
        ALTER TABLE submissions ADD COLUMN lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='submissions' AND column_name='assignment_id') THEN
        ALTER TABLE submissions ALTER COLUMN assignment_id DROP NOT NULL;
    END IF;

    -- Add unique constraint if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='submissions_lesson_id_student_id_key') THEN
        ALTER TABLE submissions ADD CONSTRAINT submissions_lesson_id_student_id_key UNIQUE(lesson_id, student_id);
    END IF;
END $$;

-- Fallback creation if table didn't exist at all (though lms_schema_update should have created it)
CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    file_url VARCHAR(500),
    content TEXT,
    grade VARCHAR(50), -- 'Satisfactory', 'Decent', 'Bad'
    feedback TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(lesson_id, student_id)
);
