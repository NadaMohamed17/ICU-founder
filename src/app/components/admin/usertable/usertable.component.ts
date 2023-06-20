import { Component, OnInit } from '@angular/core';
import { collectionSnapshots } from '@angular/fire/firestore';
import { map } from 'rxjs';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit {
  users:any[]=[];
  constructor(private serverService:ServerService) { }

  ngOnInit(): void {
    collectionSnapshots(this.serverService.getAllUsers()).pipe(
      map((changes) => {
        return changes.map((c) => {
          return ({ id: c.id, ...c.data() });
        })
      })
    ).subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
  }

}
