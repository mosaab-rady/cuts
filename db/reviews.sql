CREATE TABLE reviews (
	id BIGSERIAL PRIMARY KEY,
	product BIGSERIAL NOT NULL REFERENCES products (id),
	user_id BIGSERIAL NOT NULL REFERENCES users (id),
	review TEXT NOT NULL,
	title VARCHAR(150) NOT NULL,
	score INTEGER NOT NULL,
	CONSTRAINT score_range CHECK (score >= 1 AND score <= 5),
	fit VARCHAR(20),
	CONSTRAINT fit_enum CHECK (fit = 'small' OR fit = 'trim' OR fit = 'perfect' OR fit = 'loose' OR fit = 'large'),
	bodyType VARCHAR(20),
	CONSTRAINT bodyType_enum CHECK (bodyType = 'slim' OR bodyType = 'athletic' OR bodyType = 'muscular' OR bodyType = 'curvy'),
	size VARCHAR(5),
	tall VARCHAR(50),
	CONSTRAINT tall_enum CHECK (tall = '<5ft 10in' OR fit = '5ft 10in - 6ft 0in' OR fit = '6ft 1in - 6ft 3in' OR fit = '>6ft 3in'),
	createdAt DATE DEFAULT now()
	);