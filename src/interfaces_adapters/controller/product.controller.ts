import * as express from "express";
import { controller, httpGet, response, httpPost, requestBody, BaseHttpController, requestParam } from 'inversify-express-utils';
import { inject } from 'inversify';
import TYPES from '../../domain/constant/types';
import { AddProductViewModel } from "../../domain/viewmodel/addproduct.viewmodel";
import { AddProductToCartViewModel } from "../../domain/viewmodel/addproducttocart.viewmodel";
import { IProductService } from "../services/IProductService";

@controller('/product')
export class ProductController extends BaseHttpController {

  private readonly _productService: IProductService;
  public constructor(
    @inject(TYPES.ProductService) productService: IProductService
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

  @httpGet('/:id')
  public async DetailsById(
    @requestParam("id") id: number,
    @response() res: express.Response
  ) {
    return this.ok(await this._productService.DetailsById(id));
  }

  @httpPost('/add')
  public async addproduct(
    @requestBody() newProduct: AddProductViewModel,
    @response() res: express.Response
  ) {
    let result = await this._productService.AddNewProduct(newProduct);
    if (result && result.identifiers && result.identifiers.length > 0) {
      return this.created('/' + String(result.identifiers[0]), result.raw);
    }
    else {
      return this.badRequest();
    }

  }

  @httpPost('/addtocart')
  public async addproducttocart(
    @requestBody() product: AddProductToCartViewModel,
    @response() res: express.Response
  ){
     return this.ok(await this._productService.AddProductToCart(product));
  }

  
  @httpPost('/checkout/:customerid')
  public async checkout(
    @requestParam("customerid") id: number,
    @response() res: express.Response
  ) {
    return this.ok(await this._productService.CheckOut(id));
  }


}
