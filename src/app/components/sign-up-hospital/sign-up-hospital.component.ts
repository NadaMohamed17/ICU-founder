import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentReference } from 'firebase/firestore';
import { Hospital } from 'src/app/models/hospital';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-sign-up-hospital',
  templateUrl: './sign-up-hospital.component.html',
  styleUrls: ['./sign-up-hospital.component.css']
})
export class SignUpHospitalComponent implements OnInit {

  constructor(private router:Router, private server:ServerService) { }

  submit(hForm:NgForm){
    var hospital:any = {
        name:hForm.value.name,
        locationX:hForm.value.locationX,
        locationY:hForm.value.locationY,
        hotline:hForm.value.hotline,
        icuType:hForm.value.icuType,
        icuCapacity:hForm.value.icuCapacity,
    }
    console.log(hospital);
    this.sendTofFirestore(hospital);
  }
  ngOnInit(): void {
  }
  sendTofFirestore(hospital:Hospital){
    this.server.addHospital(hospital).then(
      (ref:DocumentReference)=>{
      window.alert('Hospital added successfully');
      this.router.navigate(['/login']);
      //ref.id
      }
    )

  }
}
