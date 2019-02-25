const express = require("express");
const path = require("path");
const { syncAndSeed, Company } = require("./db");

const app = express();

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/app.js', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'main.js'))
});

app.get('/api/companies', (req, res, next) => {
  Company.findAll()
    .then(companies => res.send(companies))
    .catch()
});

app.delete('/api/companies/:id', (req, res, next) => {
  Company.destroy({
      where: { id: req.params.id }
    })
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.post('/api/companies', (req, res, next) => {
  Company.createFake()
  .then(company => res.send(company))
  .catch(next);
})

const port = process.env.PORT || 3000;
const ip = process.env.IP || "0.0.0.0";

syncAndSeed()
  .then(() => {
    app.listen(port, ip, () => {
      console.log(`Server listening at ${port}`);
    });

  })
