const express = require('express');
const router = express.Router();
const { 
    getAllFriends,
    addFriend,
    removeFriend
} = require('../controllers/friendController');
const auth = require('../middleware/auth');

router.get('/', auth, getAllFriends);
router.post('/', auth, addFriend);
router.delete('/:id', auth, removeFriend);

module.exports = router; 