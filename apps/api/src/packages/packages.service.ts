import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreatePackageDto } from './dto/create-package.dto';
import { DeliverPackageDto } from './dto/deliver-package.dto';

type PackageStatus = 'RECEIVED' | 'READY_FOR_PICKUP' | 'DELIVERED' | 'RETURNED';

type PackageEventType = 'RECEIVED' | 'STATUS_CHANGE' | 'DELIVERED' | 'PRINTED';

interface PackageEvent {
  id: string;
  packageId: string;
  type: PackageEventType;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

interface Package {
  id: string;
  trackingCode: string;
  status: PackageStatus;
  courierId: number;
  clientId: number;
  receivedByUserId: number;
  deliveredByUserId?: number;
  amountDue?: number;
  amountPaid?: number;
  paymentMethod?: 'CASH' | 'CARD' | 'TRANSFER';
  receivedAt: Date;
  deliveredAt?: Date;
}

@Injectable()
export class PackagesService {
  private packages: Package[] = [
    {
      id: randomUUID(),
      trackingCode: '#A34-091',
      status: 'DELIVERED',
      courierId: 1,
      clientId: 1,
      receivedByUserId: 2,
      deliveredByUserId: 1,
      amountDue: 120,
      amountPaid: 120,
      paymentMethod: 'CASH',
      receivedAt: new Date('2024-05-23T09:00:00'),
      deliveredAt: new Date('2024-05-23T12:00:00'),
    },
    {
      id: randomUUID(),
      trackingCode: '#B12-452',
      status: 'DELIVERED',
      courierId: 2,
      clientId: 2,
      receivedByUserId: 2,
      deliveredByUserId: 1,
      amountDue: 89,
      amountPaid: 89,
      paymentMethod: 'CARD',
      receivedAt: new Date('2024-05-23T10:30:00'),
      deliveredAt: new Date('2024-05-23T14:10:00'),
    },
    {
      id: randomUUID(),
      trackingCode: '#C89-731',
      status: 'READY_FOR_PICKUP',
      courierId: 3,
      clientId: 1,
      receivedByUserId: 2,
      receivedAt: new Date('2024-05-22T11:00:00'),
    },
    {
      id: randomUUID(),
      trackingCode: '#D45-115',
      status: 'DELIVERED',
      courierId: 1,
      clientId: 2,
      receivedByUserId: 2,
      deliveredByUserId: 1,
      receivedAt: new Date('2024-05-22T08:20:00'),
      deliveredAt: new Date('2024-05-22T09:15:00'),
    },
  ];

  private events: PackageEvent[] = this.packages.map((pkg) => ({
    id: randomUUID(),
    packageId: pkg.id,
    type: pkg.status === 'DELIVERED' ? 'DELIVERED' : 'RECEIVED',
    createdAt: pkg.receivedAt,
    metadata: { trackingCode: pkg.trackingCode },
  }));

  findAll(status?: PackageStatus, query?: string) {
    return this.packages.filter((pkg) => {
      const statusMatches = status ? pkg.status === status : true;
      const q = query?.toLowerCase();
      const queryMatches = q
        ? pkg.trackingCode.toLowerCase().includes(q)
        : true;
      return statusMatches && queryMatches;
    });
  }

  findOne(id: string) {
    const pkg = this.packages.find((p) => p.id === id || p.trackingCode === id);
    if (!pkg) throw new NotFoundException('Paquete no encontrado');
    return pkg;
  }

  create(dto: CreatePackageDto) {
    const exists = this.packages.find(
      (p) => p.trackingCode.toLowerCase() === dto.trackingCode.toLowerCase(),
    );
    if (exists) {
      throw new Error('El tracking ya existe');
    }

    const pkg: Package = {
      id: randomUUID(),
      trackingCode: dto.trackingCode,
      status: 'RECEIVED',
      courierId: dto.courierId,
      clientId: dto.clientId,
      receivedByUserId: dto.receivedByUserId,
      amountDue: dto.amountDue,
      receivedAt: new Date(),
    };
    this.packages.unshift(pkg);
    this.addEvent(pkg.id, 'RECEIVED', { trackingCode: pkg.trackingCode });
    return pkg;
  }

  deliver(id: string, dto: DeliverPackageDto) {
    const pkg = this.findOne(id);
    pkg.status = 'DELIVERED';
    pkg.deliveredAt = new Date();
    pkg.deliveredByUserId = dto.deliveredByUserId;
    pkg.amountPaid = dto.amountPaid ?? pkg.amountDue;
    pkg.paymentMethod = dto.paymentMethod ?? 'CASH';
    this.addEvent(pkg.id, 'DELIVERED', {
      amountPaid: pkg.amountPaid,
      paymentMethod: pkg.paymentMethod,
    });
    return pkg;
  }

  listEvents(packageId: string) {
    this.findOne(packageId);
    return this.events.filter((evt) => evt.packageId === packageId);
  }

  private addEvent(packageId: string, type: PackageEventType, metadata?: Record<string, unknown>) {
    this.events.push({
      id: randomUUID(),
      packageId,
      type,
      metadata,
      createdAt: new Date(),
    });
  }
}
