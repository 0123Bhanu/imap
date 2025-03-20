# MERN Stack Project with Docker & Elasticsearch

## 📌 Overview
This project is a full-stack web application built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. It is containerized using **Docker** and integrates **Elasticsearch** for advanced search capabilities.

## 🚀 Features
- User authentication (JWT-based)
- CRUD operations for resources
- Elasticsearch integration for full-text search
- Dockerized for easy deployment

## 🛠️ Tech Stack
- **Frontend:** React.js, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Search Engine:** Elasticsearch
- **Containerization:** Docker, Docker Compose

## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Setup Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/mern_db
JWT_SECRET=your_jwt_secret
ELASTICSEARCH_HOST=http://elasticsearch:9200
```

### 3️⃣ Run with Docker
Ensure you have **Docker & Docker Compose** installed.
```sh
docker-compose up --build
```

### 4️⃣ Access the Application
- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:5000`
- **Elasticsearch UI:** `http://localhost:9200`

## 🏗️ Docker Configuration
### **Dockerfile (Backend)**
```dockerfile
FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD [ "node", "server.js" ]
EXPOSE 5000
```

### **docker-compose.yml**
```yaml
version: '3.8'
services:
  mongo:
    image: mongo
    container_name: mongo_db
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.17.3
    container_name: elasticsearch
    environment:
      - discovery.type=single-node
    ports:
      - "9200:9200"

  backend:
    build: ./backend
    container_name: backend
    ports:
      - "5000:5000"
    depends_on:
      - mongo
      - elasticsearch
    env_file:
      - .env

  frontend:
    build: ./frontend
    container_name: frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  mongo-data:
```

## 📜 License
This project is licensed under the MIT License.

---
### 🔗 Connect with Me
- **GitHub:** [@your-username](https://github.com/your-username)
- **LinkedIn:** [Your Name](https://linkedin.com/in/your-profile)

