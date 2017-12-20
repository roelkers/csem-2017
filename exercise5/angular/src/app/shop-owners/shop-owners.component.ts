import { Component, OnInit } from '@angular/core';
import { Owner } from '../owner';
import { OwnerService } from '../owner.service';

@Component({
  selector: 'app-shop-owners',
  templateUrl: './shop-owners.component.html',
  styleUrls: ['./shop-owners.component.css']
})
export class ShopOwnersComponent implements OnInit {

  owners : Owner[];

  selectedOwner: Owner;

  constructor(private ownerService : OwnerService) { }

  ngOnInit() {
    this.getOwners();
    //this.getOwner("5a3a515e4784ec0027bc4d44");
  }

  onSelect(owner: Owner): void {
    this.selectedOwner = owner
  }

  getOwners(): void {
    this.ownerService.getOwners()
      .subscribe(owners => this.owners =owners);
  }

  getOwner(_id: String): void {
    this.ownerService.getOwner(_id)
      .subscribe(owner => console.log(owner))
  }
}
