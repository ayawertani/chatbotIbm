import { Component, ViewChild } from '@angular/core';
import {HttpClient  } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('apikey:gonGjOBnw_kd-DCPmduSpvPCzCInN-SM3W_u4H4lJTgn')
  })
};
const x='{"intent":"'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http:HttpClient){}
  d=[this.http.get('http://localhost:1000/diconnary')] ;
  title = 'PFA';
  @ViewChild('userPost') userPost: NgForm | undefined;

  onSubmit(form: NgForm) {
    console.log(form.value)
    const formData = (JSON.stringify(form.value));
    //console.log(formData);
    //console.log(JSON.parse(formData).question)
  this.http.post('https://api.au-syd.assistant.watson.cloud.ibm.com/instances/18b8007d-97e0-478d-9f54-27cc3bec8c2c/v1/workspaces/3756dbf5-ea5c-43cf-a0d2-81dfa1bbe60b/intents?version=2023-02-01'
    ,this.jsonIntent(JSON.parse(formData).dictionnary,JSON.parse(formData).question), httpOptions).subscribe((result: any) => {
     console.log(result);
   }, (error: any) => console.log('There was an error: '));
   this.http.post('https://api.au-syd.assistant.watson.cloud.ibm.com/instances/18b8007d-97e0-478d-9f54-27cc3bec8c2c/v1/workspaces/3756dbf5-ea5c-43cf-a0d2-81dfa1bbe60b/dialog_nodes?version=2023-02-01'
   ,this.jsonResponse(JSON.parse(formData).dictionnary,JSON.parse(formData).reponse), httpOptions).subscribe((result: any) => {
    console.log(result);
  }, (error: any) => console.log('There was an error: '));
 
  }
//   onSubmit(data:string)
//   { console.log(data);
//      this.http.post('https://api.au-syd.assistant.watson.cloud.ibm.com/instances/18b8007d-97e0-478d-9f54-27cc3bec8c2c/v1/workspaces/3756dbf5-ea5c-43cf-a0d2-81dfa1bbe60b/intents/hi?version=2023-02-01'
//   ,this.jsonIntent(JSON.parse(data.toString().replace("'", "\"")).dictionnary,JSON.parse(data).question), httpOptions).subscribe((result: any) => {
//     console.log(result);
//   }, (error: any) => console.log('There was an error: '));
// }
  
 jsonIntent(dict:string,userInput:string):string {
    return '{"intent":"'+dict+'","examples":[{"text":"'+userInput+'"}]}'
    
  }
  jsonResponse(dict:string,ChatbotOutput:string):string {
    return '{"dialog_node": "dialog_node","conditions":"#'+dict+'", "output":{"generic": [{"response_type":"text", "values":[ {"text":"'+ChatbotOutput+'"}] } ] }, "title":"'+dict+'"}' 
  }
}
