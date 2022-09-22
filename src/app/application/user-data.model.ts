export class userData{
    constructor(
        private createdOn : Date,
        private type : string,
        private value : any,
        private lastUpdated? : Date | null
    ){}
}