"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsService = void 0;
const common_1 = require("@nestjs/common");
const cat_entity_1 = require("./entities/cat.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const breed_entity_1 = require("./entities/breed.entity");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const event_entity_1 = require("../event/entities/event.entity");
const cats_constant_1 = require("./cats.constant");
let CatsService = class CatsService {
    constructor(catRepository, breedRepository, connection, catType) {
        this.catRepository = catRepository;
        this.breedRepository = breedRepository;
        this.connection = connection;
        console.log(catType);
    }
    findAll(paginationQuery) {
        const { limit, offset } = paginationQuery;
        return this.catRepository.find({
            relations: ['breed'],
            skip: offset,
            take: limit
        });
    }
    async findOne(id) {
        const cats = await this.catRepository.findOne(id, {
            relations: ['breed']
        });
        if (!cats) {
            throw new common_1.NotFoundException(`cats #${id} not found`);
        }
        return cats;
    }
    async create(creatCatDto) {
        const breed = await Promise.all(creatCatDto.breed.map(name => this.preloadBreedByName(name)));
        const cat = this.catRepository.create(Object.assign(Object.assign({}, creatCatDto), { breed }));
        return this.catRepository.save(cat);
    }
    async update(id, updateCatsDto) {
        const breed = updateCatsDto.breed && (await Promise.all(updateCatsDto.breed.map(name => this.preloadBreedByName(name))));
        const cat = await this.catRepository.preload(Object.assign(Object.assign({ id: +id }, updateCatsDto), { breed }));
        if (!cat) {
            throw new common_1.NotFoundException(`cat #${id} not found.`);
        }
        return this.catRepository.save(cat);
    }
    async remove(id) {
        const catsIndex = await this.findOne(id);
        return this.catRepository.remove(catsIndex);
    }
    async preloadBreedByName(name) {
        const existingBreed = await this.breedRepository.findOne({ name });
        if (existingBreed) {
            return existingBreed;
        }
        return this.breedRepository.create({ name });
    }
    async recommendCat(cat) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            cat.recommendations++;
            const recommendEvent = new event_entity_1.Event();
            recommendEvent.name = `recommend_cat`;
            recommendEvent.type = `cat`;
            recommendEvent.payload = { catId: cat.id };
            await queryRunner.manager.save(cat);
            await queryRunner.manager.save(recommendEvent);
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
};
CatsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(cat_entity_1.cat)),
    __param(1, typeorm_1.InjectRepository(breed_entity_1.breed)),
    __param(3, common_1.Inject(cats_constant_1.Cat_Type)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Connection, Array])
], CatsService);
exports.CatsService = CatsService;
//# sourceMappingURL=cats.service.js.map