import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  validationErrors:string[]=[];
  baseURL="https://localhost:5001/api/"
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }
  get404Error(){
    this.http.get(`${this.baseURL}buggy/not-found`).subscribe(respons=>{
      console.log(respons);
    },error=>{
    console.error(error);
    });
  }

  get400Error(){
    this.http.get(`${this.baseURL}buggy/bad-request`).subscribe(respons=>{
      console.log(respons);
    },error=>{
    console.error(error);
    });
  }

  get500Error(){
    this.http.get(`${this.baseURL}buggy/server-error`).subscribe(respons=>{
      console.log(respons);
    },error=>{
    console.error(error);
    });
  }

  get401Error(){
    this.http.get(`${this.baseURL}buggy/auth`).subscribe(respons=>{
      console.log(respons);
    },error=>{
    console.error(error);
    });
  }

  get400ValidationError(){
    this.http.post(`${this.baseURL}account/register`,{}).subscribe(respons=>{
      console.log(respons);
    },error=>{
    console.error(error);
    this.validationErrors=error;
    });
  }
}
