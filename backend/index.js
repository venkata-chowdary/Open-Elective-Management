const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const studentRoute=require('./Routes/studentRoute')
require('dotenv').config()

const app = express();

const PORT=process.env.PORT


mongoose.connect('mongodb://127.0.0.1:27017/OpenElectiveDB',{
    useNewUrlParser:true
})
.then(() => console.log("MongoDB is  connected successfully"))
.catch((err) => console.error(err));


app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
  
app.use(cookieParser());

app.use(express.json());
  
app.use("/", authRoute);
app.use('/data',studentRoute)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});