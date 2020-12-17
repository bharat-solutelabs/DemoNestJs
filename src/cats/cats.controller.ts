import { Controller, Get, Param, Post, Body, Patch, Query, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatsDto } from './dto/create-cats.dto';
import { UpdateCatsDto } from './dto/update-cats.dto';

@Controller('cats')
export class CatsController {

    constructor(private readonly catservice : CatsService) {}
    @Get('list')
    findall(@Query() paginationquery){
        const {limit , offset} = paginationquery
        // return `all cats from ${limit} to ${offset} `
        return this.catservice.findAll(paginationquery)
    }

    @Get(':id')
    findone(@Param('id') id : string) {
        return this.catservice.findOne(id)
    }

    @Post('add')
    create(@Body() createCatsDto : CreateCatsDto) {
        this.catservice.create(createCatsDto);
        return createCatsDto

    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCatsDto: UpdateCatsDto) {
        return this.catservice.update(id, updateCatsDto);
    }

    @Delete(':id')
    remove(@Param('id') id : string) {
        return this.catservice.remove(id);
    }
}
