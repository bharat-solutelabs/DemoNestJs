import { IsString } from 'class-validator';

export class CreateCatsDto {
  @IsString()
  readonly  name: string;

  @IsString({ each : true })
  readonly breed: string[];
}
