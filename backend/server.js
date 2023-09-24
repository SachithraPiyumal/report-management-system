const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const cors = require("cors");
const branchRoutes =require('./Routes/BranchRoutes')
const reportRoutes =require('./Routes/ReportRoutes')

const app=express();


app.use('/reports', express.static('reports'))

const PORT=8000;

const mongoDb_URL="mongodb+srv://sachithra:sachithra@cluster0.9pw6yym.mongodb.net/companyDB?retryWrites=true&w=majority";

app.use(bodyParser.json({limit: '15000kb'}));
app.use(bodyParser.urlencoded({limit: '15000kb', extended: true}));
app.use(express.json());

app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use("/branch",branchRoutes);
app.use("/report",reportRoutes);

//Connect to mongoDB database
mongoose.connect(mongoDb_URL)
.then(()=>console.log("DB Connected..."))
.catch((err)=>console.log("DB not connected...",err));



app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));