let db = require('../db');
let router = require('express').Router();
let {
	Editor,
	Field,
	Validate,
	Format,
	Options
} = require("datatables.net-editor-server");

router.all('/api/ratio', async function(req, res) {
	let editor = new Editor(db, 'ratio').fields(
		new Field('product').validator(Validate.notEmpty()),
		new Field('indexid').validator(Validate.notEmpty()),
		new Field('netweight'),
		new Field('ratio')
	);

	await editor.process(req.body);
	res.json(editor.data());
});

module.exports = router;
