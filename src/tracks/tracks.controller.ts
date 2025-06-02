import {
  Get,
  Post,
  Put,
  Controller,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/new-track.dto';
import { UpdateTrackDto } from './dto/modify-track.dto';
import { UUIDvalidate } from 'src/UUID.validator';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.tracksService.getAllTracks();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', UUIDvalidate) id: string) {
    return this.tracksService.getTrackById(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.addNewTrack(createTrackDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', UUIDvalidate) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.tracksService.modifyTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', UUIDvalidate) id: string) {
    return this.tracksService.deleteTrack(id);
  }
}
