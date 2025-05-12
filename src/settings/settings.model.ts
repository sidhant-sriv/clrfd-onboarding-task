import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Account } from 'src/accounts/account.model';

@Table({
  timestamps: true,
  paranoid: true,
})
export class Settings extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ForeignKey(() => Account)

  
  @Column({
    type: DataType.ENUM('string', 'number', 'boolean', 'json'),
    allowNull: false,
  })
  declare data_type: 'string' | 'number' | 'boolean' | 'json';

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare account_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare value: string;

  
}
