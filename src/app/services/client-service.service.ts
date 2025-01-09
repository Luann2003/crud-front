import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  url = signal(environment.apiUrl)
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<{ content: any[] }> {
    const url = `${this.url()}/clients`;
    return this.httpClient.get<{ content: any[] }>(url) 
  }

  findById(id: number): Observable<any>{
    return this.httpClient.get<{ content: any[] }>(this.url() + `/clients/${id}`,);
  }

  insert(form: any): Observable<any>{
    return this.httpClient.post<any>(`${this.url()}/clients`, form,);
  }

  update(id: number, form: any): Observable<any> {
    return this.httpClient.put<any>(`${this.url()}/clients/${id}`, form);
  }

  delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.url()}/clients/${id}`)
  }
  
}
