import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
updateuserform:FormGroup
  constructor(private fb:FormBuilder, private route:ActivatedRoute,private userservice:UserService,private router:Router,private toastr: ToastrService) {
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
      ])
    }
    this.updateuserform= this.fb.group(formcontrols);
   }

  ngOnInit(): void {
    let iduser = this.route.snapshot.params.id;
    this.userservice.getOneUser(iduser).subscribe(
      res=>{
           let user = res;
           this.updateuserform.patchValue({
             firstname : user.firstname,
             lastname : user.lastname,
             phone : user.phone
           })
      },
      err=>{
        console.log(err)
      }
    )
  }


 get firstname(){
   return this.updateuserform.get("firstname");
 }
 get lastname(){
  return this.updateuserform.get("lastname");
}
get phone(){
  return this.updateuserform.get("phone");
}

updateuser(){
  let data = this.updateuserform.value;
  let iduser = this.route.snapshot.params.id;
  let user = new User(data.firstname,data.lastname,null,data.phone,null,iduser);
  this.userservice.updateuser(user).subscribe(
    res=>{
      this.toastr.warning(res.message);
     this.router.navigate(['/people-list']);
     
    },
    err=>{
      console.log(err);
      
    }
  )
}
}
