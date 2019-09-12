import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from  './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Operarius';
  items: Observable<any[]>;
  constructor(db: AngularFirestore,private  authService:  AuthService) {
    this.items = db.collection('items').valueChanges();
  }
}
