let db = require('../db');
let router = require('express').Router();
let {
	Editor,
	Field,
	Validate,
	Format,
	Options
} = require("datatables.net-editor-server");

router.all('/api/vibratory', async function(req, res) {
	let editor = new Editor(db, 'vibratory').fields(
		new Field('product').validator(Validate.notEmpty()),
		new Field('indexid').validator(Validate.notEmpty()),
		new Field('weight'),
		new Field('high'),
		new Field('low'),
		new Field('volume'),
		new Field('vibratory')
	);

	await editor.process(req.body);
	res.json(editor.data());
});

module.exports = router;
