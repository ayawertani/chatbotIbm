import { Component } from '@angular/core';
import {HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http:HttpClient){}
  d=[this.http.get('http://localhost:1000/diconnary')] ;
  title = 'PFA';
  onSubmit(data:any)
  { this.http.post('http://localhost:1000/diconnary/....',data)
  .subscribe(()=>console.warn)
    console.warn(data);
  }
}
