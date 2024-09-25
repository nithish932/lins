const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const path = require('path');


app.use(cors());


app.use(express.static('public'));


app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'public/lins.html');
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});