import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterLink, Router, Route } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { AppState } from '../../interfaces/AppState.interface';
import { deleteInvoice } from '../../state/invoice/actions/loadData.action';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {

  invoiceId!:string;

  constructor (
    private applicationService: ApplicationService,
    private store: Store<AppState>,
    private router: Router,
  ) {};

  cancelDeletion () {
    this.applicationService.removeDeleteModal();
  }
  
  confirmDeletion () {
    this.applicationService.removeDeleteModal();
    const id = this.applicationService.id;
    
    this.store.dispatch(deleteInvoice({id}));
    this.router.navigate([ '' ]);

  }



}
