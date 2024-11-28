const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.port || 3000;

//metoda care ruleaza intre un nou request si run route handler
// app.use((req, res, next) => {
// if (req.method === "GET") {
//   res.send("GET requests are disabled");
// } else {
//   next();
// }
// res.status(503).send("The site is under maintenance...");

// console.log(req.method, req.path);
// next(); //permite lui route handler sa ruleze
// });

app.use(express.json()); //parseaza automat json-ul care vine; poate fi accesat prin req.body
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

const jwt = require("jsonwebtoken");

const myFunction = async () => {
  //creare token; sing(payload, secret) returneaza token-ul
  const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", {
    expiresIn: "7 days",
  });
  console.log(token);

  //verify token; verify(token, secret) retureaza payload-ul pentru token
  const data = jwt.verify(token, "thisismynewcourse");
  console.log(data);
};

myFunction();
