import { PartialType } from '@nestjs/mapped-types';
import { CreateNewFavoriteDto } from './new-favorite.dto';

export class UpdateFavDto extends PartialType(CreateNewFavoriteDto) {}
