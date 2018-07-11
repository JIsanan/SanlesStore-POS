import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ArchiveProdTypeDataSource } from './archive-prod-type-datasource';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'archive-prod-type',
  templateUrl: './archive-prod-type.component.html',
  styleUrls: ['./archive-prod-type.component.css']
})
export class ArchiveProdTypeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ArchiveProdTypeDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'type_name'];

  constructor(public admin:AdminService){
    this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));

  }
  ngOnInit() {
    this.dataSource = new ArchiveProdTypeDataSource(this.admin);
  }
}
