import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {
  
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  goToLogin() {
    this.router.navigate(['auth']);
  }
}
