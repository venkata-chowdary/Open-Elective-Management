const Student = require('../Models/StudentModel')
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res,next) => {
    
    const token = req.cookies.token
    if (!token) {
        return res.json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false })
        } else {
            const user = await Student.findById(data.id)
            if (user) {
                req.userData=user
                req.status=true
                // res.json({ status: true, userData:user.studentEmail})
                next()
            }
            else{
                return res.json({ status: false })
            } 
        }
    })
}