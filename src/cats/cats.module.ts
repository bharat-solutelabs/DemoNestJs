import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { cat } from './entities/cat.entity';
import { breed } from './entities/breed.entity';
import { Event } from 'src/event/entities/event.entity';
import { Cat_Type } from './cats.constant';

//for using custom providers
class mockservice {}

@Module(
    {
    imports: [TypeOrmModule.forFeature([cat, breed, Event])],
    controllers : [CatsController], 
    providers: [CatsService , {provide: Cat_Type, useValue: ['abc', 'xyz']}],
    exports: [CatsService]
})

export class CatsModule {}
