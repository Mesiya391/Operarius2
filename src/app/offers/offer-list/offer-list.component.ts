import { Component, ViewChild } from '@angular/core';
import { Offer } from './../../shared/offer';
import { MatPaginator, MatTableDataSource} from '@angular/material';
import { OfferService } from './../../shared/offer.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent {

  dataSource: MatTableDataSource<Offer>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  OfferData: any = [];
  displayedColumns: any[]=[
    '$key',
    'title',
    'description',
    'estimated_price',
    'location',
    'contact_number',
    'action'
    ];



  constructor(private offerApi: OfferService) {
    this.offerApi.GetOfferList()
    .snapshotChanges().subscribe(offer=>{
      offer.forEach(item=>{
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.OfferData.push(a as Offer)
      })
      this.dataSource = new MatTableDataSource(this.OfferData);
      setTimeout(()=>{
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
   }

   deleteOffer(index: number, e){
     if(window.confirm('Are you sure?')){
       const data = this.dataSource.data;
       data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
       this.dataSource.data = data;
       this.offerApi.DeleteOffer(e.$key)
     }
    }

}
