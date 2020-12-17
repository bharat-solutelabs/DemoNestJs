import { Module } from '@nestjs/common';
import { CatRatingService } from './cat-rating.service';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [CatsModule],
  providers: [CatRatingService]
})
export class CatRatingModule {}
