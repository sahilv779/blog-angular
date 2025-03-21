# Blog App Frontend (Angular)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Requirements](#requirements)
  - [Steps](#steps)
- [Running Locally](#running-locally)
- [Module Structure](#module-structure)
  - [Auth Module](#auth-module)
  - [Dashboard Module](#dashboard-module)
- [Deployment](#deployment)

## Introduction
This is the frontend for the Blog application built with **Angular**. It integrates **Google OAuth** for user authentication, uses **JWT** for session management, and implements **AuthGuard** for route protection. The app allows users to log in, view posts, and manage their posts (create, edit, delete).

The app follows **dependency injection** principles and utilizes **signals** for reactive state management.

## Features
- **Google OAuth Login**: Users can log in with their Google account.
- **JWT Authentication**: Secure session management using JWT tokens.
- **Dashboard**: Users can view the list of posts, navigate to view post page, create new posts, and delete posts.
- **AuthGuard**: Protects routes that require authentication, ensuring users can’t access protected pages without logging in.

## Technologies Used
- **Angular**: Frontend framework for building single-page applications.
- **JWT**: Token-based authentication for securing API requests.
- **Google OAuth**: For logging in via Google.
- **AuthGuard**: Angular route guard for protecting routes.
- **Dependency Injection**: Angular’s mechanism for managing services and components.
- **Signals**: Reactive programming to manage state and reactivity within the app.

## Installation

### Requirements:
Before you begin, make sure you have the following installed:
- **Node.js** (v14 or higher)
- **Angular CLI** (for managing Angular projects)

### Steps:
1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/sahilv779/blog-angular.git
    cd blog-app-angular
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables. Create a `.env` file at the root of the project and add the following:
    ```env
    API_BASE_URL=http://localhost:3000/api
    GOOGLE_CLIENT_ID=your-google-client-id
    JWT_SECRET=your-jwt-secret
    ```

4. Run the application:
    ```bash
    ng serve
    ```

   The application should now be running at `http://localhost:4200`.

## Running Locally
1. **Start Backend**: Ensure your backend server is running (e.g., using `npm run start:dev` for the NestJS backend).
2. **Run Frontend**:
    ```bash
    ng serve
    ```
3. You can now access the frontend at `http://localhost:4200`.

## Module Structure

### Auth Module
The `Auth` module handles Google OAuth authentication and JWT management.

- **AuthService**: Handles login, logout, and storing JWT in `localStorage`.
- **AuthGuard**: Protects routes by checking if a valid JWT exists.
- **GoogleLoginComponent**: A component for handling Google login.

### Dashboard Module
The `Dashboard` module allows users to view, create, edit, and delete posts.

- **DashboardService**: Fetches post data from the backend and provides methods for managing posts.
- **PostListComponent**: Displays the list of posts.
- **CreatePostComponent**: Allows users to create new posts.
- **PostDetailComponent**: Allows users to view and delete posts.

## Endpoints
- **POST /auth/google**: Google OAuth login (handled by backend).
- **GET /posts**: Fetch the list of posts (displayed in the dashboard).
- **POST /posts**: Create a new post (via the CreatePostComponent).
- **DELETE /posts/:id**: Delete a post by ID (handled in PostDetailComponent).

## Deployment

For deploying the frontend to a cloud provider such as **AWS S3** or **Netlify**, follow the steps below:

1. **Build the Angular Application**:
    ```bash
    ng build --prod
    ```
   This will create a `dist/` directory containing the production build of the app.

2. **Deploy the Build**: Upload the contents of the `dist/` folder to your preferred hosting service like **AWS S3**, **Netlify**, or **Firebase Hosting**.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

