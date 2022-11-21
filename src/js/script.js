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
      this.getElements();
      this.initAccordion();
      this.initOrderForm();
      this.initAccordion();
      console.log('new product: ', this);
    }

    initAccordion() {
      const thisProduct = this;

      thisProduct.accordionTrigger.addEventListener('click', function (event) {
        event.preventDefault();
        const active_product = document.querySelector(select.all.menuProductsActive);

        if (active_product != thisProduct.element && active_product !== null) {
          active_product.classList.remove(classNames.menuProduct.wrapperActive);
        }
        thisProduct.element.classList.toggle(classNames.menuProduct.wrapperActive);
      });
    }

    initOrderForm() 
    {
      const thisProduct = this;
    }

    processOrder()
    {
      const thisProduct = this;
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
    }
  }

  const app = {
    initMenu: function () {
      const product = new Product();
      console.log("Test p: ", product);
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
