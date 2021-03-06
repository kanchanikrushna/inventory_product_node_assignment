import { AddProductViewModel } from '../../domain/viewmodel/addproduct.viewmodel';
import { Product } from "../../domain/entities/product";
import { injectable, inject } from "inversify";
import TYPES from "../../domain/constant/types";
import { Repository, InsertResult } from "typeorm";
import { AddProductToCartViewModel } from '../../domain/viewmodel/addproducttocart.viewmodel';
import { Cart } from '../../domain/entities/cart';
import { IGenericRepository } from '../../interfaces_adapters/repositories/IGenericRepository';
import { IProductService } from '../../interfaces_adapters/services/IProductService';
import { OrderInvoiceDetails } from '../../domain/viewmodel/order-invoicedetails';

@injectable()
export class ProductService implements IProductService {

  private readonly _productRepository: Repository<Product>;
  private readonly _cartRepository: Repository<Cart>;
  private readonly _genericRepository: IGenericRepository;

  public constructor(
    @inject(TYPES.ProductRepository) productRepository: Repository<Product>,
    @inject(TYPES.CartRepository) cartRepository: Repository<Cart>,
    @inject(TYPES.GenericRepository) genericRepository: IGenericRepository

  ) {
    this._productRepository = productRepository;
    this._cartRepository = cartRepository;
    this._genericRepository = genericRepository
  }

  public async GetAllProducts(): Promise<Product[]> {
    return this._productRepository.find();
  }

  public async AddNewProduct(newProduct: AddProductViewModel): Promise<InsertResult> {
    let product = new Product();
    product.name = newProduct.name;
    product.price = newProduct.price;
    product.quantity = newProduct.quantity;

    return await this._productRepository.insert(product);
  }

  public async DetailsById(id: number): Promise<Product> {
    return await this._productRepository.findOne({
      where: {
        id: id
      }
    });
  }

  public async AddProductToCart(newProduct: AddProductToCartViewModel): Promise<InsertResult> {

    let cartReq = new Cart();
    cartReq.customerid = newProduct.customerid,
      cartReq.productid = newProduct.productid,
      cartReq.quantity = newProduct.quantity;
    return await this._cartRepository.insert(cartReq);
  }

  public async CheckOut(customerId: number): Promise<OrderInvoiceDetails[]> {
   return await this._genericRepository.getConnection().query(`EXEC usp_checkout ${customerId}`).then(x => {
      return x;
    }).catch(err => {
      console.log(err);
    })

  }


}
