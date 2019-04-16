import { Component, OnInit, EventEmitter } from '@angular/core';
import { PermEquipmentService } from 'src/app/services/perm-equipment.service';
import { MatDialogRef } from '@angular/material';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-newperm-equipment',
  templateUrl: './newperm-equipment.component.html',
  styleUrls: ['./newperm-equipment.component.css']
})
export class NewpermEquipmentComponent implements OnInit {

  items: any;
  updateEvent =new EventEmitter();
  constructor(private service: PermEquipmentService,
    // private itemaddservice:ItemAdditionService,
    // private itemremovals:ItemRemovalService,
    // private availableitemservice:AvailableItemsService,
    public dialogRef: MatDialogRef<NewpermEquipmentComponent>,

    private uiservice: UiService) { }

  ngOnInit() {
    this.service.getpermenant_equipmentitems().subscribe(item => {
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
        this.service.insertpermenant_equipment(this.service.form.value);
        for (let i = 0; i < this.items.length; i++) {
          if(this.items[i].item_name==this.service.form.value.item_name){
              console.log(this.items[i].$key);
          }
        }
      
      }
      else {
        this.service.updatepermenant_equipment(this.service.form.value);
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
