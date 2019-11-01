import { Component } from '@angular/core';
import { User } from './_model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../src/app/_services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  addNewUserFlag: boolean;
  alreadyExists: boolean;
  filteredItems = [];
  title = 'Searching App';
  searchedIndex;
  searchResult: any;
  isUserAdded: boolean;

  //Validation 
  userRegisterForm: FormGroup;
  userRegisterSubmitted = false;
  userSearchForm: FormGroup;
  userSearchSubmitted = false;
  constructor(private userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.assignCopy();
    this.userRegisterForm = this.formBuilder.group({
      username: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]]
    });

    this.userSearchForm = this.formBuilder.group({
      mobileNumber: ['', Validators.required]
    });
  }

   // convenience getter for easy access to form fields
   get userRegisterFormControls() { return this.userRegisterForm.controls; }
   get userSearchFormControls() { return this.userSearchForm.controls; }

  assignCopy() {
    this.filteredItems = Object.assign([], this.userService.getAllUsers());
  }
  doSearch() {
    this.userSearchSubmitted = true;
    // stop here if form is invalid
    if (this.userSearchForm.invalid) {
        return;
    }
    this.searchResult = this.userService.getUserByPhoneNo(this.userSearchForm.controls.mobileNumber.value);
    if (this.searchResult != false) {
      this.filteredItems = [];
      this.filteredItems.push(this.searchResult);
    }
    else {
      this.addNewUserFlag = true;
      this.userRegisterForm.controls.mobileNumber.setValue(this.userSearchForm.controls.mobileNumber.value); 
    }
  }

  addUser() {
    this.userRegisterSubmitted = true;
    // stop here if form is invalid
    if (this.userRegisterForm.invalid) {
        return;
    }
    this.isUserAdded = this.userService.addUser(this.userRegisterForm.controls.username.value,this.userRegisterForm.controls.mobileNumber.value,this.userRegisterForm.controls.emailAddress.value);
    if (this.isUserAdded) {
      this.addNewUserFlag = false;
      this.userSearchSubmitted=false;
      this.userRegisterSubmitted=false;
      this.userRegisterForm.reset();
      this.userRegisterForm.reset();
      this.assignCopy();
    }
    else {
      this.alreadyExists = true;
    }
  }
  
  ListOfUsers() {
    this.alreadyExists = false;
    this.addNewUserFlag = false;
  }
}


