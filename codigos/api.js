const express = require('express')
const app = express()
const rota = 3000
const {User} = require('../models')

app.use(express.json());

app.post('/usuario', async (req,res)=>{
    try{
        const usuario = await User.create(req.body)
        res.status(201).json(usuario)
    }catch(error){
        console.log(error)
        res.status(400).json({error:error.message})
    }
})

app.get('/usuario/:id', async (req,res)=>{
    try{
        const {id} = req.params
        const usuarios = await User.findByPk(id)
        res.status(200).json(usuarios)
        if(!usuarios){
            return res.status(404).json({error: "Usuário não encontrado"})
        }
    }catch(error){
        console.log(error)
        res.status(400).json({error:error.message})
    }
})

app.delete('/usuario/:id', async (req,res)=>{

    try{
        const {id} = req.params
        const usuario = await User.destroy({where: {id}})
        if(!usuario){
            return res.status(404).json({error: "Usuário não encontrado"})
        }
        res.status(204).send()
    }catch(error){
        console.log(error)
        res.status(400).json({error:error.message})
    }

})

app.put('/usuario/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { firstName, Username, email, password } = req.body;

    const [updated] = await User.update(
      { firstName, Username, email, password },
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const usuarioAtualizado = await User.findByPk(id);
    res.status(200).json(usuarioAtualizado);

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});


app.listen(rota, ()=>{
    console.log("api 2 rodando")
})