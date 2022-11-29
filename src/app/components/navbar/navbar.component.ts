import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user = { id: 0, username: '', role: '' };

  constructor(private api : ApiService, private router : Router) { }

  ngOnInit(): void {
    this.user = this.api.getUser();
    this.api.getUser();
    this.api.userObs$.subscribe(
      user => {
        this.user = user;
      }
    );
  }

  salir() {
    this.api.setUser({ id: 0, username: '', role: '' });
    this.router.navigate(["/login"])
  }
}
