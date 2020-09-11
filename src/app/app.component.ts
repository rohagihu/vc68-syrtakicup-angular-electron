import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AddItem, RemoveItem } from './store/items.actions';
import { Observable } from 'rxjs';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

// import { MDBModalRef } from 'ngx-bootstrap/modal';

import { ItemsState, ItemsStateModel } from './store/items.state';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // providers: [FormBuilder]
})


export class AppComponent implements OnInit {
  // @Select(ItemsState.items) items$: Observable<ItemsStateModel[]>;

  @ViewChild('itemInput') itemInput: ElementRef;
  @ViewChild('basicModal', {static: true}) public modal;

  // modalRef: BsModalRef;
  modalOpenedIndex: number;

  items$: Observable<ItemsStateModel[]>;
  items: ItemsStateModel[] = []
  // cardForm: FormGroup;

  constructor(
    private store: Store,
    // private fb: FormBuilder
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
    console.log('a')
    this.modal.show();
    this.modalOpenedIndex = i;
  }

  confirm(): void {
    this.removeItem(this.modalOpenedIndex);
    this.modalOpenedIndex = null;
    this.modal.hide();
  }

  decline(): void {
    this.modalOpenedIndex = null;
    this.modal.hide();
  }


}
