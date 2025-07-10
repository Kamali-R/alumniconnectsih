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



