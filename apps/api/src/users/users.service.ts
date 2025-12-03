import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'RECEPTION';
  active: boolean;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Administrador',
      email: 'admin@local.test',
      role: 'ADMIN',
      active: true,
    },
    {
      id: 2,
      name: 'Recepción',
      email: 'recepcion@local.test',
      role: 'RECEPTION',
      active: true,
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  create(dto: CreateUserDto) {
    const newUser: User = {
      id: this.users.length + 1,
      name: dto.name,
      email: dto.email,
      role: dto.role,
      active: true,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, dto: UpdateUserDto) {
    const user = this.findOne(id);
    Object.assign(user, dto);
    return user;
  }

  remove(id: number) {
    const user = this.findOne(id);
    this.users = this.users.filter((u) => u.id !== user.id);
    return { deleted: true };
  }
}
