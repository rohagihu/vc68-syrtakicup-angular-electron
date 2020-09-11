import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';

import { AddItem, RemoveItem } from './items.actions';

import { Observable } from 'rxjs';

export interface ItemsStateModel {
  items: string[];
}

@State<ItemsStateModel>({
  name: 'items',
  defaults: {
    items: ['a', 'b', 'c', 'd', 'e', 'f']
  }
})
@Injectable()
export class ItemsState {

  // @Select(state => state.items) animals$: Observable<ItemsStateModel[]>;

  @Action(AddItem)
  addItem(ctx: StateContext<ItemsStateModel>, action): void {
    const state = ctx.getState();
    console.log('hdwhdiu', action);
    ctx.patchState({
      items: [
        ...state.items,
        action.name,
      ]
    });
  }

  @Action(RemoveItem)
  removeItem(ctx: StateContext<ItemsStateModel>, action): void {
    const state = ctx.getState();
    console.log('remove', action);
    ctx.patchState({
      items: [
        ...state.items.filter((item, i) => i !== action.id),
      ]
    });
  }
}
