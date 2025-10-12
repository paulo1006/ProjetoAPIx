import express from 'express'
import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

app.post('/estoques', async (req, res) => {
  const estoque = await prisma.estoque.create({
    data: {
      nome: req.body.nome,
      centro: req.body.centro
    }
  })
  res.status(201).json(estoque)
})

app.get('/estoques', async (req, res) => {
  const filtros = {}
  if (req.query.nome) filtros.nome = req.query.nome
  if (req.query.centro) filtros.centro = req.query.centro

  const estoques = await prisma.estoque.findMany({
    where: Object.keys(filtros).length ? filtros : undefined,
    include: { produtos: true }
  })
  res.status(200).json(estoques)
})

app.get('/estoques/:id', async (req, res) => {
  const estoque = await prisma.estoque.findUnique({
    where: { id: req.params.id },
    include: { produtos: true }
  })
  if (!estoque) {
    return res.status(404).json({ error: 'Estoque não encontrado' })
  }
  res.status(200).json(estoque)
})

app.put('/estoques/:id', async (req, res) => {
  const estoque = await prisma.estoque.update({
    where: { id: req.params.id },
    data: {
      nome: req.body.nome,
      centro: req.body.centro
    }
  })
  res.status(200).json(estoque)
})

app.delete('/estoques/:id', async (req, res) => {
  await prisma.estoque.delete({ where: { id: req.params.id } })
  res.status(200).json({ message: 'Estoque deletado com sucesso!' })
})


app.post('/produtos', async (req, res) => {
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

app.get('/produtos', async (req, res) => {
  const filtros = {}
  if (req.query.nome) filtros.nome = req.query.nome
  if (req.query.estoqueId) filtros.estoqueId = req.query.estoqueId

  const produtos = await prisma.produto.findMany({
    where: filtros,
    include: { estoque: true }
  })
  res.status(200).json(produtos)
})

app.get('/produtos/:id', async (req, res) => {
  const produto = await prisma.produto.findUnique({
    where: { id: req.params.id },
    include: { estoque: true }
  })
  if (!produto) {
    return res.status(404).json({ error: 'Produto não encontrado' })
  }
  res.status(200).json(produto)
})

app.put('/produtos/:id', async (req, res) => {
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

app.delete('/produtos/:id', async (req, res) => {
  await prisma.produto.delete({ where: { id: req.params.id } })
  res.status(200).json({ message: 'Produto deletado com sucesso!' })
})

const PORT = 3005
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
