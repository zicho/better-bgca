import { PersonRepo } from '$lib/server/db/repositories/PersonRepo';
import { describe, expect, it } from 'vitest';

describe('sum test', () => {
	it('adds some shit to the db', async () => {
		const repo = new PersonRepo();

		await repo.insert({
			data: {
				first_name: 'Martin',
				last_name: 'Ström',
				gender: 'other'
			}
		});

		const data = await repo.getMany();

		expect(data.length).toBe(1);
	});
});
