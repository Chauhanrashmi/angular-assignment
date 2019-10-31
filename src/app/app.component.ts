import { Component } from '@angular/core';
import {User} from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  successFlag:boolean;
  addNewUserFlag:boolean;
  alreadyExists:boolean;
  filteredItems=[];
  title = 'appDemo';
  searchedIndex;
  users = [
    { id: 1, name: 'Renu', mobile: '9595148291', email: 'renu@gmail.com'  },
    { id: 2, name: 'Rashmi' , mobile: '9595148111', email: 'rashmi@gmail.com'}
  ];
  constructor() { }    
    
  ngOnInit() {
    this.assignCopy();
  } 
  assignCopy(){
    this.filteredItems = Object.assign([], this.users);
 }
  doSearch(number: string) {

    if (!number){
      this.addNewUserFlag=true;
    } else {
      for (var j=0; j<this.users.length; j++) {
        if (this.users[j].mobile.match(number)) {
          this.successFlag=true;
          this.searchedIndex=j;
          break;
        } else{
          this.successFlag=false;
        }

    }
    if (this.successFlag) {
      this.filteredItems=[];
      this.filteredItems.push(this.users[this.searchedIndex]);
      this.searchedIndex=null;
      this.addNewUserFlag=false;
    } else {
      this.addNewUserFlag=true;
    }
    }
  
  }
  addUser(usr,mob,email) {
    var isPresent = this.users.some(function(el){ return el.mobile === mob});
    if (!isPresent) {
      let id=this.users.length+1;
      let newUser = new User(id,usr,mob,email);
      this.users.push(newUser);
      this.addNewUserFlag=false;
      this.assignCopy();
    } else {
      this.alreadyExists=true;
    }
    
  }
  ListOfUsers() {
    this.alreadyExists=false;
    this.addNewUserFlag=false;
  }
}


