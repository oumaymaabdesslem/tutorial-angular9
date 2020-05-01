export class User {

   /* private firstname :String;
    private lastname :String;
    private email :String;
    private phone :String;
    private password :String;

constructor(firstname:String,lastname:String,email:String,phone:String,password:String){
    this.firstname=firstname;
    this.lastname=lastname;
    this.email=email;
    this.password=password;
}*/
constructor(  private firstname? :String,
    private lastname ?:String,
    private email ?:String,
    private phone ?:String,
    private password ?:String,
    private _id ?:String

){
}

}
