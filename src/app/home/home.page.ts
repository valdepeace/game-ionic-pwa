import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  nick: string;
  form: FormGroup;
  constructor(private router: Router, private userService: UserService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.nick = '';
    this.form = this.formBuilder.group({
      nick: [null, [Validators.required]]
    });
    this.form.get('nick').setValue('');
  }

  logForm() {
    this.nick = this.form.get('nick').value;
    const currentUser = this.userService.getUserFromLocalStorage(this.nick);
    if (currentUser === null || currentUser === undefined) {
      this.userService.username = this.nick;
      this.userService.score = 0;
      this.userService.saveUserLocalStorage();
    }else{
      this.userService.setUserFromLocalStorage(this.nick);
    }
    this.userService.saveCurrentUser();
    this.router.navigate(['/game'],  {skipLocationChange: false});
  }

}
