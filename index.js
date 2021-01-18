const express = require('express');
const bodyParser = require('body-parser');
const layouts = require('express-ejs-layouts');

const app = express();

// body-parser to parse request body
app.use(bodyParser.urlencoded());

// set the view engine to ejs
app.set('view engine', 'ejs');

// use layouts
app.use(layouts);
app.set('layout', 'layouts/main.ejs');

// place all styles block in the layout at the head
app.set("layout extractStyles", true)

// place all scripts block in the layout at the end
app.set("layout extractScripts", true)

// static files
app.use(express.static('public'));

// routes
const DataAPI = require('./routes/Data');

app.use('/', DataAPI);

let PORT = process.env.PORT || 2000;
app.listen(PORT);
console.log('Server runs at port 2000...');