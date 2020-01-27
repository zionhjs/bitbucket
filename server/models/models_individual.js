const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const ReviewSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: [true, "Customer-Name is required"],
      minlength: [3, "Name has a minimum length of 3 characters"],
      default: 'This is our default name!'
    },
    stars: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [3, "Description has a minimum length of 3 characters"],
      default: 'This is our default Description!'
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Restaurant-Name is required"],
      minlength: [3, "Name has a minimum length of 3 characters"],
      default: 'This is our default restaurant-name!'
    },
    cuisine: {
      type: String,
      required: [true, "Restaurant-Cuisine is required"],
      minlength: [3, "Name has a minimum length of 3 characters"],
      default: 'This is our default cuisine-name!'
    },
    show_delete: {
      type: Boolean,
      default: true
    },
    reviews: [ReviewSchema]
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
RestaurantSchema.plugin(uniqueValidator);
// create an object that contains methods for mongoose to interface with MongoDB

module.exports = mongoose.model("Review", ReviewSchema);
module.exports = mongoose.model("Restaurant", RestaurantSchema);
