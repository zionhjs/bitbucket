var restaurants_controller = require("../controllers/controllers.js");   //quotes => controller

module.exports = function (app) {
  app.get("/getrestaurants", (req, res) => {
    restaurants_controller.getRestaurants(req, res);
  });
  app.get("/getrestaurant/:id", (req, res) => {
    restaurants_controller.getRestaurant(req, res);
  });
  app.post("/createrestaurant", (req, res) => {
    restaurants_controller.createRestaurant(req, res);
  });
  app.put("/updaterestaurant", (req, res) => {
    restaurants_controller.updateRestaurant(req, res);
  });
  app.delete("/removerestaurant/:id", (req, res) => {
    restaurants_controller.removeRestaurant(req, res);
  });
  app.post("/createreview", (req, res) => {
    restaurants_controller.createReview(req, res);
  })
};

