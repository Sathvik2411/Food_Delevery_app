const orderModel=require('../model/orderModel')
const userModel=require('../model/userModel')
const Stripe=require('stripe')
const stripe=new Stripe(process.env.SK_SECRET)

const placeOrder=async(req,res)=>{
    const frontend_url= "http://localhost:5174/"
    try{
        const newOrder=await orderModel.create({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })

        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})
        const line_items=req.body.items.map(item =>({
            price_data:{
            currency:'usd',
            product_data:{
                name:item.name
            },
            unit_amount: item.price * 100,
        },
        quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:'usd',
                product_data:{
                    name:'Delivery charge'
                },
                unit_amount:2* 100,
            },
            quantity:1
        })

        const session=await stripe.checkout.sessions.create({
            line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        res.status(200).json({success:true,session_url:session.url})

    }catch(error){
        console.log(error)
        res.status(500).json({success:true,error:error.message})
    }
}

const verifyOrder=async(req,res)=>{
    const{orderId,success}=req.body
    try{
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"Paid"})

        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"Not Paid"})
        }
    } catch(error){
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

const userOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    }catch(error){
        console.log(error)
        res.json({success:fasle,message:"error"})
    }
}

const listOrder = async (req,res)=>{
    try{
        const orders = await orderModel.find()
        res.json({success:true,data:order})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"cannot fetch order"})

    }
}

const updateState = async(req,res) =>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status})
        res.json({success:true,message:"state updated"})
    } catch (error){
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

module.exports={placeOrder,verifyOrder,userOrders,listOrder}