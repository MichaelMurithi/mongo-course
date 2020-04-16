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
      ref: "school",
    },
  },
  { timestamps: true },
);

const school = new mongoose.Schema({
  name: String,
});

const School = new mongoose.model("school", school);
const Student = new mongoose.model("student", student);

connect()
  .then(async (connection) => {
    const school = await School.create({ name: "Jkuat" });
    const student = await Student.create({
      firstName: "Myke",
      favFoods: ["Rice", "Chapati"],
      info: { shoesize: 42 },
      school: school._id,
    });
    const match = await Student.findById(student._id).populate("school").exec();
    console.log(match);
  })
  .catch((err) => console.error(err));
