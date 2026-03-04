import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private selectedUserSource = new BehaviorSubject<User | null>(null);
  selectedUser$ = this.selectedUserSource.asObservable();

  setSelectedUser(user: User) {
    this.selectedUserSource.next(user);
  }

  clearUser() {
    this.selectedUserSource.next(null);
  }
}
