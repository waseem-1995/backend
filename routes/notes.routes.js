const express=require("express")
const { noteModal } = require("../modelauth/model.notes")

const noteRouter=express.Router()



noteRouter.post("/create",async(req,res)=>{
    try {
        const note=await noteModal(req.body)
        await note.save()
        res.status(200).send({"msg":"new note have been created"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
        
    }
    
})


noteRouter.get("/",async(req,res)=>{
    // const query=req.query
    try {
        const note=await noteModal.find({authorID:req.body.authorID})
        res.status(200).send(note)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }

})
noteRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    const note=await noteModal.findOne({_id:id})
    try {
        if(req.body.authorID!=note.authorID){
            res.status(200).send({"Msg":"you are not auhorized to do this action"})
        }else{
            const note=await noteModal.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send(`Notes has been updated  of id ${id}`)
        }
        
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
    
})
noteRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    const note=await noteModal.findOne({_id:id})
    try {
        if(req.body.authorID!=note.authorID){
            res.status(200).send({"Msg":"you are not auhorized to do this action"})
        }else{
            const note=await noteModal.findByIdAndUpdate({_id:id})
            res.status(200).send(`Notes has beendeleted of id ${id}`)
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})
module.exports={
    noteRouter
}