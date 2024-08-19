# ErasmusHogeschool Forum

A forum platform for Erasmushogeschool students and staff, built with Docker, Express, Knex, and React.

## Table of Contents

- [ErasmusHogeschool Forum](#erasmushogeschool-forum)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Status](#status)
  - [Features](#features)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Quick Start](#quick-start)
    - [Alternative start](#alternative-start)
  - [License](#license)
  - [Community](#community)

## Description

The ErasmusHogeschool Forum is a web-based platform designed to facilitate communication and collaboration among students and staff at Erasmushogeschool.

Users can post questions in their course categories, and other users—whether students or teachers—can comment on these posts.

## Status

This project was originally developed in the school's repository, and the deadline for this project has passed. Therefore, I will no longer be updating this repository.

However, I believe there is still potential for growth, and I plan to continue working on this project in a personal repository.

## Features

- User authentication and authorization
- Create, your own questions
- Comment on other people's posts
- create your own account

## Installation

### Prerequisites

you will need the following software installed

- Docker
- visual studio code or another IDE

### Quick Start

1.  **Clone the repository**

    ```bash
    git clone https://github.com/EHB-MCT/portfolio-starter-sabrilassouli/tree/main
    cd schoolforum
    ```

2.  **Set up environment variables**

    change the .env variables to your own

    ```
    DB_USER=YOUR_USERNAME
    DB_PASSWORD=YOUR_PASSWORD
    DB_NAME=YOUR_DATABASE_NAME
    SECRET_KEY=YOUR_SECRET_KEY
    ```

3.  **Build the Docker containers**

    Open a PowerShell or command prompt and navigate to the project directory. Then build and start the Docker containers with:

        docker-compose up --build

    This command will build the Docker images and start the containers for both the frontend and backend services. The application should now be running and accessible at http://localhost:3000.

### Alternative start

if building it via the comand line doesn't work you can alsodo it another way

go into the project directory in your IDE of choice and type this in the terminal to start the backend

        nodemon .\routes\index.js

then go tot the ./frontend\forum-frontend directory in a second terminal and run

    npm start

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Community

- **Be respectful**: Treat all contributors and maintainers with respect and kindness. Follow our [Code of Conduct](CODE_OF_CONDUCT.md).
- **Collaborate**: Engage in discussions, provide feedback, and help others when possible.
