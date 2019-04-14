import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material'


import { ItemService } from 'src/app/services/glassware.service';
import { UiService } from 'src/app/services/ui.service';
import { ItemAdditionService } from 'src/app/services/item-addition.service';
import { ItemRemovalService } from 'src/app/services/item-removal.service';
import { AvailableItemsService } from 'src/app/services/available-items.service';


@Component({
  selector: 'app-newglassware',
  templateUrl: './newglassware.component.html',
  styleUrls: ['./newglassware.component.css']
})
export class NewglasswareComponent implements OnInit {
  items: any;
  updateEvent =new EventEmitter();
  constructor(private service: ItemService,
    // private itemaddservice:ItemAdditionService,
    // private itemremovals:ItemRemovalService,
    // private availableitemservice:AvailableItemsService,
    public dialogRef: MatDialogRef<NewglasswareComponent>,

    private uiservice: UiService) { }

  ngOnInit() {
    this.service.getGlasswareitems().subscribe(item => {
      this.items = item;
    });




  }



  onSubmit() {
    // catching if alreadt exists
    let flag = true;
    for (let i = 0; i < this.items.length; i++) {
      let k = this.service.form.value.item_name.toString().replace(/\s/g, "").toLowerCase();
      let y = this.items[i].item_name.toString().replace(/\s/g, "").toLowerCase();
      if (k == y) {
        flag = false;
        this.uiservice.showSnackbar(this.items[i].item_name + " Already exists", null, 3000);
      }

    }
    if (this.service.form.valid && flag == true) {
      if (!this.service.form.get('$key').value){
        this.service.insertGlassware(this.service.form.value);
        for (let i = 0; i < this.items.length; i++) {
          if(this.items[i].item_name==this.service.form.value.item_name){
              console.log(this.items[i].$key);
          }
        }
      
      }
      else {
        this.service.updateGlassware(this.service.form.value);
        this.updateEvent.emit(this.service.form.value);
        
      }
      this.service.form.reset();
      this.onClose();
    }
  }
  // Dialog close
  onClose() {
    this.service.form.reset();
    this.dialogRef.close()
  }
}
