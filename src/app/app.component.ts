import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

// local module imports
import { InvoicePageComponent } from './pages/invoice-page/invoice-page.component';
import { HeaderComponent } from './components/header/header.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { Store } from '@ngrx/store';
import { AppState } from './interfaces/AppState.interface';
import { onLoadDataAction } from './state/invoice/actions/loadData.action';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { ApplicationService } from './services/application.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterOutlet,
    InvoicePageComponent,
    HeaderComponent,
    InvoiceFormComponent,
    DeleteModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ngrx-invoice-app';
  isDeleteModalActive:Observable<boolean> = this.applicationService.isModalActive

  constructor(
    private store: Store<AppState>,
    private applicationService: ApplicationService,
  ) {
    
  }

  ngOnInit(): void {
    this.store.dispatch(onLoadDataAction());
  }
}
