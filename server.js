// server.js

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const filePath = path.join(__dirname, 'buyers.json');

app.use(cors());
app.use(express.json());

// Serve static frontend files (e.g., admin.html, market.html)
app.use(express.static('public'));

// GET all buyers
app.get('/buyers', (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Error reading buyers file:", err);
      return res.status(500).send('Error reading file');
    }

    try {
      const buyers = JSON.parse(data || '[]');
      res.json(buyers);
    } catch (e) {
      res.status(500).send("Invalid JSON format in buyers file.");
    }
  });
});

// POST a new buyer
app.post('/buyers', (req, res) => {
  const newBuyer = req.body;
  console.log("📥 New buyer submitted:", newBuyer);

  fs.readFile(filePath, (err, data) => {
    const buyers = !err ? JSON.parse(data || '[]') : [];

    buyers.push(newBuyer);

    fs.writeFile(filePath, JSON.stringify(buyers, null, 2), (err) => {
      if (err) {
        console.error("Error writing buyers file:", err);
        return res.status(500).send('Error writing file');
      }
      res.status(201).send('Buyer added');
    });
  });
});

// PUT request to update all buyers (e.g., for admin approval)
app.put('/buyers', (req, res) => {
  const updatedBuyers = req.body;
  console.log("✅ Buyers updated by admin.");

  fs.writeFile(filePath, JSON.stringify(updatedBuyers, null, 2), (err) => {
    if (err) {
      console.error("Error updating buyers file:", err);
      return res.status(500).send('Error updating file');
    }
    res.send('Buyers updated successfully');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
