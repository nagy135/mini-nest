import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { LinkModule } from './link/link.module';

@Module({
  imports: [
    LinkModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'mini',
      password: 'mini',
      database: 'mini',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
