const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateAvatarProfile,
  getCurrentUser,
} = require('../controllers/users');

//validator celebrate
const { celebrate } = require('celebrate');

const {
  updateProfileValidator,
  updateAvatarValidator,
} = require('../models/validationSchemas');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:_id', getUserById);
router.patch(
  '/users/me',
  celebrate({ body: updateProfileValidator }),
  updateUserProfile,
);
router.patch(
  '/users/me/avatar',
  celebrate({ body: updateAvatarValidator }),
  updateAvatarProfile,
);

module.exports = router;
