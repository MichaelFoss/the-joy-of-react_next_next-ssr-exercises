'use client';
import React, { useEffect } from 'react';

import DATA from './data';
import reducer from './reducer';
import StoreItem from './StoreItem';
import CheckoutFlow from './CheckoutFlow';
import './styles.css';

function CheckoutExercise() {
  const [state, dispatch] = React.useReducer(reducer, {
    items: [],
    isLoading: true,
  });
  const { items, isLoading } = state;

  useEffect(() => {
    try {
      const json = window.localStorage.getItem('saved-cart');
      if (json !== 'undefined') {
        const savedCart = JSON.parse(json);
        if (!!savedCart) {
          dispatch({
            type: 'restore-cart',
            cart: savedCart,
          });
        }
      }
    } catch (err) {
      console.log(err);
      window.localStorage.removeItem('saved-cart');
    } finally {
      dispatch({
        type: 'end-bootstrap',
      });
    }
  }, []);

  return (
    <>
      <h1>Neighborhood Shop</h1>

      <main>
        <div className="items">
          {DATA.map((item) => (
            <StoreItem
              key={item.id}
              item={item}
              handleAddToCart={(item) => {
                dispatch({
                  type: 'add-item',
                  item,
                });
              }}
            />
          ))}
        </div>

        <CheckoutFlow
          items={items}
          taxRate={0.15}
          handleDeleteItem={(item) =>
            dispatch({
              type: 'delete-item',
              item,
            })
          }
          isLoading={isLoading}
        />
      </main>
    </>
  );
}

export default CheckoutExercise;
