let db = require('../db');
let router = require('express').Router();
let {
	Editor,
	Field,
	Validate,
	Format,
	Options
} = require("datatables.net-editor-server");

router.all('/api/pressing', async function(req, res) {
	let editor = new Editor(db, 'pressing').fields(
		new Field('product').validator(Validate.notEmpty()),
		new Field('indexid').validator(Validate.notEmpty()),
		new Field('weight'),
		new Field('depths'),
		new Field('duration'),
		new Field('pa'),
		new Field('pressing')
	);

	await editor.process(req.body);
	res.json(editor.data());
});

module.exports = router;
