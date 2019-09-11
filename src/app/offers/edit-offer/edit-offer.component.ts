import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { OfferService } from './../../shared/offer.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Language{
  name:string;
}


@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[]=[];
  @ViewChild('chipList')chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  editOfferForm: FormGroup;
  
  ngOnInit(){
    this.updateOfferForm();
  }

  constructor(
    public fb: FormBuilder,
    private location: Location,
    private offerApi: OfferService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    var id=this.actRoute.snapshot.paramMap.get('id');
    this.offerApi.GetOffer(id).valueChanges().subscribe(data=>{
      this.editOfferForm.setValue(data);
    })
  }

    updateOfferForm(){
     
    this.editOfferForm=this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      estimated_price: ['', [Validators.required]],
      location: ['', [Validators.required]],
      contact_number: ['', [Validators.required]]
         })
    }

    formatDate(e){
      var convertDate = new Date(e.target.value).toISOString().substring(0,10);
      this.editOfferForm.get('publication_date').setValue(convertDate, {
        onlyself:true
      }) 
    }

    goBack(){
      this.location.back();
    }

    updateOffer(){
      var id = this.actRoute.snapshot.paramMap.get('id');
      if(window.confirm('Are you sure wanna update?')){
        this.offerApi.UpdateOffer(id, this.editOfferForm.value);
        this.router.navigate(['offer-list']);
      }
    }
   }

