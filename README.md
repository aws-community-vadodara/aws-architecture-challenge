# AWS Architecture Challenge Platform

A MERN stack application that provides interactive drag-and-drop AWS architecture challenges with three difficulty levels: Beginner, Intermediate, and Advanced.

## Features

- **User Registration**: Simple name and email registration
- **Three Difficulty Modes**: 
  - Beginner (5 services, 10 minutes)
  - Intermediate (8 services, 15 minutes) 
  - Advanced (12 services, 20 minutes)
- **Drag & Drop Interface**: Interactive AWS service placement
- **Scoring System**: Points based on accuracy and completion time
- **Leaderboard**: Track top performers
- **AWS-themed UI**: Matches AWS website design

## Tech Stack

- **Frontend**: React.js with React DnD for drag-and-drop
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Styling**: Custom CSS with AWS color scheme

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aws-architecture-test
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```
   
   Or install manually:
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend && npm install && cd ..
   
   # Install frontend dependencies
   cd client && npm install && cd ..
   ```

3. **Set up environment variables**
   Create a `.env` file in the `backend` directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/aws-arch-test
   PORT=3001
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system

5. **Run the application**
   
   **Development mode (runs both frontend and backend):**
   ```bash
   npm run dev
   ```
   
   **Or run separately:**
   
   Backend:
   ```bash
   npm run server
   ```
   
   Frontend (in another terminal):
   ```bash
   npm run client
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Health Check: http://localhost:3001/api/health

## Project Structure

```
aws-architecture-test/
├── backend/               # Node.js/Express backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── server.js         # Express server
│   ├── package.json      # Backend dependencies
│   └── .env              # Environment variables
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── data/         # Test data and configurations
│   │   └── App.js        # Main App component
│   └── package.json      # Frontend dependencies
├── package.json          # Root package.json for scripts
└── README.md
```

## API Endpoints

- `POST /api/users` - Create/get user
- `POST /api/users/test-result` - Save test results
- `GET /api/users/leaderboard` - Get leaderboard data
- `GET /api/users/stats/:email` - Get user statistics
- `GET /api/health` - Health check endpoint

## Test Scenarios

### Beginner Level
1. Simple Web Application (EC2, RDS, S3, CloudFront, Route 53)
2. Static Website Hosting (S3, CloudFront, Route 53, Certificate Manager, IAM)
3. Basic API Backend (API Gateway, Lambda, DynamoDB, CloudWatch, IAM)

### Intermediate Level
1. Multi-Tier Web Application (Route 53, CloudFront, ALB, Auto Scaling, RDS, ElastiCache, S3, CloudWatch)
2. Serverless Data Processing (S3, Lambda, Kinesis, DynamoDB, SNS, SQS, CloudWatch, IAM)
3. Microservices Architecture (API Gateway, ECS, ECR, RDS, ElastiCache, CloudWatch, ALB, VPC)

### Advanced Level
1. Enterprise Multi-Region Architecture (12 services including EKS, Aurora, WAF, Transit Gateway)
2. Data Lake and Analytics Platform (Kinesis, S3, Glue, Athena, Redshift, QuickSight, EMR, SageMaker)
3. Hybrid Cloud Architecture (Direct Connect, VPN Gateway, Transit Gateway, EKS, EFS, CloudFormation)

## Scoring System

- **Accuracy Points**: Based on proximity to correct positions
  - Within 50px: 100 points
  - Within 100px: 50 points  
  - Within 150px: 25 points
- **Time Bonus**: Remaining time converted to bonus points
- **Leaderboard**: Ranked by total score across all completed tests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License