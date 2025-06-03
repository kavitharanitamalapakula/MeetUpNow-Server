<!-- MeetupNow Backend -->

"This is the complete backend for the EnterMeetupNow video conferencing app, built using Node.js, Express, MongoDB, and Socket.IO. It supports user authentication, profile management, meeting scheduling, and real-time room joining."

🚀 Features
✅ User Authentication
Signup (POST /api/users/signup): Create a new user with username, email, and password.

Signin (POST /api/users/signin): Authenticate a user and return a JWT token for further requests.

👤 User Profile Management
Get Profile (GET /api/users/profile/:id): Get user profile (excluding password).

Update Profile (PUT /api/users/profile/:id): Update user details like avatar, phone, social links, etc.

📅 Meeting Scheduling
Create Scheduled Meeting (POST /api/meetings): Schedule a meeting with title, description, datetime.

Get All Meetings (GET /api/meetings): Fetch all scheduled meetings from the database.

⚡ Instant Meeting (VideoSDK)
Create Instant Meeting (POST /api/meetingRoom/instant): Generate a room via VideoSDK API and store it in MongoDB.

🧠 Socket.IO Real-Time Events
Join Room: Users join rooms via join-room event.

User Connection/Disconnection: Emits user-connected and user-disconnected to peers in the room.

🗂 Folder Structure
bash
Copy
Edit
EnterMeetupNow-backend/
│
├── controllers/               # Business logic
│   ├── meetingController.js   # For instant meetings
│   └── userController.js      # Profile get/update
│
├── models/                    # Mongoose schemas
│   ├── User.js
│   ├── Meeting.js
│   └── MeetingRoom.js
│
├── routes/                    # API routes
│   ├── userRoutes.js
│   ├── routeMeeting.js
│   └── meetingRoomRoutes.js
│
├── .env                       # Secrets (e.g., DB URI, JWT, VideoSDK)
├── server.js                  # App entry point, Socket.IO config
└── package.json               # Dependencies and scripts

🔐 Environment Variables (.env)

PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
VIDEOSDK_API_KEY=your_videosdk_key
VIDEOSDK_SECRET_KEY=your_videosdk_secret

🔌 API Overview
Auth Routes
Method	Endpoint	Description
POST	/api/users/signup	Register a new user
POST	/api/users/signin	Login & get JWT

Profile Routes
Method	Endpoint	Description
GET	/api/users/profile/:id	Get user profile
PUT	/api/users/profile/:id	Update user profile

Meeting Routes
Method	Endpoint	Description
POST	/api/meetings	Schedule a new meeting
GET	/api/meetings	Get all scheduled meetings
POST	/api/meetingRoom/instant	Create instant meeting (VideoSDK)

🧠 Socket.IO Events
Event	Payload	Description
join-room	{ roomId, userId }	User joins a room
user-connected	userId	Emitted to others in the room
disconnect	auto	Emits user-disconnected

📦 Dependencies

express – Web framework
mongoose – MongoDB ORM
dotenv – Environment variables
bcryptjs – Password hashing
jsonwebtoken – Token generation
cors – Cross-Origin Resource Sharing
socket.io – Real-time communication
axios – HTTP client (used for VideoSDK)

📬 Future Improvements (Suggestions)

Add authentication middleware for protected routes
Use populate to fetch user details in meetings
Add pagination or filtering to meetings
Add admin/moderator roles
Add email notifications on meeting creation