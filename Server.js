import 'dotenv/config'
import express from 'express'
import pkg from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const { PrismaClient } = pkg
const prisma = new PrismaClient()
const app = express()
app.use(express.json())

app.post('/usuarios', async(req,res)=>{
  try{
    const{nome, email, senha} = req.body
    
    const senhaHash = await bcrypt.hash(senha,10)
    
    const novoUsuario = await prisma.usuario.create({
      data: {nome,email,senha: senhaHash}
    })

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!!', usuario: novoUsuario})
  
  } catch(error){

    res.status(500).json({ error: 'Erro ao cadastrar novo usuário!!'})

  }
})

app.post('/login', async(req,res) => {
    try{
      const{ email, senha} = req.body
      
      const usuario = await prisma.usuario.findUnique ({where: {email} })
      if(!usuario) return res.status(404).json({ error: 'Usuário não encontrado!!'})

      const senhaValida = await bcrypt.compare(senha, usuario.senha)
      if(!senhaValida) return res.status(401).json({ error: 'Senha Incorreta!!'})


      const token = jwt.sign(
        {id: usuario.id, nome: usuario.nome, email: usuario.email},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN }
      )

      res.status(200).json({ message: 'Login bem sucedido!!', token})

    } catch(error){
      res.status(500).json({ error: 'Erro ao fazer o login'})
    }
})

function autenticarToken(req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if(!token) return res.status(401).json({ error: 'Token ausente'})

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if(err) return res.status(403).json({error: 'Token inválido ou Token expirado!!'})
    req.usuario = usuario
    next()
  })
}


app.post('/estoques',autenticarToken ,async (req, res) => {
  const estoque = await prisma.estoque.create({
    data: {
      nome: req.body.nome,
      centro: req.body.centro
    }
  })
  res.status(201).json(estoque)
})

app.get('/estoques',autenticarToken, async (req, res) => {
  const filtros = {}
  if (req.query.nome) filtros.nome = req.query.nome
  if (req.query.centro) filtros.centro = req.query.centro

  const estoques = await prisma.estoque.findMany({
    where: Object.keys(filtros).length ? filtros : undefined,
    include: { produtos: true }
  })
  res.status(200).json(estoques)
})

app.get('/estoques/:id', autenticarToken,async (req, res) => {
  const estoque = await prisma.estoque.findUnique({
    where: { id: req.params.id },
    include: { produtos: true }
  })
  if (!estoque) {
    return res.status(404).json({ error: 'Estoque não encontrado' })
  }
  res.status(200).json(estoque)
})

app.put('/estoques/:id', autenticarToken,async (req, res) => {
  const estoque = await prisma.estoque.update({
    where: { id: req.params.id },
    data: {
      nome: req.body.nome,
      centro: req.body.centro
    }
  })
  res.status(200).json(estoque)
})

app.delete('/estoques/:id', autenticarToken,async (req, res) => {
  await prisma.estoque.delete({ where: { id: req.params.id } })
  res.status(200).json({ message: 'Estoque deletado com sucesso!' })
})


app.post('/produtos',autenticarToken, async (req, res) => {
  const produto = await prisma.produto.create({
    data: {
      nome: req.body.nome,
      descricao: req.body.descricao,
      quantidade: req.body.quantidade,
      estoqueId: req.body.estoqueId
    }
  })
  res.status(201).json(produto)
})

app.get('/produtos',autenticarToken, async (req, res) => {
  const filtros = {}
  if (req.query.nome) filtros.nome = req.query.nome
  if (req.query.estoqueId) filtros.estoqueId = req.query.estoqueId

  const produtos = await prisma.produto.findMany({
    where: filtros,
    include: { estoque: true }
  })
  res.status(200).json(produtos)
})

app.get('/produtos/:id',autenticarToken, async (req, res) => {
  const produto = await prisma.produto.findUnique({
    where: { id: req.params.id },
    include: { estoque: true }
  })
  if (!produto) {
    return res.status(404).json({ error: 'Produto não encontrado' })
  }
  res.status(200).json(produto)
})

app.put('/produtos/:id',autenticarToken,async (req, res) => {
  const produto = await prisma.produto.update({
    where: { id: req.params.id },
    data: {
      nome: req.body.nome,
      descricao: req.body.descricao,
      quantidade: req.body.quantidade,
      estoqueId: req.body.estoqueId
    }
  })
  res.status(200).json(produto)
})

app.delete('/produtos/:id',autenticarToken,async (req, res) => {
  await prisma.produto.delete({ where: { id: req.params.id } })
  res.status(200).json({ message: 'Produto deletado com sucesso!' })
})

const PORT = 3005
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
