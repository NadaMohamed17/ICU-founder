import { Component, OnInit } from '@angular/core';

const seconds = 4;
@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css'],
})
export class SensorsComponent implements OnInit {
  randSpO2!: number | 1;
  randSystolic!: number | 1;
  randDistolic!: number | 1;
  currentTimeH!: number | 1;
  currentTimeM!: number | 1;
  currentTimeS!: number | 1;
  randHeartrate!: number | 1;
  randsugar!: number | 1;
  randtemperature!: number | 1;
  randlabelSpO2 = 'initial';
  randlabelBP = 'initial';
  randlabelHeartrate = 'initial';
  randlabelSugar = 'initial';
  randlabelTemperature = 'initial';

  randomizer() {
    this.randSpO2 = Math.floor(Math.random() * (100 - 67 + 1)) + 67;
    this.randSystolic = Math.floor(Math.random() * (190 - 100 + 1)) + 100;
    this.randDistolic = Math.floor(Math.random() * (120 - 80 + 1)) + 80;
    this.randHeartrate = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
    this.randsugar = Math.floor(Math.random() * (200 - 120 + 1)) + 140;
    this.randtemperature = Math.floor(Math.random() * (41 - 36 + 1)) + 36;
  }
  setlabel() {
    if (this.randSpO2 <= 94) {
      this.randlabelSpO2 = 'High Risk';
    } else {
      this.randlabelSpO2 = 'Normal';
    }
    if (
      this.randSystolic >= 185 ||
      this.randSystolic <= 110 ||
      this.randDistolic >= 110 ||
      this.randDistolic <= 85
    ) {
      this.randlabelBP = 'High Risk';
    } else {
      this.randlabelBP = 'Normal';
    }
    if (this.randHeartrate >= 97 || this.randHeartrate <= 65) {
      this.randlabelHeartrate = 'High Risk';
    } else {
      this.randlabelHeartrate = 'Normal';
    }
    if (this.randsugar >= 170 || this.randsugar <= 140) {
      this.randlabelSugar = 'High Risk';
    } else {
      this.randlabelSugar = 'Normal';
    }
    if (this.randtemperature >= 38 || this.randtemperature <= 37) {
      this.randlabelTemperature = 'High Risk';
    } else {
      this.randlabelTemperature = 'Normal';
    }
  }

  constructor() {
    setInterval(() => {
      this.randomizer();
      this.currentTimeH = new Date().getHours();
      this.currentTimeM = new Date().getMinutes();
      this.currentTimeS = new Date().getSeconds();
      this.setlabel();
    }, seconds * 1000);
  }
  ngOnInit(): void {
  }
}
