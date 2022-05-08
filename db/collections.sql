CREATE TABLE collections (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(30) NOT NULL UNIQUE,
	imageHero TEXT,
	imageCover TEXT NOT NULL ,
	imageDetail TEXT,
	imageOverview TEXT,
	image TEXT,
	createdAt DATE DEFAULT now(),
	mode  VARCHAR(10)  DEFAULT 'none' ,
	slug VARCHAR(50),
	CONSTRAINT mode_type CHECK (mode = 'main' OR mode = 'first' OR mode = 'socend' OR mode = 'third' Or mode = 'none')
);



