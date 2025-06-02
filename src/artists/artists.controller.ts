import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/new-artist.dto';
import { UpdateArtistDto } from './dto/modify-artist.dto';
import { UUIDvalidate } from 'src/UUID.validator';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.artistsService.findAllArtists();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', UUIDvalidate) id: string) {
    return this.artistsService.findArtistById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.addNewArtist(createArtistDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', UUIDvalidate) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistsService.modifyArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', UUIDvalidate) id: string) {
    return this.artistsService.deleteArtist(id);
  }
}
