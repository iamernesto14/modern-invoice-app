# Modern Invoice App

A modern, responsive invoice management application built with Angular and NgRx. This app allows users to create, edit, and manage invoices, supporting features like itemized billing, client management, and status tracking.

## Setup & Run Instructions
1. **Prerequisites**:
   - Node.js (version 16.x or later)
   - Angular CLI (install globally: `npm install -g @angular/cli`)
2. **Clone the Repository**:
   ```bash
   git clone https://github.com/iamernesto14/modern-invoice-app.git
   cd invoice-app
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Run the Application**:
   ```bash
   ng serve
   ```
5. **Access the App**:
   - Open your browser and navigate to `http://localhost:4200`.

## Features

- Create, edit, and delete invoices
- Itemized invoice entries with quantity, price, and total calculation
- Client and sender address management
- Invoice status tracking (paid, pending, draft)
- Filter and search invoices by status
- Responsive design with light/dark mode support
- State management using NgRx (Store, Effects, Devtools)
- Data persistence via HTTP (mocked with local JSON for development)

## Project Structure

```
src/
  app/
    components/
      header/
      invoice-form/
      status/
      ...
    pages/
      invoice-page/
      invoice-detail-page/
      ...
    services/
    state/
      invoice/
        effects/
        reducers/
    interfaces/
    model/
    app.component.ts
    app.component.html
    app.config.ts
    app.routes.ts
  assets/
    data.json
    svgs/
  styles/
    _base.scss
    _variables.scss
  main.ts
  styles.scss
  index.html
```

## Usage

- **Create Invoice:** Click the "New Invoice" button, fill in the form, and submit.
- **Edit Invoice:** Click on an invoice in the list, then click "Edit".
- **Delete Invoice:** Click on an invoice, then click "Delete".
- **Filter:** Use the filter dropdown to view invoices by status.

## Technologies Used

- [Angular](https://angular.io/)
- [NgRx](https://ngrx.io/) (Store, Effects, Devtools)
- [SCSS](https://sass-lang.com/)
- [RxJS](https://rxjs.dev/)

## File Highlights

- **Invoice Form:** [`invoice-form.component.html`](src/app/components/invoice-form/invoice-form.component.html)  
  Handles both new and edit invoice forms, including dynamic item lists.
- **State Management:**  
  - Reducers: [`loadData.reducer.ts`](src/app/state/invoice/reducers/loadData.reducer.ts)
  - Effects: [`load-data.effect.ts`](src/app/state/invoice/effects/load-data.effect.ts)
- **App Configuration:** [`app.config.ts`](src/app/app.config.ts)
- **Styling:**  
  - Variables: [`_variables.scss`](src/styles/_variables.scss)
  - Base styles: [`_base.scss`](src/styles/_base.scss)
  - Main styles: [`styles.scss`](src/styles.scss)

## License

MIT License