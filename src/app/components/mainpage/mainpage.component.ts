import { Component, Input, OnInit } from '@angular/core';
import { collectionSnapshots } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
//import { ServerService } from '../Services/server.service';
import { ServerService } from 'src/app/services/server.service';
@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  lat: number = 0;
  lon: number = 0;
  private location: any | undefined;
  private All_Hospital: any[] = [];
  current_user: any;
  gettinglocation: string = "init";
  nearestHospital: string = "init";
  showHospital: string = "init";
  showtype: string = "init";
  callingambulance: string = "init";
  ambulancestatus: string = "";
  checktype: string = "init";
  dumloc: boolean = false;
  dumhosp: boolean = false;
  dumambulance: boolean = false;
  dumtype: boolean= false;
  id: string |undefined;

  constructor(private serverService: ServerService,private activeRoute:ActivatedRoute) {setInterval(() => {

    this.callingambulance="done";
    this.ambulancestatus="on the way"

  }, 15 * 1000);

  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.id = params['id'];

      this.serverService.getUser(this.id!).then(
        (data: any) => {
          this.current_user = ({ id: data.id, ...data.data() });
          console.log(this.current_user);
        }
        );
      });
    collectionSnapshots(this.serverService.getAllHospital()).pipe(
      map((changes) => {
        return changes.map((c) => {
          return ({ id: c.id, ...c.data() });
        })
      })
    ).subscribe(data => {
      this.All_Hospital = data;
      console.log(this.All_Hospital);
    });

  }
  buttonPress() {
    this.getGeoLocation().then((resolve: any) => {
      this.update_cards();
      console.log("Current Patient Location: " + this.lat + " , " + this.lon);
      let check = this.getNearestHospital();
      // let check = this.checkICU(nearest_hospital);
      if (check == true) {
        console.log("Contacted Hospital");
      } else {
        console.log("Hospital not suitable");
      }
    });
  }

  private getGeoLocation(): Promise<any> {
    this.dumloc= true;
    return new Promise((resolve, reject) => {

      this.location = navigator.geolocation.getCurrentPosition((position) => {
        // console.log("Got position", position.coords);
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        resolve(position.coords);
      });
    });
  }
  private getNearestHospital() {
    this.dumhosp= true;
    this.update_cards();
    let nearestHospital;
    let minDist = Number.MAX_VALUE;
    for (let hospital of this.All_Hospital) {
      //euclidean dist
      let dist = Math.sqrt(Math.pow(this.lat - hospital.locationX, 2) + Math.pow(this.lon - hospital.locationY, 2));
      minDist = Math.min(minDist, dist);
      console.log("Hospital Name: " + hospital.name + " Distance: " + dist);
      if (minDist == dist) {
        nearestHospital = hospital;
        this.showHospital= hospital.name;
      }
    }
    //return nearestHospital
    console.log('Nearest Hospital: ' + nearestHospital.name, ", With Distance: " + minDist);
    return this.checkICU(nearestHospital);
  }
  //boolean method to check icu
  private checkICU(hospital: any): boolean {
    this.dumtype= true;
    this.update_cards();
    let value;
    console.log("user Condition ", this.current_user.medicalCondition, " Hospital Condition ", hospital.icuType);
    if (this.current_user.medicalCondition == hospital.icuType && hospital.icuCapacity > 0) {
      // this.contactHospital();
      value = true;
      this.showtype=hospital.icuType;
      //update Icu Capacity
      this.contact_Hospital(hospital);
    } else {
      //delete hospital from all_hospital
      this.All_Hospital.splice(this.All_Hospital.indexOf(hospital), 1);
      console.log(this.All_Hospital);
      // return false;
      value = this.getNearestHospital();
    }
    return value;

  }
  private contact_Hospital(hospital: any) {
    this.dumambulance= true;
    this.update_cards();
    //update Icu Capacity
    hospital.icuCapacity -= 1;
    hospital?.patientsID?.push(this.current_user?.id);
    this.serverService.updateHospital(hospital).then(
      (data: any) => {
        console.log("Patient added to hospital");
      }
    );
    this.serverService.addHospitalToUser(this.current_user, hospital.id).then(
      (data: any) => {
        console.log("Hospital added to user");
      }
    );
  }
  update_cards(){
    if(this.dumloc){
      this.gettinglocation= "Processing";
    }
    if(this.dumhosp){
      this.gettinglocation= "done";
      this.nearestHospital="Processing";
    }
    if(this.dumtype){
      this.nearestHospital= "done";
      this.checktype="Processing";
    }
    if(this.dumambulance){
      this.checktype="done";
      this.callingambulance="Processing";
    }
  }
}
