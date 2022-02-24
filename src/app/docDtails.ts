import { PeriodicElement } from "./dashboard/PeriodicElement";

export const Data: PeriodicElement[] = [
    {
        VendorName: {Label: "Anfiled ", Confidence: 0.95
    },
        VendorAddress: {
            Label: "Anfiled 123 Klopp street Liverpool, UK, LIV456",
            Confidence: 0.95
        },
        CustomerName: {
            Label: "Phil foden Etihad stadium",
            Confidence: 0.874
        },
        InvoiceId: {
            Label: "00087",
            Confidence: 0.967
        },
        InvoiceDate: {
            Label: "12/16/2021",
            Confidence: 0.957
        },
        InvoiceTotal: {
            Label: 45678910,
            Confidence: 0.968
        },
        BillingAddress: {
            Label: "Manchester, UK MAN456",
            Confidence: 0.944
        },
        BillingAddressRecipient: {
            Label: "Phil foden Etihad stadium",
            Confidence: 0.874
        },
        InvoiceItems: {
            "Item#1": {
                Description: {
                    Label: "Your item name1",
                    Confidence: "0.885"
                },
                Quantity: {
                    Label: 1,
                    Confidence: 0.864
                },
                UnitPrice: {
                    Label: 452,
                    Confidence: 0.897
                },
                Amount: {
                    Label: 4526750,
                    Confidence: 0.961
                }
            },
            "Item#2": {
                Description: {
                    Label: " Your item name2",
                    Confidence: 0.88
                },
                Quantity: {
                    Label: 1,
                    Confidence: 0.792
                },
                UnitPrice: {
                    Label: 45,
                    Confidence: 0.899
                },
                Amount: {
                    Label: 450,
                    Confidence: 0.961
                }
            },
            "Item#3": {
                Description: {
                    Label: "Your item name3",
                    Confidence: 0.877
                },
                Quantity: {
                    Label: 1,
                    Confidence: 0.77
                },
                UnitPrice: {
                    Label: 780,
                    Confidence: 0.903
                },
                Amount: {
                    Label: 75785,
                    Confidence: 0.968
                }
            },

        },
        Subtotal: {
            Label: 789450,
            Confidence: 0.981
        },
        TotalTax: {
            Label: 4500,
            Confidence: 0.979
        },
        ApplicantEmail: {
            Label: 'Test@gmail.com',
            Confidence: 0.979
        },
        Status: {
            Label: 'Pending',
            Confidence: 0.979
        }
    },

];