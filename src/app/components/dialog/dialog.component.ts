import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';/* formulario reactivo */
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  itemList = ['1st op', '2nd op', '3th op']

  addForm !: FormGroup;


  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    /* formulario reactivo */
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],/*  */
      category: ['', Validators.required],/*  */
      radioType: ['', Validators.required],/*  */
      comentario: ['', Validators.required],/*  */
      number: ['', Validators.required],/*  */
      date: ['', Validators.required]/*  */

    })
  }
 /* console.log(this.addForm.value); */
  /* addItem() {
   
    if (this.addForm.valid) {
      this.api.postItem(this.addForm.value);
      .subscribe({
        next: (resposnse) => {
          alert("");
        }
      })

    }
  } */

  addItem(){
    console.log(this.addForm.value);
    if(this.addForm.valid){
      this.api.postItem(this.addForm).subscribe(
       response =>{
          alert("Producto agregado");
        },
        e =>{
          alert("error");
        }
        
      );
    }
  }


}