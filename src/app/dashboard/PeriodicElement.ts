

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

export interface dashboardDataEle {
  Invoice_Id: String
  Received_Date: String
  Source: String
  Status: String
  Vendor_Name: String
}

export interface documentDetailsEle {
  Billing_Address: { Label: String, Confidence: Number }
  Billing_address_Recipient: { Label: String, Confidence: Number }
  Customer_Name: { Label: String, Confidence: Number }
  Invoice_Date: { Label: String, Confidence: Number }
  Invoice_Id: { Label: String, Confidence: Number }
  Invoice_items: {}
  Subtotal: { Label: Number, Confidence: Number }
  Total_Tax: { Label: Number, Confidence: Number }
  Vendor_Name: { Label: String, Confidence: Number }
}