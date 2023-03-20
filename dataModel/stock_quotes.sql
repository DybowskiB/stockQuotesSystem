CREATE DATABASE stock_quotes;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE instrument_thickers (
    instrument_thicker_id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    symbol VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE transactions (
    transaction_id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMPTZ NOT NULL,
    instrument_id UUID NOT NULL REFERENCES instrument_thickers(instrument_thicker_id),
    price NUMERIC(15, 2) NOT NULL CHECK (price >= 0)
);

CREATE INDEX CONCURRENTLY symbol_hash_index ON instrument_thickers USING HASH(symbol);