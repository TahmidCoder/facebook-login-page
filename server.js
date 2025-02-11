// server.js
const dotenv = require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");

// Express অ্যাপ তৈরি করা
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const Port = process.env.PORT || 3000;
// MongoDB এর সাথে কানেক্ট করা
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connected to MongoDB");
});

// MongoDB Schema তৈরি করা
const formDataSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// MongoDB Model তৈরি করা
const FormData = mongoose.model("FormData", formDataSchema);

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Socket.io কানেকশন সেটআপ
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("form-submit", async (data) => {
    try {
      const formData = new FormData(data);
      await formData.save(); // MongoDB তে data সেভ করা
      socket.emit("form-response", "Data saved successfully!");
    } catch (err) {
      socket.emit("form-response", "Error saving data");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Server চালু করা
server.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
