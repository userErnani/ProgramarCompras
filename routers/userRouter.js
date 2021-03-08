const express = require('express');
const userController = require('../controllers/userController');
      router = express()

//router.get('/home', (req, res) => {res.render('../templates/home')})
router.get('/dashboard', (req, res) => {res.render('../templates/dashboard')})

router.get('/list_pedidos', userController.listUsers)
router.get('/list_ops', userController.listOps)


router.get('/insert_pedido', (req, res) => {res.render('../templates/insert_pedido')})
router.post('/insert_pedido', userController.insertPedido)

router.get('/edit/:id', userController.loadUser)
router.post('/edit/:id', userController.editUser)


router.delete('/delete/:id', userController.deleteUser)
router.delete('/deleteop/:id', userController.deleteOP)

router.get('/insert_op', (req, res) => {res.render('../templates/insert_op')})
router.post('/insert_op', userController.insertOP)

router.post('/teste', userController.insertOP)


 
module.exports = router