import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';/* formulario reactivo */
import { ApiService } from 'src/app/services/api.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  durationInSeconds = 5;
  itemList = ['Chico', 'Mediano', 'Grande']
  

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  addForm !: FormGroup;


  constructor(private formBuilder: FormBuilder, private api: ApiService,
    private notify: MatSnackBar) { }

  ngOnInit(): void {
    /* formulario reactivo */
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      tamano: ['', Validators.required],
      precio: ['', Validators.required],
      commentary: ['', Validators.required],      
    })
  }


  
 

  addProduct(){
    if(this.addForm.valid){
      this.api.postItem(this.addForm.value).subscribe({
        next:(res)=>{
          //alert("Producto añadido")  
         this.openNotification('Producto añadido', 'Cerrar')      
        },
        error:()=>{
          this.openNotification('Error..', 'Cerrar')       
        }
      })
    }
  }


  openNotification(message:string, action:string) {
    this.notify.open(message, action,  {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000
    });
    };  


}
