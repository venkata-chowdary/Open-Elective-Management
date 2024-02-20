const Student = require('../Models/StudentModel')
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false })
        } else {
            const user = await Student.findById(data.id)
            console.log(user)
            if (user) {
                return res.json({ status: true,userData:user.studentEmail})
            }
            else{
                return res.json({ status: false })
            } 
        }
    })
}