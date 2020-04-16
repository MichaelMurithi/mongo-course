const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/");
};

const student = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    favFoods: [{ type: String }],
    info: {
      shoesize: { type: Number },
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "school", //the school's details to be fetched from the 'school' schema
    },
  },
  { timestamps: true },
); //student's schema

const school = new mongoose.Schema({
  name: String,
}); //school's schema

const School = new mongoose.model("school", school); //creates school model
const Student = new mongoose.model("student", student); //creates student's model

connect() //connects to the database and returns a promise
  .then(async (connection) => {
    const school = await School.create({ name: "Jkuat" }); //creates a student
    const student = await Student.create({
      firstName: "Myke",
      favFoods: ["Rice", "Chapati"],
      info: { shoesize: 42 },
      school: school._id,
    });
    const match = await Student.findById(student._id).populate("school").exec();
    //populate(field) takes the value of the reffered field and fills it in the refference field
    //exec() executes the query.
    console.log(match);
  })
  .catch((err) => console.error(err));
