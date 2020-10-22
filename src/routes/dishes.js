const router = require("express").Router();
let Dish = require("../models/dish.model");

router.route("/").get((req, res) => {
    Dish.find()
        .then(dishes => {
            res.json({dishes: dishes});
            res.status(200);
        })
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const dish = req.body.dish;
    console.log('adding ' + dish)
    const newDish = new Dish({dish});

    newDish.save()
        .then(() => {
            res.json("Dish added!");
            res.status(201);
        })
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Dish.findById(req.params.id)
        .then(dish => {
            res.json(dish);
            res.status(200);
        })
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Dish.findByIdAndDelete(req.params.id)
        .then(() => {
            // res{status: 204};
            // res.json("Dish deleted");
            res.status(204).send({ json: "Dish deleted!" });
        })
        .catch(err => res.status(400).send("Error: " + err));
});

router.route("/:id").post((req, res) => {
    Dish.findById(req.params.id)
        .then(dish => {
            dish.dish = req.body.dish;

            dish.save()
                .then(() => {
                    res.json("Dish updated!");
                    res.status(200);
                })
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;