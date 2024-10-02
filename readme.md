# LeetCode Challenge Web Application

This project is a gamified coding challenge web application inspired by Advent of Code's approach in releasing problems, but using LeetCode problems. Users can participate in daily challenges, track their progress on a leaderboard, and improve their coding skills while coordinating leetcode contests with fellow peers.

## Technologies Used
- React + TypeScript
- Flask (Python)
- Firebase data store + authentication
- Docker
- [Leetcode api](https://alfa-leetcode-api.onrender.com/)

## Setup Instructions

### Prerequisites
- Docker
- Docker Compose
- Git

### Setup Steps

1. Clone the repository:
   ```
   git clone <your-repo-url>
   cd <your-repo-name>
   ```

2. Set up your Firebase configuration:
   - Place your `serviceAccount.json` file in the `database/` directory.
   - **Note:** Never commit this file to version control. It's included in the `.gitignore` file for security reasons

3. Build and start the Docker containers:
   ```
   make dcu
   ```

   This command will build the Docker images for both the backend and frontend, and start the containers. The first time you run this, it may take a few minutes to download and build everything.

4. Once the containers are running, you can access:
   - The backend at `http://localhost:5001`
   - The frontend at `http://localhost:3000`

- If you add new dependencies:
  - For the backend: Update `requirements.txt` and rebuild the backend container with `docker-compose up --build backend`
  - For the frontend: Update `package.json`, stop the containers, run `docker-compose down`, and then `docker-compose up --build`

- To stop the containers, use `Ctrl+C` in the terminal where docker-compose is running, or run `docker-compose down` in another terminal.

### Notes
- Make sure both the backend and frontend containers are running for full functionality.
- If you encounter any issues, you can view the logs of each service with `docker-compose logs backend` or `docker-compose logs frontend`.