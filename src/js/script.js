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

  const settings =
  {
    amountWidget:
    {
      defaultValue: 1,
      defaultMin: 1,
      defaultMax: 9,
    }
  };

  const templates =
  {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
  };

  class Product {
    constructor(id, data) {
      this.id = id;
      this.data = data;
      this.renderInMenu();
      this.initAccordion();
      console.log('new product: ', this);
    }

    initAccordion() {
      const thisProduct = this;
      const clickable_trigger = thisProduct.element.querySelector(select.menuProduct.clickable);

      clickable_trigger.addEventListener('click', function (event) {
        event.preventDefault();
        const active_product = document.querySelector(select.all.menuProductsActive);

        if (active_product != thisProduct.element && active_product !== null) {
          active_product.classList.remove(classNames.menuProduct.wrapperActive);
        }
        thisProduct.element.classList.toggle(classNames.menuProduct.wrapperActive);
      });
    }

    renderInMenu() {
      const generated_html = templates.menuProduct(this.data);
      this.element = utils.createDOMFromHTML(generated_html);
      const menu_container = document.querySelector(select.containerOf.menu);
      menu_container.appendChild(this.element);
    }
  }

  const app = {
    initMenu: function () {
      const p = new Product();
      console.log("Test p: ", p);
      console.log('dat: ', this.data);

      for (let p in this.data.products) {
        new Product(p, this.data.products[p]);
      }
    },

    initData: function () {
      this.data = dataSource;
    },

    init: function () {
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);
      thisApp.initData();
      thisApp.initMenu();
    },
  };

  app.init();
}
