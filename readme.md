# GitProjector

## Tasks

- User CRUD - done
- Authentication - done
- Handling errors globally - done

- Github API setup - done (can add more if needed)

  Difficulties:

  - Had some difficulty utilizing the APIs

  Solution:

  - Read some documentation from GitHub Docs.
  - Took references from the tutorials.

- Fetch GitHub repo data and return - done
- Globalizing the git operations for anyone. (anyone can login and use this api/app)

  Motivation:

  - Wanted to make the application public, not for myself only.

  Difficulties:

  difficulty-1:

  - How to make it not utilize my personalized access key?
  - It should be taking the authentication from the user, not the developer.

  Solution:

  - Referred tutorials.
  - Utilized the "auth-oauth-device" packege from npm to make it possible.

  difficulty-2:

  - I can use "auth-oauth-device" package and make it work with my terminal. But when UI is connected, how can I make the user see this code and let him/her authenticate for the next step?

  Solution:(temperory)

  - For now using token to get the data

- Validations - done

- documentation (function/class vise)
- swagger documentation for the users

- readme

# GitProjector API Documentation

## Overview

GitProjector is a RESTful API designed to manage user accounts and GitHub repositories. It provides functionalities for user authentication and interaction with GitHub repositories.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Endpoints](#api-endpoints)
   - [User Routes](#user-routes)
   - [GitHub Routes](#github-routes)
5. [Error Handling](#error-handling)
6. [Environment Variables](#environment-variables)
7. [Contributing](#contributing)
8. [License](#license)

## Features

- User registration and authentication
- Create, read, update, and delete user profiles
- Access GitHub repositories with user authentication
- Error handling for API requests

## Installation

To get started with GitProjector, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gitprojector.git
   ```

````

### Navigate to the Project Directory
After cloning the repository, change your working directory to the project folder using the following command:

```bash
cd gitprojector
````

### Install Dependencies

Before running the application, you need to install the required dependencies. Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine. Then, run the following command to install the necessary packages:

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory of the project. This file will store your environment variables. Below is an example of the variables you may need to include:

### Start the Server

To start the server, run the following command in your terminal:

```bash
npm start
```

### API Endpoints

The application exposes the following API endpoints:

#### User Endpoints

- **POST** `/api/user`: Create a new user.

  - **Request Body**:
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**:
    - **201 Created**: User created successfully.
    - **400 Bad Request**: Validation error (e.g., missing fields).
    - **409 Conflict**: User already exists.

- **POST** `/api/user/signin`: Sign in a user.

  - **Request Body**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**:
    - **200 OK**: User signed in successfully.
    - **401 Unauthorized**: Invalid credentials.

- **GET** `/api/user/:id`: Get user details.

  - **Response**:
    - **200 OK**: Returns user details.
    - **404 Not Found**: User not found.

- **PUT** `/api/user/:id`: Update user details.

  - **Request Body**:
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**:
    - **200 OK**: User updated successfully.
    - **404 Not Found**: User not found.

- **DELETE** `/api/user/:id`: Delete a user.
  - **Response**:
    - **200 OK**: User deleted successfully.
    - **404 Not Found**: User not found.

#### GitHub Repository Endpoints

- **GET** `/api/repos`: Retrieve a list of repositories.

  - **Response**:
    - **200 OK**: Returns an array of repositories.
    - **401 Unauthorized**: Authentication required.

- **POST** `/api/repos`: Create a new repository.

  - **Request Body**:
    ```json
    {
      "name": "string",
      "description": "string",
      "private": "boolean"
    }
    ```
  - **Response**:
    - **201 Created**: Repository created successfully.
    - **400 Bad Request**: Validation error (e.g., missing fields).
    - **401 Unauthorized**: Authentication required.

- **GET** `/api/repos/:repoId`: Retrieve details of a specific repository.

  - **Response**:
    - **200 OK**: Returns repository details.
    - **404 Not Found**: Repository not found.

- **PUT** `/api/repos/:repoId`: Update a repository.

  - **Request Body**:
    ```json
    {
      "name": "string",
      "description": "string",
      "private": "boolean"
    }
    ```
  - **Response**:
    - **200 OK**: Repository updated successfully.
    - **404 Not Found**: Repository not found.

- **DELETE** `/api/repos/:repoId`: Delete a repository.
  - **Response**:
    - **200 OK**: Repository deleted successfully.
    - **404 Not Found**: Repository not found.

### Error Handling Middleware

The application includes a centralized error handling middleware to catch and handle errors that occur during request processing. This middleware ensures that error responses are consistent and informative.

#### How It Works

1. **Middleware Definition**:
   The error handling middleware is defined in `src/middlewares/errorHandling.middleware.js`. It takes the following parameters:

   - `err`: The error object.
   - `req`: The request object.
   - `res`: The response object.
   - `next`: The next middleware function in the stack.

2. **Error Response Structure**:
   The middleware responds with a JSON object that includes:

   - `success`: A boolean indicating whether the request was successful.
   - `message`: A descriptive error message.
   - `status`: The HTTP status code associated with the error.

3. **Usage**:
   The error handling middleware is registered at the end of the middleware stack in the main application file (`src/index.js`). This allows it to catch errors from any route or middleware defined above it.

#### Example Error Response

````json
{
  "success": false,
  "message": "Resource not found",
  "status": 404
}

### User Routes
The application provides a set of RESTful routes for user management. These routes are defined in `src/features/users/routes.js` and include functionalities for creating, retrieving, updating, and deleting user accounts.

#### Available Routes

1. **Create User**
   - **Endpoint**: `POST /api/user`
   - **Description**: Creates a new user account.
   - **Request Body**:
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "securepassword"
     }
     ```
   - **Responses**:
     - **201 Created**: User account successfully created.
     - **400 Bad Request**: Validation errors or missing fields.

2. **Get User by ID**
   - **Endpoint**: `GET /api/user/:id`
   - **Description**: Retrieves the details of a user by their ID.
   - **URL Parameters**:
     - `id`: The unique identifier of the user.
   - **Responses**:
     - **200 OK**: Returns user details.
     - **404 Not Found**: User not found.

3. **Update User**
   - **Endpoint**: `PUT /api/user/:id`
   - **Description**: Updates the information of an existing user.
   - **URL Parameters**:
     - `id`: The unique identifier of the user.
   - **Request Body**:
     ```json
     {
       "name": "Jane Doe",
       "email": "jane@example.com"
     }
     ```
   - **Responses**:
     - **200 OK**: User information successfully updated.
     - **404 Not Found**: User not found.

4. **Delete User**
   - **Endpoint**: `DELETE /api/user/:id`
   - **Description**: Deletes a user account.
   - **URL Parameters**:
     - `id`: The unique identifier of the user.
   - **Responses**:
     - **204 No Content**: User account successfully deleted.
     - **404 Not Found**: User not found.

### GitHub Routes
The application provides routes for interacting with GitHub repositories. These routes are defined in `src/features/github/routes.js` and require user authentication.

#### Available Routes

1. **Get User Repositories**
   - **Endpoint**: `GET /api/repos`
   - **Description**: Retrieves a list of repositories for the authenticated user.
   - **Headers**:
     - `Authorization`: Bearer token for authentication.
   - **Responses**:
     - **200 OK**: Returns a list of repositories.
     - **401 Unauthorized**: Authentication failed or token is missing.

2. **Get Repository Details**
   - **Endpoint**: `GET /api/repos/:repoName`
   - **Description**: Retrieves details of a specific repository.
   - **URL Parameters**:
     - `repoName`: The name of the repository.
   - **Headers**:
     - `Authorization`: Bearer token for authentication.
   - **Responses**:
     - **200 OK**: Returns repository details.
     - **404 Not Found**: Repository not found.
     - **401 Unauthorized**: Authentication failed or token is missing.

3. **Create a New Repository**
   - **Endpoint**: `POST /api/repos`
   - **Description**: Creates a new repository for the authenticated user.
   - **Headers**:
     - `Authorization`: Bearer token for authentication.
   - **Request Body**:
     ```json
     {
       "name": "NewRepo",
       "description": "Description of the new repository",
       "private": false
     }
     ```
   - **Responses**:
     - **201 Created**: Repository successfully created.
     - **400 Bad Request**: Validation errors or missing fields.
     - **401 Unauthorized**: Authentication failed or token is missing.

### Error Handling Middleware
The application includes a custom error handling middleware located in `src/middlewares/errorHandling.middleware.js`. This middleware is responsible for capturing and handling errors that occur during the request/response cycle.

#### Usage
The error handling middleware is added to the Express app using `app.use(handleError);` and should be placed after all route definitions.

#### Error Response Format
When an error occurs, the middleware responds with a consistent JSON format:

```json
  {
    "success": false,
    "message": "Error message",
    "error": {
      "name": "ErrorName",
      "message": "Detailed error message"
    }
  }
````

### Authentication Middleware

The application includes an authentication middleware located in `src/middlewares/auth.middleware.js`. This middleware is designed to protect certain routes from unauthorized access by verifying JWT tokens.

#### Usage

The authentication middleware is applied to routes that require user authentication. For example, in the GitHub API routes, it is used as follows:

```javascript
app.use("/api/repos", auth, gitRouter);
```

#### How It Works

- Token Verification: The middleware checks for the presence of a JWT token in the Authorization header of the request.
- User Validation: If a token is provided, it is verified. If the token is valid, the request is allowed to proceed. Otherwise, a 401 Unauthorized response is sent back to the client.

#### Response for Unauthorized Requests

When a request is made without a valid token, the middleware responds with:

```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

### Error Handling Middleware

The application implements centralized error handling through middleware defined in `src/middlewares/errorHandling.middleware.js`. This middleware captures errors that occur during the request lifecycle and sends an appropriate response to the client.

#### Usage

The error handling middleware is registered after all routes in the Express application. For example:

```javascript
app.use(handleError);
```

#### How It Works

- Error Capture: If an error occurs during request processing, it is passed to the next middleware function using next(error).
- Response Formatting: The error handling middleware formats the response, ensuring a consistent structure regardless of the error type.

#### Response Structure

When an error occurs, the response follows this structure:

```json
{
  "success": false,
  "message": "Error message goes here",
  "error": {
    "status": "error status code",
    "details": "additional error details (if any)"
  }
}
```

### Authentication Middleware

The application includes authentication middleware located in `src/middlewares/auth.middleware.js`. This middleware is used to protect certain routes from unauthorized access.

#### Usage

The authentication middleware is applied to routes that require user authentication, such as the GitHub repository routes. For example:

```javascript
app.use("/api/repos", auth, gitRouter);
```

#### How It Works

- Token Verification: The middleware checks for a valid JSON Web Token (JWT) in the request headers. If the token is present and valid, the user is allowed access to the protected routes.
- User Extraction: If the token is verified, the user information is extracted from the token and can be accessed in subsequent middleware and route handlers.
- Error Handling: If the token is missing or invalid, the middleware sends a 401 Unauthorized response to the client.

#### Response Structure

When authentication fails, the response follows this structure:

```json
{
  "success": false,
  "message": "Unauthorized access",
  "error": {
    "status": 401,
    "details": "Token is required or invalid"
  }
}
```

### Error Handling Middleware

The application includes centralized error handling middleware located in `src/middlewares/errorHandling.middleware.js`. This middleware captures errors occurring in the application and sends standardized error responses.

#### Usage

The error handling middleware is added to the Express application as follows:

```javascript
app.use(handleError);
```

#### How It Works

- Error Capture: The middleware captures any errors thrown in the application routes or other middleware.
- Standardized Response: It sends a standardized error response to the client, ensuring consistency in error handling throughout the API.

#### Response Structure

The error response follows this structure:

```json
{
  "success": false,
  "message": "Error message here",
  "error": {
    "status": 500,
    "details": "Detailed error information"
  }
}
```

### Authentication Middleware

The application implements an authentication middleware located in `src/middlewares/auth.middleware.js`. This middleware is responsible for protecting certain routes and ensuring that only authenticated users can access them.

#### Usage

The authentication middleware is applied to the routes that require user authentication, such as the GitHub repositories routes:

```javascript
app.use("/api/repos", auth, gitRouter);
```

#### How It Works

- Token Verification: The middleware checks for a valid authentication token in the request headers.
- User Verification: If the token is present, it decodes the token to retrieve user information and verifies its validity.
- Access Control: If the token is valid, the request is allowed to proceed to the next middleware or route handler. If not, it sends an unauthorized error response.

#### Error Response

If authentication fails, the middleware sends a response with a 401 status code:

```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

### Error Handling Middleware

The application includes a centralized error handling middleware located in `src/middlewares/errorHandling.middleware.js`. This middleware is designed to catch and handle errors that occur throughout the application, providing consistent error responses.

#### Usage

The error handling middleware is added at the end of the middleware stack to catch any errors that are not handled by other middleware or route handlers:

```javascript
app.use(handleError);
```

#### How It Works

- Error Catching: When an error occurs in any part of the application (routes, middleware, etc.), it can be passed to the next middleware using next(err).
- Error Response: The middleware constructs a JSON response based on the error type and details.

#### Error Response Format

The error response will typically include:

- success: A boolean indicating the failure status.
- message: A brief description of the error.
- status: The HTTP status code.

Example error response:

```json
{
  "success": false,
  "message": "Resource not found",
  "status": 404
}
```

### User Routes

The user-related routes are defined in `src/features/users/routes.js` and are responsible for handling user operations such as registration, authentication, and profile management.

#### Available Routes

1. **POST /api/user/register**

   - **Description**: Register a new user.
   - **Request Body**:
     ```json
     {
       "name": "string",
       "email": "string",
       "password": "string"
     }
     ```
   - **Responses**:
     - **201 Created**: Returns the created user object.
     - **400 Bad Request**: Returns an error if the user data is invalid or the user already exists.
     - **500 Internal Server Error**: Returns an error if there is a server issue.

2. **POST /api/user/login**

   - **Description**: Authenticate a user and return a JWT token.
   - **Request Body**:
     ```json
     {
       "email": "string",
       "password": "string"
     }
     ```
   - **Responses**:
     - **200 OK**: Returns a JWT token and user information.
     - **401 Unauthorized**: Returns an error if the credentials are incorrect.
     - **500 Internal Server Error**: Returns an error if there is a server issue.

3. **GET /api/user/:id**

   - **Description**: Retrieve user details by ID.
   - **Responses**:
     - **200 OK**: Returns the user object if found.
     - **404 Not Found**: Returns an error if the user does not exist.
     - **500 Internal Server Error**: Returns an error if there is a server issue.

4. **PUT /api/user/:id**

   - **Description**: Update user information.
   - **Request Body**:
     ```json
     {
       "name": "string",
       "email": "string",
       "password": "string"
     }
     ```
   - **Responses**:
     - **200 OK**: Returns the updated user object.
     - **404 Not Found**: Returns an error if the user does not exist.
     - **500 Internal Server Error**: Returns an error if there is a server issue.

5. **DELETE /api/user/:id**
   - **Description**: Delete a user by ID.
   - **Responses**:
     - **200 OK**: Returns a confirmation message if the user is deleted.
     - **404 Not Found**: Returns an error if the user does not exist.
     - **500 Internal Server Error**: Returns an error if there is a server issue.

These routes are protected and accessible based on user authentication and authorization.

### GitHub Routes

The GitHub-related routes are defined in `src/features/github/routes.js` and facilitate operations related to GitHub repositories.

#### Available Routes

1. **GET /api/repos**

   - **Description**: Fetch the list of repositories for the authenticated user.
   - **Responses**:
     - **200 OK**: Returns an array of repositories.
     - **401 Unauthorized**: Returns an error if the user is not authenticated.
     - **500 Internal Server Error**: Returns an error if there is a server issue.

2. **POST /api/repos**

   - **Description**: Create a new repository for the authenticated user.
   - **Request Body**:
     ```json
     {
       "name": "string",
       "description": "string",
       "private": "boolean"
     }
     ```
   - **Responses**:
     - **201 Created**: Returns the created repository object.
     - **400 Bad Request**: Returns an error if the repository data is invalid.
     - **401 Unauthorized**: Returns an error if the user is not authenticated.
     - **500 Internal Server Error**: Returns an error if there is a server issue.

3. **GET /api/repos/:repoId**

   - **Description**: Retrieve details of a specific repository by ID.
   - **Responses**:
     - **200 OK**: Returns the repository object if found.
     - **404 Not Found**: Returns an error if the repository does not exist.
     - **401 Unauthorized**: Returns an error if the user is not authenticated.
     - **500 Internal Server Error**: Returns an error if there is a server issue.

4. **PUT /api/repos/:repoId**

   - **Description**: Update an existing repository.
   - **Request Body**:
     ```json
     {
       "name": "string",
       "description": "string",
       "private": "boolean"
     }
     ```
   - **Responses**:
     - **200 OK**: Returns the updated repository object.
     - **404 Not Found**: Returns an error if the repository does not exist.
     - **401 Unauthorized**: Returns an error if the user is not authenticated.
     - **500 Internal Server Error**: Returns an error if there is a server issue.

5. **DELETE /api/repos/:repoId**
   - **Description**: Delete a repository by ID.
   - **Responses**:
     - **200 OK**: Returns a confirmation message if the repository is deleted.
     - **404 Not Found**: Returns an error if the repository does not exist.
     - **401 Unauthorized**: Returns an error if the user is not authenticated.
     - **500 Internal Server Error**: Returns an error if there is a server issue.

These routes require authentication and will return errors for unauthorized requests.

### Error Handling Middleware

The error handling middleware is defined in `src/middlewares/errorHandling.middleware.js`. This middleware captures and handles errors that occur in the application.

#### Middleware Function

```javascript
export const handleError = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message: message,
    error: process.env.NODE_ENV === "development" ? err : {}, // Detailed error only in development
  });
};
```
