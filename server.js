const express = require("express");
const path = require("path");
const app = express();

// Add necessary security headers to allow SharedArrayBuffer
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
