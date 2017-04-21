export class Terminal{
    id: string;
    name: string;
    ecrProtocol: string;
    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.ecrProtocol = data.ecrProtocol;
    }
}
