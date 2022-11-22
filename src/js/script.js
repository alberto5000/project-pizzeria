/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf:
    {
      menuProduct: '#template-menu-product',
    },

    containerOf: {
      menu: '#product-list',
      cart: '#cart',
    },

    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
    },

    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]',
    },

    widgets: {
      amount:
      {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };

  const classNames = {
    menuProduct:
    {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
  };

  // const settings = //--npm complains about unused variables
  // {
  //   amountWidget:
  //   {
  //     defaultValue: 1,
  //     defaultMin: 1,
  //     defaultMax: 9,
  //   }
  // };

  const templates =
  {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
  };

  class Product {
    constructor(id, data) {
      this.id = id;
      this.data = data;
      this.renderInMenu();
      this.getElements();
      this.initAccordion();
      this.initOrderForm();
      this.processOrder();
    }

    initAccordion() {
      const thisProduct = this;

      thisProduct.accordionTrigger.addEventListener('click', function (event) {
        event.preventDefault();
        const activeProduct = document.querySelector(select.all.menuProductsActive);

        if (activeProduct != thisProduct.element && activeProduct !== null) {
          activeProduct.classList.remove(classNames.menuProduct.wrapperActive);
        }
        thisProduct.element.classList.toggle(classNames.menuProduct.wrapperActive);
      });
    }

    initOrderForm() {
      const thisProduct = this;
      thisProduct.form.addEventListener('submit', function (event) {
        event.preventDefault();
        thisProduct.processOrder();
      });

      for (let input of thisProduct.formInputs) {
        input.addEventListener('change', function () {
          thisProduct.processOrder();
        });
      }

      thisProduct.cartButton.addEventListener('click', function (event) {
        event.preventDefault();
        thisProduct.processOrder();
      });
    }

    processOrder() {
      const thisProduct = this;

      const formData = utils.serializeFormToObject(thisProduct.form);

      // set price to default price
      let price = thisProduct.data.price;

      for (let paramId in thisProduct.data.params) {
        const param = thisProduct.data.params[paramId];

        // for every option in this category
        for (let optionId in param.options) {
          const option = param.options[optionId];
          const optionSelected = formData[paramId] && formData[paramId].includes(optionId);
          const optionImage = thisProduct.imageWrapper.querySelector('.' + paramId + '-' + optionId);

          if (optionSelected) {
            if (!option.default) {
              price += option.price;
            }
          }
          else {
            if (option.default) {
              price -= option.price;
            }
          }

          if (optionImage) {
            if (optionSelected) {
              optionImage.classList.add(classNames.menuProduct.imageVisible);
            }
            else {
              optionImage.classList.remove(classNames.menuProduct.imageVisible);
            }

          }
        }

      }

      thisProduct.priceElem.innerHTML = price;
    }

    renderInMenu() {
      const generatedHtml = templates.menuProduct(this.data);
      this.element = utils.createDOMFromHTML(generatedHtml);
      const menuContainer = document.querySelector(select.containerOf.menu);
      menuContainer.appendChild(this.element);
    }

    getElements() {
      const thisProduct = this;

      thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
      thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
      thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
      thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
      thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
      thisProduct.imageWrapper = thisProduct.element.querySelector(select.menuProduct.imageWrapper);
    }
  }

  const app = {
    initMenu: function () {
      const thisApp = this;
      for (let p in thisApp.data.products) {
        new Product(thisApp.data.products[p].id, thisApp.data.products[p]);
      }
    },

    initData: function () {
      this.data = dataSource;
    },

    init: function () {
      const thisApp = this;
      thisApp.initData();
      thisApp.initMenu();
    },
  };

  app.init();
}
