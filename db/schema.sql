DROP DATABASE IF EXISTS restaurant_review_hub;
CREATE DATABASE restaurant_review_hub;

-- \c restaurant_review_hub;

-- DROP TABLE IF EXISTS reviews;
-- DROP TABLE IF EXISTS restaurants;
-- DROP TABLE IF EXISTS users;

-- CREATE TABLE restaurants (
--     location_id VARCHAR(255) PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     address VARCHAR(255),
--     email VARCHAR(255),
--     phone VARCHAR(255),
--     website VARCHAR(255),
--     price_level VARCHAR(10),
--     hours VARCHAR(255),
--     photos TEXT[]
-- );

-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL UNIQUE,
--     password VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE reviews (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER NOT NULL REFERENCES users(id),
--     restaurant_id VARCHAR(255) NOT NULL REFERENCES restaurants(location_id),
--     rating INTEGER NOT NULL,
--     review TEXT,
--     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--     updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );