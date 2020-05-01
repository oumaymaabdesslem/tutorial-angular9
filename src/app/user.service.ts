import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from './user';
import { REFERENCE_PREFIX } from '@angular/compiler/src/render3/view/util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getAllUsersUrl = "https://backend-people-crud-app.herokuapp.com/users";
  private deleteUserUrl = "https://backend-people-crud-app.herokuapp.com/users/";
  private addUserUrl ="https://backend-people-crud-app.herokuapp.com/users/add";
  private getOneUserUrl="https://backend-people-crud-app.herokuapp.com/users/";
  private updateUserUrl="https://backend-people-crud-app.herokuapp.com/users/update";
  private registerUserUrl="https://backend-people-crud-app.herokuapp.com/users/register";
  private loginUserUrl="https://backend-people-crud-app.herokuapp.com/users/login";
  
  constructor(private http:HttpClient) { }

  getAllUsers(){
    return this.http.get<any>(this.getAllUsersUrl);
   
  }
  deleteUser(id:String){
    return this.http.delete<any>(this.deleteUserUrl+id);
  }
  adduser(user:User){
    return this.http.post<any>(this.addUserUrl,user);
  }
  getOneUser(id:String){
    return this.http.get<any>(this.getOneUserUrl+id);
  }
  updateuser(user:User){
    return this.http.put<any>(this.updateUserUrl,user);
  }
  registeradmin(user:User){
    return this.http.post<any>(this.registerUserUrl,user);
  }
  loginadmin(user:User){
    return this.http.post<any>(this.loginUserUrl,user);
  }
  isLoggedIn(){
    let token = localStorage.getItem("mytoken");
    if(token){
      return true;
    }else{
      return false;
    }
  }
}
