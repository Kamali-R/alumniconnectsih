A web application to connect students and alumni through a verified registration system with email OTP authentication.

⚙️ Technologies Used
Node.js & Express.js

MongoDB & Mongoose

Nodemailer (for OTP emails)

dotenv (for environment variables)

bcryptjs (for secure password hashing)

Postman (for API testing)

🚀 How to Run This Project (Backend Setup)
✅ Step 1: Clone the Repository
bash
Copy code
git clone https://github.com/your-username/alumni-connect.git
✅ Step 2: Move into Server Directory
bash
Copy code
cd alumni-connect/server
✅ Step 3: Initialize the Project (if not already)
bash
Copy code
npm init -y
✅ Step 4: Install Required Dependencies
bash
Copy code
npm install express mongoose dotenv cors bcryptjs nodemailer jsonwebtoken
✅ Step 5: Install Dev Dependency (nodemon for development)
bash
Copy code
npm install --save-dev nodemon
🗂 Folder Structure
bash
Copy code
server/
├── controllers/       # Business logic (e.g., authController.js)
├── models/            # MongoDB schemas (e.g., User.js)
├── routes/            # API routes (e.g., authRoutes.js)
├── utils/             # Helper functions (e.g., otpUtils.js)
├── .env               # Environment variables
├── server.js          # App entry point
└── package.json
🔐 Step 6: Create .env File
Inside the server folder, create a file named .env and paste this:

env
Copy code
MONGO_URI=your_mongo_uri_here
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
Replace the values with your actual MongoDB URI, email, and Gmail app password.

🧪 Step 7: Test the API with Postman
🛠️ Start the server
bash
Copy code
npm run dev
If configured properly, you'll see:

pgsql
Copy code
✅ Connected to MongoDB
🚀 Server running on port 5000
📮 Step 8: Use Postman to Test APIs
🧾 1. Health Check (GET)
http
Copy code
GET http://localhost:5000/
✅ Response:
json
Copy code
{ "message": "API is running" }
📧 2. Send OTP (Signup)
http
Copy code
POST http://localhost:5000/api/send-otp
✅ Body (JSON):
json
Copy code
{
  "name": "JD",
  "email": "user@gmail.com",
  "password": "123456",
  "role": "student"
}
This sends a 6-digit OTP to your email.

🔐 3. Verify OTP
http
Copy code
POST http://localhost:5000/api/verify-otp
✅ Body (JSON):
json
Copy code
{
  "email": "user@gmail.com",
  "otp": "123456"
}
✅ Success Response:
json
Copy code
{ "message": "User registered successfully" }
✍️ Frontend Form Flow (To Be Connected)
Step 1: Signup Form
Name, Email, Password, Role, [Send OTP]

Sends to /api/send-otp

Step 2: OTP Verification Form
6 input boxes for OTP, [Verify OTP]

Sends to /api/verify-otp