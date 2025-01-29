import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Select from 'react-select';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState('');
  const [semester, setSemester] = useState(1);
  const [prerequisites, setPrerequisites] = useState([]);
  const [editingSubject, setEditingSubject] = useState(null);
  const [filterSemester, setFilterSemester] = useState('all');
  const [filterCompleted, setFilterCompleted] = useState('all'); // Novo estado para o filtro de conclusão

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await api.get('/subjects');
      setSubjects(response.data);
    } catch (error) {
      console.error('Erro ao buscar matérias:', error);
      alert('Erro ao carregar as matérias.');
    }
  };

  const handleAddOrUpdateSubject = async () => {
    if (!name || semester < 1) {
      alert('Preencha o nome e o semestre corretamente!');
      return;
    }

    const subjectData = {
      name,
      semester,
      prerequisites: prerequisites.map((prereq) => prereq.value),
    };

    try {
      if (editingSubject) {
        const response = await api.put(`/subjects/${editingSubject._id}`, subjectData);
        setSubjects((prevSubjects) =>
          prevSubjects.map((subject) =>
            subject._id === editingSubject._id ? response.data : subject
          )
        );
        setEditingSubject(null);
        alert('Matéria atualizada com sucesso!');
      } else {
        const response = await api.post('/subjects', subjectData);
        setSubjects([...subjects, response.data]);
      }

      setName('');
      setSemester(1);
      setPrerequisites([]);
    } catch (error) {
      console.error('Erro ao adicionar/atualizar matéria:', error);
      alert('Erro ao salvar matéria');
    }
  };

  const handleToggleCompletion = async (subjectId) => {
    try {
      const subject = subjects.find((subj) => subj._id === subjectId);
      if (!subject) return;

      const allPrerequisitesCompleted = subject.prerequisites.every((id) => {
        const prereq = subjects.find((s) => s._id === id);
        return prereq && prereq.completed;
      });

      if (!allPrerequisitesCompleted) {
        alert('Você não pode concluir essa matéria sem ter completado todos os pré-requisitos!');
        return;
      }

      const updatedSubject = { ...subject, completed: !subject.completed };
      await api.put(`/subjects/${subjectId}`, updatedSubject);

      setSubjects((prevSubjects) =>
        prevSubjects.map((subj) =>
          subj._id === subjectId ? { ...subj, completed: !subj.completed } : subj
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar o status de conclusão:', error);
      alert('Erro ao atualizar o status de conclusão');
    }
  };

  const handleVerifySubject = (subject) => {
    const canTake = subject.prerequisites.every((id) => {
      const prereq = subjects.find((s) => s._id === id);
      return prereq && prereq.completed;
    });
    alert(canTake ? 'Você pode cursar essa matéria!' : 'Você ainda não completou os pré-requisitos para essa matéria.');
  };

  const handleDeleteSubject = async (subjectId) => {
    try {
      await api.delete(`/subjects/${subjectId}`);
      setSubjects(subjects.filter((subject) => subject._id !== subjectId));
      alert('Matéria excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir matéria:', error);
      alert('Erro ao excluir matéria');
    }
  };

  return (
    <div className="container">
      <h1>Gerenciar Matérias</h1>

      <div className="form-container">
        <input type="text" placeholder="Nome da Matéria" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Semestre" value={semester} onChange={(e) => setSemester(Number(e.target.value))} />
        <Select
          options={subjects.map((subject) => ({
            value: subject._id,
            label: `${subject.name} (Semestre ${subject.semester})`,
          }))}
          isMulti
          value={prerequisites}
          onChange={(selected) => setPrerequisites(selected || [])}
          placeholder="Selecione os pré-requisitos"
        />
        <button onClick={handleAddOrUpdateSubject}>{editingSubject ? 'Salvar Alterações' : 'Adicionar Matéria'}</button>
      </div>

      <h2>Filtrar por Semestre</h2>
      <select onChange={(e) => setFilterSemester(e.target.value)}>
        <option value="all">Todos</option>
        {[...new Set(subjects.map((s) => s.semester))].map((sem) => (
          <option key={sem} value={sem}>{sem}</option>
        ))}
      </select>

      <h2>Filtrar por Status de Conclusão</h2>
      <select onChange={(e) => setFilterCompleted(e.target.value)}>
        <option value="all">Todos</option>
        <option value="completed">Concluídas</option>
        <option value="notCompleted">Não Concluídas</option>
      </select>

      <h2>Lista de Matérias</h2>
      <div className="subject-list">
        {subjects
          .filter(subject =>
            (filterSemester === 'all' || subject.semester === Number(filterSemester)) &&
            (filterCompleted === 'all' || (filterCompleted === 'completed' && subject.completed) || (filterCompleted === 'notCompleted' && !subject.completed))
          )
          .map((subject) => (
            <div key={subject._id} className={`subject-card ${subject.completed ? 'completed' : ''}`}>
              <h3>{subject.name}</h3>
              <p>Semestre: {subject.semester}</p>
              <p>Pré-requisitos: {subject.prerequisites.map((id) => subjects.find((s) => s._id === id)?.name || 'Desconhecido').join(', ')}</p>
              <div className="buttons-container">
                <button className="delete-btn" onClick={() => handleToggleCompletion(subject._id)}>{subject.completed ? 'Desmarcar' : 'Concluir'}</button>
                <button onClick={() => handleVerifySubject(subject)}>Verificar</button>
                <button onClick={() => handleDeleteSubject(subject._id)}>Excluir</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Subjects;
