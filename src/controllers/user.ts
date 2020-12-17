//Dependencies
import * as jwt from 'jsonwebtoken';
import app from "./../app";

import ResponseDto from './../DTO/response';
import User from './../DTO/user'
import db from '../../config/database';


class UserController{
    
    constructor(){}

    create(req, res){
        let data:User = req.body;
        

        let sql = "select * from users where email = ?";
        db.get(sql, data.email, (err, user) => {
            if (err) {
                res.send(new ResponseDto(200, "Ha ocurrido un error, intenete mas tarde", {}, false));
            }
            if(user){
                res.send(new ResponseDto(200, "Usuario ya registraso", {}, false));
            }else{
                const SQL = 'INSERT INTO users (name, lastName, email, password) VALUES (?,?,?,?)';
                const params = [data.name, data.lastName, data.email, data.password];
                db.run(SQL, params, function (err) {
                    if (err){
                        res.send(new ResponseDto(200, "Ha ocurrido un error, intenete mas tarde", {}, false));
                        return;
                    }
                    data.id = this.lastID;
                    res.send(new ResponseDto(200, "Usuario registrado con exito", data, true));
                })
            }
        });
    }

    login(req, res){
        let sql = "select * from users where email = ?";
        db.get(sql, req.body.email, (err, user) => {
            if (err) {
                res.send(new ResponseDto(200, "Ha ocurrido un error, intenete mas tarde", {}, false));
                return;
            }
            if(user){
                if(user.email == req.body.email && user.password == req.body.password){
                    const datatoken = {
                        check:  true
                    };
                    const token = jwt.sign(datatoken, app.get('llave'), {
                        expiresIn: 7800
                    });
                    user.password = "";
                    res.send(new ResponseDto(200, "Login exitoso", {token: token, user: user}, true));
                }else{
                    res.send(new ResponseDto(200, "Credenciales invalidas", {}, false));
                }
            }else{
                res.send(new ResponseDto(200, "Usuario no existe", {}, false));
            }
        });
    }

}

export default new UserController();