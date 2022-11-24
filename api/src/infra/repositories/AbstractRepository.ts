import { IRepositoryTransaction } from '@/app/interfaces/repositories/IRepositoryTransaction';
import { Transaction } from 'sequelize/types';
import { IDatabaseAdapter } from '../interfaces/IDatabaseAdapter';

export abstract class AbstractRepository implements IRepositoryTransaction {
	protected databaseAdapter: IDatabaseAdapter;
	protected transaction!: Transaction;

	constructor(databaseAdapter: IDatabaseAdapter) {
		this.databaseAdapter = databaseAdapter;
	}

	setTransaction(transaction: Transaction): void {
		this.transaction = transaction;
	}

	protected checkTransaction(): void {
		if (!this.transaction) {
			throw new Error('transaction is null');
		}
	}
}
