Movies & Subscriptions Management System

This web application is a Movies & Subscriptions Management System, built as a full-stack project using React.js for the front-end and Node.js with Express.js for the back-end. The app enables users to manage movies and member subscriptions efficiently, including CRUD operations for movies, members, and their respective subscriptions.

Key Features:
-User Authentication & Authorization: The system has user roles and permissions (stored in JSON and MongoDB). Only authorized users can log in, and the system administrator manages users and their permissions.
-Movies Management: Fetches movie data from the TVMaze API and allows users with appropriate permissions to create, update, delete, and view movies.
-Members Management: Manages member subscriptions by pulling data from the JSONPlaceholder API and supports CRUD operations on members and their subscriptions.
-Subscriptions Management: Tracks which members watched specific movies and allows users to subscribe members to new movies.

Tech Stack:
-Front-End: React.js with Redux for state management.
-Back-End: Node.js with Express.js, serving a REST API.
-Database: MongoDB for storing user, movie, and subscription data.
-External APIs: TVMaze API (for movie data) and JSONPlaceholder API (for member data).

Data Sources:
-MongoDB: Stores users, movies, and subscriptions.
-JSON Files: Stores user permissions and session timeouts.
-External APIs: Movies and members are initially fetched from external web services and saved to the database.

This project demonstrates CRUD operations, user authentication/authorization, and state management across a full-stack architecture, offering robust functionality for managing movies and member subscriptions in a clean and scalable web application.
