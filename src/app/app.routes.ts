import { Routes } from '@angular/router';

// local imports
import { InvoicePageComponent } from './pages/invoice-page/invoice-page.component';
import { InvoiceDetailPageComponent } from './pages/invoice-detail-page/invoice-detail-page.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';

export const routes: Routes = [
    {
        path: '',
        component: InvoicePageComponent,
        title: 'Invoice',
    },
    {
        path: '',
        children: [
            {
                path: 'new-form',
                component: InvoiceFormComponent,
            },
            // {
            //     path: 'edit-form',
            //     component: InvoiceFormComponent,
            // },
        ]
    },
    {
        path: 'invoice',
        component: InvoiceDetailPageComponent,
        title: 'Invoice',
    },
    {
        path: 'invoice',
        children: [
            {
                path: 'edit-form',
                component: InvoiceFormComponent,
            },
        ]
    }
];
