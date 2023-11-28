import { Model } from './Model';
import { Firebase } from './../util/Firebase';

export class User extends Model {

    constructor(id){
        
        super();//chama o construtor do Event em model.js e depois chama o contructor de classevent

        if (id) this.getById(id);//aqui passa o nosso email que já esta em id para o metodo getbyid

    }//aqui recebe o email e chama de id

    get name()  { return this._data.name; }//get tters and set tters é a forma correta de acessar usuários privados.
    set name(value) { this._data.name = value; }

    get email()  { return this._data.email; }
    set email(value) { this._data.email = value; }

    get photo()  { return this._data.photo; }
    set photo(value) { this._data.photo = value; }

    get chatId()  { return this._data.chatId; }
    set chatId(value) { this._data.chatId = value; }

    getById(id){

        return new Promise((s, f)=>{

            User.findByEmail(id).get().onSnapshot(doc=>{
               
                this.fromJSON(doc.data());

                s(doc);

            });

        });

        

    }//retorna um promessa que chama o findbyemail onde procura um documento especifico no /users e com esse documento o get pega ele e retorna uma promessa que então retorna um documento

    save(){

        User.findByEmail(this.email).set(this.toJSON());//set salva , precisa passar um objeto com os dados
        
    }//salva os dados do firebase

    static getRef(){

        return Firebase.db().collection('/users');

    }

    static getContactsRef(id){

        return User.getRef()
        .doc(id)
        .collection('contacts');

    }

    static findByEmail(email){

        return User.getRef().doc(email); //procura dentro de /users o id email

    }

    addContact(contact){

        return User.getContactsRef(this.email)
        .doc(btoa(contact.email))//btoa significa base 64 no ask 2
        .set(contact.toJSON());

    }

    getContacts(){

        return new Promise((s, f)=>{

        User.getContactsRef(this.email).onSnapshot(docs => {

            let contacts = [];

            docs.forEach(doc => {

                let data = doc.data();

                data.id = doc.id;

                contacts.push(data);

            });

            this.trigger('contactschange', docs);

            s(contacts);

        });

        })

    }

}