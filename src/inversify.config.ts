import { AsyncContainerModule } from "inversify";

import TYPES from "./constant/types";
import { Repository } from "typeorm";
import { Product } from "./entities/product";
import { GenericRepository } from "./repositories/getrepository";
import { getDbConnection } from "./repositories/db";
import { ProductService } from "./service/product.service";
import { Cart } from "./entities/cart";


export const bindings = new AsyncContainerModule(async (bind) => {

    await getDbConnection();
    await require("./controller/product.controller");

    bind<GenericRepository>(TYPES.GenericRepository).to(GenericRepository).inTransientScope();

    bind<Repository<Product>>(TYPES.ProductRepository).toDynamicValue((x) => {
        let as =  x.container.get<GenericRepository>(TYPES.GenericRepository);
        return as.getRepository(Product) as Repository<Product>;
    }).inRequestScope();

    bind<Repository<Cart>>(TYPES.CartRepository).toDynamicValue((x) => {
        let as =  x.container.get<GenericRepository>(TYPES.GenericRepository);
        return as.getRepository(Cart) as Repository<Cart>;
    }).inRequestScope();


    bind<ProductService>(TYPES.ProductService).to(ProductService).inTransientScope();

});
