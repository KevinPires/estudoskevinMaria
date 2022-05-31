import 'dotenv/config'

import usuarioController from './controller/usuarioController.js';
import filmeController from './controller/filmeController.js';

import express from 'express'
import cors from 'cors'
 
const server= express();
server.use(cors());
server.use(express.json());

//liberar arquivos da storage

// configuraçõs dos endpoints

server.use(usuarioController);
server.use(filmeController);


server.listen(process.env.PORT,()=> console.log (`api conectada na porta ${process.env.PORT}`));
