import express from "express";

const app=express();

app.get("/", (req,res)=>{
    res.json({
        message: "Welcome to SyncCode Backend API"
    })
});

app.listen(5000,()=>{

    // @ts-ignore
    console.log(`Server is running on port 5000`);
})
