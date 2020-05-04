import * as bodyParser from 'body-parser';

export class PipeLineSetUp {

    public static configFn(theApp) {
        theApp.use(bodyParser.urlencoded({
            extended: true
        }));
        theApp.use(bodyParser.json());
    }

    public static HandleError(theApp) {
        theApp.use((err, req, res, next) => {
            res.status(500).send('Something broke!');
        });
    }


}