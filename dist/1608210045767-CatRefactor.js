"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatRefactor1608210045767 = void 0;
class CatRefactor1608210045767 {
    async up(queryRunner) {
        await queryRunner.query(`Alter table "cat" RENAME COLUMN "name" TO "title"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`Alter table "cat" RENAME COLUMN "title" TO "name"`);
    }
}
exports.CatRefactor1608210045767 = CatRefactor1608210045767;
//# sourceMappingURL=1608210045767-CatRefactor.js.map