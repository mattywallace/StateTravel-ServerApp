const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


// registration route: GET /auth/register
router.get('/register', (req, res) => {
    let messsageToDisplay = req.session.message
    req.session.message = ''
    res.render('auth/register.ejs', {
        message: messsageToDisplay
    })
})

// registration route: POST /register
router.post('/register', async (req, res, next) => {
    try {
        console.log(req.body);
        const desiredUsername = req.body.user
        const desiredPasssword = req.body.password
        const desiredEmailAddress = req.body.emailAddress
        const userWithThisEmailAddress = await User.findOne({
            emailAddress: desiredEmailAddress
        })
        const userWithThisUsername = await User.findOne({
            user: desiredUsername
        })
        console.log(userWithThisUsername);
        if (userWithThisUsername) { 
            console.log('username exists');
            req.session.message = `Username ${desiredUsername} already exists`
            res.redirect('/auth/register')
        } else if (userWithThisEmailAddress) {
            console.log('email exists');
            req.session.message = `An account with the email ${desiredEmailAddress} is already in use`
            res.redirect('/auth/register')
        } else {
            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(desiredPasssword, salt)
            const createdUser = await User.create({
                user: desiredUsername,
                password: hashedPassword,
                emailAddress: desiredEmailAddress
            })
            req.session.loggedIn = true
            req.session.userId = createdUser._id
            req.session.user = createdUser.user
            req.session.message = `Thank you for registering ${createdUser.user}`
            res.redirect('/')
        }
    } catch (err) {
        next(err)
    }
})


// login route: GET /login
router.get('/login', (req, res) => {
    let message = req.session.message
    req.session.message = undefined
    res.render('auth/login.ejs', {
        message: message
    })
})



// login route: POST /login
router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({
            user: req.body.user
        })
        if (!user) {
            console.log('bad username');
            req.session.message = "Invalid username or password"
            res.redirect('/auth/login')
        } else {
            const loginInfoIsValid = bcrypt.compareSync(req.body.password, user.password)
            if (loginInfoIsValid) {
                req.session.loggedIn = true
                req.session.userId = user._id
                req.session.user = user.user
                req.session.message = `Welcome back, ${user.user}!`
                res.redirect('/')
            } else {
                console.log('bad password');
                req.session.message = 'Invalid username or password'
                res.redirect('/auth/login')
            }
        }
    } catch (err) {
        next(err)
    }
})

// logout route GET /auth/login
router.get('/logout', async	(req, res) => {
	await req.session.destroy()
	res.redirect('/auth/login')
})




module.exports = router




