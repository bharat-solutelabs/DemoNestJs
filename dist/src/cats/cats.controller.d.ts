import { CatsService } from './cats.service';
import { CreateCatsDto } from './dto/create-cats.dto';
import { UpdateCatsDto } from './dto/update-cats.dto';
export declare class CatsController {
    private readonly catservice;
    constructor(catservice: CatsService);
    findall(paginationquery: any): Promise<import("./entities/cat.entity").cat[]>;
    findone(id: string): Promise<import("./entities/cat.entity").cat>;
    create(createCatsDto: CreateCatsDto): CreateCatsDto;
    update(id: string, updateCatsDto: UpdateCatsDto): Promise<import("./entities/cat.entity").cat>;
    remove(id: string): Promise<import("./entities/cat.entity").cat>;
}
