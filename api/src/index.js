import 'dotenv/config'

import usuarioController from './controller/usuarioController.js';

import express from 'express'
import cors from 'cors'
 
const server= express();
server.use(cors());
server.use(express.json());


// configuraçõs dos endpoints

server.use(usuarioController);


server.listen(process.env.PORT,()=> console.log (`api conectada na porta ${process.env.PORT}`));
