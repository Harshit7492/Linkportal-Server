const User = require('../models/user')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    const {  handle, email, password, category } = req.body;
    
    // Log incoming data to verify
    console.log(req.body);
    
    try {
        const defaultLink = { url: "typefinc.com", title: 'Typefince', icon: '' };
        const user = await User.create({ handle, email, password, role: category, links: [defaultLink] });
        const token = jwt.sign({ email }, process.env.SECRET_JWT);
        console.log("User created:", user);
        return res.json({ message: 'user created', status: 'success', token, id: user._id });
    } catch (error) {
        if(error){
            return res.json({message: 'try different handle or mail' ,status:'error'})
          }
  
        return res.json({ message: error.message, status: 'error' });
    }
};


const loginUser = (req, res) => {
    const {email, password } = req.body;

    try{
        const user =User.findOne({email:email,password:password})
        console.log(user);
        if(!user){
            return res.json({status: 'error',error: "Invalid credentials"})
        }
        const token = jwt.sign({ email }, process.env.SECRET_JWT);
        return res.json({ message: 'user found', status: 'success', token, id: user._id });

    }
    catch(error){
        return res.json({ message: "wrong entry", status: 'error' });

    }

}


module.exports = { registerUser, loginUser }