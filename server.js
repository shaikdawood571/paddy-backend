app.post('/buyers', (req, res) => {
  const newBuyer = req.body;
  console.log("📥 New buyer submitted:", newBuyer);  // <=== Add this

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
