let db = require('../db');
let router = require('express').Router();
let {
	Editor,
	Field,
	Validate,
	Format,
	Options
} = require("datatables.net-editor-server");

router.all('/api/summary', async function(req, res) {
	let editor = new Editor(db, 'summary').fields(
		new Field('product').validator(Validate.notEmpty()),
		new Field('indexid').validator(Validate.notEmpty()),
		new Field('d0')
    .validator(Validate.numeric())
    .setFormatter(Format.ifEmpty(null)),
		new Field('d10')
    .validator(Validate.numeric())
    .setFormatter(Format.ifEmpty(null)),
		new Field('d50')
    .validator(Validate.numeric())
    .setFormatter(Format.ifEmpty(null)),
		new Field('d90')
			.validator(Validate.numeric())
			.setFormatter(Format.ifEmpty(null)),
		new Field('d99')
			.validator(Validate.numeric())
			.setFormatter(Format.ifEmpty(null)),
		new Field('d100')
			.validator(Validate.numeric())
			.setFormatter(Format.ifEmpty(null)),
    new Field('radio')
  		.validator(Validate.numeric())
  		.setFormatter(Format.ifEmpty(null)),
    new Field('pressing')
    	.validator(Validate.numeric())
    	.setFormatter(Format.ifEmpty(null)),
    new Field('vibratory')
    	.validator(Validate.numeric())
      .setFormatter(Format.ifEmpty(null)),
    new Field('water')
    	.validator(Validate.numeric())
    	.setFormatter(Format.ifEmpty(null)),
    new Field('ph')
    	.validator(Validate.numeric())
    	.setFormatter(Format.ifEmpty(null))
	);

	await editor.process(req.body);
	res.json(editor.data());
});

module.exports = router;
