import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ArchiveUserTypeDataSource } from './archive-user-type-datasource';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'archive-user-type',
  templateUrl: './archive-user-type.component.html',
  styleUrls: ['./archive-user-type.component.css']
})
export class ArchiveUserTypeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ArchiveUserTypeDataSource;

  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'typename'];

  constructor(public admin:AdminService){
    this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));
  }

  ngOnInit() {
    this.dataSource = new ArchiveUserTypeDataSource(this.admin);
  }
}
