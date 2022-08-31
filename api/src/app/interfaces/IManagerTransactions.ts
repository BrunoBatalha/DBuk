import { IRepositoryTransaction } from './repositories/IRepositoryTransaction';

export interface IManagerTransactions {
	addTransactionTo(repositoryVisitor: IRepositoryTransaction): Promise<void>;
	confirmTransactions(): Promise<void>;
	undoTransactions(): Promise<void>;
}
