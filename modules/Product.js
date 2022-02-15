const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    id_User : {
        type: Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    name : {
        type : String,
        max : 255 ,
        required : true
    },
    status : {
        type : String,
        
        default : "En stock"
    },
    price :{
        type:String,
        required:true
    },
   /* price_id : {
        type: Schema.Types.ObjectId,
        ref : 'Price',
        required : true
    },
    company_id: {
        type: Schema.Types.ObjectId,
        ref : 'Company',
        required : true
    },
   */
});

module.exports = mongoose.model('Product',productSchema);