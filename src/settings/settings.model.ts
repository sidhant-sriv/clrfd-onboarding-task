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
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare account_id: number;

  @Column({
    type: DataType.ENUM('string', 'number', 'boolean', 'json'),
    allowNull: false,
  })
  declare data_type: 'string' | 'number' | 'boolean' | 'json';

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    validate: {
      validateValueType() {
        try {
          const parsedValue = JSON.parse(this.value);
          
          switch (this.data_type) {
            case 'string':
              if (typeof parsedValue !== 'string') {
                throw new Error('Value must be a string');
              }
              break;
            case 'number':
              if (typeof parsedValue !== 'number' || Number.isNaN(parsedValue)) {
                throw new Error('Value must be a number');
              }
              break;
            case 'boolean':
              if (typeof parsedValue !== 'boolean') {
                throw new Error('Value must be a boolean');
              }
              break;
            case 'json':
              if (typeof parsedValue !== 'object' || parsedValue === null) {
                throw new Error('Value must be a valid JSON object');
              }
              break;
            default:
              throw new Error('Invalid data type');
          }
        } catch (error) {
          if (error.message === 'Invalid data type' || 
              error.message.startsWith('Value must be')) {
            throw error;
          }
          throw new Error('Value is not valid JSON');
        }
      }
    }
  })
  declare value: string;
}
