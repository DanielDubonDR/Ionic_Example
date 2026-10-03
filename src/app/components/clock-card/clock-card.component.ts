import { Component, inject, computed } from '@angular/core';
import { IonCard, IonCardContent } from '@ionic/angular';
import { ClockService } from '../../services/clock';

@Component({
  selector: 'app-clock-card',
  templateUrl: './clock-card.component.html',
  styleUrls: ['./clock-card.component.scss'],
  imports: [IonCard, IonCardContent],
})
export class ClockCardComponent {
  private clock = inject(ClockService);

  hora = computed(() => this.clock.ahora().toLocaleTimeString('es-GT'));
  fecha = computed(() =>
    this.clock.ahora().toLocaleDateString('es-GT', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  );
}