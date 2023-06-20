import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  id: string | undefined;
  user: any | undefined;

  constructor(private serverService: ServerService, private ActiveRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.ActiveRouter.params.subscribe((params) => {
      this.id = params['id'];
      this.serverService.getUser(this.id!).then(
        (data: any) => {
          this.user = ({ id: data.id, ...data.data() });
          console.log(this.user);
        }
      );
    });
  }

  update(form: NgForm) {
    var user: any = {
      id: this.user.id,
      name: form.value.name,
      firstName: form.value.firstname,
      lastName: form.value.lastname,
      email: form.value.email,
      phone: form.value.phone,
      address: form.value.address,
      medicalCondition: form.value.medicalCondition
    }
    console.log(user);
    this.serverService.updateUser(user).then((data) => {
      window.alert("Successful Update");
      this.router.navigate(['/admin/usertable']);
    }).catch((error) => {
      window.alert("Error : " + error.message);
    });
  }

  delete(id: string) {
    this.serverService.deleteUser(id).then((data) => {
      window.alert("Successful Delete");
      this.router.navigate(['/admin/usertable']);
    }).catch((error) => {
      window.alert("Error : " + error.message);
    });
  }
}
