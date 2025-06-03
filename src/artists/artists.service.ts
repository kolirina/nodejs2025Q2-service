import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/new-artist.dto';
import { UpdateArtistDto } from './dto/modify-artist.dto';
import { Artist } from './artists.entity';
import { artists, albums, tracks, favorites } from 'src/db';

@Injectable()
export class ArtistsService {
  findAllArtists() {
    return artists;
  }

  findArtistById(id: string) {
    const artist = artists.find((ar) => ar.id === id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  addNewArtist(createArtistDto: CreateArtistDto) {
    const artist = new Artist(createArtistDto.name, createArtistDto.grammy);
    artists.push(artist);
    return artist;
  }

  modifyArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = artists.find((ar) => ar.id === id);
    if (!artist) {
      throw new NotFoundException();
    }

    if (updateArtistDto.name) {
      artist.name = updateArtistDto.name;
    }
    if (updateArtistDto.grammy !== artist.grammy) {
      artist.grammy = updateArtistDto.grammy;
    }

    return artist;
  }

  deleteArtist(id: string) {
    const index = artists.findIndex((ar) => ar.id === id);
    if (index == -1) {
      throw new NotFoundException();
    }
    artists.splice(index, 1);

    const authorAlbums = albums.filter((a) => (a.artistId = id));
    authorAlbums.forEach((album) => {
      album.artistId = null;
    });

    const authorTracks = tracks.filter((t) => (t.artistId = id));
    authorTracks.forEach((track) => {
      track.artistId = null;
    });

    const favIndex = favorites.albums.findIndex((a) => a === id);
    favorites.albums.splice(favIndex, 1);

    return artists;
  }
}
