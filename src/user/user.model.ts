import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Account } from '../accounts/account.model';

@Table({ timestamps: true, paranoid: true })
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'user',
  })
  role: string;

  @HasMany(() => Account)
  accounts: Account[];
}
