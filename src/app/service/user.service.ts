import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  username: string;
  score: number;
  change: Subject<boolean> = new Subject<boolean>(); // observing that bool
  constructor() {
  }

  saveUserLocalStorage(){
    const str = window.localStorage.getItem('users');
    let users = this.getAllUsers();
    try{
      if (users === null || users === undefined){
        users = {};
      }else{
        users = JSON.parse(str);
      }
      users[this.username] = {
          username: this.username,
          score: this.score || 0
      };
      window.localStorage.setItem('users', JSON.stringify(users));
      this.change.next();
    }catch(ex){
      console.log(ex);
    }
  }

  getUserFromLocalStorage(username){
    let str = window.localStorage.getItem('users');
    if (str === null) {
      this.username = username;
      this.saveUserLocalStorage();
      str = window.localStorage.getItem('users');
    }
    let users;
    try{
      users = JSON.parse(str);
    }catch(ex){
      console.log(ex);
    }
    return users[username];
  }

  setUserFromLocalStorage(username){
    const str = window.localStorage.getItem('users');
    let users;
    try{
      users = JSON.parse(str);
      this.username = users[username].username;
      this.score = users[username].score || 0;
      this.change.next();
    }catch(ex){
      console.log(ex);
    }

  }
  saveCurrentUser(){
    window.localStorage.setItem('current_user', JSON.stringify({
      username: this.username,
      score: this.score
    }));
  }
  setCurrentUser(currentUser){
    const str = window.localStorage.getItem(currentUser);
    let users;
    let current;
    let user;
    try{
      current = JSON.parse(str);
      users = this.getAllUsers();
      current = JSON.parse(str);
      if(users === null){
        this.username = current.username;
        this.score = current.score || 0;
      }else{
        user = users[current.username];
        this.username = user.username;
        this.score = user.score || 0;
      }
      this.change.next();
      return true;
    }catch(ex){
      console.log(ex);
      return false;
    }
  }
  getAllUsers(){
    const str = window.localStorage.getItem('users');
    let users: any;
    try{
      users = JSON.parse(str);
      return users;
    }catch(ex){
      console.log(ex);
    }
  }
}
