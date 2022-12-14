import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'date', 'size', 'price', 'commentary', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dutarionInSeconds = 5;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  user = { id: 0, username: '', role: '' };

  constructor(public dialog: MatDialog,
    private snackBar: MatSnackBar,
    //private dialogRef : MatDialogRef<DialogComponent>, -------------BAD IDEA
    private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getAll();
    this.api.userObs$.subscribe(user => { this.user = user; });
    this.api.getUser()
  }



  /* openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
    this.dialog.open(DialogComponent, {
      width: '30%'
    } );
    .afterClosed().subscribe( result => {
      if (result === 'guardar') {
        this.getAll();
      }
    })
     
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
     if (result === 'guardar') {
        this.getAll();
     }
    });
  } */


  /*  openDialog() {
     const dialogRef = this.dialog.open(DialogComponent, {
       width: '30%'
     });
 
     dialogRef.afterClosed().subscribe(result =>{
       console.log(result);
       if (result === 'guardar') {
         this.getAll();
       }
     })
   } */

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(result => {
      if (result === 'guardar') {
        this.getAll();
        console.log('respuesta ' + result)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAll() {
    this.api.getItem().subscribe({
      next: (res) => {
        //console.log("response getAll "+ res)
        // console.log(res);
        //console.log(res.data); /* if we use pagination PHP returns a data[] */
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      error: (err) => {
        console.log(err)
      }
    })

  }

  edit(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(result => {
      if (result === 'actualizar') {
        this.getAll();
        console.log('respuesta ' + result)
      }
    })

  }

  delete(id: number) {
    // console.log(id)
    this.api.deleteItem(id).subscribe({
      next:(res)=>{
        this.openNotification("Elimanado correctamente",  "Cerrar")
        this.getAll();
      },
      error:(err)=>{
        this.openNotification("Algo salio mal ",  "Cerrar")
      }
    })

    /* this.api.deleteItem(id)
      .then((resp) => {
        resp.json()
      })
      .then((datos) => {
        this.openNotification("Elimanado correctamente", "Cerrar")
        this.getAll();
      })
      .catch((error) => {
        this.openNotification("Algo salio mal ", "Cerrar")
      }) */

  }



  openNotification(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.dutarionInSeconds * 1000
    });
  };

  /* edit(row : any){
   const dialogRef =  this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    });
  
    dialogRef.afterClosed().subscribe(result =>{
      console.log(result);
      if (result === 'actualizar') {
        this.getAll();
      }
    })
  
  } */
}
