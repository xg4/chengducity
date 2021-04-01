import express from 'express';
import {
  houseController,
  messageController,
  userController,
} from './controllers';

export const router = express.Router();

router.post('/push', messageController.push);

router.get('/users', userController.users);

router.post('/pull', houseController.pull);

router.get('/houses', houseController.all);

router.get('/years', houseController.years);

router.get('/year/:year', houseController.year);
