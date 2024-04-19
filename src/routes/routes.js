const { Router } = require('express')
const Aluno = require('../models/Aluno')
const Curso = require('../models/Curso')
const Professor = require('../models/Professor')

const routes = new Router()

/* ROTA BEM VINDO */

routes.get('/bem_vindo', (req, res) =>{
    res.json({name: 'Bem vindo"'})
})

/* ROTAS PARA ALUNOS */

routes.post('/alunos', async (req,res) => {

    try {
        const nome = req.body.nome
        const data_nascimento = req.body.data_nascimento
        const celular = req.body.celular

        if(!nome) {
            return res.status(400).json({message: 'O nome é necessário'})
        }

        if(!data_nascimento) {
            return res.status(400).json({message: 'A data de nascimento é necessária'})
        }

        if(!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
            return res.status(400).json({ 
                messagem: 'A data de nascimento é não está no formato correto' }) 
        }

        const aluno = await Aluno.create({
            nome: nome,
            data_nascimento: data_nascimento,
            celular: celular
    })

    res.status(201).json(aluno)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: 'Não foi possível adicionar o aluno'})
    }
})

routes.get('/alunos', async (req, res) => {
    const alunos = await Aluno.findAll()
    res.json(alunos)

})

/* ROTAS PARA CURSOS */

routes.post('/cursos', async (req, res) => {

    try {
        const nome = req.body.nome
        const duracao_horas = req.body.duracao_horas

        if(!nome) {
            return res.status(400).json({message: 'O nome é necessário'})
        }

        if(!(duracao_horas >= 40 && duracao_horas <= 200)) {
            return res.status(400).json({message: 'A duração do curso deve ser entre 40 e 200 horas'})
        }

        const curso = await Curso.create({
            nome: nome,
            duracao_horas: duracao_horas
    })

    res.status(201).json(curso)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: 'Não foi possível cadastrar o curso'})
    }    
})

routes.get('/cursos', async (req, res) => {
    let params = {}

    if(req.query.nome)  {
        params = {...params, nome: req.query.nome}
    }

    if(req.query.duracao_horas)  {
        params = {...params, duracao_horas: req.query.duracao_horas}
    }

    const cursos = await Curso.findAll({
        where: params
    })

    res.json(cursos)
})

routes.put('/cursos/:id', async (req, res) => {
    
    try {
        const { id } = req.params

        const curso = await Curso.findByPk(id)

        if(!curso) {
        return res.status(404).json({mensagem: 'Curso não encontrado'})
    }

        const nome = req.body.nome
        const duracao_horas = req.body.duracao_horas

        if(!nome) {
        return res.status(400).json({message: 'O nome é necessário'})
    }

        if(!(duracao_horas >= 40 && duracao_horas <= 200)) {
        return res.status(400).json({message: 'A duração do curso deve ser entre 40 e 200 horas'})
    }

        curso.update(req.body)

        await curso.save()

        res.json(curso)
    
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: 'Não foi possível atualizar o curso'})
    }
      
})

routes.delete('/cursos/:id', async (req, res) => {
    try {
        const { id } = req.params

        const curso = await Curso.findByPk(id)

        if(!curso) {
        return res.status(404).json({mensagem: 'Curso não encontrado'})
    }

    Curso.destroy({
        where: {
            id: id
        }
    })
} catch (error) {
    console.log(error.message)
    res.status(500).json({error: 'Não foi possível deletar o curso'})
}
  
})

/* ROTAS PARA PROFESSORES */

routes.post('/professores', async (req, res) => {

    try {
        const nome = req.body.nome
        const curso = req.body.curso

        if(!nome) {
            return res.status(400).json({message: 'O nome é necessário'})
        }

        if(!curso) {
            return res.status(400).json({message: 'O curso é necessário'})
        }

        const professor = await Professor.create({
            nome: nome,
            curso: curso
    })

    res.status(201).json(professor)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: 'Não foi possível cadastrar o professor'})
    }    
})

routes.get('/professores', async (req, res) => {
    let params = {}

    if(req.query.nome)  {
        params = {...params, nome: req.query.nome}
    }

    if(req.query.curso)  {
        params = {...params, curso: req.query.curso}
    }

    const professores = await Professor.findAll({
        where: params
    })

    res.json(professores)
})

routes.put('/professores/:id', async (req, res) => {
    
    try {
        const { id } = req.params

        const professor = await Professor.findByPk(id)

        if(!professor) {
        return res.status(404).json({mensagem: 'Professor não encontrado'})
    }

        const nome = req.body.nome
        const curso = req.body.curso

        if(!nome) {
        return res.status(400).json({message: 'O nome é necessário'})
    }

        if(!curso) {
        return res.status(400).json({message: 'O curso é necessário'})
    }

        professor.update(req.body)

        await professor.save()

        res.json(professor)
    
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            error: 'Não foi possível atualizar os dados do professor'})
    }
      
})

routes.delete('/professores/:id', async (req, res) => {
    try {
        const { id } = req.params

        const professor = await Curso.findByPk(id)

        if(!professor) {
        return res.status(404).json({mensagem: 'Professor não encontrado'})
    }

    Professor.destroy({
        where: {
            id: id
        }
    })
} catch (error) {
    console.log(error.message)
    res.status(500).json({error: 'Não foi possível deletar o professor'})
}
  
})

module.exports = routes
