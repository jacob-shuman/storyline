import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  url = 'http://echo.jsontest.com/key/value/one/two';
  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  onLoginSubmit() {
    this.http.get(this.url).toPromise().then(data => {
      console.log(data);
    });
  }

}
