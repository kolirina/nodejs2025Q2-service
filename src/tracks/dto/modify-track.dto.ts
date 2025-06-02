import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './new-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {}
