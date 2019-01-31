import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      EmployeeName : '',
      password: '',
      EmployeeContact: '',
      role: 'username',
      EmiloyeeEmail: '',
      eMailingAddress : '',
      eAccountNumber: ''


    });
  }
  onSubmit() {
    if (this.myForm.value.EmployeeName == '' || this.myForm.value.password == '' || this.myForm.value.EmployeeContact == '' || this.myForm.value.role == '' || this.myForm.value.EmiloyeeEmail == '' || this.myForm.value.eMailingAddress == '' || this.myForm.value.eAccountNumber == '') {
      alert("Some of the input is emptyy");
    } else {
      alert("Account have created ")
      this.authService.regUser(this.myForm.value.EmployeeName, this.myForm.value.password, this.myForm.value.EmployeeContact, this.myForm.value.role, this.myForm.value.EmiloyeeEmail, this.myForm.value.eMailingAddress, this.myForm.value.eAccountNumber).subscribe();
      this.router.navigateByUrl('/login');
    }


  }
}

      

