import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AddItem, RemoveItem } from '../store/items.actions';
import { Observable } from 'rxjs';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

// import { MDBModalRef } from 'ngx-bootstrap/modal';

import { ItemsState, ItemsStateModel } from '../store/items.state';

@Component({
  selector: 'app-ngxs-test',
  templateUrl: './ngxs-test.component.html',
  styleUrls: ['./ngxs-test.component.css']
})

export class NgxsTestComponent implements OnInit {
  // @Select(ItemsState.items) items$: Observable<ItemsStateModel[]>;

  @ViewChild('itemInput') itemInput: ElementRef;
  @ViewChild('basicModal', {static: true}) public modal;

  // modalRef: BsModalRef;
  modalOpenedIndex: number;

  items$: Observable<ItemsStateModel[]>;
  items: ItemsStateModel[] = []

  constructor(
    private store: Store,
    // private modalService: BsModalService
  ) {
    this.items$ = this.store.select(state => state.items.items);
  }

  ngOnInit(): void {
    this.items$.subscribe(item => {
      this.items = item;
    });
  }

  addItem(): void {
    let name: string = this.itemInput.nativeElement.value
    this.store.dispatch(new AddItem(name));
    this.itemInput.nativeElement.value = '';
  }


  removeItem(id: number): void {
    this.store.dispatch(new RemoveItem(id));
  }


  openModal(i: number): void {
    // this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    console.log('a')
    this.modal.show();
    this.modalOpenedIndex = i;
  }

  confirm(): void {
    this.removeItem(this.modalOpenedIndex);
    this.modalOpenedIndex = null;
    this.modal.hide();
    // this.modalRef.hide();
  }

  decline(): void {
    this.modalOpenedIndex = null;
    this.modal.hide();
    // this.modalRef.hide();
  }


}
