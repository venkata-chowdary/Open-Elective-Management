const { userVerification } = require('../Middlewares/AuthMiddleware')
const Student = require('../Models/StudentModel')

const router = require('express').Router()

router.get('/getstudentdetails', userVerification, (req, res) => {
    const { studentEmail } = req.userData;
    Student.findOne({ studentEmail })
        .then((data) => {
            console.log(data)
            if(!data){
                res.status(200).json(data)
            }
            return res.status(404).json({error:'Student Not Found'})
        })
        .catch((err) => console.log(err));
});



module.exports = router
