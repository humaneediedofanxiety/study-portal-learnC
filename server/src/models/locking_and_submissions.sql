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

-- Submissions table linked to lessons (where type = 'assignment')
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
