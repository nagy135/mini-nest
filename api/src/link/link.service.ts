import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './link.entity';

@Injectable()
export class LinkService {
  @InjectRepository(Link) private linkRepository: Repository<Link>;

  findAll() {
    return this.linkRepository.find();
  }

  async createNew(url: string, name?: string): Promise<Link> {
    const link = this.linkRepository.create({
      url,
      name: name ? name : (Math.random() + 1).toString(36).substring(7), // TODO: this can have clashes!
    });
    return link;
  }
}
