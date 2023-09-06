import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.registrationForm = this.fb.group({
      inputFirstname: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z ]*$/)
      ]],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      inputAge: [''],
    });

    // Set age validator based on selected country
    this.registrationForm.get('country').valueChanges.subscribe(country => {
      if (['US', 'Canada', 'India'].includes(country)) {
        this.registrationForm.get('inputAge').setValidators(Validators.required);
      } else {
        this.registrationForm.get('inputAge').clearValidators();
      }
      this.registrationForm.get('inputAge').updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      // Handle form submission
      console.log(this.registrationForm.value);
    }
  }
}
