const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const path = require("path");
const bodyParser = require("body-parser");
const connectDB = require("./utils");
const FormSubmission = require("./schemas");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "public/lins.html");
  res.sendFile(filePath);
});

app.post("/submit-form", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).sendFile(path.join(__dirname, "failure.html"));
  }
  try {
    const newSubmission = await FormSubmission.create({
      name,
      email,
      message,
    });
    res.sendFile(path.join(__dirname, "public/success.html"));
  } catch (error) {
    res.status(500).sendFile(path.join(__dirname, "public/error.html"));
  }
});

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running at http://localhost:${port}/`);
});
