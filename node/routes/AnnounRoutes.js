import express from 'express'
import { getAllAnnouns, getAnnoun, createReadAnnounStudents, countReadAnnouncementsStudents,createReadAnnounPerson, countReadAnnouncementsPerson } from '../controllers/AnnounController.js'

const router = express.Router()

router.get('/announs', getAllAnnouns);

router.get('/announs/:id', getAnnoun);

router.get('/', getAllAnnouns);

router.get('/:id', getAnnoun);

router.post('/readAnnounceStudent', createReadAnnounStudents)

router.get('/countReadAnnouncementsStudent/:id_student', countReadAnnouncementsStudents)


router.post('/readAnnouncePerson', createReadAnnounPerson)

router.get('/countReadAnnouncementsPerson/:id_person', countReadAnnouncementsPerson)

export default router;