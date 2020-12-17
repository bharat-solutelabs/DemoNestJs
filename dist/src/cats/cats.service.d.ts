import { cat } from './entities/cat.entity';
import { Repository, Connection } from 'typeorm';
import { CreateCatsDto } from './dto/create-cats.dto';
import { UpdateCatsDto } from './dto/update-cats.dto';
import { breed } from './entities/breed.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
export declare class CatsService {
    private readonly catRepository;
    private readonly breedRepository;
    private readonly connection;
    constructor(catRepository: Repository<cat>, breedRepository: Repository<breed>, connection: Connection);
    findAll(paginationQuery: PaginationQueryDto): Promise<cat[]>;
    findOne(id: string): Promise<cat>;
    create(creatCatDto: CreateCatsDto): Promise<cat>;
    update(id: string, updateCatsDto: UpdateCatsDto): Promise<cat>;
    remove(id: string): Promise<cat>;
    private preloadBreedByName;
    private recommendCat;
}
