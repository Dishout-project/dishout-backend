const router = require("express").Router();
let Dish = require("../models/dish.model");

router.route("/").get((req, res) => {
    Dish.find()
        .then(dishes=> res.json(dishes))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const dishName = req.body.dishName;

    const newDish = new Dish({dishName});

    newDish.save()
        .then(() => res.json("Dish added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Dish.findById(req.params.id)
        .then(dish => res.json(dish))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Dish.findByIdAndDelete(req.params.id)
        .then(() => res.json("Dish deleted"))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").post((req, res) => {
    Dish.findById(req.params.id)
        .then(dish => {
            dish.dish = req.body.dish;
            
            dish.save()
                .then(() => res.json("Dish updated!"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;