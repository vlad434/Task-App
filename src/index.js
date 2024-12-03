const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
require("dotenv").config({ path: "./config/.env" });

const app = express();
const port = process.env.PORT;

app.use(express.json()); //parseaza automat json-ul care vine; poate fi accesat prin req.body
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
