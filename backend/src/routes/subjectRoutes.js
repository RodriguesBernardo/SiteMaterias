const express = require('express');
const SubjectController = require('../controllers/subjectController');

const router = express.Router();

router.get('/subjects', SubjectController.getSubjects);
router.post('/subjects', SubjectController.createSubject);
router.delete('/subjects/:id', SubjectController.deleteSubject); // Nova rota para excluir matéria

module.exports = router;
