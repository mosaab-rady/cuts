CREATE TABLE fabrics (
	name VARCHAR(50) PRIMARY KEY,
	stretch BOOLEAN DEFAULT false,
	anti_billing BOOLEAN DEFAULT false,
	buttery_soft BOOLEAN DEFAULT false,
	pre_shrunk BOOLEAN DEFAULT false,
	wrinkle_free BOOLEAN DEFAULT false,
	color_and_fit_retention BOOLEAN DEFAULT false,
	breathable BOOLEAN DEFAULT false,
	durable BOOLEAN DEFAULT false,
	lightweight BOOLEAN DEFAULT false,
	natural_softness BOOLEAN DEFAULT false
);