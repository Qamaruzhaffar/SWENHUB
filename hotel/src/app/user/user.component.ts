import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  myForm: FormGroup;
  posts: any = [];
  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router) {
      this.authService.getstatus().subscribe(posts => {
        this.posts = posts;
      });
    }

  ngOnInit() {
    this.myForm = this.fb.group({
      roomStatus: '',
      BookingId: ''
  
    });
  }

  updateStatus(id: number) {
    console.log(id)
    this.authService.upstatus(id, this.myForm.value.roomStatus, this.myForm.value.BookingId).subscribe(posts => { this.posts = posts; });
  }


}
