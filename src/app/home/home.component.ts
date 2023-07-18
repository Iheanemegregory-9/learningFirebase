import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../shared/firebase.service';
import { doc } from '@angular/fire/firestore';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
// [x: string]: Observable<undefined>|Subscribable<undefined>|Promise<undefined>;
userData:any;

  email:string = '';
  password:string = '';
  errMsg:string = '';
  age!:number;
  id:string = '';
  isErr:boolean = false;

  filteredData:any;

  constructor(private fireService : FirebaseService){}

  ngOnInit(): void {
    // this.loadDataFromDB()
    // this.filterByAge(this.age)
    this.isUserLoggedIn()
  }



  create(email:string, password:string){
    this.fireService.createAccount(email, password).then((response)=>{
      console.log(response.user);
      
    },err =>{
      this.isErr = true;
      this.errMsg = err.message;
      console.log(err.message);
      setTimeout(() => {
        this.isErr = false;
      }, 5000);
      
    })
  }

  logIn(email:string, password:string){
    this.fireService.signIn(email, password).then((res)=>{
      console.log(res.user);
    }, err=>{
      this.isErr = true;
      this.errMsg = err.message;
      console.log(err.message);
      setTimeout(() => {
        this.isErr = false;
      }, 5000);
      
    })
  }


  logOut(){
    this.fireService.signOut()
  }

  googleSignin(){
    this.fireService.signInWithGoogle().then((res)=>{
      console.log(res.user);
    }, err=>{
      this.isErr = true;
      this.errMsg = err.message;
      console.log(err.message);
      setTimeout(() => {
        this.isErr = false;
      }, 5000);
    })
  }

  loadDataToDatabase(email:string, password:string, age:string){
    this.fireService.createCollection(email, password, age).then((res)=>{
      console.log(res);
      
    }, err=>{
      this.isErr = true;
      this.errMsg = err.message;
      console.log(err.message);
      setTimeout(() => {
        this.isErr = false;
      }, 5000);
    })
  }

  loadDataFromDB(){
     this.fireService.getData()
     this.fireService.data.subscribe((res)=>{
       this.userData = res;
       console.log(this.userData);
       
     })
    // this.userData = this.fireService.data
    // console.log(this.userData);
    
  }

  updateDataInDB(email:string, password:string, id:string){
    this.fireService.updateData(email, password, id).then((res)=>{
      this.email = email;
      this.password = password;
      console.log(res);
      console.log('data updated');
      
      
    }, err=>{
      console.log(err.message);
      
    })
  }

  updateAge(age:any, id:string){
    this.fireService.updateAge(age, id).then(()=>{
      this.age = age;
    })
  }

  deleteDatafromDB(id:string){
    this.fireService.deleteData(id).then((res)=>{
      console.log(res);
    })
  }

  filterByAge(age:number){
    this.fireService.filterByAge(age).then((res)=>{
      this.userData = res;
      
    })
  }

  filterByEmail(email:string){
    this.fireService.filterByEmail(email).then((res)=>{
      this.userData = res;
      
    })
  }

  isUserLoggedIn() {
    this.fireService.isLoggedIn()
  }

}
