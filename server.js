// Here is where we import modules
// We begin by loading Express
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose"); 

const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require('path')

const app = express();

const foodCtrl = require('./controllers/food')

//MiddleWare
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))


//DB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });


// GET homepage
app.get('/', async (req, res) => {
  res.render('index.ejs')
})

app.get('/food', foodCtrl.index)

app.get('/food/new', foodCtrl.new)

app.delete('/food/:foodId', foodCtrl.delete)

app.get('/food/:foodId', foodCtrl.show)

app.post('/food', foodCtrl.create)

app.get('/food/:foodId/edit', foodCtrl.edit)

app.put('/food/:foodId', foodCtrl.update)

app.listen(3000, () => {
  console.log('Listening on port 3000')
})