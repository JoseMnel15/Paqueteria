import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  daily(date?: string) {
    const targetDate = date ? new Date(date) : new Date();
    return {
      date: targetDate.toISOString().slice(0, 10),
      totalReceived: 48,
      totalDelivered: 32,
      pending: 14,
      totalAmountCollected: 5290.5,
    };
  }
}
