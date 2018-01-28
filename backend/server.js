const express = require('express');
var path = require('path');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5000;
//const publicPath = path.resolve(__dirname, 'public');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api', (req, res) => {
  res.send({ express: 'Bewbz' });
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Express backend listening on port ${port}`));
