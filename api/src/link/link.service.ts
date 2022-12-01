import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomString } from '@utils/common';
import { Repository } from 'typeorm';
import { Link } from './link.entity';

@Injectable()
export class LinkService {
  @InjectRepository(Link) private linkRepository: Repository<Link>;

  findAll() {
    return this.linkRepository.find();
  }

  async createNew(url: string, name?: string): Promise<Link> {
    if (name && (await this.findOneByName(name))) {
      throw new ConflictException(
        'Choose different name...conflict with another link',
      );
    }
    const link = this.linkRepository.create({
      url,
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
