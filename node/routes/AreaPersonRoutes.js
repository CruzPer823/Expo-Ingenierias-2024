import express from 'express';
import { registerAreaPerson,getAreaPerson,updateAreaPerson} from '../controllers/AreaPersonControllers.js';

const router = express.Router();

router.post('/register', registerAreaPerson);

router.get('/getArea/:id_person',getAreaPerson);

router.put('/update', updateAreaPerson);
export default router;
