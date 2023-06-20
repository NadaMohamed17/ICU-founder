import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
@Component({
  selector: 'app-hopsital-form',
  templateUrl: './hopsital-form.component.html',
  styleUrls: ['./hopsital-form.component.css']
})
export class HospitalFormComponent implements OnInit {
  id: string | undefined;
  hospital: any | undefined;
  constructor(private serverService: ServerService, private activeRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params) => {
      this.id = params['id'];
      this.serverService.getHospital(this.id!).then((data: any) => {
        this.hospital = ({ id: data.id, ...data.data() });
        console.log(this.hospital);
      });
    });
  }

  update(hForm: NgForm) {
    var hospital: any = {
      id: this.hospital.id,
      name: hForm.value.name,
      locationX: hForm.value.locationX,
      locationY: hForm.value.locationY,
      hotline: hForm.value.hotline,
      icuType: hForm.value.icuType,
      icuCapacity: hForm.value.icuCapacity,
    }
    console.log(hospital);
    this.serverService.updateHospital(hospital).then((data) => {
      window.alert("Successful Update");
      this.router.navigate(['/admin/hospital-table']);
    }).catch((error) => {
      window.alert("Error : " + error.message);
    });
  }

  delete(id: string) {
    this.serverService.deleteHospital(id).then((data) => {
      window.alert("Successful Delete");
      this.router.navigate(['/admin/hospital-table']);
    }).catch((error) => {
      window.alert("Error : " + error.message);
    });
  }
}
