import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class ComuRestService {
    private url='http://localhost/mda/help-back/public/api';
   
    constructor(private http: HttpClient) { }
  
  

    get(url:string): Observable<any> {
      return this.http.get(this.url+url);
    }
    
    edit(id: number): Observable<any> {
      return this.http.get(this.url+id);
    }
  
    update(form:any,id:any): Observable<any> {
      return this.http.put(this.url + id, form.value);
    }
  
    store(form:any): Observable<any> {
      return this.http.post(this.url,form.value);
    }
  
    delete(id:number): Observable<any> {
      return this.http.delete(this.url+ id);
    }
  
  }
  