import { DataSourceOptions } from 'typeorm';
import { InstrumentThicker } from 'src/instrument-thicker/entities/instrument-thicker.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';

const config: DataSourceOptions = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "ahghem7U",
    "database": "stock_quotes",
    "entities": [
        InstrumentThicker,
        Transaction
    ],
    "synchronize": true,
}
export default config;