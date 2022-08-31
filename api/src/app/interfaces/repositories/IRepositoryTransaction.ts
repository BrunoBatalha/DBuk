import { Transaction } from 'sequelize';

export interface IRepositoryTransaction {
	setTransaction(transaction: Transaction): void;
}
