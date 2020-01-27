// All necessary requires, such as the Quote model.
const mongoose = require("mongoose");
const Review = mongoose.model("Review");
const Restaurant = mongoose.model("Restaurant");

module.exports = {
  getRestaurants: function (req, res) {
    Restaurant.find()
      .sort({ name: 1 })
      .then(restaurants => {
        //console.log('restaurants:', restaurants)
        res.json(restaurants)
      })
      .catch(err => res.json(err));
  },
  getRestaurant: function (req, res) {
    Restaurant.findOne({ _id: req.params.id })
      // .then(restaurant => {
      //   restaurant.reviews.sort('stars')
      //   return restaurant
      // })
      .then(restaurant => res.json(restaurant))
      .catch(err => res.json(err));
  },
  createRestaurant: function (req, res) {
    const errors = { errors: "" }
    Restaurant.find()
      .then(restaurants => {
        for (var restaurant of restaurants) {
          if (req.body.name == restaurant.name) {
            console.log('errors happened:')
            errors.errors = "can't have same names in restaurant!"
            //break;
          }
        }
        console.log('errors:', errors)
        if (errors.errors != "") {
          res.json(errors)
        } else {
          Restaurant.create(req.body)
            .then(restaurant => res.json(restaurant))
            .catch(err => res.json(err));
        }
      })
  },
  updateRestaurant: function (req, res) {
    console.log('req.body', req.body);
    Restaurant.findOneAndUpdate({ _id: req.body._id }, { name: req.body.name, cuisine: req.body.cuisine })
      .then(restaurant => res.json(restaurant))
      .catch(err => res.json(err));
  },
  removeRestaurant: function (req, res) {
    Restaurant.remove({ _id: req.params.id })
      .then(results => res.json(results))
      .catch(err => res.json(err));
  },
  createReview: function (req, res) {
    const ReviewData = {};
    ReviewData.customer = req.body.customer;
    ReviewData.stars = req.body.stars;
    ReviewData.description = req.body.description;
    Review.create(ReviewData)
      .then(data => {
        Restaurant.findOneAndUpdate(
          { _id: req.body.restaurant_id }, {
          $push: { reviews: data }
        })
          .then(results => res.json(results))
      })
      .catch(err => res.json(err));
  }
};

