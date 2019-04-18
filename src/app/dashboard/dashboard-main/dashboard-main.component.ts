import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ChemicalsService } from 'src/app/services/chemicals.service';
import { PerishablesService } from 'src/app/services/perishables.service';
import { PermEquipmentService } from 'src/app/services/perm-equipment.service';
import { ItemService } from 'src/app/services/glassware.service';
import { ItemAdditionService } from 'src/app/services/item-addition.service';
import { ItemRemovalService } from 'src/app/services/item-removal.service';
import { ChartDataSets } from 'chart.js';


@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit {

    glasswareCount:number=0;
    perishablesCount:number=0;
    ChemicalsCount:number=0;
    PermEquipCount:number;
    additonArray=[];
    removalArray=[];


    public doughnutChartLabels: string[] = ['Glassware', 'Chemicals', 'Perishables','Permanent Equipment'];
    public doughnutChartData: number[]=[] ;
    public doughnutChartType: string;
    public DougnutChartColors = [
      {
        backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)','rgb(253,224,152)'],
      },
    ];

        // bar chart
        public barChartOptions: any = {
          scaleShowVerticalLines: false,
          responsive: true,
          scales: { yAxes: [{ ticks: { beginAtZero: true } }] }  

      };
      public barChartLabels: string[] = ['Glassware', 'Chemicals', 'Perishables', 'Permanent Equipment'];
      public barChartType: string;
      public barChartLegend: boolean;
  
      public barChartData: any[] =[
        { data: [0,0,0,0], label: 'Series A' },

  
      ];
      
      public barChartData2: any[] =[

      ];

   


  constructor(public route : ActivatedRoute,
    private origlassservice:ItemService,
    private oriChemservice:ChemicalsService,
    private oriPeriservice:PerishablesService,
    private oriPermEquipservice:PermEquipmentService,
    private itemAddService:ItemAdditionService,
    private itemRemovalService:ItemRemovalService) {







      
     }

  ngOnInit() {
    
    this.doughnutChartType = 'doughnut';
    this.barChartType = 'bar';
    this.barChartLegend = true;
    // Getting original glassware
    this.origlassservice.getGlasswareitems().subscribe(items=>{
        this.glasswareCount=items.length;
        this.doughnutChartData.push(items.length);
 


    })

    this.oriChemservice.getChemical().subscribe(items=>{
      this.ChemicalsCount=items.length;
      this.doughnutChartData.push(items.length);
   
  })

  this.oriPeriservice.getperishablesitems().subscribe(items=>{
    this.perishablesCount=items.length;
    this.doughnutChartData.push(items.length);

})

this.oriPermEquipservice.getpermenant_equipmentitems().subscribe(items=>{
  this.PermEquipCount=items.length;
  this.doughnutChartData.push(items.length);
})

// Getting Additions And Removals
this.itemAddService.getaddvouchers().subscribe(item=>{
   this.barChartData.pop();
  let GlasswareAdditions=0;
  let ChemicalAdditions=0;
  let PerishableAdditions=0;
  let PermeanetEquipAdditions=0;

  for(let i=0;i<item.length;i++){
    const newObj: any = item;
    if(newObj[i]){
    for(let j=0;j<newObj[i].items.length;j++){ 

      if (newObj[i].items[j].category =="Glassware") {
        GlasswareAdditions += 1;
      }
      else if (newObj[i].items[j].category == "Chemicals") {
        ChemicalAdditions += 1;
      }
      else if (newObj[i].items[j].category =="Perishables") {
        PerishableAdditions += 1;
      }
      else if (newObj[i].items[j].category == "Permanent Equipment") {
        PermeanetEquipAdditions += 1;
      }
    }
  }
}


  this.additonArray=[ GlasswareAdditions, ChemicalAdditions, PerishableAdditions, PermeanetEquipAdditions]
  console.log({ data: this.additonArray, label: 'Additions' })
  this.barChartData.push({ data:  this.additonArray, label: 'Additions', backgroundColor: 'rgba(255,0,0,0.3)' })
})


this.itemRemovalService.getRemvouchers().subscribe(item=>{
  let GlasswareRemovals=0;
  let ChemicalRemovals=0;
  let PerishableRemovals=0;
  let PermeanetEquipRemovals=0;

  for(let i=0;i<item.length;i++){
    const newObj: any = item;
    if(newObj[i]){
    for(let j=0;j<newObj[i].items.length;j++){ 

      if (newObj[i].items[j].category =="Glassware") {
        GlasswareRemovals += 1;
      }
      else if (newObj[i].items[j].category == "Chemicals") {
        ChemicalRemovals += 1;
      }
      else if (newObj[i].items[j].category =="Perishables") {
        PerishableRemovals += 1;
      }
      else if (newObj[i].items[j].category == "Permanent Equipment") {
        PermeanetEquipRemovals += 1;
      }
    }
  }
}


  this.removalArray=[ GlasswareRemovals, ChemicalRemovals, PerishableRemovals, PermeanetEquipRemovals]
  this.barChartData.push({ data:  this.removalArray, label: 'Removals' , backgroundColor: 'rgb(134,199,243)' })
  console.log(this.removalArray);
  // this.barChartData.push({ data: this.removalArray, label: 'Removals' })
  this.barChartData2=this.barChartData
})




  }
  

      // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }
}


