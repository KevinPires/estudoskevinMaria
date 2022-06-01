import { Router } from "express";
import { inserirFilme, inserirImagem,listarTodosFilmes } from "../repository/filmeRepository.js";
import  multer  from 'multer' 

const server = Router();

const upload = multer ({ dest: 'storage/capasfilmes'})

server.post('/filme', async (req, resp) =>{
    try{
        const  novoFilme = req.body;


        if (!novoFilme.nome)
            throw new Error('Nome do filme obrigatório!');
        if (!novoFilme.sinopse)
            throw new Error('Sinopse do filme obrigatório');
        if (!novoFilme.avaliacao)
            throw new Error('Avaliação do filme obrigatório');
        if (!novoFilme.lancamento)
            throw new Error('Lancamento do filme obrigatório');
        if (novoFilme.disponivel == undefined)
            throw new Error('Campo disponível é obrigatório');
        if (!novoFilme.usuario)
            throw new Error('Usuário não logado');

       const filmeInserido = await inserirFilme(novoFilme);

       resp.send(filmeInserido);


    } catch (error) {
        resp.status(400).send({
            error: error.message
        })
    }
})


server.put("/filme/:id/capa", upload.single('capa'),async(req,resp) => {
    try{
        const { id } = req.params;
        const {imagem} = req.file.path;

        const resposta= await inserirImagem(imagem , id )
        if (resposta != 1){
        throw new Error('IMAGEM NÃO PODE SER SALVA ')
    }
    resp.status(204).send();
            }catch(err){
                resp.status(400).send
            }
})

server.get('/filme', async(req,resp) =>{
    try{
     const resposta = await listarTodosFilmes();
     resp.send(resposta);
    }catch(err){
        resp.status(400).send({
            erro:err.message
        })
    }
})

export default server;