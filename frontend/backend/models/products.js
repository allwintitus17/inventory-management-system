const mongoose=require('mongoose');
const User=require('./users')

const productSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'  //reference Who Created the inventery
    },
    InventoryName:{
        type:String,
        required:[true,'Please Select a Product'],
        //input field in front end
    },Description:{
        type:String,
        required:[true,'Please Enter the Description of the Product'],
        //Text area in frontend
    },ProductType:{
          type:String,
          required:[true,'Please select the Product type'],
          enum:['decors','kitchen','stationary','cooking'],
          //DropDown menu in front end

    },AddedBY:{
       type:String,
       required:true,  
       //input 
    },Manfacturedate:{
         type:Date,
         required:[true,'Please enter the Manifacture date'],
         validate:{
            validator:function(value){
                return value <= new Date();
            },
            message:'Manifacture date cannot be in the future'
         }
    },Rating:{
        type:Number,
        required:[true,'Please provide rating'],
        min:[1,'Rating must be at least 1'],
        max:[5,'Rating must be at most 5']
    }

},{
    timestamps:true,
})

const Product=mongoose.model('Product',productSchema);
module.exports=Product;