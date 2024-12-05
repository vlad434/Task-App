const express = require("express");
const path = require("path");
const hbs = require("hbs");
const auth = require("./middleware/auth");
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
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.get("", (req, res) => {
  res.render("index", {
    title: "Token-based Auth",
    name: "Vladone",
  });
});

app.get("/user", (req, res) => {
  res.render("user", {
    title: "User - CRUD Operations",
    name: "Vladone",
  });
});

app.get("/task", (req, res) => {
  res.render("task", {
    title: "Tasks",
    name: "Vladone",
  });
});

app.use("/*", (req, res) => {
  res.status(404).render("404", {
    title: "404",
    errorMessage: "Page not found.",
    name: "Vladone",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
