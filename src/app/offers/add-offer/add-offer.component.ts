import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { OfferService } from './../../shared/offer.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms'

export interface Language{
  name: string;
}

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css'],

})
export class AddOfferComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur =true;
  @ViewChild('chipList') chipList;
  @ViewChild('resetOfferForm') myNgForm;
  readonly seperatorKeysCodes:number[] = [ENTER, COMMA];
  offerForm: FormGroup;

  ngOnInit(){
    this.offerApi.GetOfferList();
    this.submitOfferForm();
  }

  constructor(
    public fb: FormBuilder,
    private offerApi: OfferService
  ) {}

  submitOfferForm(){
    this.offerForm = this.fb.group({
     title: ['', [Validators.required]],
     description: ['', [Validators.required]],
     estimated_price: ['', [Validators.required]],
     location: ['', [Validators.required]],
     contact_number: ['', [Validators.required]],
        })
  }

  public handleError = (controlName: string, errorName: string)=>{
    return this.offerForm.controls[controlName].hasError(errorName);
  }
  
  formatDate(e){
    var convertDate = new Date(e.target.value).toISOString().substring(0,10);
    this.offerForm.get('publication_date').setValue(convertDate,{
      onlyself: true
    })
  }

  resetForm(){
    this.offerForm.reset();
    Object.keys(this.offerForm.controls).forEach(key=>{
      this.offerForm.controls[key].setErrors(null)
    });
  }

  submitOffer(){
      if(this.offerForm.valid){
      this.offerApi.AddOffer(this.offerForm.value)
      this.resetForm();
      }
    }
  }


