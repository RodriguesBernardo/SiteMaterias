# 📚 Site de Gerenciamento de Matérias

Este é um sistema para gerenciamento de matérias acadêmicas, permitindo cadastrar, listar, verificar pré-requisitos, marcar matérias como concluídas e excluí-las.

## 🚀 Funcionalidades
- Adicionar novas matérias com semestre e pré-requisitos.
- Listar todas as matérias cadastradas.
- Filtrar matérias por semestre.
- Verificar se os pré-requisitos foram concluídos.
- Marcar matérias como concluídas ou não concluídas.
- Excluir matérias do sistema.

## 🛠️ Tecnologias Utilizadas
- **Frontend:** React, React-Select
- **Backend:** Node.js, Express
- **Banco de Dados:** MongoDB

### Configuração do Backend
```sh
cd backend
npm install
npm start
```

### Configuração do Frontend
```sh
cd frontend
npm install
npm start
```

O frontend estará disponível em [`http://localhost:3000`](http://localhost:3000) e o backend em [`http://localhost:5000`](http://localhost:5000).

## 📌 Endpoints da API
- `GET /subjects` → Lista todas as matérias.
- `POST /subjects` → Adiciona uma nova matéria.
- `PUT /subjects/:id` → Atualiza uma matéria.
- `DELETE /subjects/:id` → Remove uma matéria.


## 📄 Licença
Este projeto é de uso livre. Sinta-se à vontade para contribuir e modificar conforme necessário! 🎓

