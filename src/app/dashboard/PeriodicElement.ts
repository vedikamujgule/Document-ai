

export interface PeriodicElement {
  VendorName: { //vendor name
      Label: string,
      Confidence: any
  };
  VendorAddress: {
      Label: string,
      Confidence: any
  };
  CustomerName: {
      Label: string,
      Confidence: any
  };
  InvoiceId: { //document no
      Label: string,
      Confidence: any
  };
  InvoiceDate: {
      Label: string,
      Confidence: any
  };
    InvoiceTotal: {
      Label: any,
      Confidence: any
    };
    BillingAddress: {
      Label: string,
      Confidence: any
    };
    BillingAddressRecipient: {
      Label: string,
      Confidence: any
    };
    InvoiceItems: {};
    Subtotal: {
      Label: any,
      Confidence: any
    };
    TotalTax: {
      Label: any,
      Confidence: any
    };
    ApplicantEmail: {
      Label: any,
      Confidence: any
    };  
    Status: {
      Label: any,
      Confidence: any
    };
    Source: {
      Label: any,
      Confidence: any
    };
    updatedBy: {
      Label: any,
      Confidence: any
    };
    assignee: {
      Label: any,
      Confidence: any
    };
    DayCount: {
      Label: any,
      Confidence: any
    };
}
