import { PRIVATE_DB_ADMIN_CONNECTION_STRING, PRIVATE_DB_NAME } from '$env/static/private';
import { migrateToLatest } from '$lib/server/db/migrate';
import { Client } from 'pg';

export async function setup() {
	console.log('Running global setup...');
	const adminClient = new Client({ connectionString: PRIVATE_DB_ADMIN_CONNECTION_STRING });

	try {
		await adminClient.connect();
		await adminClient.query(`CREATE DATABASE ${PRIVATE_DB_NAME}`);

		console.log(`Database ${PRIVATE_DB_NAME} created.`);
		console.log(`Applying migrations`);
		await migrateToLatest();
	} catch (error) {
		console.error('Error creating test database:', error);
	} finally {
		await adminClient.end();
	}
}

export async function teardown() {
	console.log('Running global teardown...');
	const adminClient = new Client({ connectionString: PRIVATE_DB_ADMIN_CONNECTION_STRING });
	await adminClient.connect();
	try {
		await adminClient.query(`DROP DATABASE IF EXISTS ${PRIVATE_DB_NAME} WITH (FORCE);`);
		console.log(`Database ${PRIVATE_DB_NAME} dropped.`);
	} catch (error) {
		console.error('Error dropping test database:', error);
	}

	await adminClient.end();
}
