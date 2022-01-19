CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE wallet_registration
(
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet varchar NOT NULL,
    user_photo_url varchar NOT NULL,
    name varchar NOT NULL,
    phone varchar,
    email varchar,
    lat numeric NOT NULL,
    lon numeric NOT NULL,
    registered_at timestamptz NOT NULL
);
