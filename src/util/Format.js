export class Format {

    static getCamelCase(text){

        let div = document.createElement('div');//criando um objetoe  guardando dentro da div

        div.innerHTML = `<div data-${text}="id"></div>`;

        return Object.keys(div.firstChild.dataset)[0];//percorre e traz um array com todas as chaves que ele vai encontrar dentro de um objeto determinado, firstChild procura o primeiro filho da div

    }

    static toTime(duration){

        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }

    }//metodo estatico para uso de tempo.

}