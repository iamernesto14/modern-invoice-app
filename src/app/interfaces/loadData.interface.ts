export interface LoadDataInterface {
    id: string;
    createdAt: string;
    paymentDue: string;
    description: string;
    paymentTerms: number;
    clientName: string;
    clientEmail: string;
    status: string;
    senderAddress: SenderAddress;
    clientAddress: ClientAddress;
    items: Items[];
    total: number;
}

interface SenderAddress {
    street: string,
    city: string,
    postCode: string,
    country: string;
}

interface ClientAddress {
    street: string,
    city: string,
    postCode: string,
    country: string;
}

interface Items {
    name: string,
    quantity: number,
    price: number,
    total: number;
}


