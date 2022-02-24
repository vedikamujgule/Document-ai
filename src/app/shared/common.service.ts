import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as fs from 'file-saver';
import { Parser } from 'json2csv';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
    claimManagementClicked = false;
    consolidatedClicked = false;

  constructor(
    private router: Router, 
    private matSnackBar: MatSnackBar
    ) { }
    _claimManagementClicked(){
        this.claimManagementClicked = true;
    }
    _claimManagementAway(){
        this.claimManagementClicked = false;
    }
    _consolidatedClicked(){
      this.consolidatedClicked = true;
    }
    _consolidatedAway(){
        this.consolidatedClicked = false;
    }
    prepareTableDataForCsv(dataSource:any,columnToDisplay:any,columnsOption:any,paginator:MatPaginator){
      
      let copyOfDataSource = JSON.parse(JSON.stringify(dataSource.data));
      const skip = paginator.length * paginator.pageIndex;
      var paged = copyOfDataSource.filter((u:any, i:any) => i >= skip)
                  .filter((u:any, i:any) => i <paginator.length);
      
      let columIdToRemove: string[]=[]
      columnsOption.forEach((element:any) => {
        if(!columnToDisplay.includes(element.id)){
          columIdToRemove.push(element.id);
        }
      });
      columIdToRemove.forEach(element => {
        paged.forEach((pelement:any) => {
          delete pelement[element];
        });
      });
      let dataToDownload: any=[];
        paged.forEach((row:any) => {
          dataToDownload.push(Object.values(row))
        })
        return paged;
    }

    prepareDashboardDataForCsv(dataSource:any,columnToDisplay:any,columnsOption:any){

      let copyOfDataSource = JSON.parse(JSON.stringify(dataSource.data));
      //const skip = paginator.length * paginator.pageIndex;
      var paged = copyOfDataSource.filter((u:any, i:any) => i >= 0)
                  .filter((u:any, i:any) => i <dataSource.filteredData.length);
      
      paged.forEach(element => {
        if(element != undefined && element.updatedBy != undefined)
          element.updatedBy = element.updatedBy.fullName;
      });
      let columIdToRemove: string[]=[]
      columnsOption.forEach((element:any) => {
        if(!columnToDisplay.includes(element.id)){
          columIdToRemove.push(element.id);
        }
      });
      columIdToRemove.forEach(element => {
        paged.forEach((pelement:any) => {
          delete pelement[element];
        });
      });
      let dataToDownload: any=[];
        paged.forEach((row:any) => {
          dataToDownload.push(Object.values(row))
        })
        return paged;
    }

    downloadCSV(csvData:any,fileName:String,fields?:any){
      let json2csvParser:any;
      console.log(fields)
      if(fields){
        json2csvParser = new Parser({fields,excelStrings:true});
      }else{
        json2csvParser = new Parser({excelStrings:true});
      }
      const csv = json2csvParser.parse(csvData);
      let file = new Blob([csv], { type: 'text/plain;charset=utf-8' });
      fs.saveAs(file, fileName + '.csv');
      // NOTE:- You can also use new FILe() insted of creating Blob. but it might not work on IE and mozilla:- 
      // var file = new File([csv], "hello world.csv", {type: "text/plain;charset=utf-8"});
      // fs.saveAs(file);
    }

    headerNameChange(tableData:any,columnsArray:any){
      let keyArray:any=[]
          keyArray = Object.keys(tableData[0]);  
      let fields:any=[] 
      columnsArray.forEach((element:any,index:any) => {
        if(keyArray.includes(element.value)){
          fields.push(element);
        }
      });
      return fields;
    }

    displayShortMessage(message, interval) {
      this.matSnackBar.open(message, "Close", {
        duration: interval,
      });
    }
}
