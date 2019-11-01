/**
 * Created by Rashmi Chauhan  on 31/10/2019.
 */
import {Injectable} from '@angular/core';
import { User } from '../_model/user';

@Injectable()
export class UserService {

    users = [
        { id: 1, name: 'Renu', mobile: '9595148291', email: 'renu@gmail.com'  },
        { id: 2, name: 'Rashmi' , mobile: '9595148111', email: 'rashmi@gmail.com'}
      ];

  constructor() {
  }

  getAllUsers()
  {
    return this.users;
  }

  getUserByPhoneNo(number)
  {
      for (var j=0; j<this.users.length; j++) {
        if (this.users[j].mobile.match(number)) {
          return this.users[j];
          break;
        } else{
          return false;
        }

    }
  }

  addUser(usr,mob,email)
  {
    var isPresent = this.users.some(function(el){ return el.mobile === mob});
    if (!isPresent) {
      let id=this.users.length+1;
      let newUser = new User(id,usr,mob,email);
      this.users.push(newUser);
        return true;
    } else {
        return false;
      }
  }

}