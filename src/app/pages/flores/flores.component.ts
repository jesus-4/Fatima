import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flores',
  imports: [],
  templateUrl: './flores.component.html',
  styleUrl: './flores.component.css',
  standalone: true
})
export class FloresComponent implements OnInit {
  ngOnInit(): void {
  //   const c = setTimeout(() => {
  //     document.body.classList.remove('not-loaded');
  //     clearTimeout(c);
  //   }, 1000);
  }
}
