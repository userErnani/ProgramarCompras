require('dotenv').config()

const express = require('express')
      app = express()
      PORT = 3001
      userRouter = require('./routers/userRouter')
      db = require('./connectionDb/db')
      bodyParser = require('body-parser')
      path = require('path')
      methodOverride = require('method-override')

app.use(methodOverride('_method'))
      
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'templates'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/public', express.static('./public'))

app.use('/', express.json(), userRouter)
app.use('/user', express.json(), userRouter)

app.listen(PORT, ()=> {
    console.log(`Trabalhando na porta ${PORT}`);
})


