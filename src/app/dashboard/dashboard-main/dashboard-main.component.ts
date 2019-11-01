import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChemicalsService } from 'src/app/services/chemicals.service';
import { PerishablesService } from 'src/app/services/perishables.service';
import { PermEquipmentService } from 'src/app/services/perm-equipment.service';
import { ItemService } from 'src/app/services/glassware.service';
import { ItemAdditionService } from 'src/app/services/item-addition.service';
import { ItemRemovalService } from 'src/app/services/item-removal.service';
import { ChartDataSets, ChartType } from 'chart.js';


@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit {

  glasswareCount: number = 0;
  perishablesCount: number = 0;
  ChemicalsCount: number = 0;
  PermEquipCount: number;
  dataCount: number = 0;
  dataCount2: number = 0;
  additonArray = [];
  removalArray = [];
  safeitemsArray = [];
  notsafeitemsArray = []

  // pie chart1
  public pieChartType: ChartType = 'pie';
  public doughnutChartLabels: string[] = ['Glassware', 'Chemicals', 'Perishables', 'Permanent Equipment'];
  public doughnutChartData: number[] = [];
  public doughnutChartType: string;
  public DougnutChartColors = [
    {
      backgroundColor: ['rgb(255,177,193)', 'rgba(178,255,178)', 'rgba(178,178,255)', 'rgb(253,224,152)', 'rgb(253,224,200)', 'rgb(160,100,120)', 'rgb(253,224,50)'],
    },
  ];

// pie chart 2
  public doughnutChart2Labels: string[] = [];
  public doughnutChart2Data: number[] = [];
  public doughnutChart2Type: string;
  public DougnutChart2Colors = [
    {
      backgroundColor: ['rgb(255,177,193)', 'rgba(178,255,178)', 'rgba(178,178,255)', 'rgb(253,224,152)', 'rgb(80.140,100)', 'rgb(253,140,120)', 'rgb(253,80,130)', 'rgb(120,300,90)'],
    },
  ];

  public doughnutChart3Labels: string[] = [];
  public doughnutChart3Data: number[] = [];
  public doughnutChart3Type: string;
  public DougnutChart3Colors = [
    {
      backgroundColor: [],
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

  public barChartData: any[] = [
    { data: [0, 0, 0, 0], label: 'Series A' },


  ];

  public barChartData2: any[] = [

  ];

  // summary chart
  public SummaryBarOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{ ticks: { beginAtZero: true, stepSize: 20, min: 0, max: 100, callback: function (value) { return value + "%" } }, scaleLabel: { display: true, labelString: "Percentage" }, stacked: true }],
      xAxes: [{ ticks: { beginAtZero: true }, stacked: true }]
    }

  };
  public SummaryBarLabels: string[] = ['Glassware', 'Chemicals', 'Perishables', 'Permanent Equipment'];
  public SummaryBarType: string;
  public SummaryBarLegend: boolean;

  public SummaryBarData: any[] = [
    { data: [65, 59, 80, 81], label: 'Series A', stack: '1' },




  ];



  constructor(public route: ActivatedRoute,
    private origlassservice: ItemService,
    private oriChemservice: ChemicalsService,
    private oriPeriservice: PerishablesService,
    private oriPermEquipservice: PermEquipmentService,
    private itemAddService: ItemAdditionService,
    private itemRemovalService: ItemRemovalService) {








  }

  ngOnInit() {

    this.doughnutChartType = 'doughnut';
    this.barChartType = 'bar';

    this.barChartLegend = true;
    this.SummaryBarType = 'bar';
    this.SummaryBarLegend = true;
    // Getting original glassware
    this.origlassservice.getGlasswareitems().subscribe(items => {
      this.SummaryBarData.pop();
      this.glasswareCount = items.length;
      this.doughnutChartData.push(items.length);
      this.getQuantitySummary(items)




    })

    this.oriChemservice.getChemicalItems().subscribe(items => {
      this.ChemicalsCount = items.length;
      this.doughnutChartData.push(items.length);
      this.getQuantitySummary(items)

    })

    this.oriPeriservice.getperishablesitems().subscribe(items => {
      this.perishablesCount = items.length;
      this.doughnutChartData.push(items.length);
      this.getQuantitySummary(items)

    })

    this.oriPermEquipservice.getpermenant_equipmentitems().subscribe(items => {
      this.PermEquipCount = items.length;
      this.doughnutChartData.push(items.length);
      this.getQuantitySummary(items)

      console.log(this.safeitemsArray);

      this.SummaryBarData.push({ data: this.safeitemsArray, label: 'Above Recomended Categories %', backgroundColor: 'rgba(0,255,0,0.3)', stack: '1', borderWidth: 2 })
      this.SummaryBarData.push({ data: this.notsafeitemsArray, label: 'Below Recomended Categories %', backgroundColor: 'rgba(255,177,193)', stack: '1', borderWidth: 2 })
    })

    // Getting Additions And Removals
    this.itemAddService.getaddvouchers().subscribe(item => {
      this.barChartData.pop();
      let GlasswareAdditions = 0;
      let ChemicalAdditions = 0;
      let PerishableAdditions = 0;
      let PermeanetEquipAdditions = 0;

      for (let i = 0; i < item.length; i++) {
        const newObj: any = item;
        if (newObj[i]) {
          for (let j = 0; j < newObj[i].items.length; j++) {

            if (newObj[i].items[j].category == "Glassware") {
              GlasswareAdditions += 1;
            }
            else if (newObj[i].items[j].category == "Chemicals") {
              ChemicalAdditions += 1;
            }
            else if (newObj[i].items[j].category == "Perishables") {
              PerishableAdditions += 1;
            }
            else if (newObj[i].items[j].category == "Permanent Equipment") {
              PermeanetEquipAdditions += 1;
            }
          }
        }
      }


      this.additonArray = [GlasswareAdditions, ChemicalAdditions, PerishableAdditions, PermeanetEquipAdditions]
      console.log({ data: this.additonArray, label: 'Additions' })
      this.barChartData.push({ data: this.additonArray, label: 'Additions', backgroundColor: 'rgb(134,199,243)', borderWidth: 2 })
    })


    this.itemRemovalService.getRemvouchers().subscribe(item => {
      let GlasswareRemovals = 0;
      let ChemicalRemovals = 0;
      let PerishableRemovals = 0;
      let PermeanetEquipRemovals = 0;

      for (let i = 0; i < item.length; i++) {
        const newObj: any = item;
        if (newObj[i]) {
          for (let j = 0; j < newObj[i].items.length; j++) {

            if (newObj[i].items[j].category == "Glassware") {
              GlasswareRemovals += 1;
            }
            else if (newObj[i].items[j].category == "Chemicals") {
              ChemicalRemovals += 1;
            }
            else if (newObj[i].items[j].category == "Perishables") {
              PerishableRemovals += 1;
            }
            else if (newObj[i].items[j].category == "Permanent Equipment") {
              PermeanetEquipRemovals += 1;
            }
          }
        }
      }


      this.removalArray = [GlasswareRemovals, ChemicalRemovals, PerishableRemovals, PermeanetEquipRemovals]
      this.barChartData.push({ data: this.removalArray, label: 'Removals', backgroundColor: 'rgb(255,177,193)', borderWidth: 2 })
      console.log(this.removalArray);
      // this.barChartData.push({ data: this.removalArray, label: 'Removals' })
      this.barChartData2 = this.barChartData
    })




  }


  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  // getting data for quantity summary
  public getQuantitySummary(items) {
    let total = items.length
    let safe = 0;
    let notsafe = 0;
    let totalsafe = 0;
    let totalnotsafe = 0
    for (let i in items) {
      if (items[i].recomended < items[i].Quantity) {
        totalsafe += items[i].Quantity
        safe += 1
      }
      else {
        notsafe += 1
        totalnotsafe += items[i].Quantity
      }
    }
    this.safeitemsArray.push((safe / (total)) * 100)
    this.notsafeitemsArray.push((notsafe / (total)) * 100)
  }

  dataAdd() {

    this.doughnutChart2Labels.push(data1.labels[this.dataCount])
    this.doughnutChart2Data.push(data1.data[this.dataCount])
    this.dataCount++;
  }

  dataRemove() {

    this.doughnutChart2Labels.pop()
    this.doughnutChart2Data.pop()
    this.dataCount--;
  }


  dataAdd2() {

    this.doughnutChart3Labels.push(this.makeid(4))
    this.doughnutChart3Data.push(this.randomInt(1, 1000))
    this.DougnutChart3Colors[0].backgroundColor.push(this.getRandomRgb())
    this.dataCount2++;
  }

  dataRemove2() {

    this.doughnutChart3Labels.pop()
    this.doughnutChart3Data.pop()
    this.DougnutChart3Colors[0].backgroundColor.pop()
    this.dataCount2--;
  }
  getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}


export const data1 = {
  labels: ["GlassWare", "Test1", "Test2", "Test3", "Test4", "Test5"],
  data: [200, 400, 800, 20, 450, 1200]
}