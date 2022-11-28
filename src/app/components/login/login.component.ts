import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  username: string = "";
  password: string = "";



  constructor(private router: Router, private form: FormBuilder, private api: ApiService) {
    this.formLogin = this.form.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }


  /*  ingresar() {
     this.api.login(this.login).subscribe {
       data => {
         if (data['resultado']) == 'OK' {
           alert(datos['mensaje'])
         }else {
           alert(datos['mensaje'])
         }
       }
     };
 
   } */

  ingresar() {
    this.api.login(this.username, this.password).subscribe(
      response => {
        this.api.setUser(response.user);
        localStorage.setItem('token', response.token)
        this.router.navigate(['/table']);
        alert("Bienvenido " + this.username);        
    }, 
    error => {
       
      alert("Error credenciales incorrectas " + error)
    }

    );

  }












}


