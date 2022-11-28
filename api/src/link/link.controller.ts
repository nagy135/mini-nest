import { Body, Controller, Get, Post } from '@nestjs/common';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {

  constructor( private readonly linkService: LinkService){
  }

  @Get()
  listAll() {
    return this.linkService.findAll();
  }

  @Post()
  createLink(
    @Body('url') url: string,
    @Body('name') name: string | undefined,
  ) {

    return this.linkService.createNew(url, name);
  }
}
