import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/new-album.dto';
import { ModifyAlbumDto } from './dto/modify-album.dto';
import { UUIDvalidate } from 'src/UUID.validator';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    const albums = this.albumsService.getAllAlbums();
    return albums.length ? albums : [];
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', UUIDvalidate) id: string) {
    return this.albumsService.getAlbumById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', UUIDvalidate) id: string,
    @Body() updateAlbumDto: ModifyAlbumDto,
  ) {
    return this.albumsService.modifyAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', UUIDvalidate) id: string) {
    return this.albumsService.removeAlbum(id);
  }
}
