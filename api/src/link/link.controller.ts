import { Body, Controller, Delete, Param } from '@nestjs/common';
import { DeleteLinkDto } from './dto/deleteLink.dto';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Delete('reset')
  reset() {
    return this.linkService.truncate();
  }

  @Delete(':id')
  deleteOneWithCreatorToken(
    @Param('id') id: string,
    @Body() deleteLinkDto: DeleteLinkDto,
  ) {
    console.log("================\n", "deleteLinkDto: ", deleteLinkDto, "\n================");
    return this.linkService.deleteByIdAndCreatorId(id, deleteLinkDto);
  }
}
