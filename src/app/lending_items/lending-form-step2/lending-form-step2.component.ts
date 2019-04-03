import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ItemService } from 'src/app/services/glassware.service';

@Component({
  selector: 'lending-form-step2',
  templateUrl: './lending-form-step2.component.html',
  styleUrls: ['./lending-form-step2.component.css']
})
export class LendingFormStep1Component implements OnInit {
  listData: MatTableDataSource<any>;
  tablearray: Array<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private glasswareservice:ItemService) { }

  ngOnInit() {
    this.glasswareservice.getGlassware().subscribe(
      list => {
        let array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.tablearray = array;
         console.log(array)
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }


    );
  }

  displayedColumns: string[] = ['item_name', 'AvailableQuantity'];


}
