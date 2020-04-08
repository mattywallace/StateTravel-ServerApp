const express = require('express')
const router = express.Router()

// state route: GET /auth/register
router.get('/', (req, res) => {
    // let messsageToDisplay = req.session.message
    // req.session.message = ''
    res.send('state controller working')

//     {
//         message: messsageToDisplay
//     })
})




module.exports = router