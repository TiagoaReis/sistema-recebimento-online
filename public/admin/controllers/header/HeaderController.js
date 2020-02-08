class HeaderController {

    constructor(){

         this._dataAtualEL = document.querySelector("#dataAtual");
         this._valorEL = document.querySelector("#inputValor");
         this._dinheiroEL = document.querySelector("#inputPrice");
         this._trocoEL = document.querySelector("#inputTroco");
         //this._dataAtualEL = document.querySelector("#dataAtual");
         //this._horaAtualEL = document.querySelector("#horaAtual");
        // this._dataAtual = "00/00/99";
        // this._horaAtual = "22:20";
         this.initialize();
    }

    initialize(){
       
        console.log("Teste 12399  22");
       
        this._dataAtualEL.innerHTML = dataAtualFormatada();
        //this._dataAtualEL.innerHTML =  recebimento.getValorTotalContasRecebidas();
        // this._dinheiroEL.value = "50.00";
        // this._valorEL.value = "10.00";
        //this._trocoEL.value = (this._dinheiroEL.value - this._valorEL.value);
        //this._horaAtualEL.innerHTML = "05:20";
       

    }

    get dataAtual(){
        return new Date();
    }
    set dataAtual(valor){
        this._dataAtual = valor;
    }
    get horaAtual(){
        return this._horaAtual;        
    }
    set horaAtual(valor){
        this._horaAtual = valor;
    }
    

    
    
}
function dataAtualFormatada(){
    var data = new Date(),
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano  = data.getFullYear();
    return dia+"/"+mes+"/"+ano;}


    