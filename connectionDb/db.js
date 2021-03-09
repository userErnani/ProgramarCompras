require('dotenv').config()

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/novoCadastro',
{ useNewUrlParser: true, useUnifiedTopology: true})

// conexão com o banco de dados nas nuvens - caso o BD não exista, ele será criado
// const uri = process.env.SENHABANCO
// mongoose.connect(uri,
// { useNewUrlParser: true, useUnifiedTopology: true})


let dbCadastro = mongoose.connection

      dbCadastro.on('error', ()=> {console.log(error)});
      dbCadastro.once('open', () => {console.log('Conectado ao banco de dados com sucesso !!!');
})

module.exports = dbCadastro