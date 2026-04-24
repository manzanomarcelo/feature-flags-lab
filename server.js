const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const flagsPath = path.join(__dirname, "flags.json");

app.get("/api/features", (req, res) => {
  const rawFlags = fs.readFileSync(flagsPath, "utf-8");
  const flags = JSON.parse(rawFlags);

  res.json(flags);
});

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});