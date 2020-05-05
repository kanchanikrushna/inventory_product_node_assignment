import { getConnection } from "typeorm";
import { injectable } from "inversify";

@injectable()
export class GenericRepository {

   public  getConnection() {
        const conn = getConnection();
        return conn;
    }

    public getRepository(T: any) {
        const movieRepository = this.getConnection().getRepository(T);
        return movieRepository;
    }


}
