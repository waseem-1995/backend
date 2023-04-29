const mongoose=require("mongoose")


const noteSchmea=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    author:{type:String,required:true},
    authorID:{type:String,required:true},
category:{type:String,required:true}
},
{
    versionKey:false
}
)

const noteModal=mongoose.model("note",noteSchmea)

module.exports={
    noteModal
}