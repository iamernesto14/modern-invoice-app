import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-go-back',
  imports: [RouterLink],
  templateUrl: './go-back.html',
  styleUrl: './go-back.css'
})
export class GoBack {

}
