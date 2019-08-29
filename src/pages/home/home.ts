import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, MenuController, ToastController } from 'ionic-angular';
import { EditProductPage } from '../edit-product/edit-product';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Product } from '../../models/product/product-model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products:Observable<any[]>;
  product: Product;
  onlyInactives: boolean = false;
  searchText='';
  userDetails: any;
  //pengganti data model
  userData = {"username":"","password":"","position":"","phone":"","email":"","affiliation":"","datemodified":""};


  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, menu: MenuController, private toast: ToastController, private afDb: AngularFireDatabase , private favoriteProvider: FavoriteProvider) {
    
    menu.enable(true);
    //mengambil data dari localstorage
    const data = JSON.parse(localStorage.getItem('userData')); 
    this.userDetails = data;
    if(this.userDetails!=null){
      this.userData.username = this.userDetails[0].username; 
      this.userData.password = this.userDetails[0].password;
      this.userData.email = this.userDetails[0].email; 
      this.userData.phone = this.userDetails[0].phone;
      this.userData.affiliation = this.userDetails[0].affiliation;
      this.userData.position = this.userDetails[0].position; 
    }

    this.getAllProducts();
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  ionViewDidEnter(){
    this.getAllProducts();
  }

getAllProducts(){
   this.products = this.afDb.list('/products').snapshotChanges().pipe(map(change => {
    return change.map( c=> ({ key: c.payload.key, ...c.payload.val() }))
  }));
}

 addProduct(){
  this.navCtrl.push(EditProductPage);
 }

 editProduct(product){
  this.navCtrl.push(EditProductPage, {product: product});
 }

 removeProduct(param){
  this.afDb.object('/products/'+ param.key).remove()
  .then(()=>{
    this.toast.create({
      message: "Product terhapus",
      duration: 3000,
      position: "bottom"
    }).present();
  }).catch(e=>{
    this.toast.create({
      message: "Product gagal dihapus",
      duration: 3000,
      position: "bottom"
    }).present();
  })
 }

 filterProducts(ev: string){
  console.log('key search '+this.searchText);
  let ref = firebase.database().ref('/products');
  ref.orderByChild('name').startAt(this.searchText).on('child_added',snapshot => {
    console.log('hasilnya '+ snapshot.key + snapshot.val().name);
  });

 }

 addToFavorite(product: Product){
   this.favoriteProvider.get(product.id).then((result: boolean)=>{
     if(result){
       console.log("Product sudah menjadi favorite :", result);
        this.toast.create({
          message: "Product sudah menjadi favorite!",
          duration: 3000,
          position: "bottom"
        }).present();
     }else{
        console.log("Product belum favorite!");
        this.favoriteProvider.addFavorite(product).then(() => {
          this.toast.create({
            message: "Product berhasil ditambahkan ke favorite!",
            duration: 3000,
            position: "bottom"
          }).present();
        });
     }
     this.getAllProducts();
   });
  }
}
