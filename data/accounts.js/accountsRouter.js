const express = require("express");
const db = require("../dbConfig");
const router = express.Router();

router.get("/", async (req, res)=>{
    try{
        const accounts = await db("accounts")
        res.json(accounts)
    }catch(err){
        res.status(500).json({message: "Error getting accounts", error:err})
    }
    
})
router.get("/:id", async (req, res)=> {
    const {id} =req.params;
    try{
        const [account] = await db('accounts').where({id});
        if(account){
            res.json(account);
        }else{
            res.status(404).json({message: 'Bad ID'})
        }
    }catch(err){
        res.status(500).json({message: 'DB error', error:err})
    }
})

router.post("/", (req, res) =>{

})

router.put("/:id", (req, res) => {

})

router.delete("/:id", (req, res)=> {

})
module.exports = router;