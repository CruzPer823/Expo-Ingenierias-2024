import express from 'express';
import { registerAreaPerson,getAreaPerson} from '../controllers/AreaPersonControllers.js  ';

const router = express.Router();

router.post('/register', registerAreaPerson);

router.get('/getArea/:id_person',getAreaPerson);

export default router;
