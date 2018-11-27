require('newrelic');
const express = require('express');
const proxy = require("http-proxy-middleware");
const morgan = require('morgan');
const path = require('path');
const app = express();
const compression = require('compression');
const port = process.env.PORT || 3000;

app.use(compression());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/:id', express.static(path.resolve(__dirname, 'public')));

// app.get("/", function(req, res) {
//   res.redirect("/api/8500000");
// });

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.use('/api/:id/', 
  proxy({
    target: 'http://localhost:3001/',
    changeOrigin: true
  })
);

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
