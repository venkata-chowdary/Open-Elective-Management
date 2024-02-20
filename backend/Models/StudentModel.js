const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
    studentId: String,
    studentEmail: String,
    studentName: String,
    currentSemester: String,
    deparment: String,
    openElectiveDepartment:String,
    password: String,
  });

  
studentSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const Student= mongoose.model("Student", studentSchema);

module.exports=Student