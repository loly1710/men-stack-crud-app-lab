const mongoose = require('mongoose')  //import the mongoose library


const foodSchema = new mongoose.Schema({
    name: String,   
    isReadyToEat: Boolean,   
})


const Food = mongoose.model('Food', foodSchema)


module.exports = Food;

