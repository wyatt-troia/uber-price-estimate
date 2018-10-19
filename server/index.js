const express = require('express');
const app = express();
const db = require('./../database/index');


app.get('/', (req, res) => res.send('Hello World!'));
app.post('/estimates', (req, res) => {
  res.send('coming!');
});
app.get('/estimates', (req, res) => {
  res.send('coming!');
});

if (process.env.PORT) {
  var PORT = process.env.PORT;
} else {
  var PORT = 8080;
}

app.listen(PORT, () => console.log(`Placeholder app listening on port ${PORT}!`));