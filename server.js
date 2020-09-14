const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
console.log('port: ' + process.env.PORT)

app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017/myapp';
console.log('uri: ' + uri)
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
})


const dishesRouter = require("./routes/dishes");

app.use("/dishes", dishesRouter);


app.listen(port, () => {
    console.log("Server is running on port:", port);
});