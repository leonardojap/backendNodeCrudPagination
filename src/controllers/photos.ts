//Dependencies
import ResponseDto from './../DTO/response';
import axios from 'axios';


class PhotoController{
    
    constructor(){

    }

    public getPhotos(req, res){
        axios.get('https://jsonplaceholder.typicode.com/photos?_page='+req.params.page+'&_limit=10')
        .then(async response => {
            res.send(new ResponseDto(200, "data", response.data, true));
        })
        .catch(error => {
            console.log(error);
        });
    }

}

export default new PhotoController();