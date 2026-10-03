import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService {
  valor = signal(0);
  paso = signal(1);

  mensaje = computed(() => {
    const v = this.valor();
    if (v === 0) return 'Empieza a contar';
    return v > 0 ? '¡Vas sumando!' : 'Vas en negativo';
  });

  sumar() {
    this.valor.update(v => v + this.paso());
  }

  restar() {
    this.valor.update(v => v - this.paso());
  }

  reiniciar() {
    this.valor.set(0);
  }
}