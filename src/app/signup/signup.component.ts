import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterOutlet,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  title = 'app';
  email: string = '';
  username: string = '';
  mobile: string = '';
  password: string = '';
  emailOptIn: boolean = false;
  passwordFieldType: string = 'password';

  passwordValidations = {
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  };

  validatePassword() {
    const minLength = this.password.length >= 8;
    const uppercase = /[A-Z]/.test(this.password);
    const lowercase = /[a-z]/.test(this.password);
    const number = /[0-9]/.test(this.password);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);

    this.passwordValidations = {
      minLength,
      uppercase,
      lowercase,
      number,
      specialChar
    };
  }

  togglePasswordVisibility(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.passwordFieldType = checkbox.checked ? 'text' : 'password';
  }

  isPasswordValid(): boolean {
    const { minLength, uppercase, lowercase, number, specialChar } = this.passwordValidations;
    return minLength && uppercase && lowercase && number && specialChar;
  }

  onSubmit() {
    if (this.isPasswordValid()) {
      console.log('Email:', this.email);
      console.log('Username:', this.username);
      console.log('Mobile:', this.mobile);
      console.log('Password:', this.password);
      console.log('Email Opt-In:', this.emailOptIn);
    } else {
      console.error('Password does not meet the criteria.');
    }
  }

}
