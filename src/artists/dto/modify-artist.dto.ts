import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './new-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {}
