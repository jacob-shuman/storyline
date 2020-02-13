import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user: any) {
    if (!user.nickName || !user.email || !user.password || !user.repeatPassword || !user.securityQuestion || !user.securityAnswer) {
      return false;
    }

    if (user.password !== user.repeatPassword) {
      return false;
    }

    return true;
  }

  validateEmail(email) {
    // tslint:disable-next-line: max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log("Match? ", re.test(email));
    console.log("Pass? ", !(!email || !re.test(email)));

    return email && re.test(email);
  }
}
