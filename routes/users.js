const router = require('express').Router();
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
