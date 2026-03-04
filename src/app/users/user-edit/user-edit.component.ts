import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { UserDataService } from '../../shared/services/user-data.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  userForm!: FormGroup;
  id?: number;
  isEditMode = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private userDataService: UserDataService,
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [],
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      address: ['', [Validators.required, Validators.minLength(4)]],
    });

    const url = this.router.url;

    // ✅ CREATE MODE
    if (url.includes('new')) {
      this.isEditMode = false;
      return;
    }

    // ✅ EDIT MODE
    if (url.includes('edit')) {
      this.userDataService.selectedUser$.subscribe((user) => {
        if (user) {
          this.isEditMode = true;
          this.id = user.id;
          this.userForm.patchValue(user);
        } else {
          // If no user selected → redirect
          this.router.navigate(['/app/users']);
        }
      });
    }
  }

  get f() {
    return this.userForm.controls;
  }

  save(): void {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    const user: User = this.userForm.value;

    if (this.isEditMode && this.id) {
      this.userService.update(this.id, user).subscribe(() => {
        this.userDataService.clearUser();
        this.router.navigate(['/app/users']);
      });
    } else {
      this.userService.create(user).subscribe(() => {
        this.router.navigate(['/app/users']);
      });
    }
  }

  cancel(): void {
    this.userDataService.clearUser();
    this.router.navigate(['/app/users']);
  }
}
