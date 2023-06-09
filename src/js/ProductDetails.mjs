import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  
  //console.log(qty);
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}
    <span >qty <input id="qty" data-id="${product.Id}" type="number" value="1"></span>
    
    </p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    
  }
  async init() {
   
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails("main");
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    //document.getElementById("${product.Id}-qty").addEventListener("click", this.setQty.bind(this));
    
    document.getElementById("qty").addEventListener("click", this.setQty.bind(this));
    document.getElementById("addToCart").addEventListener("click", this.addToCart.bind(this));
  }
    setQty(){
      let qtyKey= document.getElementById("qty").value;
      let 
      
      //localStorage.setItem(this.productId+"qty", quantity);
    
       
      
      //console.log(getLocalStorage(this.productId+"qty"));
      console.log(qtyKey);
    }
    addToCart() {
        // setLocalStorage("so-cart", this.product); 
        let cart = getLocalStorage("so-cart");
        
        if (cart === null) {
          cart = [];
        }
        cart.push(this.product);
        setLocalStorage("so-cart", cart);
        console.log(getLocalStorage("so-cart"));
        
    };

    //    // add to cart button event handler
    //    async addToCartHandler(e) {
    //     const product1 = await dataSource.findProductById(e.target.dataset.id);
    //     product.addToCart();
    //   }
  
    //   // add listener to Add to Cart button
    //   document
    //     .getElementById("addToCart")
    //     .addEventListener("click", addToCartHandler);
   
    
    renderProductDetails(selector) {
      const element = document.querySelector(selector);
      element.insertAdjacentHTML(
        "afterBegin",
        productDetailsTemplate(this.product)
      );
    }
  }



