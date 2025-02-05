import type { DeleteResult, Insertable, InsertResult } from 'kysely';
import { db } from '../db';
import type { Database } from '../schema';
import type { BaseEntity } from '../types/BaseEntity';

export abstract class BaseRepo<TTableKey extends keyof Database, TTableEntity extends BaseEntity> {
	constructor(protected tableKey: TTableKey) {}

	async getById({ id }: { id: string }): Promise<TTableEntity | null> {
		const result = await db
			.selectFrom(this.tableKey as keyof Database)
			.where('id', '=', id)
			.selectAll()
			.executeTakeFirst();

		// If needed, cast to TEntity, depending on your DB definition:
		return result as TTableEntity | null;
	}

	async getMany({ limit = 100 }: { limit?: number } = {}): Promise<TTableEntity[]> {
		const result = await db
			.selectFrom(this.tableKey as keyof Database)
			.selectAll()
			.limit(limit)
			.execute();

		// If needed, cast to TEntity, depending on your DB definition:
		return result as TTableEntity[];
	}

	async find({ criteria }: { criteria: Partial<TTableEntity> }) {
		// todo
	}

	async delete({ ids }: { ids: string | string[] }): Promise<DeleteResult[]> {
		const result = await db
			.deleteFrom(this.tableKey as keyof Database)
			.where('id', 'in', ids)
			.execute();

		// If needed, cast to TEntity, depending on your DB definition:
		return result;
	}

	async insert({
		data
	}: {
		data: Insertable<TTableEntity> | Insertable<TTableEntity>[];
	}): Promise<InsertResult[]> {
		const result = await db
			.insertInto(this.tableKey as keyof Database)
			.values(data)
			.execute();

		// If needed, cast to TEntity, depending on your DB definition:
		return result;
	}
}
