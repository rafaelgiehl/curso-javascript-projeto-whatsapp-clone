import { ClassEvent } from "../util/ClassEvent";

export class Model extends ClassEvent{

    constructor(){
        super();//vai executar o contructor de classevent
        this._data = {};//recebe os dados.

    }

    fromJSON(json){
        this._data = Object.assign(this._data, json); //Object assign mescla os dois e o que tiver em conflito mantém o mais novo
        this.trigger('datachange', this.toJSON());//usa o trigger pq usa o Class Event
    }

    toJSON(){
        return this._data;
         
    }

}