import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// Bonus: custom middleware that logs every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
  next();
});

// Static HTML page served at /
app.use(express.static("public"));

// POST /user -> accepts {name, email}
app.post("/user", (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }
  res.send(`Hello, ${name}!`);
});

// GET /user/:id
app.get("/user/:id", (req, res) => {
  res.send(`User ${req.params.id} profile`);
});

// Error handler (catches bad JSON, etc.)
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});