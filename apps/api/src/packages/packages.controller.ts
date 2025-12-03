import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { DeliverPackageDto } from './dto/deliver-package.dto';
import { PackagesService } from './packages.service';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get()
  findAll(@Query('status') status?: string, @Query('q') query?: string) {
    return this.packagesService.findAll(status as any, query);
  }

  @Post()
  create(@Body() dto: CreatePackageDto) {
    return this.packagesService.create(dto);
  }

  @Post(':id/deliver')
  deliver(@Param('id') id: string, @Body() dto: DeliverPackageDto) {
    return this.packagesService.deliver(id, dto);
  }

  @Get(':id/events')
  events(@Param('id') id: string) {
    return this.packagesService.listEvents(id);
  }
}
