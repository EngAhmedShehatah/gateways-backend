const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const gatewayRoutes = require("./routes/gateway.route");

const app = express();
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  "mongodb+srv://Ahmed:wklPbiQzeydXaH3i@cluster0.tumpp.mongodb.net/gateways?retryWrites=true&w=majority", {
    useNewParser: true,
    useUnifiedTopology: true
  }
).then(() => {
  console.log("Connected To Database");
}).catch(() => {
  console.log("Connection Failed");
});
app.use(express.json);
app.use(express.urlencoded({extended: false}));
app.use((req,
         res,
         next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow_Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
});
app.use("/api/gateway", gatewayRoutes);
module.exports = app;
