import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistModule } from './artists/artists.module';
import { TrackModule } from './tracks/tracks.module';
import { AlbumModule } from './albums/albums.module';

@Module({
  imports: [UsersModule, ArtistModule, TrackModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
