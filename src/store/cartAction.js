const {createAction} = require('@reduxjs/toolkit');

const addToCart = createAction('ADD', function prepare(product) {
  return {
    payload: product,
  };
});

const plusProduct = createAction('PLUS', function prepare(product) {
  return {
    payload: product,
  };
});

const minusProduct = createAction('MINUS', function prepare(product) {
  return {
    payload: product,
  };
});

const removeFromCart = createAction('REMOVE', function prepare(id) {
  return {
    payload: id,
  };
});

const removeAllCart = createAction('ALL', function prepare() {
  return {
    payload: {},
  };
});

export {addToCart, removeFromCart, plusProduct, minusProduct, removeAllCart};
