import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
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
  //user = { id: 0, username: '', role: '' };

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  durationInSeconds = 5;


  constructor(private router: Router, private form: FormBuilder, private api: ApiService, private notify: MatSnackBar) {
    this.formLogin = this.form.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
   // this.api.setUser({ id: 0, username: '', role: '' });
  }


  ingresar() {
    this.api.login(this.username, this.password).subscribe(
      response => {
        this.api.setUser(response.user);
        localStorage.setItem('token', response.token)
        this.router.navigate(['/table']);
        this.notify.open("Bienvenido " +this.username, "Cerrar")
            
    }, 
    error => {
      this.notify.open("Error, el usuario" +this.username+" es incorrecto", "Cerrar")
    }

    );

  }


  openNotification(message:string, action:string) {
    this.notify.open(message, action,  {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000
    });
    };  
  












}


