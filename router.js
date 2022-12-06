const express = require("express");
const router = express.Router();
const offerSlideCollection = require("./db/offerSlideSchema");
const offerCodeCollection = require("./db/offerCodeSchema");
const advCollection = require("./db/advSchema");
const productCollection = require("./db/productSchema");
const brandCollection = require("./db/brandSchema");
const subCategoryCollection = require("./db/subCategorySchema");
const categoryCollection = require("./db/categorySchema");
router.get("/",(req,res) => {
    res.send({message:"just a home page",status:true});
});
router.get("/api",(req,res) => {
    res.send({message:"nothing anything is here.",status:false});
});
router.get("/api/offer_slides",async (req,res) => {
    try{
        let data = await offerSlideCollection.find();
        res.send(data);
    }catch(err){
        res.send({message:err,status:false});
    }
});
router.get("/api/offer_codes",async (req,res) => {
    try{
        let data = await offerCodeCollection.find();
        res.send(data);
    }catch(err){
        res.send({message:err,status:false});
    }
});
router.get("/api/adv_slides",async (req,res) => {
    try{
        let data = await advCollection.find();
        res.send(data);
    }catch(err){
        res.send({message:err,status:false});
    }
});
router.post("/api/products",async (req,res) => {
    try{
        let {search,cid,bid,subcid,pid,order} = req.body;
        let data = {};
        let subc = {};
        let subcpro = {};
        if(search !== undefined){
            data = await productCollection.find({name:new RegExp(search,"gi")}).select({image:1,mrp:1,name:1,price:1,weight:1});
        }else if(cid !== undefined && subcid === undefined){
            data = await productCollection.find({category:cid}).select({image:1,mrp:1,name:1,price:1,weight:1}).limit(10);
        }else if(bid !== undefined){
            data = await productCollection.find({brand:bid}).select({image:1,mrp:1,name:1,price:1,weight:1});
        }else if(cid !== undefined && subcid !== undefined && order !== undefined){
            let subcdata = await subCategoryCollection.find({parent_cat:cid}).select({sub_cat_name:1,total_products:1});
            let ind = subcdata[0];
            if(ind === undefined){
                subc = {message:"sub categories not found.",status:false};
                subcpro = {message:"product cant fetch without subcategory.",status:false};
            }else{
                subc = subcdata;
                let id = (subcid == 0)? subcdata[0]._id:subcid;
                let sort_obj = {}
                if(order === "plh"){sort_obj = {price:1}}
                if(order === "phl"){sort_obj = {price:-1}}
                if(order === "naz"){sort_obj = {name:1}}
                subcpro = await productCollection.find({subcategory:id}).select({image:1,mrp:1,name:1,price:1,weight:1}).sort(sort_obj);
            }
            data = {subc,subcpro};
        }else if(pid !== undefined){
            let single = await productCollection.findById(pid);
            let c = await categoryCollection.findById(single.category).select({cat_name:1});
            let sc = await subCategoryCollection.findById(single.subcategory).select({sub_cat_name:1});
            let b = await brandCollection.findById(single.brand).select({brand_name:1});
            data = {single,c,sc,b};
        }else{
            data = {message:"something is wrong.",status:false}
        }
        res.send(data);
    }catch(err){
        res.send({message:err,status:false});
    }
});
router.get("/api/brands",async (req,res) => {
    try{
        let data = await brandCollection.find().select({brand_name:1,total_products:1});
        res.send(data);
    }catch(err){
        res.send({message:err,status:false});
    }
});
router.get("/api/subcategory",async (req,res) => {
    try{
        let data = await subCategoryCollection.find().select({sub_cat_name:1,total_products:1});
        res.send(data);
    }catch(err){
        res.send({message:err,status:false});
    }
});
router.get("/api/category",async (req,res) => {
    try{
        let data = await categoryCollection.find().select({cat_name:1,cat_image:1,total_products:1});
        res.send(data);
    }catch(err){
        res.send({message:err,status:false});
    }
});
router.post("/api/catbrand",async (req,res) => {
    if(req.body.catbrand){
        let q = req.body.catbrand;
        try{
            let cat = await categoryCollection.find({cat_name:new RegExp(q,"gi")}).select({cat_name:1,total_products:1}).limit(5);
            let subcat = await subCategoryCollection.find({sub_cat_name:new RegExp(q,"gi")}).select({sub_cat_name:1,parent_cat:1,total_products:1}).limit(5);
            let brand = await brandCollection.find({brand_name:new RegExp(q,"gi")}).select({brand_name:1,total_products:1}).limit(5);
            res.send({cat,subcat,brand});
        }catch(err){
            res.send({message:err,status:false});
        }
    }else{
        res.send({message:"invalid request",status:false});
    }
});
router.post("/api/cart_data",async (req,res) => {
    //we send what we get without filter
    try{
        res.send(req.body.cart_data);
        // let {items} = req.body;
        // if(!Array.isArray(items)){
        //     res.send({message:"something is wrong.",status:false});
        // }else{
        //     let data = await productCollection.find({_id:{$in:items}}).select({image:1,mrp:1,name:1,price:1,weight:1}).limit(50);
        //     res.send(data);
        // }
    }catch(err){
        res.send({message:err,status:false});
    }
});
module.exports = router;