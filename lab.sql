DROP TABLE IF EXISTS datatables_demo;

CREATE TABLE datatables_demo (
	id		integer primary key,
	product text NOT NULL default '',
	indexid text NOT NULL default '',
	d0   	integer,
	d10     integer,
	d50     integer,
	d90 	integer,
	d99     integer,
	d100    integer
);

INSERT INTO datatables_demo
		( id, product, indexid, d0, d10, d50, d90, d99, d100 )
	VALUES	(1, 'pt100', 'ht-100', 0.1, 0.2, 0.3, 0.4, 0.3, 0.2),
			(2, 'pt101', 'ht-102', 0.1, 0.2, 0.3, 0.2, 0.1, 0.2);

DROP TABLE IF EXISTS head;

CREATE TABLE head (
	id			integer primary key,
	product text default NULL,
	indexid text default NULL
);

INSERT INTO head
		( id, product, indexid)
	VALUES (1, 'demo', 'demo-001');

CREATE TRIGGER [inihead]
AFTER INSERT ON head
BEGIN
    insert into radio values(new.product, new.indexid);
		insert into pressing values(new.product, new.indexid);
		insert into vibratory values(new.product, new.indexid);
		insert into water values(new.product, new.indexid);
		insert into ph values(new.product, new.indexid);
END;

DROP TABLE IF EXISTS summary;

CREATE TABLE summary (
	id integer primary key,
	product text NOT NULL default '',
	indexid text NOT NULL default '',
	d0	integer,
	d10 integer,
	d50 integer,
	d90 integer,
	d99 integer,
	d100 integer,
	radio	integer,
	pressing	integer,
	vibratory integer,
	water	integer,
	ph	integer
);

INSERT INTO summary
		( id, product, indexid, d0, d10, d50, d90, d99, d100, radio, pressing, vibratory, water, ph)
	VALUES (1, 'demo', 'demo-001', 0.1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.3, 0.3, 0.3, 0.3);

DROP TABLE IF EXISTS ratio;

CREATE TABLE ratio (
	id integer primary key,
	product text NOT NULL default '',
	indexid text NOT NULL default '',
	netweight integer,
	ratio integer
);

INSERT INTO ratio
		( id, product, indexid, netweight, ratio)
	VALUES (1, 'demo', 'demo-001', 0.1, 0.1);

DROP TABLE IF EXISTS pressing;

CREATE TABLE pressing (
	id integer primary key,
	product text NOT NULL default '',
	indexid text NOT NULL default '',
	weight	integer,
	depths integer,
	duration integer,
	pa integer,
	pressing integer
);

INSERT INTO pressing
		( id, product, indexid, weight, depths, duration, pa, pressing)
	VALUES (1, 'demo', 'demo-001', 0.1, 0.1, 0.1, 0.1, 0.1);

DROP TABLE IF EXISTS vibratory;

CREATE TABLE vibratory (
	id integer primary key,
	product text NOT NULL default '',
	indexid text NOT NULL default '',
	weight	integer,
	high integer,
	low integer,
	volume integer,
	vibratory integer
);

INSERT INTO vibratory
		( id, product, indexid, weight, high, low, volume, vibratory)
	VALUES (1, 'demo', 'demo-001', 0.1, 0.1, 0.1, 0.1, 0.1);

DROP TABLE IF EXISTS water;

CREATE TABLE water (
	id integer primary key,
	product text NOT NULL default '',
	indexid text NOT NULL default '',
	container	integer,
	netweight integer,
	tbefore integer,
	tafter integer,
	duration integer,
	water integer
);

INSERT INTO water
		( id, product, indexid, container, netweight, tbefore, tafter, duration, water)
	VALUES (1, 'demo', 'demo-001', 0.1, 0.1, 0.1, 0.1, 0.1, 0.1);

DROP TABLE IF EXISTS ph;

CREATE TABLE ph (
	id integer primary key,
	product text NOT NULL default '',
	indexid text NOT NULL default '',
	weight	integer,
	t1 integer,
	t2 integer,
	ph integer
);

INSERT INTO ph
		( id, product, indexid, weight, t1, t2, ph)
	VALUES (1, 'demo', 'demo-001', 0.1, 0.1, 0.1, 0.1);

CREATE TRIGGER [FromRatio]
AFTER UPDATE ON ratio
BEGIN
    update summary set ratio = new.ratio WHERE product = new.product and indexid = new.indexid;
END;

CREATE TRIGGER [FromPressing]
AFTER UPDATE ON pressing
BEGIN
    update summary set pressing = new.pressing WHERE product = new.product and indexid = new.indexid;
END;

CREATE TRIGGER [FromVibratory]
AFTER UPDATE ON vibratory
BEGIN
    update summary set vibratory = new.vibratory WHERE product = new.product and indexid = new.indexid;
END;

CREATE TRIGGER [FromWater]
AFTER UPDATE ON water
BEGIN
    update summary set water = new.water WHERE product = new.product and indexid = new.indexid;
END;

CREATE TRIGGER [FromPh]
AFTER UPDATE ON ph
BEGIN
    update summary set ph = new.ph WHERE product = new.product and indexid = new.indexid;
END;
