import { AddProductViewModel } from './../viewmodel/addproduct.viewmodel';
import { Product } from "../entities/product";
import { injectable, inject } from "inversify";
import TYPES from "../constant/types";
import { Repository } from "typeorm";
import { AddProductToCartViewModel } from '../viewmodel/addproducttocart.viewmodel';
import { Cart } from '../entities/cart';


@injectable()
export class ProductService {

  private readonly _productRepository: Repository<Product>;
  private readonly _cartRepository: Repository<Cart>;
    public constructor(
        @inject(TYPES.ProductRepository)productRepository: Repository<Product>,
        @inject(TYPES.CartRepository)cartRepository: Repository<Cart>

    ) {
        this._productRepository = productRepository;
        this._cartRepository = cartRepository;
    }

    public async GetAllProducts(): Promise<Product[]>{
      return this._productRepository.find();
    }

    public async AddNewProduct(newProduct: AddProductViewModel){
      
      let product = new Product();
      product.name = newProduct.name;
      product.price = newProduct.price;
      product.quantity = newProduct.quantity;

      let result = await this._productRepository.insert(product);
      return result.identifiers;
    }

    public async AddProductToCart(newProduct: AddProductToCartViewModel){
      
      let cartReq = new Cart();
      cartReq.customerid = newProduct.customerid,
      cartReq.productid = newProduct.productid,
      cartReq.quantity = newProduct.quantity;

      let result = await this._cartRepository.insert(cartReq);
      return result.identifiers;
    }

    public async CheckOut(customerId: number){
      
     
    }


}
