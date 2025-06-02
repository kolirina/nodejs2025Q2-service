import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { albums, artists, favorites, tracks } from 'src/db';

@Injectable()
export class FavoritesService {
  getAllArtists() {
    return {
      artists: favorites.artists
        .map((id) => artists.find((ar) => ar.id === id))
        .filter((n) => n),
      albums: favorites.albums
        .map((id) => albums.find((al) => al.id === id))
        .filter((n) => n),
      tracks: favorites.tracks
        .map((id) => tracks.find((tr) => tr.id === id))
        .filter((n) => n),
    };
  }

  addArtistById(id: string) {
    const artist = artists.find((ar) => ar.id === id);
    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }
    if (!favorites.artists.includes(artist.id))
      favorites.artists.push(artist.id);
    return 'Artist added to favorites';
  }

  addAlbumById(id: string) {
    const album = albums.find((al) => al.id === id);
    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }
    if (!favorites.albums.includes(album.id)) favorites.albums.push(album.id);
    return 'Album added to favorites';
  }

  addTrackById(id: string) {
    const track = tracks.find((tr) => tr.id === id);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
    if (!favorites.tracks.includes(track.id)) favorites.tracks.push(track.id);
    return 'Track added to favorites';
  }

  removeArtist(id: string) {
    const index = favorites.artists.findIndex((ar) => ar === id);
    if (index == -1) {
      throw new NotFoundException('Artist is not in favorites');
    }
    favorites.artists.splice(index, 1);
    return 'Artist removed from favorites';
  }

  removeAlbum(id: string) {
    const index = favorites.albums.findIndex((al) => al === id);
    if (index == -1) {
      throw new NotFoundException('Album is not in favorites');
    }
    favorites.albums.splice(index, 1);
    return 'Album removed from favorites';
  }

  removeTrack(id: string) {
    const index = favorites.tracks.findIndex((tr) => tr === id);
    if (index == -1) {
      throw new NotFoundException('Track is not in favorites');
    }
    favorites.tracks.splice(index, 1);
    return 'Track removed from favorites';
  }
}
