import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistModule } from './artists/artists.module';

@Module({
  imports: [UsersModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
