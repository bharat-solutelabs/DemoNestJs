import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatRatingModule } from './cat-rating/cat-rating.module';

@Module({
  imports: [CatsModule, 
    TypeOrmModule.forRoot({
    type: 'postgres', // type of our database
    host: 'localhost', // database host
    port: 5432, // database host
    username: 'postgres', // username
    password: 'pass123', // user password
    database: 'postgres', // name of our database,
    autoLoadEntities: true, // models will be loaded automatically (you don't have to explicitly specify the entities: [] array)
    synchronize: true, // your entities will be synced with the database (ORM will map entity definitions to corresponding SQL tabled), every time you run the application (recommended: disable in the production)
  }), CatRatingModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
