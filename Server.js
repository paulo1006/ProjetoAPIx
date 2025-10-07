import express from 'express'
import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prisma = new PrismaClient()
const app = express()
const depositos = []
app.use(express.json())



app.post('/depositos', async (req,res)=>{
 await prisma.deposito.create({
     data :{
        nome: req.body.nome,
  centro: req.body.centro,
  material: req.body.material
       
    }


})
 
res.status(201).json(req.body)
})

app.get('/depositos', async (req,res)=>{
    let depositos = []
   if(req.query){
    depositos = await prisma.deposito.findMany({
        where:{
            nome:req.query.nome,
            centro:req.query.nome
        }
    }) 
   }else{
const depositos = await prisma.deposito.findMany()
   }

res.status(200).json(depositos)
 
})




app.put('/depositos/:id', async (req,res)=>{
console.log(req)
 await prisma.deposito.update({
  where : {
       id: req.params.id
    },
   data :{
      nome: req.body.nome,
 centro: req.body.centro,
material: req.body.material
       
  }

})
  res.status(201).json(req.body)

})

app.delete('/depositos/:id', async (req, res) => {
  await prisma.deposito.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: 'Usuário deletado com Sucesso!' });
});













app.listen(3005)
