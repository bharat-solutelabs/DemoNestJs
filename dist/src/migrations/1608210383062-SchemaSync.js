"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaSync1608210383062 = void 0;
class SchemaSync1608210383062 {
    constructor() {
        this.name = 'SchemaSync1608210383062';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cat" RENAME COLUMN "name" TO "title"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cat" RENAME COLUMN "title" TO "name"`);
    }
}
exports.SchemaSync1608210383062 = SchemaSync1608210383062;
//# sourceMappingURL=1608210383062-SchemaSync.js.map