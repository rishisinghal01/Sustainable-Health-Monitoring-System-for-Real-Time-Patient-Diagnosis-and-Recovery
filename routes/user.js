const express=require('express');
const {handlesignup,handlelogin}=require("../controllers/user");
const {create1,get1,delete1}=require('../controllers/tod');
const router=express.Router();
router.post('/signup',handlesignup);
router.post('/login',handlelogin)
router.post('/create',create1);
router.get('/get',get1);
router.delete('/delete/:id',delete1);
module.exports=router;