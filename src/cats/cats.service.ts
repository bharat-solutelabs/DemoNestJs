import { Injectable, HttpException, HttpStatus, NotFoundException, Inject } from '@nestjs/common';
import { cat } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { CreateCatsDto } from './dto/create-cats.dto';
import { UpdateCatsDto } from './dto/update-cats.dto';
import { breed } from './entities/breed.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from '../event/entities/event.entity'
import { Cat_Type } from './cats.constant';
@Injectable()
export class CatsService {
    constructor(
      @InjectRepository(cat)
      private readonly catRepository : Repository<cat>,
      @InjectRepository(breed)
      private readonly breedRepository : Repository<breed>,
      private readonly connection : Connection,
      @Inject(Cat_Type) catType : string[]
    ) {
      console.log(catType)
    }

    findAll(paginationQuery : PaginationQueryDto) {
      const { limit, offset } = paginationQuery;
        return this.catRepository.find({
          relations: ['breed'],
          skip: offset,
          take: limit
        })
    }

    async findOne(id : string) {
        const cats =  await this.catRepository.findOne(id, {
          relations: ['breed']
        });
        if(!cats) {
            // throw new HttpException(`cats #${id} not found`, HttpStatus.NOT_FOUND);
            throw new NotFoundException(`cats #${id} not found`);
        }
        return cats;
    }

     async create(creatCatDto : CreateCatsDto) {
       const breed = await Promise.all(
        creatCatDto.breed.map(name => this.preloadBreedByName(name)
       ));
        const cat =  this.catRepository.create({ 
          ...creatCatDto,
          breed
        });
        return this.catRepository.save(cat);
    }

    async update(id: string, updateCatsDto: UpdateCatsDto) {
        const breed = updateCatsDto.breed && (
          await Promise.all(
            updateCatsDto.breed.map(name => this.preloadBreedByName(name))
          )
        );
        const cat = await this.catRepository.preload({
          id: +id,
          ...updateCatsDto,breed
        });
        if (!cat) {
          throw new NotFoundException(`cat #${id} not found.`)
        }
        return this.catRepository.save(cat)
      }

      async remove(id: string) {
        const catsIndex = await this.findOne(id);
        return this.catRepository.remove(catsIndex)
      }

      private async preloadBreedByName(name : string) : Promise <breed> {
        const existingBreed = await this.breedRepository.findOne({ name });
        if(existingBreed) {
          return existingBreed
        }
        return this.breedRepository.create({ name })
      }

      private async recommendCat(cat : cat) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
          cat.recommendations++

          const recommendEvent = new Event();
          recommendEvent.name = `recommend_cat`;
          recommendEvent.type = `cat`;
          recommendEvent.payload = {catId : cat.id};
          await queryRunner.manager.save(cat);
          await queryRunner.manager.save(recommendEvent);
          await queryRunner.commitTransaction()
        }
        catch(err) {
          await queryRunner.rollbackTransaction();
        }
        finally {
          await queryRunner.release();
        }
      }
}
