import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Settings } from 'src/settings/settings.model';
import { User } from 'src/user/user.model';

@Table({
  paranoid: true,
  timestamps: true,
})
export class Account extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Settings)
  settings: Settings[];
}
