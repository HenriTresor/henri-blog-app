# Blog Platform

This project is a blog platform that includes user authentication, blog post management, and API endpoints. It is built using Node.js, Prisma, and PostgreSQL for the backend, and React.js for the frontend.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Backend Setup](#backend-setup)
   - [User Authentication](#user-authentication)
   - [Blog Post Management](#blog-post-management)
   - [API Endpoints](#api-endpoints)
4. [Frontend Setup](#frontend-setup)
   - [Authentication](#authentication)
   - [Blog Post Management](#blog-post-management-1)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)
9. [Database Setup](#database-setup)

## Project Overview

This project implements a blog platform where users can register, log in, manage blog posts, and interact with comments. The backend uses Node.js, Prisma, and PostgreSQL. The frontend is built with React.js.

## Project Structure

### Backend

- **`/server`**: Contains the backend code.
  - **`/src`**: Source code directory.
    - **`/controllers`**: Contains request handlers for the API endpoints.
    - **`/prisma`**: Contains Prisma schema definitions and database models.
    - **`/routers`**: Defines API routes and connects them to controllers.
    - **`/middlewares`**: Contains middleware functions, such as authentication checks.
    - **`/services`**: Functions for making API requests to the database.
    - **`/config`**: Contains configuration files.
    - **`/validators`**: Contains validations.
    - **`/utils`**: Utility functions and helpers.
  - **`/prisma`**: Contains Prisma configuration files and migration scripts.
  - **`__init__.js`**: Entry point for the backend application. Sets up the Express server and middleware.

### Frontend

- **`/frontend`**: Contains the frontend code.
  - **`/src`**: Source code directory.
    - **`/components`**: React components for the user interface.
    - **`/pages`**: React components for different pages of the application.
    - **`/utils`**: Utility functions and helpers.
    - **`/providers`**: Contains React context providers for state management.
    - **`/styles`**: CSS and styling files.
  - **`index.js`**: Entry point for the React application. Renders the main application component.

## Backend Setup

### User Authentication

- Implement user registration and login.

### Blog Post Management

- Create models for `Post` and `Comment`.
  - A `Post` has a title, content, author, and timestamps.
    ```prisma
    model Posts {
      id        String    @id @default(uuid())
      title     String
      content   String?
      authorId  String
      createdAt DateTime  @default(now())
      updatedAt DateTime  @updatedAt
      author    Users     @relation(fields: [authorId], references: [id], name: "UserPosts")
      comments  Comments[] @relation("PostComments")
    }
    ```
  - A `Comment` is linked to a `Post`, has content, author, and timestamps.
    ```prisma
    model Comments {
      id        String    @id @default(uuid())
      authorId  String
      content   String?
      postId    String
      createdAt DateTime  @default(now())
      updatedAt DateTime  @updatedAt
      author    Users     @relation(fields: [authorId], references: [id], name: "UserComments")
      post      Posts     @relation(fields: [postId], references: [id], name: "PostComments")
    }
    ```

### API Endpoints

All endpoints have the root `/api/v1`.

#### Authentication Endpoints
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/register` - Register

#### Comment Endpoints
- `POST /api/v1/comments` - Add a comment (Requires authentication)
- `GET /api/v1/comments/:postId` - Get all comments for a post (Requires authentication)
- `GET /api/v1/comments/comment/:commentId` - Get a single comment by ID (Requires authentication)
- `PUT /api/v1/comments/:commentId` - Update a comment by ID (Requires authentication)
- `DELETE /api/v1/comments/:commentId` - Delete a comment by ID (Requires authentication)

#### Post Endpoints
- `POST /api/v1/posts/` - Create a post (Requires authentication)
- `GET /api/v1/posts` - Get available posts
- `GET /api/v1/posts/:postId` - Get a single post by ID
- `PUT /api/v1/posts/:postId` - Update a post by ID (Requires authentication)
- `DELETE /api/v1/posts/:postId` - Delete a post by ID (Requires authentication)

## Frontend Setup

### Authentication

- Created login and registration forms.
- Stored authentication tokens securely.

### Blog Post Management

- Display a list of posts.
- View a single post with its comments.
- Add, edit, and delete posts (only if authenticated).
- Add comments to a post (only if authenticated).

## Installation

1. **Backend Setup:**
   - Ensure PostgreSQL is installed and running.
   - Clone the repository and navigate to the server directory:
     ```bash
     git clone https://github.com/henritresor/henri-blog-app.git
     cd henri-blog-app/server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Set up PostgreSQL:
     - Connect to PostgreSQL using `psql` or a GUI tool like pgAdmin.
     - Create a new database:
       ```sql
       CREATE DATABASE qtglobal;
       ```
     - Update the Prisma configuration (`/server/prisma/.env`) with your database connection details:
       ```env
       DATABASE_URL="postgresql://username:password@localhost:5432/qtglobal"
       ```
   - Set up Prisma and migrate the database:
     ```bash
     npx prisma migrate dev
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

2. **Frontend Setup:**
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React development server:
     ```bash
     npm start
     ```

## Usage

1. **Backend:**
   - The backend server runs on `http://localhost:8080` (or another port specified in your configuration).
   - The API endpoints are accessible for CRUD operations and authentication.

2. **Frontend:**
   - The React development server runs on `http://localhost:3000`.
   - Access the application via a web browser at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please follow the guidelines for submitting pull requests and issues.

## License

This project is licensed under the MIT License.

## Database Setup

### SQL Scripts

#### Create Tables

```sql
-- Enable uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Users table
CREATE TABLE Users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Posts table
CREATE TABLE Posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT,
    authorId UUID REFERENCES Users(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Comments table
CREATE TABLE Comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    authorId UUID REFERENCES Users(id),
    postId UUID REFERENCES Posts(id),
    content TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Insert sample users
INSERT INTO Users (name, password, email) VALUES
('john_doe', 'password123', 'john@example.com'),
('jane_smith', 'password456', 'jane@example.com');

-- Insert sample posts
INSERT INTO Posts (title, content, authorId) VALUES
('First Post', 'This is the content of the first post.', (SELECT id FROM Users WHERE name='john_doe')),
('Second Post', 'This is the content of the second post.', (SELECT id FROM Users WHERE name='jane_smith'));

-- Insert sample comments
INSERT INTO Comments (authorId, postId, content) VALUES
((SELECT id FROM Users WHERE name='jane_smith'), (SELECT id FROM Posts WHERE title='First Post'), 'This is a comment on the first post.'),
((SELECT id FROM Users WHERE name='john_doe'), (SELECT id FROM Posts WHERE title='Second Post'), 'This is a comment on the second post.');
