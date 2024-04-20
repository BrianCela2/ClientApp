import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  standalone:true,
  imports:[CommonModule]
})
export class SpinnerComponent implements OnInit {
  constructor(public loader: LoaderService) { }
 ngOnInit(): void {
 }
}