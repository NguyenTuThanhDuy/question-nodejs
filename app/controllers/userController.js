const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secretKey = 'tHj$1$m`/$3creT|<3y';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Forbidden error' });
      }
  
      req.user = user;
      next();
    });
  }

const getUsers = async (req, res) => {
    try {
      const users = await User.find().select(['-password', '-isAdmin']);
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

const createUser = async (req, res) => {
  const { fullname, email, password, username } = req.body;

  try {
    const newUser = new User({ fullname, email, password, username });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email: email, password: password})
        if (user) {
            const payload = {
                id: user.id,
                email: user.email
            }
            const token = jwt.sign(payload, secretKey);
            res.status(200).json({ message: 'Login successfully', access_token: token })
        } else {
            res.status(400).json({ error: 'Invalid email/password'})
        }
    } catch (error) {
        console.error('Error login', error);
        res.status(500).json({ error: 'Internal server error'});
    }
}

const updateUser = async (req, res) => {
    const { email } = req.body;
    try {
        await User.updateOne({email: email}, {isActive: false})
        res.status(200).json({ message: 'Update user status successfully'});
    } catch (error) {
        res.status(500).json({ error: 'Internal server error'});
    }
}
  
module.exports = { createUser, getUsers, login, updateUser, authenticateToken };