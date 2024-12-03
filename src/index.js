const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
require("dotenv").config({ path: "./config/.env" });

const app = express();
const publichDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const port = process.env.PORT;

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publichDirectoryPath));
app.use(express.json()); //parseaza automat json-ul care vine; poate fi accesat prin req.body
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
