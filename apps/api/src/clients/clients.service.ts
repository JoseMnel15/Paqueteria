import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

interface Client {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  notes?: string;
}

@Injectable()
export class ClientsService {
  private clients: Client[] = [
    { id: 1, name: 'Juan Pérez', phone: '555-123-4567', email: 'juan@example.com' },
    { id: 2, name: 'María López', phone: '555-987-6543', email: 'maria@example.com' },
  ];

  findAll() {
    return this.clients;
  }

  findOne(id: number) {
    const client = this.clients.find((c) => c.id === id);
    if (!client) throw new NotFoundException('Cliente no encontrado');
    return client;
  }

  create(dto: CreateClientDto) {
    const newClient: Client = { id: this.clients.length + 1, ...dto };
    this.clients.push(newClient);
    return newClient;
  }

  update(id: number, dto: UpdateClientDto) {
    const client = this.findOne(id);
    Object.assign(client, dto);
    return client;
  }

  remove(id: number) {
    const client = this.findOne(id);
    this.clients = this.clients.filter((c) => c.id !== client.id);
    return { deleted: true };
  }
}
