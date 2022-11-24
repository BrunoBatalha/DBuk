import { Transaction } from 'sequelize';
import { IModelAdapter } from '../interfaces/IModelAdapter';
import { ModelAliasAssociation } from '../interfaces/ModelAlias';
import { ModelName } from '../interfaces/ModelName';
import { SequelizeSingleton } from './SequelizeSingleton';

export class ModelAdapter implements IModelAdapter {
	private modelClass: ModelName;
	private limit?: number;
	private offset?: number;
	private orderBy?: 'DESC' | 'ASC';
	private parameterToOrder?: string;
	private includes?: ModelAliasAssociation[];
	private transaction?: Transaction;

	constructor(modelClass: ModelName) {
		this.modelClass = modelClass;
	}

	setLimit(limit: number): IModelAdapter {
		this.limit = limit;
		return this;
	}

	setOffset(offset: number): IModelAdapter {
		this.offset = offset;
		return this;
	}

	setOrderBy(orderBy: 'ASC' | 'DESC'): IModelAdapter {
		this.orderBy = orderBy;
		return this;
	}

	addInclude(includes: ModelAliasAssociation[]): IModelAdapter {
		this.includes = this.includes ? [...this.includes, ...includes] : [...includes];
		return this;
	}

	setTransaction(transaction: Transaction): IModelAdapter {
		this.transaction = transaction;
		return this;
	}

	setParameterToOrder(parameter: string): IModelAdapter {
		this.parameterToOrder = parameter;
		return this;
	}

	async createMany(objects: object[]): Promise<void> {
		await SequelizeSingleton.getInstance().models[this.modelClass].bulkCreate(objects as any, {
			transaction: this.transaction
		});
	}

	async create(object: object): Promise<object> {
		const entityCreated = await SequelizeSingleton.getInstance().models[this.modelClass].create(
			{ ...object },
			{
				include: this.includes,
				transaction: this.transaction
			}
		);
		return entityCreated.get();
	}

	async update(object: object, where: { [k: string]: string | number }, transaction: Transaction): Promise<void> {
		await SequelizeSingleton.getInstance().models[this.modelClass].update(object, {
			transaction: transaction,
			where
		});
	}

	async delete(where: { [k: string]: string | number }): Promise<void> {
		await SequelizeSingleton.getInstance().models[this.modelClass].destroy({
			where,
			force: true,
			transaction: this.transaction
		});
	}

	async findOne(where: { [k: string]: string | number }): Promise<object | null> {
		const data = await this.listEntities({ where, includes: this.includes, transaction: this.transaction });

		return data.list.length > 0 ? data.list[0].get({ plain: true }) : null;
	}

	async list(where?: { [k: string]: string | number }): Promise<IModelAdapter.ListOutputEntitiesFinal> {
		const data = await this.listEntities({ where, includes: this.includes });
		return {
			list: data.list.map((d) => d.get({ plain: true })),
			total: data.total
		};
	}

	private async listEntities(params: IModelAdapter.ListOrderByParams): Promise<IModelAdapter.ListOutputEntities> {
		const { rows, count } = await SequelizeSingleton.getInstance().models[this.modelClass].findAndCountAll({
			where: params.where,
			order: this.orderBy && this.parameterToOrder ? [[this.parameterToOrder, this.orderBy]] : undefined,
			include: this.includes,
			limit: this.limit,
			offset: this.offset,
			transaction: this.transaction
		});

		return {
			list: rows,
			total: count
		};
	}
}
