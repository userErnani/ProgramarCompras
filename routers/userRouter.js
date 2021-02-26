const express = require('express');
const userController = require('../controllers/userController');
      router = express()

router.get('/home', (req, res) => {res.render('../templates/home')})
router.get('/dashboard', (req, res) => {res.render('../templates/dashboard')})
router.get('/list_pedidos', userController.listUsers)

router.get('/insert_pedido', (req, res) => {res.render('../templates/insert_pedido')})
router.post('/insert_pedido', userController.insertUser)

router.get('/edit/:id', userController.loadUser)

router.post('/edit/:id', userController.editUser)


router.delete('/delete/:id', userController.deleteUser)

router.get('/prog', (req, res) => {res.render('../templates/prog_ops')})
router.post('/prog', userController.insertOP)

//(req, res) => {res.render('../templates/dashboard')})


  
module.exports = router