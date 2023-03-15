CREATE TABLE instrument_thickers (
    instrument_id BIGSERIAL NOT NULL PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE transactions (
    transaction_id BIGSERIAL NOT NULL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL,
    instrument_id BIGINT NOT NULL REFERENCES instrument_thickers(instrument_id),
    price NUMERIC(15, 2) NOT NULL CHECK (price >= 0)
);

CREATE INDEX CONCURRENTLY symbol_index ON instrument_thickers USING HASH(symbol);