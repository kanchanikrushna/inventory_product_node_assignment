import { Product } from "../../domain/entities/product";
import { AddProductViewModel } from "../../domain/viewmodel/addproduct.viewmodel";
import { InsertResult } from "typeorm";
import { AddProductToCartViewModel } from "../../domain/viewmodel/addproducttocart.viewmodel";
import { OrderInvoiceDetails } from "../../domain/viewmodel/order-invoicedetails";

export interface IProductService{
    GetAllProducts(): Promise<Product[]>;
    AddNewProduct(newProduct: AddProductViewModel): Promise<InsertResult>;
    AddProductToCart(newProduct: AddProductToCartViewModel): Promise<InsertResult>;
    CheckOut(customerId: number): Promise<OrderInvoiceDetails[]>;
    DetailsById(id: number): Promise<Product>;
}