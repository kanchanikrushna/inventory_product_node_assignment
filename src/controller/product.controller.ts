import * as express from "express";
import { controller, httpGet, response, httpPost, requestBody, BaseHttpController, requestParam } from 'inversify-express-utils';
import { inject } from 'inversify';
import TYPES from '../constant/types';
import { AddProductViewModel } from "../viewmodel/addproduct.viewmodel";
import { ProductService } from "../service/product.service";
import { AddProductToCartViewModel } from "../viewmodel/addproducttocart.viewmodel";

@controller('/product')
export class ProductController extends BaseHttpController {

  private readonly _productService: ProductService;
  public constructor(
    @inject(TYPES.ProductService) productService: ProductService
  ) {
    super();
    this._productService = productService;
  }

  @httpGet('/')
  public async get(
    @response() res: express.Response
  ) {
    return this.ok(await this._productService.GetAllProducts());
  }

  @httpPost('/add')
  public async addproduct(
    @requestBody() newProduct: AddProductViewModel,
    @response() res: express.Response
  ) {
    return (await this._productService.AddNewProduct(newProduct));
  }

  @httpPost('/addtocart')
  public async addproducttocart(
    @requestBody() product: AddProductToCartViewModel,
    @response() res: express.Response
  ) {
    return (await this._productService.AddProductToCart(product));
  }

  @httpPost('/checkout/:customerid')
  public async checkout(
    @requestParam("customerid") id: number,
    @response() res: express.Response
  ) {
    return (await this._productService.CheckOut(id));
  }

}
