// controllers/dashboard.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const dashboardData = async (req, res) => {
    const { tokenMail } = req.body;
    try {
        const decodedToken = jwt.verify(tokenMail, process.env.SECRET_JWT);
        const email = decodedToken.email;
        const user = await User.findOne({ email });
        if (!user) {
            console.log(`User not found for email: ${email}`);  // Log the email being searched
            return res.status(404).json({ message: 'User not found', status: 'error' });
        }
        const userData = {
            name: user.name,
            role: user.role,
            bio: user.bio,
            avatar: user.avatar,
            handle: user.handle,
            links: user.links.length,
        };
        return res.json({ message: 'Success', userData, status: 'success' });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
};

module.exports = { dashboardData };
