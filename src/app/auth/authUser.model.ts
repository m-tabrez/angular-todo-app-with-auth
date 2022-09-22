export class authUser{
    constructor(
        public userId : String,
        public email : String,
        private _token : String,
        public _expiresIn : Date,
    ){}

    get token(){
        if(new Date() > this._expiresIn){
            return 
        }
        return this._token;
    }
}