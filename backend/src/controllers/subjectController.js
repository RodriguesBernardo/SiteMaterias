const Subject = require('../models/subjectModel');

// Retorna todas as matérias
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ semester: 1 });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cria uma nova matéria
const createSubject = async (req, res) => {
  try {
    const { name, semester, prerequisites } = req.body;

    const newSubject = new Subject({
      name,
      semester,
      prerequisites,
    });

    await newSubject.save();
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Atualiza o status de conclusão de uma matéria
const updateCompletion = async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await Subject.findById(id);
    if (!subject) {
      return res.status(404).json({ error: 'Matéria não encontrada' });
    }

    subject.completed = !subject.completed;
    await subject.save();

    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exclui uma matéria
const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    
    const subject = await Subject.findByIdAndDelete(id);
    if (!subject) {
      return res.status(404).json({ error: 'Matéria não encontrada' });
    }

    res.status(200).json({ message: 'Matéria excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getSubjects, createSubject, updateCompletion, deleteSubject };
