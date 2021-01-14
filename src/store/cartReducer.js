const initialCart = [];

const cartReducer = (state = initialCart, action) => {
  switch (action.type) {
    case 'ADD':
      const productIndex = state.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (productIndex > -1) {
        return state.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              amount: item.amount + 1,
            };
          }
          return item;
        });
      }

      return [
        ...state,
        {
          ...action.payload,
          amount: 1,
        },
      ];
    case 'PLUS':
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            amount: item.amount + 1,
          };
        }
        return item;
      });
    case 'MINUS':
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            amount: item.amount - 1 || 1,
          };
        }
        return item;
      });
    case 'REMOVE':
      return state.filter((item) => {
        return item.id !== action.payload;
      });
    case 'ALL':
      return [];
    default:
      return state;
  }
};

export default cartReducer;
