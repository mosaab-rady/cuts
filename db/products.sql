CREATE TABLE products (
	id BIGSERIAL PRIMARY  KEY,
	name VARCHAR(50) NOT NULL,
	type VARCHAR(20) NOT NULL,
	CONSTRAINT collection_type_check CHECK (type = 't-shirt' OR type = 'polo' OR type = 'long-sleeve' OR type = 'sweat-shirt' OR type = 'hooded-shirt'),
	fabric VARCHAR(50) NOT NULL REFERENCES fabrics (name), 
	collection_name VARCHAR(30) REFERENCES collections (name),
	size_and_fit TEXT[],
	material_and_care TEXT[],
	reason TEXT,
	price NUMERIC NOT NULL,
	CONSTRAINT price_reliability CHECK (price > 0),
	summary TEXT NOT NULL,
	cut VARCHAR(20) NOT NULL,
	CONSTRAINT cut_enum CHECK (cut = 'classic' OR cut = 'elongated' OR cut = 'split'),
	collar VARCHAR(20) NOT NULL,
	CONSTRAINT collar_enum CHECK (collar = 'crew' OR collar = 'hoodie' OR collar = 'henley' OR collar = 'hooded' OR collar = 'v-neck' OR collar = 'polo'),
	color VARCHAR(20) NOT NULL,
	color_hex VARCHAR(20) NOT NULL,
	small_size INTEGER DEFAULT 0,
	medium_size INTEGER DEFAULT 0,
	large_size INTEGER DEFAULT 0,
	x_large_size INTEGER DEFAULT 0,
	xx_large_size INTEGER DEFAULT 0,
	image_cover TEXT NOT NULL,
	image_detail TEXT NOT NULL,
	images TEXT[],
	ratings_quantity INTEGER DEFAULT 0,
	ratings_average NUMERIC DEFAULT 4.5,
	slug VARCHAR(50),
	created_at DATE DEFAULT now()
);






SELECT products.name, type, imageCover, imageDetail, price, color, cut, collar, collectionId, createdAt, colorHex, slug, fabric, fabrics.stretch, fabrics.antiBilling, fabrics.butterySoft, fabrics.preShrunk, fabrics.wrinkleFree, fabrics.colorAndFitRetention, fabrics.breathable, fabrics.durable, fabrics.lightweight,fabrics.naturalSoftness  FROM products LEFT JOIN fabrics ON fabrics.name = products.fabric;
------
