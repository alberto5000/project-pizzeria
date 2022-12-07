import { select } from '../settings.js';
import AmountWidget from './AmountWidget.js';

class CartProduct {
  constructor(element, menuProduct) {
    const thisCartProduct = this;

    thisCartProduct.id = menuProduct.id;
    thisCartProduct.name = menuProduct.name;
    thisCartProduct.amount = menuProduct.amount;
    thisCartProduct.priceSingle = menuProduct.priceSingle;
    thisCartProduct.price = menuProduct.price;
    thisCartProduct.params = menuProduct.params;

    thisCartProduct.getElements(element);
    thisCartProduct.initAmountWidget();
    thisCartProduct.initAction();
  }

  getElements(element) {
    const thisCartProduct = this;

    thisCartProduct.dom = {
      amountWidget: element.querySelector(select.cartProduct.amountWidget),
      price: element.querySelector(select.cartProduct.price),
      edit: element.querySelector(select.cartProduct.edit),
      remove: element.querySelector(select.cartProduct.remove)
    };

    thisCartProduct.dom.wrapper = element;
  }

  initAmountWidget() {
    const thisCartProduct = this;

    thisCartProduct.amountWidget = new AmountWidget(
      thisCartProduct.dom.amountWidget,
      thisCartProduct.amount
    );

    thisCartProduct.dom.amountWidget.addEventListener('updated', function () {
      thisCartProduct.amount = thisCartProduct.amountWidget.value;
      thisCartProduct.newPrice =
        thisCartProduct.priceSingle * thisCartProduct.amount;
      thisCartProduct.dom.price.innerHTML = thisCartProduct.newPrice;
    });
  }

  remove() {
    const thisCartProduct = this;
    const event = new CustomEvent('remove', {
      bubbles: true,
      detail: {
        cartProduct: thisCartProduct
      }
    });

    thisCartProduct.dom.wrapper.dispatchEvent(event);
  }

  initAction() {
    const thisCartProduct = this;

    thisCartProduct.dom.edit.addEventListener('click', function (event) {
      event.preventDefault();
    });

    thisCartProduct.dom.remove.addEventListener('click', function (event) {
      event.preventDefault();

      thisCartProduct.remove();
      console.log('remove', thisCartProduct.remove());
    });
  }

  getData() {
    const thisCartProduct = this;

    const cartProductSummary = {
      id: thisCartProduct.id,
      name: thisCartProduct.name,
      amount: thisCartProduct.amount,
      priceSingle: thisCartProduct.priceSingle,
      price: thisCartProduct.price,
      params: thisCartProduct.params
    };
    console.log('cartProductSummary:', cartProductSummary);
    return cartProductSummary;
  }
}

export default CartProduct;
