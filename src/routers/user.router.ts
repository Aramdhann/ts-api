import { Router } from 'express';
import {
  createUser,
  getUserByEmail,
  getUsers,
} from '../controllers/user.controller';
import { loginController } from '../controllers/login.controller';

const router: Router = Router();

router.post('/', createUser);

router.get('/', getUsers);
router.get('/byId/:id', getUserByEmail);
router.get('/byEmail/:email', getUserByEmail);

// auth
router.post('/login', loginController);

export default router;
