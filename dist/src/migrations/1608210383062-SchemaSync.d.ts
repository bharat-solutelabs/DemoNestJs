import { MigrationInterface, QueryRunner } from "typeorm";
export declare class SchemaSync1608210383062 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
