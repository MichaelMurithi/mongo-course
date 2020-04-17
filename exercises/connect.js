const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const connect = url => {
  return (
    mongoose.connect(url),
    {
      poolSize: 10,
      useNewUrlParser: true,
    }
  );
};

module.exports = connect;
