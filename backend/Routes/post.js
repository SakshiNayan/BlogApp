const express = require("express")
const router =express.Router();
const PostModal = require("../Modals/post-modal")
const jwt=require("jsonwebtoken")


router.post("/publish",(req,res)=>{
    let time = new Date();
    PostModal.create({
        publish:req.body.content,
        description : req.body.description,
        time:time,
    }).then((data)=>{
        res.status(200).send("content has updated");
    }).catch((err)=>{
        res.send(402).send(err)
    })
})
router.get("/effect",(req,res)=>{
    PostModal.find().then((data)=>{
        res.status(200).json(data)
    }).catch((err)=>{
        res.status(402).send(err)
    })
})
module.exports = router;