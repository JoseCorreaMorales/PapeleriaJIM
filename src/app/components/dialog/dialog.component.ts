import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';/* formulario reactivo */
import { ApiService } from 'src/app/services/api.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableComponent } from '../table/table.component';
import * as jQuery from 'jquery';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  durationInSeconds = 5;
  itemList = ['Chico', 'Mediano', 'Grande']
  actionBtn : String = "Guardar"


  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  addForm !: FormGroup;
  tmpData: any;
  user = { id: 0, username: '', role: ''};

  constructor(private formBuilder: FormBuilder, private api: ApiService,
    private notify: MatSnackBar, private dialogRef : MatDialogRef<DialogComponent>,
     @Inject(MAT_DIALOG_DATA) public editData : any,

     ) { }

  ngOnInit(): void {

   this.api.userObs$.subscribe(user => {this.user = user;});
    let tmpData = {};
    /* formulario reactivo */
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      size: ['', Validators.required],
      price: ['', Validators.required],
      commentary: ['', Validators.required],
    })
    //console.log(this.editData)
    if (this.editData) {
      this.actionBtn = "Actualizar";
      this.addForm.controls['name'].setValue(this.editData.name);
      this.addForm.controls['category'].setValue(this.editData.category);
      this.addForm.controls['date'].setValue(this.editData.date);
      this.addForm.controls['size'].setValue(this.editData.size);
      this.addForm.controls['price'].setValue(this.editData.price);
      this.addForm.controls['commentary'].setValue(this.editData.commentary);
    }

  }





  addProduct(){
    if (!this.editData) {
      if(this.addForm.valid){
        //this.tmpData =JSON.parse(JSON.stringify(this.addForm.value))
       // jQuery.param(this.tmpData)
        //console.log("Parametros url "+jQuery.param(this.tmpData))
        //console.log(JSON.parse(JSON.stringify(this.addForm.value)))
        //this.api.postItem(this.addForm.value).subscribe({
          //this.api.postItem(JSON.parse(JSON.stringify(this.addForm.value))).subscribe({
          //console.log(this.addForm.value)
          //this.api.postItem(jQuery.param(this.tmpData)).subscribe({
          this.api.postItem(this.addForm.value).subscribe({
          next:(res)=>{
            //alert("Producto añadido")
           this.openNotification('Producto añadido', 'Cerrar')
           this.addForm.reset();
           this.dialogRef.close('guardar');

          },
          error:()=>{
            this.openNotification('Producto añadido correctamente', 'Cerrar')
          }
        })
      }
    }else{
      this.update();
    }
  }

  update(){
    this.api.putItem(this.addForm.value, this.editData.id).subscribe({
      next:(res) =>{
        this.openNotification('actualizado correctamente yeyy', 'cerrar')
        this.addForm.reset();
        this.dialogRef.close('actualizar');

      },
      error:(err) =>{
        this.openNotification('Opps algo salio mal..', 'cerrar')
        console.log(err);
        console.log(this.editData.id);
      }
    })
  }


  openNotification(message:string, action:string) {
    this.notify.open(message, action,  {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000
    });
    };


}
