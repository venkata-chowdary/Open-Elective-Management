const { userVerification } = require('../Middlewares/AuthMiddleware')
const Student = require('../Models/StudentModel')

const router = require('express').Router()

router.get('/getstudentdetails', userVerification,  (req, res) => {
    const {studentEmail}=req.userData
    Student.findOne({studentEmail})
    .then((data)=>{
        if(data){
            console.log(data)
            res.send(data)
        }
    })
    .catch((err)=>{
        res.status(404).send(err)
    })
});


module.exports = router
