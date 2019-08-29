import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {

  product = {
    id:'',
    name:'',
    category_name:'',
    duedate:'',
    price:'',
    active:''
  }
  categories:Observable<any[]>;
  editproduct:any;
  judul: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private toast: ToastController, private afDb:AngularFireDatabase) {
    
    this.judul = "Add Product";
    this.editproduct = this.navParams.get('product');
    if(this.editproduct){
      this.judul = "Edit Product";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProductPage');
    this.categories = this.afDb.list('/categories').valueChanges();
    if(this.editproduct){
      this.product = this.editproduct;
    }
  }

  save(){
    if(this.editproduct){
      this.afDb.list('/products/').update(this.editproduct.key,{
        id:this.editproduct.key,
        name:this.product.name,
        category_name:this.product.category_name,
        price:this.product.price,
        duedate:this.product.duedate,
        active:this.product.active
      }).then(()=>{
        console.log("Update product berhasil");
      }).catch(e=>{
        console.log(e)
      })
    } else {
      this.afDb.list('/products/').push({
        name:this.product.name,
        category_name:this.product.category_name,
        price:this.product.price,
        duedate:this.product.duedate,
        active:this.product.active
      })
    }

    this.navCtrl.pop();
  }
}