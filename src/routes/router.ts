//Dependecies
import * as express from "express";
import app from "./../app";
import * as jwt from 'jsonwebtoken';
import * as cors from 'cors';



//Controllers
import userCntroller from './../controllers/user';
import photosController from './../controllers/photos';
import ResponseDto from '../DTO/response';



class Router{
    public router = express.Router();
    public midleware = express.Router();
    
    constructor(){

        //midleware para validar token
        this.midleware.use((req, res, next) => {
            const token = req.headers['token'];
            if (token) {
            jwt.verify(token, app.get('llave'), (err, decoded) => {      
                if (err) {
                res.send(new ResponseDto(200, "Token invalido", {}, false));
                return; 
                } else {
                req.decoded = decoded;
                next();
                }
            });
            } else {
                res.send(new ResponseDto(200, "Token requerido", {}, false));
            }
        });

        //para las cors security
        app.use(cors());
        
        //rutas...
        this.router.post("/user/create", userCntroller.create);    
        this.router.post('/login', userCntroller.login);
        this.router.get('/photos/:page',this.midleware, photosController.getPhotos);


    }


}

export default new Router().router;