const express = require("express");
const router = express.Router();
const knex = require("knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const SECRET_KEY = "your_secret_key";
const SECRET_KEY = process.env.SECRET_KEY;
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

const {
  checkUserName,
  checkEmail,
  checkPassword,
  checkStatus,
} = require("../helpers/userEndpointHelpers");

router.get("/", async (req, res) => {
  try {
    const users = await db("users").select("*");
    res.json(users);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch users",
    });
  }
});

router.post("/", async (req, res) => {
  const { name, email, password, status } = req.body;

  if (!checkUserName(name)) {
    return res.status(400).json({
      error: "Invalid username",
    });
  }

  if (!checkEmail(email)) {
    return res.status(400).json({
      error: "Invalid email address",
    });
  }

  if (!checkPassword(password)) {
    return res.status(400).json({
      error: "Invalid password",
    });
  }

  if (!checkStatus(status)) {
    return res.status(400).json({
      error: "Invalid status",
    });
  }

  try {
    const [id] = await db("users").insert(req.body).returning("id");
    res.status(201).json({
      id,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to create user",
    });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    // Check if the user exists
    const user = await db("users").where({ name }).first();

    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password.trim(), user.password.trim());

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a token
    const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ message: "Logged in successfully", token, userId: user.id });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide name, email, and password" });
  }

  try {
    // Check if the user already exists
    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const [id] = await db("users")
      .insert({
        name,
        email,
        password: hashedPassword,
      })
      .returning("id");

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
