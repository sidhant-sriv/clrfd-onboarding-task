import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Settings } from 'src/settings/settings.model';

@Table
export class Account extends Model {
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @HasMany(() => Settings)
  settings: Settings[]
}
