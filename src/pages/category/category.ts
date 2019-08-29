import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { CrudProvider } from '../../providers/crud/crud';
import { EditCategoryPage } from '../edit-category/edit-category';
import { map } from 'rxjs/operators'
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  categories : Observable<any[]>;
  userData:any;
  
  constructor(public navCtrl:NavController,public navParams: NavParams, public afDb: AngularFireDatabase,public toast: ToastController) {
    this.userData = this.navParams.get("menuAccount");
    this.getAllCategory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter CategoryPage');
    this.getAllCategory();
  }

  getAllCategory(){
    this.categories = this.afDb.list('/categories').snapshotChanges().pipe(map(change => {
      return change.map( c=> ({ key: c.payload.key, ...c.payload.val() }))
    }));
  }

  addCategory(){
    this.navCtrl.push(EditCategoryPage);
  }

  editCategory(category){
    this.navCtrl.push(EditCategoryPage, {category: category});
  }

  removeCategory(param:any){
    this.afDb.object('/categories/'+ param.key).remove()
    .then(()=>{
      this.toast.create({
        message: "Category terhapus",
        duration: 3000,
        position: "bottom"
      }).present();
    }).catch(e=>{
      this.toast.create({
        message: "Category gagal dihapus",
        duration: 3000,
        position: "bottom"
      }).present();
    })
  }
}
