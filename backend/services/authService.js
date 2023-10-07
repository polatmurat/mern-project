const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
};

const createToken = async (user) => {
    return await jwt.sign({ id: user._id, name: user.username }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
};

const comparePassword = async (password, dbPassword) => {
    try {
        return await bcrypt.compare(password, dbPassword);
    } catch (error) {
        throw error;
    }
};

module.exports = { hashedPassword, createToken, comparePassword };