let db = require('../db');
let router = require('express').Router();
let {
	Editor,
	Field,
	Validate,
	Format,
	Options
} = require("datatables.net-editor-server");

router.all('/api/heading', async function(req, res) {
	let editor = new Editor(db, 'head').fields(
		new Field('product').validator(Validate.notEmpty()),
		new Field('indexid').validator(Validate.notEmpty())
	);

	await editor.process(req.body);
	res.json(editor.data());
});

module.exports = router;
