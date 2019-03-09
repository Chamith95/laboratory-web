import { Component, OnInit } from '@angular/core';

import { ItemService } from 'src/app/services/item.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-glasswarelist',
  templateUrl: './glasswarelist.component.html',
  styleUrls: ['./glasswarelist.component.css']
})
export class GlasswarelistComponent implements OnInit {

  constructor(private service:ItemService) { }

  listData:MatTableDataSource<any>;
  displayedColumns:string[]=['Category_Name','Quantity','actions'];

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
      }
    );
  }

}
