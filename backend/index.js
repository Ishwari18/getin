const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
dotenv.config();

connectToMongo();
const app = express();
const port = 5000;
app.use(cors()); // Enable CORS

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/categories", require("./routes/categories"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("hello ish");
});

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});

// Use a Set for onlineUsers
const onlineUsers = new Set();
const userWaitingForMatch = new Set();

// Define a function to find a matching user
function findMatchingUser(currentUser) {
  const availableUsers = Array.from(onlineUsers).filter((user) => user !== currentUser);
  if (availableUsers.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * availableUsers.length);
  return availableUsers[randomIndex];
}

// Define a function to notify users about a match
function notifyMatch(user1, user2) {
  // Send a match notification to both users using Socket.io
  io.to(user1.socketId).emit("matchFound", { user: user2 }); // Send user2 details to user1
  io.to(user2.socketId).emit("matchFound", { user: user1 }); // Send user1 details to user2
}

// Implement the onMatch function
// function onMatch(socket, user) {
//   if (onlineUsers.has(user)) {
//     // The user is already in the onlineUsers set, so notify them to wait
//     console.log(`User ${user._id} is already waiting for a match.`);
//     return;
//   }

//   onlineUsers.add(user);
//   console.log(onlineUsers);

//   if (onlineUsers.size >= 2) {
//     // Attempt to find a match
//     const matchedUser = findMatchingUser(user);

//     if (matchedUser && matchedUser !== user) {
//       // Notify both users about the match
//       notifyMatch(user, matchedUser);

//       // Remove the matched users from the set of online users
//       onlineUsers.delete(user);
//       onlineUsers.delete(matchedUser);

//       // Log the match
//       console.log(
//         `Match found! User ${user._id} is matched with User ${matchedUser._id}`
//       );
//     } else {
//       // No match found for the user
//       console.log(`User ${user._id} is waiting for a match.`);
//     }
//   } else {
//     console.log(`User ${user._id} is waiting for a match.`);
//   }
// }

function onMatch(socket, user) {
  if (onlineUsers.has(user)) {
    // The user is already in the onlineUsers set, so notify them to wait
    console.log(`User ${user._id} is already waiting for a match.`);
    return;
  }

  // Check if the user is already waiting for a match
  if (userWaitingForMatch.has(user._id)) {
    console.log(`User ${user._id} is already waiting for a match.`);
    return;
  }

  // Add the user to the waiting set
  userWaitingForMatch.add(user._id);

  onlineUsers.add(user);
  console.log(onlineUsers);

  if (onlineUsers.size >= 2) {
    // Attempt to find a match
    const matchedUser = findMatchingUser(user);

    if (matchedUser && matchedUser !== user) {
      // Notify both users about the match
      notifyMatch(user, matchedUser);

      // Remove the matched users from the set of online users
      onlineUsers.delete(user);
      onlineUsers.delete(matchedUser);

      // Remove the user from the waiting set
      userWaitingForMatch.delete(user._id);
      userWaitingForMatch.delete(matchedUser._id);

      // Log the match
      console.log(
        `Match found! User ${user._id} is matched with User ${matchedUser._id}`
      );
    } else {
      // No match found for the user
      console.log(`User ${user._id} is waiting for a match.`);
    }
  } else {
    console.log(`User ${user._id} is waiting for a match.`);
  }
}


let socketsConnected = new Set();

io.on("connection", onConnected);

function onConnected(socket) {
  console.log("Socket connected", socket.id);
  socketsConnected.add(socket.id);

  socket.on("find_match", (user) => {
    console.log("find_match was triggered");
    onMatch(socket, user);
  });
}

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
