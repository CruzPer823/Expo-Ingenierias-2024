// routes/userRoutes.js
import express from 'express';
import { getUsers, updateUser, getUserById, updateUserRole, getUsersDoughnutChartData, toggleUserActiveStatus} from '../controllers/UserController.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/getUsersDoughnut/ChartData', getUsersDoughnutChartData)

router.put('/:id', updateUser);
router.put('/:userId/updateRole', updateUserRole);

router.patch('/toggleActiveStatus/:id', toggleUserActiveStatus)

// router.post('/:id', updatePersonId);
// router.delete('/:id', deletePerson);

export default router;
