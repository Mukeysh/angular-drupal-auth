import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser;
  userData;
  id;
  constructor( private authService: AuthService, private userService: UserService, private router: Router) { 
   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   console.log(this.currentUser);
   this.id = this.currentUser.current_user.uid;
  }

  ngOnInit() {
    this.userService.userById(this.id)
    .subscribe(data=>{
      this.userData = data.name[0].value;
      console.log(this.userData);
    });
  }
  userLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
