import express from 'express';
import { houseController } from './controllers';

export const router = express.Router();

router.post('/pull', houseController.pull);

router.get('/year/:year', houseController.year);
