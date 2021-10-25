import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showContent: Boolean = false;

  constructor(private titleService: Title, private spinnerService: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("Biblioteca Digital | Inicio")
    this.Spinner();
  }

  Spinner(){
    this.spinnerService.show('main');
    setTimeout(() => {this.showContent = true; this.spinnerService.hide('main')}, 500)
  }

}
