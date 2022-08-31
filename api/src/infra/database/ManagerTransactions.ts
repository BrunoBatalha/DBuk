import { IManagerTransactions } from '@/app/interfaces/IManagerTransactions';
import { IRepositoryTransaction } from '@/app/interfaces/repositories/IRepositoryTransaction';
import { Transaction } from 'sequelize/types';
import { SequelizeSingleton } from './SequelizeSingleton';

export class ManagerTransactions implements IManagerTransactions {
	private transaction?: Transaction;

	async addTransactionTo(repositoryVisitor: IRepositoryTransaction): Promise<void> {
		if (!this.transaction) {
			this.transaction = await SequelizeSingleton.getInstance().database.transaction();
		}

		repositoryVisitor.setTransaction(this.transaction);
	}

	async confirmTransactions(): Promise<void> {
		this.checkTransaction();
		await this.transaction?.commit();
	}

	async undoTransactions(): Promise<void> {
		this.checkTransaction();
		await this.transaction?.rollback();
	}

	private checkTransaction(): void {
		if (!this.transaction) {
			throw new Error('transaction is null');
		}
	}
}
