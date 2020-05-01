import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  peoplelist=[];
  
 

  constructor(private userservice:UserService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userservice.getAllUsers().subscribe(
      result=>{
        this.peoplelist=result;
      },
      error=>{
        console.log("error")
      }
    )

  }



  delete(person){
    let index = this.peoplelist.indexOf(person);
    this.peoplelist.splice(index, 1);
    this.userservice.deleteUser(person._id).subscribe(
      res=>{
        this.toastr.error(res.message);
      },
      err=>{
        console.log("err")
      }
    )
  }
}
