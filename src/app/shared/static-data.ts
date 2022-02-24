
export class StaticData {

  public static dashboard_static_data = [
    {fileNo: 12345670, fileName: 'Master Rec - 12345670', applicantEmail: 'abc@gmail.com', submitDate: 'Jan 21, 2021', status:'approved'},
    {fileNo: 12345671, fileName: 'Master Rec - 12345671', applicantEmail: 'abc@gmail.com', submitDate: 'Jan 21, 2021', status:'pending'},
    {fileNo: 12345672, fileName: 'Master Rec - 12345672', applicantEmail: 'abc@gmail.com', submitDate: 'Jan 21, 2021', status:'approved'},
    {fileNo: 12345673, fileName: 'Master Rec - 12345673', applicantEmail: 'abc@gmail.com', submitDate: 'Jan 21, 2021', status:'reject'},
    {fileNo: 12345674, fileName: 'Master Rec - 12345674', applicantEmail: 'abc@gmail.com', submitDate: 'Jan 21, 2021', status:'approved'},
    {fileNo: 12345675, fileName: 'Master Rec - 12345675', applicantEmail: 'abc@gmail.com', submitDate: 'Jan 21, 2021', status:'reject'},
    {fileNo: 12345676, fileName: 'Master Rec - 12345676', applicantEmail: 'abc@gmail.com', submitDate: 'Jan 21, 2021', status:'approved'},
    {fileNo: 12345677, fileName: 'Master Rec - 12345677', applicantEmail: 'abc@gmail.com', submitDate: 'Jan 21, 2021', status:'approved'},
    {fileNo: 12345678, fileName: 'Master Rec - 12345678', applicantEmail: 'abc@gmail.com', submitDate: 'Jan 21, 2021', status:'pending'},
    {fileNo: 12345679, fileName: 'Master Rec - 12345679', applicantEmail: 'abc@gmail.com', submitDate: 'Jan 21, 2021', status:'approved'},
    {fileNo: 12345680, fileName: 'Master Rec - 12345680', applicantEmail: 'abc@gmail.com', submitDate: 'Jan 21, 2021', status:'approved'},
    {fileNo: 12345682, fileName: 'Master Rec - 12345681', applicantEmail: 'abc@gmail.com', submitDate: 'Jan 21, 2021', status:'reject'},

  ];

  public static statusTypes = [
    {id:"0",value:'Pending'},
    {id:"1",value:'On-Hold'},
    {id:"2",value:'Approved'},
    {id:"3",value:'Rejected'}
];

public static dashboardColumnMapping = {
	"pageType": "app_dashboard",
	"columnMappings": {
		"dayCount": "Day Count",
		"updatedBy": "Last Updated By",
		"fileNo": "Serial No",
		"actionBy": "Action By",
		"applicantName": "Applicant Name",
		"submitDate": "Received Date",
		"applicantEmail": "Applicant Email",
		"phoneNo": "Phone No",
		"status": "Status",
    "fileSource":"Source",
    "assignedTo":"assignee",
	}
}

  public static userDefaultPreferences = {
    "columnPreferencesList": [
      {
        "pageType": "app_dashboard",
        "preferredColumnList": [
          "select",
          "fileNo",
          "applicantEmail",
          "applicantName",
          "phoneNo",
          "submitDate",
          "duration",
          "fileSource",
          "updatedBy",
          "status",
          "assignedTo"
        ]
      }
    ]
  }

  public static userRoles = [
    {
      "roleId": "admin",
      "role": "Administrator"
    },
    {
      "roleId": "manager",
      "role": "Manager"
    },
    {
      "roleId": "agent",
      "role": "Agent"
    }
  ]

  public static radioList: [
    {"name": "Yes", ID: "true", "checked": false},
    {"name": "No", ID: "false", "checked": true}
  ]

  public static testPaginatedResponse={
    "content": [
      // {
      //   "name": "test_name_1",
      //   "description": "test_description",
      //   "id": 1
      // }
    ],
    "pageable": {
      "pageSize": 3, // set it what you got from front end
      "pageNumber": 0,
      "offset": 0,
      //"unpaged": false,
      //"paged": true
    },
    "last": false, // if page!= totalElements
    "totalRecords": 4, // total no of elements - list.size
    "totalPages": 4,
    "first": true, // if page !=0
    //"numberOfElements": 3, // fetched currentArraySize, like 3, 10,20 - to remove
    //"size": 3, // elements per page - to remove
    //"number": 0
  }
}