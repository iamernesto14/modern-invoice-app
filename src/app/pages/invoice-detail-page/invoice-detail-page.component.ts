import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces/AppState.interface';
import { selectInvoice } from '../../state/invoice/selectors/loadData.selector';
import { CommonModule } from '@angular/common';
import { GoBackComponent } from '../../components/go-back/go-back.component';
import { ApplicationService } from '../../services/application.service';
import { StatusComponent } from "../../components/status/status.component";


@Component({
  selector: 'app-invoice-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink, GoBackComponent, StatusComponent],
  templateUrl: './invoice-detail-page.component.html',
  styleUrl: './invoice-detail-page.component.scss'
})
export class InvoiceDetailPageComponent implements OnInit {

  data$ = this.store.select(selectInvoice);

  constructor (
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private applicationService: ApplicationService,
  ) {};

  ngOnInit(): void {}

  edit () {
    console.log('..edit');
  }
  delete (id:string) {
    this.applicationService.displayDeleteModal(id);
    
  }
  markAsPaid () {
    console.log('..marking as paid')
  }
  
}
