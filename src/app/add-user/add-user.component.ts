import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
adduserform:FormGroup
  constructor(private fb:FormBuilder,private userService:UserService,private router:Router,private toastr: ToastrService ) { 
    let formcontrols = {
      firstname : new FormControl('',[
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2)
      ]),
      lastname : new FormControl('',[
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(2)
      ]),
      phone: new FormControl('',[
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.minLength(8),
        Validators.maxLength(13)
      ]),
    }

    this.adduserform = this.fb.group(formcontrols);
  }
   
  get firstname(){
    return this.adduserform.get("firstname")
  }
  get lastname(){
    return this.adduserform.get("lastname")
  }
  get phone(){
    return this.adduserform.get("phone")
  }
  ngOnInit(): void {
  }

  adduser(){
    let data = this.adduserform.value;
    let user = new User(data.firstname,data.lastname,null,data.phone);

    this.userService.adduser(user).subscribe(
      res=>{
        this.toastr.success(res.message);
        this.router.navigate(['/people-list']);
      },
      err=>{
        console.log(err);
      }
    )
  }
}
