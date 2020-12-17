import {MigrationInterface, QueryRunner} from "typeorm";

export class SchemaSync1608210383062 implements MigrationInterface {
    name = 'SchemaSync1608210383062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cat" RENAME COLUMN "name" TO "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cat" RENAME COLUMN "title" TO "name"`);
    }

}
