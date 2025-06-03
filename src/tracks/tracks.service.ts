import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/new-track.dto';
import { UpdateTrackDto } from './dto/modify-track.dto';
import { Track } from './tracks.entity';
import { tracks, favorites } from 'src/db';

@Injectable()
export class TracksService {
  getAllTracks() {
    return tracks;
  }

  getTrackById(id: string) {
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  addNewTrack(trackData: CreateTrackDto) {
    const track = new Track(
      trackData.name,
      trackData.duration,
      trackData.artistId,
      trackData.albumId,
    );
    tracks.push(track);
    return track;
  }

  modifyTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException();
    }

    return Object.assign(track, updateTrackDto);
  }

  deleteTrack(id: string) {
    const index = tracks.findIndex((track) => track.id === id);
    if (index == -1) {
      throw new NotFoundException();
    }
    tracks.splice(index, 1);

    const favIndex = favorites.tracks.findIndex((track) => track === id);
    favorites.tracks.splice(favIndex, 1);
    return tracks;
  }
}
