import { Body, Controller, Get, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LinkService } from './link/link.service';

@Controller()
export class AppController {
  constructor(private readonly linkService: LinkService) {}

  @Get('all')
  listAll() {
    return this.linkService.findAll();
  }

  @Get('token/:token')
  listByUserToken(@Param('token') token: string) {
    return this.linkService.findByToken(token);
  }

  @Get(':name')
  async getLink(@Param('name') name: string , @Res() res: Response)  {
    const link = await this.linkService.findOneByName(name);
    if (link) 
      return res.redirect(link.url);
    throw new NotFoundException('no link with this name currently exists')
  }


  @Post()
  createLink(
    @Body('url') url: string,
    @Body('token') token: string | undefined,
    @Body('name') name: string | undefined,
  ) {

    return this.linkService.createNew(url, token, name);
  }
}
