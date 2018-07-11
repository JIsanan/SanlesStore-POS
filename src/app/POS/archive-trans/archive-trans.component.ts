import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ArchiveTransDataSource } from './archive-trans-datasource';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'archive-trans',
  templateUrl: './archive-trans.component.html',
  styleUrls: ['./archive-trans.component.css']
})
export class ArchiveTransComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ArchiveTransDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'buyerName','prodQty','prodName','Total Price'];

  constructor(public admin:AdminService){
    this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));

  }

  ngOnInit() {
    this.dataSource = new ArchiveTransDataSource(this.admin);
  }
}
