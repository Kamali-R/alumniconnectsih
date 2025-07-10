# alumni-connect
Web application to connect alumni and students

alumni-connect/
├── client/             → frontend folder
├── server/             → backend folder
│   ├── README.md       
│   ├── index.js
│   ├── routes/
│   ├── controllers/
│   └── ...
└── ...


inside server folder ------ cd server

npm init -y                           # Initialize the Node.js project
npm install express mongoose dotenv cors jsonwebtoken bcryptjs  # Install dependencies
npm install --save-dev nodemon       # Install nodemon for dev

npm run dev

npm install moongose dotenv

create a new .env file in server

# server/.env
MONGO_URI=mongodb+srv://jeyadharani:dharani%40123@alumnicluster.kw3egk4.mongodb.net/alumniDB?retryWrites=true&w=majority
PORT=5000

Open the Postman desktop app (or Postman Web)

Skip login if prompted, or sign in if you prefer

2. Test the “Health‑check” Route
Create a new request

Method: GET

URL: http://localhost:5000/

Hit Send
• Success response (first time):

json
Copy code
{ "message": "User registered successfully" }
• If already exists:

json
Copy code
{ "message": "User already exists" }


Step 1: Signup Page
HTML form with:

Name

Email

Password

Role (dropdown or input)

“Send OTP” button

On clicking Send OTP:

Send form data (except OTP) to backend API (/api/send-otp)

Backend sends a 6-digit OTP to the user's email using NodeMailer

Store the OTP temporarily in your DB or in memory (like Redis for prod, or an object for now)

🔹 Step 2: OTP Verification Page
HTML form with:

6 input boxes for OTP

“Verify OTP” button

On clicking Verify OTP:

Collect the 6 digits, send to backend API (/api/verify-otp)

Backend verifies and if correct, completes the signup and stores the user in DB

Features Implemented
📦 User Registration with name, email, password, and role

🔐 Password Hashing using bcrypt

📧 Email OTP Verification via Gmail SMTP

✅ Mongoose/MongoDB Integration

📮 API Testing with Postman

🌱 Professional project structure using Express

🧾 Technologies Used
Node.js & Express.js

MongoDB + Mongoose

Nodemailer for Email

dotenv for environment variables

bcryptjs for password hashing

📁 Project Folder Structure
pgsql
Copy code
server/
│
├── controllers/
│   └── authController.js       # Handles OTP logic
│
├── models/
│   └── User.js                 # User schema
│
├── routes/
│   └── authRoutes.js           # Route definitions
│
├── utils/
│   └── otpUtils.js             # OTP generation & storage (to be added soon)
│
├── .env                        # Environment variables
├── server.js                   # Entry point
└── package.json
🛠️ Environment Variables in .env
env
Copy code
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/alumniDB
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
🧪 API Endpoints (Postman Testing)
Send OTP
POST /api/send-otp

json
Copy code
{
  "name": "JD",
  "email": "your_email@gmail.com",
  "password": "123456",
  "role": "student"
}
Verify OTP
POST /api/verify-otp

json
Copy code
{
  "email": "your_email@gmail.com",
  "otp": "123456"
}
💻 Commands to Set Up
1. Initialize and Install Dependencies
bash
Copy code
npm init -y
npm install express mongoose dotenv cors bcryptjs nodemailer
2. Create .env file and add credentials
3. Run the server
bash
Copy code
node server.js



