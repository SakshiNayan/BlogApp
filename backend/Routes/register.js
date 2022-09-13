
const express=require("express")
const bcrypt=require("bcryptjs")
const router=express.Router()
const jwt=require("jsonwebtoken")
require("dotenv").config();

const UserModal = require("../Modals/register-modal")
const generatePasswordHash = require("../utility");


router.post("/register", async (req, res) => {
    UserModal.find({email : req.body.email}).then((email) =>{
        if(email.length){
          res.send("user already exists")
        
     
      } else {
          generatePasswordHash(req.body.password).then((passwordHash) => {
              UserModal.create({
                  username : req.body.username,
                  email: req.body.email,
                   password: passwordHash
                  
                  
              })
                  .then(() => {
                      res.status(200).send(`User added successfully`);
                  }).catch((err) => {
                      res.status(400).send(err.message)
                  })
          });
  
      }
   
  })
  })


router.post("/login", (req, res) => {
    UserModal.find({ email: req.body.email }).then((user) => {
        if (user.length) {
            bcrypt.compare(req.body.password, user[0].password).then((match) => {
                if (match) {
                    const auth_Token = jwt.sign(req.body.email, process.env.SECRET_KEY);
                    res.status(200).send({ "Status": "Success", auth_Token });
                } else {
                    res.status(400).send("Invalid password")
                }
            });
        } else {
            res.status(400).send("User Not Exist")
        }
    })
});
// app.post("/posts", (req, res) => {
//     if (req.headers.authorization) {
//         try {
//             const email = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
//             console.log(email)
//             postModel.create({
//                posts : req.body.posts,
//                user : email
//             }).then((data) => {
//                 res.status(200).send({ "Status": "Post Created", data })
//             });
//         } catch (err) {
//             res.status(403).send("Unauthorized User")
//         }
//     } else {
//         res.status(400).send("MIssing Autborization Token")
//     }
// });
   
module.exports= router
