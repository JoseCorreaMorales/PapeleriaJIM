import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


const JSON_SERVER = 'http://localhost:3000/productList/';

const URL = 'http://localhost/jim-rest/public/products/';

interface User {
  id: number,
  username: string,
  role: string
}

interface Login {
  user: User,
  token: string
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private user: User = { id: 0, username: '', role: '' };
  private userObs = new BehaviorSubject<User>(this.user);
  userObs$ = this.userObs.asObservable();

  constructor(private http: HttpClient) { }

  setUser(user: User) {
    localStorage.setItem('id', user.id.toString());
    localStorage.setItem('username', user.username);
    localStorage.setItem('role', user.role);

    this.user = user;
    this.userObs.next(this.user);
  }


  getUser() {
    this.user.id = parseInt(localStorage.getItem('id') || '0');
    this.user.username = (localStorage.getItem('username') || '');
    this.user.role = (localStorage.getItem('role') || '');

    return this.user;
  }

  login(user: string, pass: string) {
    return this.http.get<Login>('http://localhost/jim-rest/public/login', { params: { username: user, password: pass } });
  }




  postItem(data: any) {
    let datos = new FormData();
    datos.append("name", data.name)
    datos.append("category", data.category)
    datos.append("date", data.date)
    datos.append("size", data.size)
    datos.append("price", data.price)
    datos.append("commentary", data.commentary)
    console.log("data en la api " + data)
    return this.http.post<any>('http://localhost/jim-rest/public/products', datos
    );

  }

  getItem() {
    return this.http.get<any>('http://localhost/jim-rest/public/products',
    );
  }

  putItem(data: any, id: number) {
    let datos = new FormData()
    datos.append("name", "JOSE5")
    datos.append("category", "1st")
    datos.append("date", "Date")
    datos.append("size", "chico")
    datos.append("price", "111")
    datos.append("commentary", "aaa")

    datos.forEach(datos => {
      console.log(datos)
    });

    return this.http.put<any>('http://localhost/jim-rest/public/products/' + id, datos
      /* data [data.name,
      data.category,
      data.date,
      data.size,
      data.price,
      data.commentary
      ] */
    );


  }

  deleteItem(id: any) {
    const token = localStorage.getItem('token') || '';
    return this.http.delete<any>('http://localhost/jim-rest/public/products/' + id,
      { headers: { Authorizacion: token } }
    );
  }
}


/* {
      params: {
         id
      }
    } */
