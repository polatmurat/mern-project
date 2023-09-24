const { validationResult } = require('express-validator')
const connect = require('../config/db')
const User = require('../models/User')
const { comparePassword, createToken, hashedPassword } = require('../services/authService')

const register = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const { name, email, username, password } = req.body;
        try {
            const client = await connect();

            const userCollection = client.db('instagram').collection('user');

            const emailExist = await UserCollection.findOne({ email });

            const usernameExist = await UserCollection.findOne({ username });

            if (emailExist) return res.status(400).json({ errors: [{ msg: `${email} is already taken.`, path: 'email' }] });
            if (usernameExist) return res.status(400).json({ errors: [{ msg: `${username} is already taken.`, path: 'username' }] });

            const cryptedPassword = await hashedPassword(password);

            const user = new User(name, email, cryptedPassword, false);

            await userCollection.insertOne(user);

            const token = createToken(user);

            return res.status(201).json({ msg: 'User registered succesfully.', token: token })

        } catch (error) {
            console.log(error.message);
            return res.status(500).json("Internal server error!");
        }
    } else {
        return res.status(400).json({ errors: errors.array() });
    }
};

const login = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const { username, password } = req.body;

        try {

            const client = await connect();

            const userCollection = client.db('instagram').collection('user');

            const user = await userCollection.findOne({ username: username });

            if (user) {
                if (await comparePassword(password, user.password)) {
                    const token = await createToken(user);

                    if (user.admin) {
                        return res.status(201).json({ token: token, admin: true });
                    } else {
                        return res.status(201).json({ token: token, admin: false });
                    }
                } else {
                    return res.status(400).json({ errors: [{ 'msg': 'Password not matched, login failure!', path: 'password' }] })
                }
            } else {
                res.status(400).json({ errors: [{ 'msg': `${username} is not found!`, path: 'username' }] })
            }

        } catch (error) {
            console.log(error.message);
            res.status(500).json('Internal server error!')
        }

    } else {
        return res.status(400).json({ errors: errors.array() });
    }

}

module.exports = { login, register };