CREATE TABLE collections (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(30) NOT NULL UNIQUE,
	image_hero TEXT,
	image_cover TEXT NOT NULL ,
	image_detail TEXT,
	image_overview TEXT,
	image TEXT,
	created_at DATE DEFAULT now(),
	mode  VARCHAR(10)  DEFAULT 'none' ,
	slug VARCHAR(50),
	CONSTRAINT mode_type CHECK (mode = 'main' OR mode = 'first' OR mode = 'socend' OR mode = 'third' Or mode = 'none')
);