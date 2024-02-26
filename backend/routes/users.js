const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateAvatarProfile,
  getCurrentUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:_id', getUserById);
router.patch('/users/me', updateUserProfile);
router.patch('/users/me/avatar', updateAvatarProfile);

module.exports = router;
