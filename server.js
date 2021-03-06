require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("client/build"));

// Routes
app.use(require("./controllers/authController.js"));
app.use(require("./controllers/notesController.js"));
app.use(require("./controllers/compareController.js"));
app.use(require('./controllers/userController.js'));
app.use(require('./controllers/journalController.js'));


// Mongoose Middleware
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/journal-better", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });


// Mongoose/MongoDB Connection
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

// Test Route to see if server is being seen
app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

// Build path for domain launch
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});