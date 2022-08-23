import { Column, Model, Table } from 'sequelize-typescript';

@Table({
	tableName: 'users'
})
export class UserModel extends Model {
	@Column
	username!: string;

	@Column
	password!: string;
}
