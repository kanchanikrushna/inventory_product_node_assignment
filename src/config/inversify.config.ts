import { AsyncContainerModule } from "inversify";

import TYPES from "../domain/constant/types";
import { Repository } from "typeorm";
import { Product } from "../domain/entities/product";
import { GenericRepository } from "../infrastructure/repositories/GenericRepository";
import { getDbConnection } from "../infrastructure/repositories/db";
import { ProductService } from "../infrastructure/service/product.service";
import { Cart } from "../domain/entities/cart";
import { IGenericRepository } from "../interfaces_adapters/repositories/IGenericRepository";
import { IProductService } from "../interfaces_adapters/services/IProductService";


export const bindings = new AsyncContainerModule(async (bind) => {

    await getDbConnection();

    bind<IGenericRepository>(TYPES.GenericRepository).to(GenericRepository).inTransientScope();

    bind<Repository<Product>>(TYPES.ProductRepository).toDynamicValue((x) => {
        let as =  x.container.get<IGenericRepository>(TYPES.GenericRepository);
        return as.getRepository(Product) as Repository<Product>;
    }).inRequestScope();

    bind<Repository<Cart>>(TYPES.CartRepository).toDynamicValue((x) => {
        let as =  x.container.get<IGenericRepository>(TYPES.GenericRepository);
        return as.getRepository(Cart) as Repository<Cart>;
    }).inRequestScope();


    bind<IProductService>(TYPES.ProductService).to(ProductService).inTransientScope();

});
