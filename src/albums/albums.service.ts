import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/new-album.dto';
import { ModifyAlbumDto } from './dto/modify-album.dto';
import { albums, tracks, favorites } from 'src/db';
import { Album } from './albums.entity';

@Injectable()
export class AlbumsService {
  createAlbum(createAlbumDto: CreateAlbumDto) {
    const album = new Album(
      createAlbumDto.name,
      createAlbumDto.year,
      createAlbumDto.artistId,
    );
    albums.push(album);
    return album;
  }

  getAllAlbums() {
    return albums;
  }

  getAlbumById(id: string) {
    const album = albums.find((al) => al.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  modifyAlbum(id: string, updateAlbumDto: ModifyAlbumDto) {
    const album = albums.find((al) => al.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    return Object.assign(album, updateAlbumDto);
  }

  removeAlbum(id: string) {
    const index = albums.findIndex((al) => al.id === id);
    if (index == -1) {
      throw new NotFoundException();
    }
    albums.splice(index, 1);

    // Clear albumId for tracks associated with this album
    const albumTracks = tracks.filter((tr) => (tr.artistId = id));
    albumTracks.forEach((track) => {
      track.albumId = null;
    });

    // Remove from favorites
    const favIndex = favorites.albums.findIndex((al) => al === id);
    favorites.albums.splice(favIndex, 1);
    return albums;
  }
}
