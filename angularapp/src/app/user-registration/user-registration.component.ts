import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z ]+$/),
        ],
      ],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      age: [
        '',
        (control) => {
          if (this.isAgeRequired()) {
            return Validators.required(control);
          } else {
            return null;
          }
        },
      ],
    });
  }

  isAgeRequired(): boolean {
    const selectedCountry = this.registrationForm.get('country').value;
    return ['US', 'Canada', 'India'].includes(selectedCountry);
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      // Handle form submission here
      console.log(this.registrationForm.value);
    }
  }
}

