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

router.post("/", async (req, res) =>{
    const newAccount = req.body;
try {
    const sql = db("accounts").insert(newAccount).toString();
    console.log(sql)
    const account = await  db("accounts").insert(newAccount);
    res.status(201).json(account)
}catch(err){
    res.status(500).json({message: "Error inserting account", error:err})
}
})

router.put("/:id", async(req, res) => {
    const{id} = req.params;
    const changes = req.body
try{
    const count = await db("accounts").update(changes).where({id})
    if(count){
        res.json({update: count});
    }else{
        res.status(404).json({message: "Invalid ID"})
    }
}
catch{
    res.status(500).json({message: "Error updating account"})
}
})

router.delete("/:id", async(req, res)=> {
    const {id} = req.params;
try{
    const count = await db("accounts").where({id}).del();
    if(count){
        res.json({deleted: count});
    }else{
        res.status(404).json({message: "Invalid ID"})
    }
}
catch(err){
 res.status(500).json({message: "Error deleting record", error:err})      
}
})
module.exports = router;