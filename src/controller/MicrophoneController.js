import { ClassEvent } from "../util/ClassEvent";

export class MicrophoneController extends ClassEvent {
  
    constructor(){

        super();//chama o construtor do pai dele (extends)

        this._mimeType = 'audio/webm';

        this._available = false;

        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream=>{
            
            this._available = true;
            this._stream = stream;

            this.trigger('ready', {
                sream: this._stream,
                audio: this._audio
            });

        }).catch(err=>{
            console.error(err);
        });

    }

    isAvailable(){

        return this._available;

    }

    stop(){

        this._stream.getTracks.forEach((track) => {
            track.stop();
        });

    }

    startRecorder(){

        if (this.isAvailable()) {

            this._mediaRecorder = new MediaRecorder(this._stream, {
                mimeType: this._mimeType
            });

            this._recordedChunks = [];

            this._mediaRecorder.addEventListener('dataavailable', e => {

                if (e.data.size > 0) this._recordedChunks.push(e.data);

            });//aqui pega o que gravou e joga tudo em um array. Avisa quando a gravação parar.

            this._mediaRecorder.addEventListener('stop', e =>{

                let blob = new Blob(this._recordedChunks, {
                    type: this._mimeType
                });

                let filename = `rec${Date.now()}.webm`;

                let file = new File([blob], filename, {
                    type: this._mimeType,
                    lastModified: Date.now()
                }); //aqui eu crio o arquivo

                console.log('file', file);



            });//quando parar de gravar

            this._mediaRecorder.start();
            this.startTimer();

        }

    }

    stopRecorder(){

        if (this.isAvailable()) {

            this._mediaRecorder.stop();
            this.stop();
            this.stopTimer();
            
        }

    }

    startTimer(){

        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(()=>{
  
            this.trigger('recordtimer', (Date.now() - start));

        }, 100);

    }

    stopTimer(){

        clearInterval(this._recordMicrophoneInterval);//metodo usado para parar a contagem do microphone

    }
    

}