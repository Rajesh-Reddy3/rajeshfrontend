import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-card.component.html',
})
export class DashboardCardComponent {
  @Input() title!: string;
  @Input() count!: number;
  @Input() color!: string;
  @Input() showButton: boolean = false;

  @Output() increment = new EventEmitter<void>();

  increaseCount() {
    this.increment.emit();
  }
}
