//////////////////////////////////////////////////////
///////////////      MODELS    ///////////////////////
//////////////////////////////////////////////////////
const Food = require('../models/food.js')

const index = async (req, res) => {
  const allfood = await Food.find({})
  res.render('food/index.ejs', { food: allfood })
}

const newFood = (req, res) => {
  res.render('food/new.ejs')
}

const create = async (req, res) => {
    //   convert this "on" or undefined value to a Boolean
    const formData = req.body
    if (req.body.isReadyToEat === 'on') {
      formData.isReadyToEat = true
    } else {
      formData.isReadyToEat = false
    }
  
    //   Create food in database
    await Food.create(formData)
  
    //   redirect the user back to the form page
    res.redirect('/food')
  }

const show = async (req, res) => {
    const foundFood = await Food.findById(req.params.foodId)
    res.render('food/show.ejs', { food: foundFood })
  }

const deleteFood = async (req, res) => {
    await Food.findByIdAndDelete(req.params.foodId)
    res.redirect('/food')
  }

const edit = async (req, res) => {
    const foundFood = await Food.findById(req.params.foodId)
    console.log(foundFood)
    res.render('food/edit.ejs', { food: foundFood })
  }

const update = async (req, res) => {
    //   convert this "on" or undefined value to a Boolean
    const formData = req.body
    if (req.body.isReadyToEat === 'on') {
      formData.isReadyToEat = true
    } else {
      formData.isReadyToEat = false
    }
    await Food.findByIdAndUpdate(req.params.foodId, formData)
    res.redirect(`/food/${req.params.foodId}`)
  }

module.exports = {
  index,
  new: newFood,
  create,
  show,
  delete: deleteFood,
  edit, 
  update,
}