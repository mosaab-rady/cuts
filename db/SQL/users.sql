CREATE TABLE users (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(150) NOT NULL UNIQUE,
	password TEXT NOT NULL,
	role VARCHAR(20) DEFAULT 'user',
	CONSTRAINT role_type CHECK (role = 'admin' OR role = 'user')
	created_at DATE DEFAULT now()
);