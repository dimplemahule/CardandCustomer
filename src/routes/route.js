const express = require('express');
const router = express.Router();
const customerController = require('../controller/customerController');
const cardController = require('../controller/cardController');
//const midd = require('../middleware/auth')

router.post('/customer', customerController.createCustomer);
router.get('/getdata', customerController.getdata);
router.delete('/customer/:customerID', customerController.deleteCust);


router.post('/card', cardController.createCard)
router.get('/getcard', cardController.getCard)

module.exports = router;