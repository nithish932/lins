const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const path = require("path");
const bodyParser = require("body-parser");
const connectDB = require("./utils");
const FormSubmission = require("./schemas");

app.use(cors());

app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "public/lins.html");
  res.sendFile(filePath);
});

app.post("/submit-form", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.json({ success: false });
  }

  try {
    const newSubmission = await FormSubmission.create({
      name,
      email,
      message,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error creating form submission:", error);
    res.json({ success: false });
  }
});

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running at http://localhost:${port}/`);
});
