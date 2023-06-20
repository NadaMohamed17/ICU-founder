import { Component, OnInit } from '@angular/core';
import { collectionSnapshots } from '@angular/fire/firestore';
import { map } from 'rxjs';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-hospital-table',
  templateUrl: './hospital-table.component.html',
  styleUrls: ['./hospital-table.component.css']
})
export class HospitalTableComponent implements OnInit {
  hospitals:any[] = [];

  constructor(private serverService:ServerService) { }

  ngOnInit(): void {
    collectionSnapshots(this.serverService.getAllHospital()).pipe(
      map((changes) => {
        return changes.map((c) => {
          return ({ id: c.id, ...c.data() });
        })
      })
    ).subscribe(data => {
      this.hospitals = data;
      console.log(this.hospitals);
    });
  }

}
