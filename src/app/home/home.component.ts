import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardComponent } from '../shared/components/dashboard-card/dashboard-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DashboardCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  newUsers = 150;
  activeUsers = 53;
  registeredUsers = 45;
  uniqueUsers = 65;

  increaseRegisteredUsers() {
    this.registeredUsers++;
  }
}
