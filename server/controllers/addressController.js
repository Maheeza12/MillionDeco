import Address from "../models/Address.js";

//Add address :  /api/address/add
export const addAddress = async (req,res)=>{
    try {
        const addressData = req.body;
        addressData.userId = req.userId;
        await Address.create(addressData)
        res.json({success: true, message:"Address added successfully"});
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message});        
    }
}

//Get address :  /api/address/get
export const getAddress = async (req,res)=>{
    try {
        const userId = req.userId;
        const addresses = await Address.find({userId})
        res.json({success: true, addresses});
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message});        
    }
}