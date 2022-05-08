CREATE TABLE products (
	id BIGSERIAL PRIMARY  KEY,
	name VARCHAR(50) NOT NULL,
	type VARCHAR(20) NOT NULL,
	CONSTRAINT collection_type_check CHECK (type = 't-shirt' OR type = 'polo' OR type = 'long-sleeve' OR type = 'sweat-shirt' OR type = 'hooded-shirt'),
	fabric VARCHAR(50) NOT NULL REFERENCES fabrics (name), 
	collectionId INTEGER REFERENCES collections (id),
	sizeAndFit TEXT[],
	materialAndCare TEXT[],
	reason TEXT,
	price INTEGER NOT NULL,
	CONSTRAINT price_reliability CHECK (price > 0),
	summary TEXT NOT NULL,
	cut VARCHAR(20) NOT NULL,
	CONSTRAINT cut_enum CHECK (cut = 'classic' OR cut = 'elongated' OR cut = 'split'),
	collar VARCHAR(20) NOT NULL,
	CONSTRAINT collar_enum CHECK (collar = 'crew' OR collar = 'hoodie' OR collar = 'henley' OR collar = 'hooded' OR collar = 'v-neck' OR collar = 'polo'),
	color VARCHAR(20) NOT NULL,
	colorHex VARCHAR(20) NOT NULL,
	smallSize INTEGER DEFAULT 0,
	mediumSize INTEGER DEFAULT 0,
	largeSize INTEGER DEFAULT 0,
	xLargeSize INTEGER DEFAULT 0,
	xxLargeSize INTEGER DEFAULT 0,
	imageCover TEXT NOT NULL,
	imageDetail TEXT NOT NULL,
	images TEXT[],
	ratingsQuantity INTEGER DEFAULT 0,
	ratingsAverage INTEGER DEFAULT 4.5,
	slug VARCHAR(50),
	createdAt DATE DEFAULT now()
);






SELECT products.name, type, imageCover, imageDetail, price, color, cut, collar, collectionId, createdAt, colorHex, slug, fabric, fabrics.stretch, fabrics.antiBilling, fabrics.butterySoft, fabrics.preShrunk, fabrics.wrinkleFree, fabrics.colorAndFitRetention, fabrics.breathable, fabrics.durable, fabrics.lightweight,fabrics.naturalSoftness  FROM products LEFT JOIN fabrics ON fabrics.name = products.fabric;
------
