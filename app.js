const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const db=require("./config/mongoose-connection")
const indexRouter = require("./routes/index.js");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const expressSession = require("express-session");
const flash = require("connect-flash");

require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(expressSession({
    secret: process.env.EXPRESS_KEY, // store in .env
    resave: false,
    saveUninitialized: false,
    
}));

app.use(flash());
app.use(express.static(path.join(__dirname,"public")));







// Set view engine
app.set("view engine", "ejs");


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});