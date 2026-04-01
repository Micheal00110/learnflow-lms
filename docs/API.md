# LearnFlow LMS API Documentation

## Base URL
```
https://api.learnflow.com/api
```

## Authentication
All protected endpoints require Bearer token:
```
Authorization: Bearer <token>
```

## Response Format
```json
{
  "data": { ... },
  "message": "..."
}
```

## Error Format
```json
{
  "error": "...",
  "errors": { ... }
}
```

## Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register new user |
| POST | /auth/login | Login user |
| POST | /auth/google | Google OAuth |
| POST | /auth/logout | Logout |
| GET | /me | Current user |

### Courses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /courses | List courses |
| POST | /courses | Create course |
| GET | /courses/{slug} | Get course |
| PUT | /courses/{id} | Update course |
| DEL | /courses/{id} | Delete course |

### Enrollments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /enrollments | My enrollments |
| POST | /enrollments/{id} | Enroll |
| GET | /enrollments/{id}/progress | Get progress |

### Quiz
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /quizzes/{id}/start | Start attempt |
| POST | /quiz-attempts/{id}/submit | Submit |
