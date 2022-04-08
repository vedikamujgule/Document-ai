import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { APPCONFIG } from '../config/config';
import { CommonService } from '../shared/common.service';
import { StaticData } from '../shared/static-data';
import { AuthService } from './../auth/auth.service';
import {  dashboardDataEle, PeriodicElement } from './PeriodicElement';
import $ from 'jquery';
import { AlertService } from '../alert-dialog/alert.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from '../shared/dialog.service';
import { DataService } from '../shared/data.service';
import { Page } from '../paginate/Page';
import { Project } from '../paginate/project';
import { PaginateService } from '../paginate/service/paginate.service';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Data } from '../docDtails';
import { fields } from '../data';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // displayedColumns: string[] = ['select', 'InvoiceId', 'applicantEmail', 'applicantName', 'phoneNo', 'submitDate', 'duration', 'fileSource', 'updatedBy', 'status', 'assignedTo'];
  displayedColumns: string[] = [ 'Invoice_Id', 'Received_Date', 'Source', 'Status','Vendor_Name'];
  fileRecords: any = [];
  allParsedForms: any = [];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  parsedFormsDataSource = new MatTableDataSource<PeriodicElement>([]);
  selection = new SelectionModel < PeriodicElement > (true, []);
  dashboardDataSource = new MatTableDataSource<dashboardDataEle>([]);
  connectionIds: any = [];
  agents: any = [];
  pageSize:number = 10;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  isLoggedIn$!: Observable<boolean>;
  accessToken: String | undefined;
  apiUrl: String;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(new Date())
  });
  columnsToDisplay: any = ['InvoiceId', 'VendorName','InvoiceDate','Status', 'Source', 'updatedBy', 'assignee'];
  advancedSearchForm: any;
  startCalDate: any;
  endCalDate: any;
  //identify which required, otherwise delete it
  value = 'Clear me';
  @ViewChild('select')
  select!: MatSelect;
  columnsOption: any = [];
  @ViewChild(MatSort) sort: MatSort | any;
  allSelected = false;
  statusType: any;
  installationType: any;
  status: any;
  mainFilter = true;
  dropdownSettings: any;
  columnMappingsData: any = {};
  userId: any;
  preferenceSelected = false;
  columnFilterControl = new FormControl([]);
  pageType = 'app_dashboard';
  page: Page<Project> = new Page();
  pageData: any;
  noRecordsFound: boolean = true;
  filterApplied: boolean = false;
  isAdminOrManager: boolean | false;
  dialogRef: any;
  dashboardData: any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(public dialog: MatDialog, private authService: AuthService,
    private router: Router,
    private commonService: CommonService,
    private loader: NgxUiLoaderService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private alertService: AlertService,
    private dialogService: DialogService,
    private dataService: DataService,
    private paginationService: PaginateService
  ) {
    this.advancedSearchForm = this.formBuilder.group({
      label: [''],
      value: ['']
    });
  }


  ngOnInit(): void {  
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.accessToken = sessionStorage.getItem(APPCONFIG.token_key);
    this.apiUrl = APPCONFIG.appUrl;
    let role = sessionStorage.getItem(APPCONFIG.role_key);
    if ((role == 'admin') || (role == 'manager')) {
      this.isAdminOrManager = true;
    }
    this.fileRecords = Data;
    this.pageData = Data;
    this.dataSource = new MatTableDataSource<PeriodicElement>(Data);
    console.log(this.fileRecords);
    
    this.filterApplied = true;
    this.getDashboardData();
    // this.initializeDropdownSettings();
    // this.statusType = StaticData.statusTypes;
    // this.getUserColumnMaping();
  }

  updateDisplayedColumnsStorage() {
    sessionStorage.setItem('dashboard_pref', this.columnsToDisplay.toString());
  }

  initializeDropdownSettings() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: false
    };
  }

  onLogout() {
    this.authService.logout();
  }

  uploadNewFile() {
    this.dialogService.openFileUploadDialogBox();
  }

  fetchFormDetails(InvoiceId, type: string) {
    // sessionStorage.removeItem(APPCONFIG.fileStorageId);
    this.dataService.changeMessage(InvoiceId);
    this.loader.start();
    this.router.navigate([`/forms/${InvoiceId}`]);
    
    // if(type.toLowerCase() == 'email'){
    //   this.router.navigate(['/email-forms']);
    // }
    // else if(type.toUpperCase() == 'WEB_FORM'){
    //   this.router.navigate(['/ns-form-detail']);
    // }else{
    //   this.router.navigateByUrl('/dashboard/form-detail/' );

    // }
  }

  fetchAllAgents() {
    this.loader.start();
    this.http.get(this.apiUrl + '/user/list/agent?access_token=' + this.accessToken).subscribe((data: any) => {
        this.agents = data;
        this.loader.stop();
    },
      error => {
        this.commonService.displayShortMessage("There is some error, please contact administrator.", 3000);
        this.loader.stop();
      })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = !!this.dataSource && this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(r => this.selection.select(r));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(element: PeriodicElement): string {
    if (!element) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(element) ? 'deselect' : 'select'} row ${element.InvoiceId.Label + 1}`;
  }

  //advance filter
  addColumn() {
    this.columnFilterControl.value.forEach((element: any) => {
      if (!this.columnsToDisplay.includes(element)) {

        if (element == 'InvoiceId') {
          this.columnsToDisplay.unshift(element);
        } else {
          this.columnsToDisplay.push(element);
        }
        if (!this.columnsToDisplay.includes('InvoiceId')) {
          this.columnsToDisplay.unshift('InvoiceId')
        }
      }
    });
    setTimeout(() => {
      if (!this.columnsToDisplay.includes('status')) {
        this.columnsToDisplay.push('status');
      } else {
        let index = this.columnsToDisplay.indexOf('status');
        this.columnsToDisplay.splice(index, 1);
        this.columnsToDisplay.push('status');
      }
    })
    this.updateDisplayedColumnsStorage();
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      console.log(this.columnsToDisplay)
      console.log(this.columnFilterControl.value);
      let columnsToDisplay = JSON.parse(JSON.stringify(this.columnsToDisplay));
      this.columnsToDisplay.forEach((element: any, index: any) => {
        if (!this.columnFilterControl.value.includes(element)) {
          console.log(index, this.columnsToDisplay[index])
          let i = columnsToDisplay.indexOf(element);
          if (i !== -1) {
            columnsToDisplay.splice(i, 1);
          }
        }
        if (this.columnFilterControl.value.length == 0) {
          this.columnsToDisplay = [];
        }
      });
      console.log(this.columnsToDisplay)
      this.columnsToDisplay = columnsToDisplay;

      console.log(this.columnsToDisplay)
      if (!this.columnsToDisplay.includes('InvoiceId')) {
        this.columnsToDisplay.unshift('InvoiceId');
      }
      if (!this.columnsToDisplay.includes('status')) {
        this.columnsToDisplay.push('status');
      } else {
        let index = this.columnsToDisplay.indexOf('status');
        this.columnsToDisplay.splice(index, 1);
        this.columnsToDisplay.push('status');
      }
    }
    this.updateDisplayedColumnsStorage();
  }

  initialSelect() {
    this.select.options.forEach((item: MatOption) => {
      if (this.columnsToDisplay.includes(item.value)) {
        item.select()
      }
    });
    if (this.columnsToDisplay.length == this.displayedColumns.length) {
      this.allSelected = true;
    }
    this.onAdvancedFilterModelClosed();

  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
      this.addColumn();
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
      this.columnsToDisplay = ['select','InvoiceId', 'status'];
    }
  }

  optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
    this.addColumn();
    this.removeColumn();
  }
  onColumnRemoved(col: string) {
    const cols = this.columnFilterControl.value as string[];
    this.removeFirst(cols, col);
    this.columnFilterControl.setValue(cols); // To trigger change detection
    this.allSelected = false;
    this.removeColumn();
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  getUserColumnMaping() {
    let data = StaticData.dashboardColumnMapping;
    if (!this.preferenceSelected) {
      this.getUserColumnPref();
    }
    this.columnMappingsData = data.columnMappings
    this.columnsOption = this.displayedColumns;
    this.updateDisplayedColumnsStorage();
  }

  getUserColumnPref() {

    let data = StaticData.userDefaultPreferences;
    data.columnPreferencesList.forEach((list: any) => {
      if (list.pageType == this.pageType) {
        console.log(list.preferredColumnList[0] == "")
        if (list.preferredColumnList.length == 0 || list.preferredColumnList[0] == "") {
          this.displayedColumns.forEach((element: any) => {
            if (element != 'status') {
              this.columnsToDisplay.push(element);
            }
          })
        } else {
          list.preferredColumnList.forEach((element: any) => {
            if (element == 'select') {
              this.columnsToDisplay.unshift(element);
            } else {
              this.columnsToDisplay.push(element);
            }
          })
        }
      }
    });
    console.log(this.columnsToDisplay);

  }

  setUserColumnPref() {
    this.loader.start();
    let paramdata = ''
    console.log(this.columnsToDisplay)

    this.columnsToDisplay.forEach((element: any) => {
      paramdata = paramdata + 'columnList=' + element + '&';
    });
    paramdata = paramdata + 'pageType=' + this.pageType;
    console.log('test data :- ' + paramdata);

    //paramdata = paramdata+'userId='+this.userId;
    //let data = '{"emailId":"'+this.emailId+'","password":"'+this.changePasswordForm.get('newPassword').value+'"}';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    this.http.post(this.apiUrl + 'user/changePreference', paramdata, { headers: headers }).subscribe(
      data => {
        if (data['status'] == 200) {
          console.log('success');
        } else if (data['status'] == 401) {
          this.commonService.displayShortMessage(data['message'], 3000);
        } else {
          this.commonService.displayShortMessage("There is some error, please contact administrator.", 3000);
        }
        this.loader.stop();
      },
      error => {
        if (error['status'] == 403) {
          this.alertService.openDialogBox();
        } else {
          this.commonService.displayShortMessage("There is some error, please contact administrator.", 3000);
        }
        this.loader.stop();
      }
    );
  }

  onAdvancedFilterModelClosed() {
    let self = this;
    $('#exampleModalCenter').on('click', function (e: any) {
      console.debug("Modal clicked ");

    });
    $('#exampleModalCenter').on('hidden.bs.modal', function () {
      console.debug("Modal closed ");
      self.setUserColumnPref();
    });
  }
  // advance filter ends

  resetAdvanceFilterForm() {
    this.loader.start();
    this.filterApplied = false;
    this.advancedSearchForm.reset();
    this.getDashBoardData();
    $('#exampleModalCenter').hide();
    this.loader.stop();
  }

  exportToSheet() {
    let fileColumn = [
      { label: 'File No.', value: 'InvoiceId' },
      { label: 'Requester Name', value: 'applicantName' },
      { label: 'Senders Email', value: 'applicantEmail', },
      { label: 'Phone No.', value: 'phoneNo' },
      { label: 'Received On', value: 'receivedDate' },
      { label: 'Day Count', value: 'dayDiffString' },
      { label: 'Status', value: 'status' },
      { label: 'Action By', value: 'actionBy' },
      { label: 'Updated By', value: 'updatedBy' },
      { label: 'Updated On', value: 'appUpdateDiff' }
    ];
    let paged = this.commonService.prepareDashboardDataForCsv(this.parsedFormsDataSource, this.columnsToDisplay, this.columnsOption);
    let fields = this.commonService.headerNameChange(paged, fileColumn);
    this.commonService.downloadCSV(paged, "exported_records_" + Date.now(), fields)

  }

 
  
  getDashBoardData() {
    this.loader.start();
    // let role = sessionStorage.getItem(APPCONFIG.role_key);
    // if((role == 'agent') && (this.advancedSearchForm.value.advAssignedTo == undefined 
    //   || this.advancedSearchForm.value.advAssignedTo == '')){//also check if it already has a value
    //   this.advancedSearchForm.value.advAssignedTo = sessionStorage.getItem(APPCONFIG.user_id);
    // }
    let data = JSON.stringify(this.advancedSearchForm.value);
    console.log(data)
    // let paramdata = '?page=' + this.page.pageable.pageNumber + '&size=' + this.pageSize + '&access_token=' + this.accessToken;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    this.http.get('https://msdocs-python-webapp-quickstart-xyztctest.azurewebsites.net/hello_azure/fvalsearchurl/?enterkey=VendorName&entervalue=Google', { headers: headers }).subscribe(
      data => {
        console.log('data', data)
        this.dashboardDataSource = new MatTableDataSource<dashboardDataEle>(data['Documents']);

        this.loader.stop();
      },
      error => {
        if (error['status'] == 403) {
          this.alertService.openDialogBox();
        } else {
          this.commonService.displayShortMessage("There is some error, please contact administrator.", 3000);
        }
        this.loader.stop();
      }
    );

  }


  getAllDashboardForms() {
    this.loader.start();
    this.http.get(this.apiUrl + 'form/list/all?access_token=' + this.accessToken).subscribe(
      data => {
        this.allParsedForms = data;
        this.parsedFormsDataSource = new MatTableDataSource<PeriodicElement>(this.allParsedForms);
        this.parsedFormsDataSource.paginator = this.paginator;
        this.exportToSheet();
        this.loader.stop();
      },
      error => {
        if (error['status'] == 403) {
          this.alertService.openDialogBox();
        } else {
          this.commonService.displayShortMessage("There is some error, please contact administrator.", 3000);
        }
        this.loader.stop();
      }
    );
  }

  assignTask(InvoiceId: any[]) {

    const dialogRef = this.dialog.open(AssignTaskComponent, {
      data: { actionReason: '' }
    });
    for(var i=0; i<InvoiceId.length; i++){
      this.connectionIds[i] = InvoiceId[i].InvoiceId;
    }
    dialogRef.componentInstance.connectionIds = this.connectionIds;
    dialogRef.componentInstance.agents = this.agents;
    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
      this.getDashBoardData();
      this.selection.clear()
      }, 3000);
    });
    //this.dialogService.openNewUserDialogBox();
  }

  archiveApplications(InvoiceId: any[]) {
    this.loader.start();
    for(var i=0; i<InvoiceId.length; i++){
      this.connectionIds[i] = InvoiceId[i].InvoiceId;
    }
    let data =this.connectionIds;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
      this.http.post(this.apiUrl + '/form/archive?access_token=' + this.accessToken, data, { headers: headers }).subscribe(
        data => {},
        request => {
          if (request['status'] == 200) {
            this.commonService.displayShortMessage("Applications archived successfully.", 3000);
            this.getDashBoardData();
            this.selection.clear()
          } else {
            this.commonService.displayShortMessage("There is some error, please contact administrator.", 3000);
          }
          this.loader.stop();
        }
          );
  }

  close() {
    this.dialogRef.close();
  }

  public getNextPage(): void {
    this.page.pageable = this.paginationService.getNextPage(this.page);
    if (this.filterApplied) this.getDashBoardData();
    else this.getDashBoardData();
  }

  public getPreviousPage(): void {
    this.page.pageable = this.paginationService.getPreviousPage(this.page);
    if (this.filterApplied) this.getDashBoardData();
    else this.getDashBoardData();
  }

  public getPageInNewSize(pageSize: number): void {
    this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
    if (this.filterApplied) this.getDashBoardData();
    else this.getDashBoardData();
  }

  public getFirstPage(): void {
    this.page.pageable = this.paginationService.getFirstPage(this.page);
    if (this.filterApplied) this.getDashBoardData();
    else this.getDashBoardData();
  }

  public getLastPage(): void {
    this.page.pageable = this.paginationService.getLastPage(this.page, this.page.totalPages);
    if (this.filterApplied) this.getDashBoardData();
    else this.getDashBoardData();
  }

  getDashboardData(){
    try {
      this.loader.start();
      this.http.get('https://msdocs-python-webapp-quickstart-xyztctest.azurewebsites.net/hello_azure/backendlist/').subscribe((data: any) => {
        this.dashboardData = data;
        if (this.dashboardData?.Documents == null || this.dashboardData?.Documents.length == 0) this.noRecordsFound = true;
        else this.noRecordsFound = false;
        this.dashboardDataSource = new MatTableDataSource<dashboardDataEle>(this.dashboardData.Documents);
        console.log('api data',this.dashboardData.Documents,this.dashboardDataSource)
          this.loader.stop();
      },
        error => {
          this.commonService.displayShortMessage("There is some error, please contact administrator.", 3000);
          this.loader.stop();
        })

    } catch (error) {
      console.log('exception', error)
      this.commonService.displayShortMessage("There is some error, please contact administrator.", 3000);

    }

  }
  // page = 0;
  // totalRecords = 4;
  // cp: number = 1;
  // pageChanged(pageNo) {
  //   this.page = pageNo;
  // }
}
@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs/dialogs.component.html'
})
export class DialogsComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
}


