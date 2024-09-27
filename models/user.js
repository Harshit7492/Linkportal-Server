const mongoose = require('mongoose');
const { model, Schema } = mongoose;  // Capitalize Schema

const UserSchema = new Schema({
    name: {
        type: String,
        // required: true,
    },
    bio: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {   // Fixed typo here from `avtar` to `avatar`
        type: String,
        default:'https://img.freepik.com/free-vector/cool-beard-man-barber-head-with-glasses-cartoon-vector-icon-illustration-people-barber-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3960.jpg?size=626&ext=jpg',
    }, 

    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Creator', 'Brand', 'Agency', 'Admin'],  // Fixed `admin` to `Admin` for consistency
        default: 'Creator',
    },
    handle: {
        type: String,
        required: true,   // Fixed typo here from `rewuired` to `required`
        unique: true,
    },
    links: [{
        url: {
            type: String,
        },
        title: {
            type: String,
        },
        icon: {
            type: String,
        },
    }],
    socialMedia: {
        facebook: {
            type: String,
        },
        twitter: {
            type: String,
        },
        instagram: {
            type: String,
        },
        youtube: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        github: {
            type: String,
        },
    },
    // website: { type: String } // Uncomment if needed
}, { collection: 'user-data-linktree' });  // Collection name is fine

const UserModel = model('User', UserSchema);  // Correct model name

module.exports = UserModel;
