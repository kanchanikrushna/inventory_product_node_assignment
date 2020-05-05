import { Product } from "../../domain/entities/product";
import { AddProductViewModel } from "../../domain/viewmodel/addproduct.viewmodel";
import { InsertResult } from "typeorm";
import { AddProductToCartViewModel } from "../../domain/viewmodel/addproducttocart.viewmodel";

export interface IProductService{
    GetAllProducts(): Promise<Product[]>;
    AddNewProduct(newProduct: AddProductViewModel): Promise<InsertResult>;
    AddProductToCart(newProduct: AddProductToCartViewModel);
    CheckOut(customerId: number);
    DetailsById(id: number): Promise<Product>;
}