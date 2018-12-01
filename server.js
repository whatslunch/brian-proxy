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

app.get('/loaderio-454f709b4a77178667c148aeb752c809/', (req, res) => {
  res.sendFile(path.join(__dirname, './loaderio-454f709b4a77178667c148aeb752c809.txt'));
});

app.get("/:id", function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// overview
app.use('/api/overview/:id', 
  proxy({
    target: 'http://54.144.31.20',
    changeOrigin: true
  })
);

// Dishes and Menu
app.use('/restaurants/:restaurant_id', 
  proxy({
    target: 'http://ec2-18-223-247-137.us-east-2.compute.amazonaws.com:2000',
    changeOrigin: true
  })
);

// reviews
app.use('/api/:id', 
  proxy({
    target: 'http://3.16.143.18',
    changeOrigin: true
  })
);

// reservations
app.use('/api/:restaurant_id/reservations', 
  proxy({
    target: 'http://ec2-34-216-238-63.us-west-2.compute.amazonaws.com/nomnoms/4689cca8-5498-45e3-8761-ab3ce1962358',
    changeOrigin: true
  })
);

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
