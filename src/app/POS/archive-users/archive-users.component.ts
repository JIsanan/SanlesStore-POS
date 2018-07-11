import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ArchiveUsersDataSource } from './archive-users-datasource';

@Component({
  selector: 'archive-users',
  templateUrl: './archive-users.component.html',
  styleUrls: ['./archive-users.component.css']
})
export class ArchiveUsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ArchiveUsersDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new ArchiveUsersDataSource(this.paginator, this.sort);
  }
}
