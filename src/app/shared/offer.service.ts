import { Injectable } from '@angular/core';
import { Offer } from './offer';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AddOfferComponent } from '../offers/add-offer/add-offer.component';
import { getMatFormFieldDuplicatedHintError } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class OfferService {
  offersRef: AngularFireList<any>;
  offerRef: AngularFireObject<any>;


  constructor( private db: AngularFireDatabase) { }

    AddOffer(offer: Offer){
    this.offersRef.push({
    title: offer.offer_title,
    description: offer.description,
    estimated_price: offer.estimated_price,
    location: offer.location,
    contact_number: offer.contact_number,
    publication_date: offer.publication_date
    })
    .catch(error=>{
      this.errorMgmt(error);
    })
  }

    GetOffer( id: string){
      this.offerRef = this.db.object('offer-list/' + id);
      return this.offerRef;
    }

    GetOfferList(){
      this.offersRef = this.db.list('offer-list');
      return this.offersRef;
    }

    UpdateOffer(id, offer:Offer){
      this.offerRef.update({
        offer:offer.offer_title,
        description: offer.description,
        estimated_price: offer.estimated_price,
        location: offer.location,
        contact_number: offer.contact_number,
        publication_date: offer.publication_date
    })
    }

    DeleteOffer(id:string){
      this.offerRef = this.db.object('offer-list/' + id);
      this.offerRef.remove()
      .catch(error=>{
        this.errorMgmt(error);
      })
    }
    
    private errorMgmt(error){
      console.log(error)
    }
  }
