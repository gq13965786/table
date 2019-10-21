let db = require('../db');
let router = require('express').Router();
let {
	Editor,
	Field,
	Validate,
	Format,
	Options
} = require("datatables.net-editor-server");

router.all('/api/table', async function(req, res) {
	let editor = new Editor(db, 'datatables_demo').fields(
		new Field('product').validator(Validate.notEmpty()),
		new Field('indexid').validator(Validate.notEmpty()),
		new Field('d0'),
		new Field('d10'),
		new Field('d50'),
		new Field('d90')
			.validator(Validate.numeric())
			.setFormatter(Format.ifEmpty(null)),
		new Field('d99')
			.validator(Validate.numeric())
			.setFormatter(Format.ifEmpty(null)),
		new Field('d100')
			.validator(Validate.numeric())
			.setFormatter(Format.ifEmpty(null))
	);

	await editor.process(req.body);
	res.json(editor.data());
});

module.exports = router;
