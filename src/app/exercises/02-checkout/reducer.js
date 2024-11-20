import { produce } from 'immer';

function reducer(state, action) {
  return produce(state, (draftState) => {
    switch (action.type) {
      case 'add-item': {
        const itemIndex = state.items.findIndex(
          (item) => item.id === action.item.id
        );

        if (itemIndex !== -1) {
          draftState.items[itemIndex].quantity += 1;
        } else {
          draftState.items.push({
            ...action.item,
            quantity: 1,
          });
        }

        window.localStorage.setItem(
          'saved-cart',
          JSON.stringify(draftState.items)
        );
        return;
      }

      case 'delete-item': {
        const itemIndex = state.items.findIndex(
          (item) => item.id === action.item.id
        );

        draftState.items.splice(itemIndex, 1);
        window.localStorage.setItem(
          'saved-cart',
          JSON.stringify(draftState.items)
        );
        return;
      }

      case 'restore-cart': {
        draftState.items = [...action.cart];
        return;
      }

      case 'end-bootstrap': {
        draftState.isLoading = false;
        return;
      }
    }
  });
}

export default reducer;
