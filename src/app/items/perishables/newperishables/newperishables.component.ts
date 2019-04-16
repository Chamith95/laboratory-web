import { Component, OnInit, EventEmitter } from '@angular/core';
import { ItemService } from 'src/app/services/glassware.service';
import { MatDialogRef } from '@angular/material';
import { NewglasswareComponent } from '../../glassware/newglassware/newglassware.component';
import { UiService } from 'src/app/services/ui.service';
import { PerishablesService } from 'src/app/services/perishables.service';

@Component({
  selector: 'app-newperishables',
  templateUrl: './newperishables.component.html',
  styleUrls: ['./newperishables.component.css']
})
export class NewperishablesComponent implements OnInit {

  items: any;
  updateEvent =new EventEmitter();
  constructor(private service: PerishablesService,
    // private itemaddservice:ItemAdditionService,
    // private itemremovals:ItemRemovalService,
    // private availableitemservice:AvailableItemsService,
    public dialogRef: MatDialogRef<NewglasswareComponent>,

    private uiservice: UiService) { }

  ngOnInit() {
    this.service.getperishablesitems().subscribe(item => {
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
        this.service.insertperishables(this.service.form.value);
        for (let i = 0; i < this.items.length; i++) {
          if(this.items[i].item_name==this.service.form.value.item_name){
              console.log(this.items[i].$key);
          }
        }
      
      }
      else {
        this.service.updateperishables(this.service.form.value);
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
