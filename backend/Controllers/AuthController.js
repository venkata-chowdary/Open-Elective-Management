const Student = require("../Models/StudentModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
    try {
        const { studentEmail, password, studentName } = req.body;
        const existingUser = await Student.findOne({ studentEmail });
        if (existingUser) {
            return res.json({ message: "Student already exists" });
        }
        const user = await Student.create({ studentEmail, password, studentName });
        const token = createSecretToken(user._id);

        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({ message: "User signed in successfully", success: true, user });
        next();
    } catch (error) {
        console.error(error);
    }
};


module.exports.Login = async (req, res, next) => {
    try {
        const { studentEmail, password } = req.body;
        if (!studentEmail || !password) {
            return res.json({ message: 'All fields are required' })
        }
        const user = await Student.findOne({ studentEmail });
        if (!user) {
            return res.json({ message: 'Incorrect password or email' })
        }
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return res.json({ message: 'Incorrect password or email' })
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({ message: "User logged in successfully", success: true });
        next()
    } catch (error) {
        console.error(error);
    }
}