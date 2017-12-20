
import { Owner } from '../owner';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OwnerService } from '../owner.service';

@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.css']
})
export class OwnerDetailComponent implements OnInit {

  @Input() owner: Owner;

  constructor(private ownerService: OwnerService) { }

  ngOnInit() {
  }

  save(): void {
   this.ownerService.updateOwner(this.owner)
   .subscribe(owner => console.log(owner));
 }
}
