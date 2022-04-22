const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const gatewayRoutes = require("./routes/gateway.route");

const app = express();
mongoose.useNewUrlParser = true;
mongoose.useFindAndModify = false;
mongoose.useCreateIndex = true;
mongoose.useUnifiedTopology = true;
mongoose.connect(
  "mongodb+srv://Ahmed:wklPbiQzeydXaH3i@cluster0.tumpp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
).then(() => {
  console.log("Connected To Database");
}).catch((err) => {
  console.log("Connection Failed");
  console.log(err);
});
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use((req,
         res,
         next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow_Methods", "*");
  next();
});
app.use("/api/gateway", gatewayRoutes);
module.exports = app;
