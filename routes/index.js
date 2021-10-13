let express = require('express');
let router = express.Router();

const articles = require('../controller/index');

router.get('/', articles.getAll);
router.post('/', articles.createOne);
router.get('/:id', articles.getById);
router.put('/:id', articles.updateById);
router.delete('/:id', articles.deleteById);


module.exports = router;
