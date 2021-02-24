const express = require('express');
      router = express()
      userController = require('../controllers/userController');


router.get('/home', (req, res) => {res.render('../templates/home')})
router.get('/dashboard', (req, res) => {res.render('../templates/dashboard')})
router.get('/list_pedidos', userController.listUsers)
router.get('/insert_pedido', (req, res) => {res.render('../templates/insert_pedido')})

router.get('/edit/:id', userController.loadUser)

router.post('/edit/:id', userController.editUser)

router.post('/insert_pedido', userController.insertUser)

 router.delete('/delete/:id', userController.deleteUser)


  
module.exports = router