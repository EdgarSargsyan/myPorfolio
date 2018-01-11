const db = require('../db.js');
const getHash = require('../getPasswordHash.js');
const UsersSchema = new db.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        match: [/^[a-zA-Z ]+/, 'Invalid name']
    },
    surname: {
        type: String,
        required: [true, 'Surname is required'],
        match: [/^[a-zA-Z ]+/, 'Invalid surname']
    },
    email: {
        type: String,
        lowercase: true,
        unique: [true, 'This email is already registered'],
        required: [true, 'Email is required'],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enem: ['male', 'female']
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    cerated: {
        type:Date,
        default:Date.now()
    }
});
UsersSchema.virtual('password')
    .set(function (pass) {
        let salt = Math.random().toString();
        this.salt = salt;
        this.hash = this.getHashPass(pass, salt);
    })
    .get(function () {
        return this.hash;
    });

UsersSchema.methods.getHashPass = getHash;

UsersSchema.methods.checkPassword = function(pass){
    return this.getHashPass(pass, this.salt) === this.hash;
}
const users = db.model('user', UsersSchema);

module.exports = users;