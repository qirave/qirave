import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { postgresConnectionURL } from '.';
import postgres from 'postgres';

migrate(
    drizzle(postgres(postgresConnectionURL, { max: 1 })),
    {
        migrationsFolder: './database/migrations',
        migrationsSchema: './database/schema/*.ts',
    }
);
