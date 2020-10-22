const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require('morgan')
const dishesRouter = require("./routes/dishes");
const environment = require('./environments/environment.js');


const app = express();
const port = process.env.PORT || environment.port;

console.log(`Production Environment: ${environment.production}`)

app.use(morgan('combined'))
app.use(cors());
app.use(express.json());


const uri = environment.mongo_endpoint;


console.log('uri: ' + uri)
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
})




app.use("/dishes", dishesRouter);


app.listen(port, () => {
    console.log("Server is running on port:", port);
});



