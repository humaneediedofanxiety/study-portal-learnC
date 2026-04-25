# LMS AI

## 1. Purpose
A feature-rich, AI-enhanced Learning Management System (LMS) designed for modern education. It empowers instructors to create and manage courses while providing students with an interactive, AI-supported learning environment.

## 2. Tech Stack
- **Frontend**: React 19 (Vite), TypeScript, Tailwind CSS 4, Radix UI, Lucide React.
- **Backend**: Node.js (Express 5), TypeScript, PostgreSQL.
- **Real-time**: Socket.io for live messaging and updates.
- **Auth**: JWT (JSON Web Tokens) & bcryptjs for secure authentication.
- **Infrastructure**: Docker, Docker Compose, Render.yaml for deployment.

## 3. Architecture (Simple)
- **Type**: Modular Monolith
- **Flow**: User → React UI (Vite) → Express API → PostgreSQL Database.
- **Key Modules**:
  - `auth`: User registration, login, and role-based access (Student/Admin).
  - `courses`: Course creation, sections, and lesson management.
  - `assignments`: Submission and grading system.
  - `chat`: Real-time communication via Socket.io.
  - `ai`: Integration with Gemini (Ask Gemini component).

## 4. Core Features
- **Course Management**: Create courses, add sections, and manage lesson content (lectures, assignments, exams).
- **Study Portal**: Interactive dashboard for students to track progress and access resources.
- **Real-time Chat**: Live messaging for collaborative learning within courses.
- **Assignment System**: Submit assignments and receive grades from instructors.
- **Role-based Access**: Distinct dashboards and permissions for students and administrators.
- **AI Assistant**: "Ask Gemini" for instant learning support and query resolution.

## 5. Data Model (Minimal)
- **User**: `id`, `email`, `password_hash`, `full_name`, `role` (student/admin).
- **Course**: `id`, `title`, `description`, `instructor_id`, `thumbnail_url`.
- **Lesson**: `id`, `course_id`, `section_id`, `title`, `type`, `content`, `video_url`.
- **Enrollment**: `id`, `user_id`, `course_id`, `progress`.
- **Assignment**: `id`, `course_id`, `title`, `description`, `deadline`.

## 6. API / Actions
- `POST /api/auth/register`: Create a new user account.
- `POST /api/auth/login`: Authenticate user and receive JWT.
- `GET /api/courses`: Fetch all available courses.
- `POST /api/courses`: Create a new course (Admin only).
- `POST /api/courses/items/submit`: Submit assignment (Student).
- `PUT /api/courses/submissions/:id/grade`: Grade a submission (Admin only).

## 7. Setup (Local)
```bash
# Clone the repository
git clone <repo_url>
cd lms-ai

# Backend Setup
cd server
npm install
# Configure .env with DATABASE_URL and JWT_SECRET
npm run dev

# Frontend Setup
cd ../client
npm install
npm run dev
```

## 8. Conventions
- **TypeScript Everywhere**: Full type safety across frontend and backend.
- **Functional React**: Components are built using functional patterns and hooks.
- **Surgical API Updates**: RESTful patterns for data management.
- **Middleware Security**: Role-based access control via backend middleware.

## 9. Decisions
- **Vite**: Used for ultra-fast frontend development and optimized production builds.
- **PostgreSQL**: Chosen for its robustness and relational integrity for complex course data.
- **Socket.io**: Implemented to enable immediate feedback and real-time collaboration.
- **Tailwind CSS 4**: Utilized for rapid, modern, and consistent UI development.

## 10. Future
- **Deep AI Integration**: Automated grading and personalized learning paths via Gemini.
- **Video Content**: Native video streaming and hosting for course lessons.
- **Advanced Analytics**: Detailed performance metrics for both students and instructors.
