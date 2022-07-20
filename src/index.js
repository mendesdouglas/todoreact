//carregando o express
const express = require('express');
const cors = require('cors');
const TaskController = require('./controller/TaskController');

//inicializando o express
const server = express();


server.use(cors());
server.use(express.json());


const TaskRoutes = require('./routes/TaskRoutes');
server.use('/task', TaskRoutes);


//ficar escutando na porta 3333
port = 3211
server.listen(port, () =>{
console.log('API ONLINE PORTA: ',port );

});