const express=require('express');
const app=express()
const PORT = 5000
require('./config/db.js')
const cors=require('cors')
// const userRouter=require('./routers/users')
// const productRouter=require('./routers/products')
app.get('/',(req,res)=>{
    res.status(200).json({message:'Welcome to Inventory Management System'})
})
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(express.json());
// app.use(userRouter);
// app.use(productRouter);
app.use('/api/users',require('./routers/users'))
app.use('/api/products',require('./routers/products'))
app.listen(PORT,()=>{
    console.log(`Server Started on port ${PORT}`)
})