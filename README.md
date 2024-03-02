# Stack Overflow Clone Project

This repository contains the source code for the Stack Overflow Clone project. The project aims to replicate the functionality of Stack Overflow using the MERN (MongoDB, Express.js, React.js, Node.js) stack and incorporates various distributed systems for scalability and reliability.

## Project Overview

- **Project Name:** Stack Overflow Clone
- **Technologies:** MERN stack (MongoDB, MySQL, Express.js, React.js, Node.js)
- **Additional Technologies:** Kafka, Redis, AWS Load Balancer, AWS S3, AWS EC2

## Project Features

- Implemented a scalable web application using 3 tier architecture.
- Utilized distributed systems like Kafka and Redis to enhance system scalability, speed and throughput.
- Implemented a load balancer to distribute incoming traffic across multiple instances of the application for improved performance.

## Repository Structure

- `Frontend/`: Contains the frontend code for the project built with React.js.
- `src/`: Contains the backend code for the project built with Node.js and Express.js.
- `kafka-backend/`: Contains kafka backend which processes requests from topics such as questions, upvotes, etc.

## Installation and Setup

To set up the project locally, follow these steps:

1. Clone this repository.
2. Install MongoDB, Node.js, and npm if not already installed.
3. Navigate to the `Frontend/` directory and run `npm install` to install frontend dependencies.
4. Navigate to the `src/` directory and run `npm install` to install backend dependencies.
5. Write Mongodb configurations and other confidential data in configs file.
6. Run the frontend and backend servers:
    - For the frontend: Navigate to the `Frontend/` directory and run `npm start`.
    - For the backend: Navigate to the `src/` directory and run `npm start`.

## Additional Information

- This project includes the implementation of various features found on Stack Overflow, such as user authentication, posting questions, answering questions, commenting, upvoting/downvoting, badges based on user reputation, find top voted questions, etc.
- The usage of distributed systems like Kafka and Redis ensures scalability and reliability of the application, making it capable of handling a large user base effectively.
- For security purposes, JWT authentication and password hashing with Bcrypt have been implemented.
- API testing has been performed using Mocha to ensure the reliability and functionality of the backend APIs.
