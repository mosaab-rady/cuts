CREATE TABLE fabrics (
	name VARCHAR(50) PRIMARY KEY,
	stretch BOOLEAN DEFAULT false,
	antiBilling BOOLEAN DEFAULT false,
	butterySoft BOOLEAN DEFAULT false,
	preShrunk BOOLEAN DEFAULT false,
	wrinkleFree BOOLEAN DEFAULT false,
	colorAndFitRetention BOOLEAN DEFAULT false,
	breathable BOOLEAN DEFAULT false,
	durable BOOLEAN DEFAULT false,
	lightweight BOOLEAN DEFAULT false,
	naturalSoftness BOOLEAN DEFAULT false
);