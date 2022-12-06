const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL)
.catch((err) => {
    console.log(err);
    throw new Error("connection failed");
});
module.exports = mongoose;