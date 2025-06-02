import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { users } from 'src/db';

@Injectable()
export class UsersService {
  getAll() {
    return users;
  }

  getById(id: string) {
    const user = users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto.login, createUserDto.password);
    users.push(user);
    return user;
  }

  delete(id: string) {
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      return users;
    } else {
      throw new NotFoundException();
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException();
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException();
    }

    user.password = updateUserDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return user;
  }
}
