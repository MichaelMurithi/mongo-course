const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/");
};

const student = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  favFoods: [{
    type: String
  }],
  info: {
    shoesize: {
      type: Number
    },
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "school", //the school's details to be fetched from the 'school' schema
  },
}, {
  timestamps: true
}, ); //student's schema

const school = new mongoose.Schema({
  name: String,
  openSince: Number,
  students: Number,
  isGreat: Boolean,
  staff: [{
    type: String
  }],
}); //school's schema
school.virtual('staffCount')
  .get(function () {
    return this.staff.length
  }) //Creates a virtual method to when staffcount is called from get method to return the no. of stuff
const School = new mongoose.model("school", school); //creates school model
const Student = new mongoose.model("student", student); //creates student's model

connect() //connects to the database and returns a promise
  .then(async (connection) => {
    const school1 = await School.create({
      name: 'Jkuat',
      openSince: 1994,
      students: 35000,
      isGreat: true,
      staff: ['k', 'l', 'm']
    })
    console.log(school1.staffCount)
  })
  .catch((err) => console.error(err));