import { User } from 'src/users/user.entity';
import { Artist } from 'src/artists/artists.entity';
import { Album } from 'src/albums/albums.entity';
import { Track } from 'src/tracks/tracks.entity';
import { Favorite } from 'src/favorites/favorites.entity';

export const users: User[] = [];
export const artists: Artist[] = [];
export const albums: Album[] = [];
export const tracks: Track[] = [];
export const favorites: Favorite = new Favorite();
