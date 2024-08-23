# Classroom Real-Time Q&A Platform

A fullstack application developed during a 24-hour hackathon to enhance classroom interaction by allowing teachers to post questions in real-time and receive immediate responses from students. The project was inspired by a need at "עתיד פסגות" school.

## Features

- **Real-Time Q&A:** Enables real-time interaction between teachers and students through Socket.IO.
- **Role-Based Access:**
  - **Teachers:** Create rooms, invite students, and post questions.
  - **Students:** Join rooms and answer questions in real-time.

## Technologies

### Client (React with Vite)
- **React:** For building the user interface.
- **Vite:** A fast and modern build tool.
- **Socket.IO:** For enabling real-time, bidirectional communication.
- **Axious:** For making HTTP requests to the server.

### Server (Node.js with Express)
- **Express:** A minimal and flexible Node.js web application framework.
- **Mongoose:** For managing MongoDB data with schema-based models.
- **Socket.IO:** For real-time communication between the server and clients.
- **CORS and Dotenv:** For handling cross-origin requests and environment variables.

## How to Install and Run the Application

1. **Clone the repository:**
    ```bash
    git clone https://github.com/dorb99/Hackathon_dailyTask.git
    ```

2. **Navigate to the client directory, install dependencies, and start the client:**
    ```bash
    cd Hackathon_dailyTask/client
    npm install
    npm run dev
    ```

3. **Open a second terminal, navigate to the server directory, install dependencies, and start the server:**
    ```bash
    cd ../server
    npm install
    node server.js
    ```

4. **Using the Application:**
    - To create a new student, use the passKey `newstudent`.
    - To create a new teacher, use the passKey `teacher#19`.

      ```bash
      npx vitest
      ```
