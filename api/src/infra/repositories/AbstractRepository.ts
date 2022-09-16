import { IRepositoryTransaction } from '@/app/interfaces/repositories/IRepositoryTransaction';
import { Transaction } from 'sequelize/types';
import { IDatabaseAdapter } from '../interfaces/IDatabaseAdapter';
import { ModelAlias } from '../interfaces/ModelAlias';
import { IRepositoryIncludes } from '../interfaces/repositories/IRepositoryIncludes';

export abstract class AbstractRepository<TRepository>
	implements IRepositoryTransaction, IRepositoryIncludes<TRepository>
{
	protected databaseAdapter: IDatabaseAdapter;
	protected transaction!: Transaction;
	protected includes: ModelAlias[] = [];

	constructor(databaseAdapter: IDatabaseAdapter) {
		this.databaseAdapter = databaseAdapter;
	}

	addInclude(modelAlias: ModelAlias): TRepository {
		this.includes.push(modelAlias);
		return this.getRepository();
	}

	clearIncludes(): TRepository {
		this.includes = [];
		return this.getRepository();
	}

	setTransaction(transaction: Transaction): void {
		this.transaction = transaction;
	}

	protected checkTransaction(): void {
		if (!this.transaction) {
			throw new Error('transaction is null');
		}
	}

	protected abstract getRepository(): TRepository;
}
