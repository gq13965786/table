let db = require('../db');
let router = require('express').Router();
let {
	Editor,
	Field,
	Validate,
	Format,
	Options
} = require("datatables.net-editor-server");

router.all('/api/ph', async function(req, res) {
	let editor = new Editor(db, 'ph').fields(
		new Field('product').validator(Validate.notEmpty()),
		new Field('indexid').validator(Validate.notEmpty()),
		new Field('weight'),
		new Field('t1'),
		new Field('t2'),
		new Field('ph'),
	);

	await editor.process(req.body);
	res.json(editor.data());
});

module.exports = router;
