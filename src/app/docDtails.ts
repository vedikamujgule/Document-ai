import { PeriodicElement } from "./dashboard/PeriodicElement";

export const Data: PeriodicElement[] = [
    {
        VendorName: {
            Label: "CONTOSO LTD. ", Confidence: 0.95
        },
        VendorAddress: {
            Label: "123 456th St New York, NY, 10001",
            Confidence: 0.65
        },
        CustomerName: {
            Label: ":MICROSOFT CORPORATION",
            Confidence: 0.874
        },
        InvoiceId: {
            Label: "INV-100",
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
            Item: {
                Description: {
                    Label: "Test for 23 fields",
                    Confidence: 0.899
                },
                Quantity: {
                    Label: 1,
                    Confidence: 0.885
                },
                UnitPrice: {
                    Label: 1,
                    Confidence: 0.682
                },
                Amount: {
                    Label: 100,
                    Confidence: 0.902
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
            Label: 'pending',
            Confidence: 0.979
        },
        Source: {
            Label: 'Email',
            Confidence: 0.979
        },
        updatedBy: {
            Label: 'User 3',
            Confidence: 0.979
        },
        assignee: {
            Label: 'User 4',
            Confidence: 0.979
        }, DayCount: {
            Label: 10, Confidence: 0.95
        },
    },
    {
        VendorName: {
            Label: "Vendor  ", Confidence: 0.95
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
            Label: "00088",
            Confidence: 0.667
        },
        InvoiceDate: {
            Label: "12/24/2021",
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
            Label: 'TestVendor@gmail.com',
            Confidence: 0.979
        },
        Status: {
            Label: 'approved',
            Confidence: 0.979
        },
        Source: {
            Label: 'Manual Upload',
            Confidence: 0.979
        },
        updatedBy: {
            Label: 'User ',
            Confidence: 0.979
        },
        assignee: {
            Label: 'User  2',
            Confidence: 0.979
        }, DayCount: {
            Label: 3, Confidence: 0.95
        },
    },
    {
        VendorName: {
            Label: "Vendor  3", Confidence: 0.95
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
            Label: "00089",
            Confidence: 0.667
        },
        InvoiceDate: {
            Label: "12/14/2021",
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
            Label: 'angent@gmail.com',
            Confidence: 0.979
        },
        Status: {
            Label: 'rejected',
            Confidence: 0.979
        },
        Source: {
            Label: 'Manual Upload',
            Confidence: 0.979
        },
        updatedBy: {
            Label: 'Vendor ',
            Confidence: 0.979
        },
        assignee: {
            Label: 'User 12',
            Confidence: 0.979
        }, DayCount: {
            Label: 3, Confidence: 0.95
        },
    },
    {
        VendorName: {
            Label: "Vendor User 3", Confidence: 0.95
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
            Label: "00090",
            Confidence: 0.667
        },
        InvoiceDate: {
            Label: "12/4/2021",
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
            Label: 'angent4@gmail.com',
            Confidence: 0.979
        },
        Status: {
            Label: 'onhold',
            Confidence: 0.979
        },
        Source: {
            Label: 'Email',
            Confidence: 0.979
        },
        updatedBy: {
            Label: 'User 45',
            Confidence: 0.979
        },
        assignee: {
            Label: 'User 3',
            Confidence: 0.979
        }, DayCount: {
            Label: 3, Confidence: 0.95
        },
    },
    {
        VendorName: {
            Label: "Vendor 1 ", Confidence: 0.95
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
            Label: "00091",
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
            Label: 'pending',
            Confidence: 0.979
        },
        Source: {
            Label: 'Email',
            Confidence: 0.979
        },
        updatedBy: {
            Label: 'User 3',
            Confidence: 0.979
        },
        assignee: {
            Label: 'User 4',
            Confidence: 0.979
        }, DayCount: {
            Label: 10, Confidence: 0.95
        },
    },
    {
        VendorName: {
            Label: "Vendor  ", Confidence: 0.95
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
            Label: "00092",
            Confidence: 0.667
        },
        InvoiceDate: {
            Label: "12/24/2021",
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
            Label: 'TestVendor@gmail.com',
            Confidence: 0.979
        },
        Status: {
            Label: 'approved',
            Confidence: 0.979
        },
        Source: {
            Label: 'Manual Upload',
            Confidence: 0.979
        },
        updatedBy: {
            Label: 'User ',
            Confidence: 0.979
        },
        assignee: {
            Label: 'User  2',
            Confidence: 0.979
        }, DayCount: {
            Label: 3, Confidence: 0.95
        },
    },
    {
        VendorName: {
            Label: "Vendor  3", Confidence: 0.95
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
            Label: "00093",
            Confidence: 0.667
        },
        InvoiceDate: {
            Label: "12/14/2021",
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
            Label: 'angent@gmail.com',
            Confidence: 0.979
        },
        Status: {
            Label: 'rejected',
            Confidence: 0.979
        },
        Source: {
            Label: 'Manual Upload',
            Confidence: 0.979
        },
        updatedBy: {
            Label: 'Vendor ',
            Confidence: 0.979
        },
        assignee: {
            Label: 'User 12',
            Confidence: 0.979
        }, DayCount: {
            Label: 3, Confidence: 0.95
        },
    },
    {
        VendorName: {
            Label: "Vendor User 3", Confidence: 0.95
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
            Label: "00094",
            Confidence: 0.667
        },
        InvoiceDate: {
            Label: "12/4/2021",
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
            Label: 'angent4@gmail.com',
            Confidence: 0.979
        },
        Status: {
            Label: 'onhold',
            Confidence: 0.979
        },
        Source: {
            Label: 'Email',
            Confidence: 0.979
        },
        updatedBy: {
            Label: 'User 45',
            Confidence: 0.979
        },
        assignee: {
            Label: 'User 3',
            Confidence: 0.979
        }, DayCount: {
            Label: 3, Confidence: 0.95
        },
    },
];

export const Data1: PeriodicElement[] = [
    {
        VendorName: {
            Label: "CONTOSO LTD.", Confidence: 0.95
        },
        VendorAddress: {
            Label: "123 456th St New York, NY, 10001",
            Confidence: 0.65
        },
        CustomerName: {
            Label: "MICROSOFT CORPORATION",
            Confidence: 0.874
        },
        InvoiceId: {
            Label: "INV-100",
            Confidence: 0.967
        },
        InvoiceDate: {
            Label: "11/15/2019",
            Confidence: 0.957
        },
        InvoiceTotal: {
            Label: 45678910,
            Confidence: 0.968
        },
        BillingAddress: {
            Label: "123 Bill St, Redmond WA, 98052",
            Confidence: 0.944
        },
        BillingAddressRecipient: {
            Label: "Microsoft Finance",
            Confidence: 0.874
        },
        InvoiceItems: {
            Item: {
                Description: {
                    Label: "Test for 23 fields",
                    Confidence: 0.899
                },
                Quantity: {
                    Label: 1,
                    Confidence: 0.885
                },
                UnitPrice: {
                    Label: 1,
                    Confidence: 0.682
                },
                Amount: {
                    Label: 100,
                    Confidence: 0.902
                }
            
            },
            Item2: {
                Description: {
                    Label: "Test for 23 fields",
                    Confidence: 0.899
                },
                Quantity: {
                    Label: 1,
                    Confidence: 0.885
                },
                UnitPrice: {
                    Label: 1,
                    Confidence: 0.682
                },
                Amount: {
                    Label: 100,
                    Confidence: 0.902
                }
            
            },

        },
        Subtotal: {
            Label: 100,
            Confidence: 0.979
        },
        TotalTax: {
            Label: 10,
            Confidence: 0.979
        },
        ApplicantEmail: {
            Label: 'Test@gmail.com',
            Confidence: 0.979
        },
        Status: {
            Label: 'pending',
            Confidence: 0.979
        },
        Source: {
            Label: 'Email',
            Confidence: 0.979
        },
        updatedBy: {
            Label: 'User 3',
            Confidence: 0.979
        },
        assignee: {
            Label: 'User 4',
            Confidence: 0.979
        }, DayCount: {
            Label: 10, Confidence: 0.95
        },
    }
];