import { Component } from '@angular/core';

@Component({
  selector: 'app-password-check',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.css'],
})
export class InputPasswordComponent {
  strength: 'none' | 'weak' | 'medium' | 'strong' = 'none';
  passwordFieldType: 'password' | 'text' = 'password';

  checkPasswordStrength(event: Event): void {
    const input = event.target as HTMLInputElement;
    const password = input.value;

    if (password.length === 0) {
      this.strength = 'none';
    } else if (password.length < 8) {
      this.strength = 'weak';
    } else {
      const hasLetters = /[a-zA-Z]/.test(password);
      const hasDigits = /\d/.test(password);
      const hasSymbols = /[!@#$%^&*(),.?":{}|<>_]/.test(password);

      if (hasLetters && hasDigits && hasSymbols) {
        this.strength = 'strong';
      } else if (
        (hasLetters && hasDigits) ||
        (hasLetters && hasSymbols) ||
        (hasDigits && hasSymbols)
      ) {
        this.strength = 'medium';
      } else {
        this.strength = 'weak';
      }
    }
  }

  getClass(section: number): string {
    switch (this.strength) {
      case 'none':
        return 'gray';
      case 'weak':
        return section === 1 ? 'red' : 'gray';
      case 'medium':
        return section <= 2 ? 'orange' : 'gray';
      case 'strong':
        return 'green';
      default:
        return 'gray';
    }
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
