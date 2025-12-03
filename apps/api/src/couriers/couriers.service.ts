import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourierDto } from './dto/create-courier.dto';
import { UpdateCourierDto } from './dto/update-courier.dto';

interface Courier {
  id: number;
  name: string;
  contact?: string;
  phone?: string;
  notes?: string;
  external: boolean;
}

@Injectable()
export class CouriersService {
  private couriers: Courier[] = [
    { id: 1, name: 'Interna', external: false },
    { id: 2, name: 'FedEx', external: true },
    { id: 3, name: 'UPS', external: true },
  ];

  findAll() {
    return this.couriers;
  }

  findOne(id: number) {
    const courier = this.couriers.find((c) => c.id === id);
    if (!courier) throw new NotFoundException('Paquetería no encontrada');
    return courier;
  }

  create(dto: CreateCourierDto) {
    const newCourier: Courier = {
      id: this.couriers.length + 1,
      external: dto.external ?? true,
      ...dto,
    };
    this.couriers.push(newCourier);
    return newCourier;
  }

  update(id: number, dto: UpdateCourierDto) {
    const courier = this.findOne(id);
    Object.assign(courier, dto);
    return courier;
  }

  remove(id: number) {
    const courier = this.findOne(id);
    this.couriers = this.couriers.filter((c) => c.id !== courier.id);
    return { deleted: true };
  }
}
