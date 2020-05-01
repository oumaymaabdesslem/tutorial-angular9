import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms'
import { User } from '../user';
import {ToastrService} from 'ngx-toastr';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginform:FormGroup
  constructor(private fb:FormBuilder,
    private userService:UserService,
    private toastr :ToastrService,
    private router :Router
    ) {
    let formControls={
      email: new FormControl('',[
       Validators.required,
       Validators.email
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ])
    }
    this.loginform= this.fb.group(formControls);
   }

  ngOnInit(): void {
    let isloggedin = this.userService.isLoggedIn();
    if(isloggedin){
      this.router.navigate(['/people-list']);
    }
  }

  
get email(){
  return this.loginform.get("email");
}
get password(){
  return this.loginform.get("password")
}

login(){
  let data =this.loginform.value;
  let user = new User(null,null,data.email,null,data.password);
  this.userService.loginadmin(user).subscribe(
    res=>{
     console.log(res);
     let token = res.token;
     localStorage.setItem("mytoken",token);
     this.router.navigate(['/people-list']);
     
    },
    err=>{
      console.log(err);
      
    }
  )

}
}
