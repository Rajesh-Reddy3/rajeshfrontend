import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { RedAddressDirective } from '../../shared/directives/red-address.directive';
import { CustomUppercasePipe } from '../../shared/pipes/custom-uppercase.pipe';
import { UserDataService } from '../../shared/services/user-data.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RedAddressDirective,
    CustomUppercasePipe, 
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private userDataService: UserDataService,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAll().subscribe((data) => {
      this.users = data;
    });
  }

  createUser(): void {
    this.userDataService.clearUser(); // 🔥 IMPORTANT
    this.router.navigate(['/app/users/new']);
  }

  editUser(user: User): void {
    this.userDataService.setSelectedUser(user); // Send data
    this.router.navigate(['/app/users/edit']); // Navigate
  }

  deleteUser(id?: number): void {
    if (confirm('Are you sure?')) {
      this.userService.delete(id!).subscribe(() => {
        this.loadUsers();
      });
    }
  }
}
