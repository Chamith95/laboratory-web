import { Component, OnInit,ViewChild } from '@angular/core';

import { ItemService } from 'src/app/services/item.service';
import {MatTableDataSource,} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog,MatDialogConfig} from '@angular/material'
import { NewglasswareComponent } from '../newglassware/newglassware.component';

@Component({
  selector: 'app-glasswarelist',
  templateUrl: './glasswarelist.component.html',
  styleUrls: ['./glasswarelist.component.css']
})
export class GlasswarelistComponent implements OnInit {

  constructor(private service:ItemService ,private dialog:MatDialog) { }

  listData:MatTableDataSource<any>;
  displayedColumns:string[]=['Category_Name','Quantity','actions'];

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchKey:string;

  ngOnInit() {
    this.service.getGlassware().subscribe(
      list=>{
        let array =list.map(item => {
          return{
              $key:item.key,
            ...item.payload.val()
          };
        });
        this.listData=new MatTableDataSource(array);
        this.listData.sort=this.sort;
        this.listData.paginator=this.paginator;
      }
    );
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter =this.searchKey.trim().toLowerCase();
  }

  OnCreate(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=false;
    this.dialog.open(NewglasswareComponent,dialogConfig);
  }

  //Edit button 
  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=false;
    this.dialog.open(NewglasswareComponent,dialogConfig);
  }

  // Deletebutton
  onDelete($key){
    if(confirm('Are you sure to delete this record ?')){
    this.service.deleteGlassware($key)
    }
  }
}
