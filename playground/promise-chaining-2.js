require("../src/db/mongoose");

const Task = require("../src/models/task");

// Task.findByIdAndDelete("6745e7ce2176d2879190d8e2")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });

  return count;
};

deleteTaskAndCount("6745e7ce2176d2879190d8e2")
  .then((countResult) => {
    console.log(countResult);
  })
  .catch((e) => console.log(e));
