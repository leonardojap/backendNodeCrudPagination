//import global app express instance
import app from "./app";
import router from './routes/router';
import config from './../config/configs';
import * as figlet from 'figlet';


figlet('LeoBackend...', function(err, data) {
    if (err) {
        console.dir(err);
        return;
    }
    console.log(data)
});

const PORT = 3000;

//seteamos la key como variable global para manejo de tokens
app.set("llave", config.llave);

//iniciamos los endpoints
app.use("/api", router)

//Iniciamos el server
app.listen(PORT, () => {
    console.log(`API REST corriendo en el puerto ${PORT}`);
})