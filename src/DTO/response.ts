export default class ResponseDto{

    code:number;
    message:string;
    data:any;
    success: boolean;
    constructor(code, message, data, success){
        this.code = code;
        this.message =message;
        this.data = data;
        this.success = success
    }
}