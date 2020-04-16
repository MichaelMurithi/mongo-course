const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/");
};

const student = new mongoose.Schema({
  firstName: String,
});

const Student = mongoose.model("student", student);

connect() //Returns a promise
  .then(async (connection) => {
    const student = await Student.create({ firstName: "Myke" });
    console.log(student);
  })
  .catch((err) => console.error(err));
