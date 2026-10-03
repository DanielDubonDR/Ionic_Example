import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClockService {
  ahora = signal(new Date());

  constructor() {
    setInterval(() => this.ahora.set(new Date()), 1000);
  }
}