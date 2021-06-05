const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/route');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser')

dotenv.config();
mongoose.connect(process.env.DATABASE_ACCESS,{useNewUrlParser : true,useUnifiedTopology : true});
const db = mongoose.connection

db.on('error', (err) => console.log(err))

db.once('open' , () => console.log("Database connected"))

const PORT = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//app.use(express.json())
//app.use(cors())
// app.use('/app', routesUrls)
 app.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`))

 app.use('/app', routesUrls)