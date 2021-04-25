
export const state = () => ({
  products: [],
  checkoutStatus: null,
  checkout:0,
  listProduct:[],
})

export const mutations = {
  setListProduct: (state,listProduct) => {
    state.listProduct = listProduct
  },

  increment( state, product) {
    const productItem = state.products.find(item => item.id=== product.id);

    if (!productItem) {
      state.products.push(product);

      product.count = 1;
      product.checkboxBuy=false;
    }
    else
      {
        if(product.checkboxBuy==true)
        {
          product.count++;
          state.checkout=state.checkout+product.price;
        }
        else
        {
          product.count++;
        }


    }
    product.store--;

  },
  decrement(state, product) {
    const productItem = state.products.find(item => item.id=== product.id);

    productItem.count--;
    state.products.forEach((element,index)=>{
      if  (element.count === 0) {
        state.products.splice(element,1);
      }
    })

    product.store++;
  },

  removeItemCart(state,product)
  {
   console.log(product);
    // let indexTemp = -1
    state.products.forEach((element,index)=>{
      if(element.id === product.id)
      {
        console.log(index);

        if(state.checkout===0)
        {
          state.products.splice(index,1);
          element.checkboxBuy=false;
          product.store+=element.count;
          return  ;
        }
        else{

          state.products.splice(index,1);
          state.checkout-=(element.price*element.count);
          element.checkboxBuy=false;
          product.store+=element.count;
          return;
        }


      }
    });
  },
  checkout(state,product)
  {
    if(product.checkboxBuy)
    {
      state.checkout+=(product.price*product.count);
    }
    else{
      state.checkout-=(product.price*product.count);
    }
  },
}
