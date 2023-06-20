import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { addDoc, deleteDoc } from '@firebase/firestore';
import { Hospital } from '../models/hospital';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor(private db: Firestore) { }

  getAllHospital() {
    return collection(this.db, "hospital");
  }
  getUser(id: string) {
    const dbInstance = collection(this.db, "users");
    return getDoc(doc(dbInstance, id));
  }
  getHospital(id: string) {
    const dbInstance = collection(this.db, "hospital");
    return getDoc(doc(dbInstance, id));
  }

  updateUser(user: any) {
    const dataUpdate = doc(this.db, "users", user.id);
    return updateDoc(dataUpdate, { ...user });
  }
  updateHospital(hospital: any) {
    const dataUpdate = doc(this.db, "hospital", hospital.id);
    return updateDoc(dataUpdate, { ...hospital });
  }

  addHospitalToUser(user: any, hospitalID: string) {
    const dataUpdate = doc(this.db, "users", user.id);
    return updateDoc(dataUpdate, { ...user, hospitalID: hospitalID });
  }

  getAllUsers() {
    return collection(this.db, "users");
  }
  deleteUser(id: string) {
    const dataUpdate = doc(this.db, "users/" + id);
    return deleteDoc(dataUpdate);
  }
  deleteHospital(id: string) {
    const dataUpdate = doc(this.db, "hospital/" + id);
    return deleteDoc(dataUpdate);
  }
  addHospital(hospital: Hospital) {
    const dbInstance = collection(this.db, "hospital");
    return addDoc(dbInstance, { ...hospital });
  }
}
