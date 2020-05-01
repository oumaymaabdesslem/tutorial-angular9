import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

imageurl="assets/images/logo.png";
isloggedin : boolean;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.isloggedin = this.userService.isLoggedIn();
  }
 logout(){
   localStorage.removeItem("mytoken");
 }
}
