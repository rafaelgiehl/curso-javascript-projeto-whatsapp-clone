const path = require('path');//const variavel que não muda de valor

module.exports = {
    entry: {
        app: './src/app.js',
        'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: 'dist'
    }
}//entry é o arquivo de entrada, outout é o arquivo json onde passo algumas informações dele