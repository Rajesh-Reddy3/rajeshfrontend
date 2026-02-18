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
  ) {}

  ngOnInit(): void {
    // ✅ FIXED VALIDATORS SYNTAX
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      address: ['', [Validators.required, Validators.minLength(4)]],
    });

    // ✅ FIXED ROUTE PARAM SUBSCRIBE
    this.route.paramMap.subscribe((params) => {
      const paramId = params.get('id');

      if (paramId) {
        this.isEditMode = true;
        this.id = Number(paramId);

        this.userService.getById(this.id).subscribe({
          next: (data: User) => {
            console.log('User data received:', data);

            // ✅ PATCH VALUES
            this.userForm.patchValue({
              name: data.name,
              email: data.email,
              phonenumber: data.phonenumber,
              address: data.address,
            });
          },
          error: (err) => {
            console.error(err);
            this.router.navigate(['/app/users']);
          },
        });
      }
    });
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
        this.router.navigate(['/app/users']);
      });
    } else {
      this.userService.create(user).subscribe(() => {
        this.router.navigate(['/app/users']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/app/users']);
  }
}
