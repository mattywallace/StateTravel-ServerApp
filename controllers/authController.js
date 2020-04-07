const express = require('express')
const router = express.Router()


// registration route: GET /auth/register
router.get('/register', (req, res) => {
res.render('auth/register.ejs')
})



module.exports = router




