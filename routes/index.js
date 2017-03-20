const express = require('express');
const router = express.Router();

const db = require('../queries');


router.get('/dotos', db.getAllDotos);
router.post('/dotos', db.createTodo);
router.put('/dotos/:id', db.updateTodo);
router.delete('/dotos/:id', db.deleteTodo);

module.exports = router;
