const express =  require("express");
const http  = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors')


// setup a connection
mongoose.connect('mongodb://localhost:27017/auth', {useNewUrlParser: true})

const app = express();

const port = 8080;

app.use(morgan('combined'));
app.use(cors())
app.use(bodyParser({type: '*/*'}));
router(app);

const server = http.createServer(app)
server.listen(port, () => {
    console.log('serevre listening on ', port)
})