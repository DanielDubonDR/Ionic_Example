import { Component, inject } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent,
  IonButton, IonIcon, IonSegment, IonSegmentButton, IonLabel,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, remove, refresh } from 'ionicons/icons';
import { CounterService } from '../../services/counter';
import { ClockCardComponent } from '../../components/clock-card/clock-card.component';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.page.html',
  styleUrls: ['./counter.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent,
    IonButton, IonIcon, IonSegment, IonSegmentButton, IonLabel,
    ClockCardComponent,
  ],
})
export class CounterPage {
  counter = inject(CounterService);

  constructor() {
    addIcons({ add, remove, refresh });
  }

  cambiarPaso(ev: CustomEvent) {
    this.counter.paso.set(Number(ev.detail.value));
  }
}