import { Model, Transaction } from 'sequelize';
import { IModelAdapter } from '../interfaces/IModelAdapter';
import { ModelAlias } from '../interfaces/ModelAlias';
import { ModelName } from '../interfaces/ModelName';
import { SequelizeSingleton } from './SequelizeSingleton';

export class ModelAdapter implements IModelAdapter {
	private modelClass: ModelName;

	constructor(modelClass: ModelName) {
		this.modelClass = modelClass;
	}

	async createMany(objects: object[], transaction: Transaction): Promise<void> {
		await SequelizeSingleton.getInstance().models[this.modelClass].bulkCreate(objects as any, {
			transaction
		});
	}

	async create(object: object, transaction: Transaction, includes?: ModelName[] | undefined): Promise<object> {
		return (
			await SequelizeSingleton.getInstance().models[this.modelClass].create(
				{ ...object },
				{ include: includes, transaction: transaction }
			)
		).get();
	}

	async update(object: object, where: { [k: string]: string | number }, transaction: Transaction): Promise<void> {
		await SequelizeSingleton.getInstance().models[this.modelClass].update(object, {
			transaction: transaction,
			where
		});
	}

	async delete(where: { [k: string]: string | number }, transaction: Transaction): Promise<void> {
		await SequelizeSingleton.getInstance().models[this.modelClass].destroy({
			where,
			force: true,
			transaction: transaction
		});
	}

	async findOne(where: { [k: string]: string | number }, includes?: ModelAlias[] | undefined): Promise<object | null> {
		const data = await this.listEntities(where, includes);

		return data.length > 0 ? data[0].get({ plain: true }) : null;
	}

	async list(where: { [k: string]: string | number }, includes?: ModelAlias[] | undefined): Promise<object[]> {
		const data = await this.listEntities(where, includes);
		return data.map((d) => d.get({ plain: true }));
	}

	private async listEntities(
		where: { [k: string]: string | number },
		includes?: ModelAlias[] | undefined
	): Promise<Array<Model<any, any>>> {
		return await SequelizeSingleton.getInstance().models[this.modelClass].findAll({
			where: { ...where },
			include: includes
		});
	}
}
