import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './new-album.dto';

export class ModifyAlbumDto extends PartialType(CreateAlbumDto) {}
