import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ArchiveProdDataSource } from './archive-prod-datasource';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'archive-prod',
  templateUrl: './archive-prod.component.html',
  styleUrls: ['./archive-prod.component.css']
})
export class ArchiveProdComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ArchiveProdDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','price'];

  constructor(public admin:AdminService){
    this.admin.httpOptions.headers = this.admin.httpOptions.headers.set('Authorization',localStorage.getItem('token'));

  }

  ngOnInit() {
    this.dataSource = new ArchiveProdDataSource(this.admin);
  }
}
