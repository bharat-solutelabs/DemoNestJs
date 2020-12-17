import { Type } from 'class-transformer';
import { IsOptional, isPositive, IsPositive } from 'class-validator'

export class PaginationQueryDto {
@IsOptional()
@IsPositive()
@Type(() => Number) 
limit: number;

@IsOptional()
@IsPositive()
@Type(() => Number)
offset: number;
}
