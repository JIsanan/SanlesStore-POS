export class Transaction {
    constructor(
        public trans_id:number,
        public buyer_name:string,
        public quantity:number,
        public product_id:number,
    ){}
}
