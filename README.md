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


