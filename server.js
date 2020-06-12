// Using dotenv to get the DB location
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");
const authorRouter = require('./routes/authors')

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

//  set up mongodb
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { dbName:'fullStackPractice', useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
// If error console.log error
db.on("error", (error) => console.log(error));
// if connected clg the successful info
db.on("open", () => console.log("connected to mongoose"));

app.use("/", indexRouter);
app.use("/authors", authorRouter);

app.listen(process.env.PORT || 9900);
