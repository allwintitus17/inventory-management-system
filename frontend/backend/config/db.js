
const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://allwintitus491:Ktmh90FjtVZjUg6x@cluster0.0edob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("Database Connected Sucessfully");
}).catch((error)=>{
    console.error("Database connection failed Sucessfully")
})