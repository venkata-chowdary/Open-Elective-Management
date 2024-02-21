const { Signup,Login } = require("../Controllers/AuthController");
const  { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();


router.post("/signup", Signup);
router.post('/login', Login)
router.post('/',userVerification,(req,res)=>{
    res.json({ status: true, userData:req.userData.studentEmail})
})


module.exports = router;