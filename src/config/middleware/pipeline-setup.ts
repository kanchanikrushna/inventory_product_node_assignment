import * as bodyParser from 'body-parser';
import * as cors from 'cors'

export class PipeLineSetUp {

    private static whitelist = ['http://127.0.0.1:8080']
    private static corsOptions = {
        origin: function (origin, callback) {
            if (PipeLineSetUp.whitelist.indexOf(origin) !== -1 || !origin) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }
    public static configFn(theApp) {
        theApp.use(bodyParser.urlencoded({
            extended: true
        }));
        theApp.use(bodyParser.json());
        theApp.use(cors(PipeLineSetUp.corsOptions))
    }

    public static HandleError(theApp) {
        theApp.use((err, req, res, next) => {
            console.log(err);
            res.status(500).send('Something broke!');
        });
    }


}