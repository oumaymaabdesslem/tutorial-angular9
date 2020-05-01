import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
 myform:FormGroup;
  constructor(private fb:FormBuilder) {
    let formcontrols ={
      firstname: new FormControl('',[
      Validators.required,
      Validators.pattern("[a-z .'-]+"),
      Validators.minLength(2)
      ])
    }
    this.myform= this.fb.group(formcontrols)
   }

   get firstname(){
     return this.myform.get("firstname");
   }

  ngOnInit(): void { 
  }
  
  Saveuser(){
    console.log(this.myform.value)
  }
  
}
