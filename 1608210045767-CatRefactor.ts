import {MigrationInterface, QueryRunner} from "typeorm";

export class CatRefactor1608210045767 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `Alter table "cat" RENAME COLUMN "name" TO "title"`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `Alter table "cat" RENAME COLUMN "title" TO "name"`
        );
    }

}
