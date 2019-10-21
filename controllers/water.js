let db = require('../db');
let router = require('express').Router();
let {
	Editor,
	Field,
	Validate,
	Format,
	Options
} = require("datatables.net-editor-server");

router.all('/api/water', async function(req, res) {
	let editor = new Editor(db, 'water').fields(
		new Field('product').validator(Validate.notEmpty()),
		new Field('indexid').validator(Validate.notEmpty()),
		new Field('container'),
		new Field('netweight'),
		new Field('tbefore'),
		new Field('tafter'),
		new Field('duration'),
		new Field('water'),
	);

	await editor.process(req.body);
	res.json(editor.data());
});

module.exports = router;
