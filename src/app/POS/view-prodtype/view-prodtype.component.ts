import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ViewProdtypeDataSource } from './view-prodtype-datasource';

@Component({
  selector: 'view-prodtype',
  templateUrl: './view-prodtype.component.html',
  styleUrls: ['./view-prodtype.component.css']
})
export class ViewProdtypeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ViewProdtypeDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new ViewProdtypeDataSource(this.paginator, this.sort);
  }
}
