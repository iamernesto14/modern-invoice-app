import { Component, Input } from '@angular/core';
import { NgStyle, NgClass } from '@angular/common';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {

  @Input () status!:string;

}
