import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from 'src/app/services/glassware.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {
  @Input() icon: string;
  @Input() count: number;
  @Input() category: string;
  @Input() data: number;
  @Input() catClass: string;

  constructor(
                ) { }

  ngOnInit() {


  }

}
