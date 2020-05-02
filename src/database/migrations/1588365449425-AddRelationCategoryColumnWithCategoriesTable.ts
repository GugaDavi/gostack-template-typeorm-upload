import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

export default class AddRelationCategoryColumnWithCategoriesTable1588365449425
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'transactions',
      'category_id',
      new TableColumn({ name: 'category_id', type: 'uuid', isNullable: true }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'TransactionCateogory',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transactions', 'TransactionCateogory');

    await queryRunner.changeColumn(
      'transactions',
      'category_id',
      new TableColumn({
        name: 'category_id',
        type: 'numeric',
        isNullable: true,
      }),
    );
  }
}
