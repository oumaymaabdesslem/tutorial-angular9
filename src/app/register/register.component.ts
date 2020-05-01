import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerform:FormGroup
  constructor(private fb:FormBuilder ,
     private userService:UserService ,
      private toaster: ToastrService,
      private router :Router
      ) { 
    let formControls = {
      firstname: new FormControl('',[
        Validators.required,
        Validators.pattern("[a-z .'-]+"),
        Validators.minLength(2)
      ]),
      lastname: new FormControl('',[
        Validators.required,
        Validators.pattern("[a-z .'-]+"),
        Validators.minLength(2)
      ]),
      phone : new FormControl('',[
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.minLength(8),
        Validators.maxLength(13)
      ]),
      email:new FormControl('',[
        Validators.required,
        Validators.email
       ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(8)
      ]),
      repeatpassword: new FormControl('',[
        Validators.required,
        Validators.minLength(8)
      ])
    }
    this.registerform= this.fb.group(formControls);
  }

  ngOnInit(): void {
    let isloggedin = this.userService.isLoggedIn();
    if(isloggedin){
      this.router.navigate(['/people-list']);
    }
  }



  get firstname(){
    return this.registerform.get("firstname")
  }
  get lastname(){
    return this.registerform.get("lastname")
  }
  get phone(){
    return this.registerform.get("phone")
  }
  get email(){
    return this.registerform.get("email");
  }
  get password(){
    return this.registerform.get("password")
  }
  get repeatpassword(){
    return this.registerform.get("repeatpassword")
  }

  register(){
   let data = this.registerform.value;
   let user= new User(data.firstname,data.lastname,data.email,data.phone,data.password);
   this.userService.registeradmin(user).subscribe(
     res=>{
         this.toaster.warning(res.message);
         this.router.navigate(['/login']);
     },
     err=>{
       console.log(err);
       

     }
   )

  }
}
