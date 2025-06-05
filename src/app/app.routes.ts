import { Routes } from '@angular/router';

// local imports
import { InvoicePage } from './pages/invoice-page/invoice-page';
import { InvoiceDetailPage } from './pages/invoice-detail-page/invoice-detail-page';
import { InvoiceForm } from './components/invoice-form/invoice-form';

export const routes: Routes = [
    {
        path: '',
        component: InvoicePage,
        title: 'Invoice',
    },
    {
        path: '',
        children: [
            {
                path: 'new-form',
                component: InvoiceForm,
            },
            
        ]
    },
    {
        path: 'invoice',
        component: InvoiceDetailPage,
        title: 'Invoice',
    },
    {
        path: 'invoice',
        children: [
            {
                path: 'edit-form',
                component: InvoiceForm,
            },
        ]
    }
];
