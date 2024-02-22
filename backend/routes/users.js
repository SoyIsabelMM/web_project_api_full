const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateAvatarProfile,
} = require('../controllers/users');
const mongoose = require('mongoose');

router.get('/users', getUsers);
router.get('/users/:_id', getUserById);
router.patch('/users/me', updateUserProfile);
router.patch('/users/me/avatar', updateAvatarProfile);

module.exports = router;
