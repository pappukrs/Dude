const User = require('../models/User');

const getAllFriends = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('friends', 'username email');
        res.json(user.friends);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const addFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        
        const user = await User.findById(req.user.id);
        const friend = await User.findById(friendId);

        if (!friend) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.friends.includes(friendId)) {
            return res.status(400).json({ message: 'Already friends' });
        }

        user.friends.push(friendId);
        friend.friends.push(req.user.id);

        await user.save();
        await friend.save();

        res.json({ message: 'Friend added successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const removeFriend = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const friendId = req.params.id;
        const friend = await User.findById(friendId);

        if (!friend) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.friends = user.friends.filter(id => id.toString() !== friendId);
        friend.friends = friend.friends.filter(id => id.toString() !== req.user.id);

        await user.save();
        await friend.save();

        res.json({ message: 'Friend removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getAllFriends,
    addFriend,
    removeFriend
}; 