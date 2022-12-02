import { Controller, Delete } from '@nestjs/common';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Delete('reset')
  reset() {
    return this.linkService.truncate();
  }
}
