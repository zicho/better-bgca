import {
	PRIVATE_DB_HOST,
	PRIVATE_DB_NAME,
	PRIVATE_DB_PORT,
	PRIVATE_DB_PW,
	PRIVATE_DB_USER
} from '$env/static/private';
import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';
import type { Database } from './schema';

const { Pool } = pg;

const dialect = new PostgresDialect({
	pool: new Pool({
		database: PRIVATE_DB_NAME,
		host: PRIVATE_DB_HOST,
		user: PRIVATE_DB_USER,
		password: PRIVATE_DB_PW,
		port: Number(PRIVATE_DB_PORT),
		max: 10
	})
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
	dialect
});
