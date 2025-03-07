// Assuming you have the following imports
import type { PetTable } from '../schema';
import { BaseRepo } from './BaseRepo'; // Adjust the import path as necessary

export class PetRepo extends BaseRepo<'pet', PetTable> {
	constructor() {
		super('pet'); // Pass the table key to the BaseRepo constructor
	}
}
