const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const filePath = './buyers.json';

app.get('/buyers', (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    res.json(JSON.parse(data));
  });
});

app.post('/buyers', (req, res) => {
  const newBuyer = req.body;
  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(500).send('Error reading file');

    const buyers = JSON.parse(data);
    buyers.push(newBuyer);

    fs.writeFile(filePath, JSON.stringify(buyers, null, 2), err => {
      if (err) return res.status(500).send('Error writing file');
      res.status(201).send('Buyer added');
    });
  });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
