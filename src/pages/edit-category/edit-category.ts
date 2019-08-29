import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'page-edit-category',
  templateUrl: 'edit-category.html',
})
export class EditCategoryPage {

  category = {
    id:'',
    name:''
  }
  judul: string;
  editcategory:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private toast: ToastController, private afDb:AngularFireDatabase) {
    this.judul = "Add Category";
    this.editcategory = this.navParams.get('category');
    if(this.editcategory){
      this.judul = "Edit Category";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCategoryPage');
    if(this.editcategory){
      this.category = this.editcategory;
    }
  }

  save(){
    if(this.editcategory){
      this.afDb.list('/categories/').update(this.editcategory.key,{
        id:this.editcategory.key,
        name:this.category.name
      }).then(()=>{
        this.toast.create({
          message: "Berhasil update category",
          duration: 3000,
          position: "bottom"
        }).present();
      }).catch(e=>{
        this.toast.create({
          message: "Gagal mengupdate category",
          duration: 3000,
          position: "bottom"
        }).present();
      })
    } else {
      this.afDb.list('/categories/').push({
        name:this.category.name
      }).then(()=>{
        this.toast.create({
          message: "Berhasil menambahkan category",
          duration: 3000,
          position: "bottom"
        }).present();
      }).catch(e=>{
        this.toast.create({
          message: "Gagal menambahkan category",
          duration: 3000,
          position: "bottom"
        }).present();
      })
    }

    this.navCtrl.pop();
  }
}