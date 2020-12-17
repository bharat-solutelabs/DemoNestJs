"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCatsDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_cats_dto_1 = require("./create-cats.dto");
class UpdateCatsDto extends mapped_types_1.PartialType(create_cats_dto_1.CreateCatsDto) {
}
exports.UpdateCatsDto = UpdateCatsDto;
//# sourceMappingURL=update-cats.dto.js.map