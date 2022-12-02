import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomString } from '@utils/common';
import { Repository } from 'typeorm';
import { CreateLinkDto } from './dto/createLink.dto';
import { Link } from './link.entity';

@Injectable()
export class LinkService {
  @InjectRepository(Link) private linkRepository: Repository<Link>;

  findAll() {
    return this.linkRepository.find();
  }

  truncate() {
    return this.linkRepository.clear();
  }

  findByToken(token: string) {
    return this.linkRepository.find({ where: { token } });
  }

  async createNew(createLinkDto: CreateLinkDto): Promise<Link> {
    const { url, name, token } = createLinkDto;
    if (name && (await this.findOneByName(name))) {
      throw new ConflictException(
        'Choose different name...conflict with another link',
      );
    }
    const link = this.linkRepository.create({
      url,
      token,
      name: name ? name : randomString(7),
    });
    while (await this.findOneByName(link.name)) {
      link.name = randomString(7);
    }
    await link.save();
    return link;
  }

  async findOneByName(name: string): Promise<Link | null> {
    return this.linkRepository.findOne({ where: { name } });
  }
}
