const sinais = document.querySelectorAll(".sinais")
const numeros = document.querySelectorAll(".botao_numerico")
const resultado_anterior = document.querySelector(".resultado_anterior")
const resultado_atual = document.querySelector(".resultado_atual")
const soma = document.querySelector(".equal")




class Calcular{

    constructor(resultado_anterior, resultado_atual) {
        this.resultado_anterior = resultado_anterior
        this.resultado_atual = resultado_atual
        this.criandoOperacao = ""
    }

    adicionarDigito(digito) {

        if(digito === "." && this.resultado_atual.innerText.includes(".")) {
            return;
        }

        this.criandoOperacao = digito
        this.atualizarTela()

    }

    processarOperacao(operacao) {

        if(this.resultado_atual.innerText === "") {
            if(this.resultado_anterior.innerText !== "") {
                this.trocarOperacao(operacao)
            }
            return
        }
        
        let valorOperacao
        const valorAnterior = +this.resultado_anterior.innerText.split(" ")[0]
        const valorAtual = +this.resultado_atual.innerText
        

        switch(operacao) {
            case "+":
                valorOperacao = valorAnterior + valorAtual
                this.atualizarTela(valorOperacao, operacao, valorAnterior, valorAtual)
                break;
            case "-":
                valorOperacao = valorAnterior - valorAtual
                this.atualizarTela(valorOperacao, operacao, valorAnterior, valorAtual)
                break;
            case "*":
                valorOperacao = valorAnterior * valorAtual
                this.atualizarTela(valorOperacao, operacao, valorAnterior, valorAtual)
                break;
            case "/":
                valorOperacao = valorAnterior / valorAtual
                this.atualizarTela(valorOperacao, operacao, valorAnterior, valorAtual)
                break;
            case "AC":
                this.apagar()
                break;

            case "=":
                this.fazerOperacao()
                this.resultado_atual.innerHTML = this.resultado_anterior.innerHTML.split(' ')[0];
                this.resultado_anterior.innerHTML = '';
                break;
                default:
                return;
            
        }
    }

    atualizarTela (
        valorOperacao = null, 
        operacao = null, 
        valorAnterior = null, 
        valorAtual = null
    ) {

        console.log(valorOperacao, operacao, valorAnterior, valorAtual)

        if(valorOperacao === null) {
            this.resultado_atual.innerText += this.criandoOperacao;
        } else {
            if(valorAnterior === 0) {
                valorOperacao = valorAtual
            }

            this.resultado_anterior.innerText = `${valorOperacao} ${operacao}`
            this.resultado_atual.innerText = ""
        }
    }
    trocarOperacao(operacao) {

        const simbolos = ["*", "/", "+", "-"]

        if(!simbolos.includes(operacao)) {
            return
        }

        this.resultado_anterior.innerText = 
            this.resultado_anterior.innerText.slice(0, -1) + operacao;

    }

    apagar() {
        this.resultado_atual.innerText = ""
    }

    fazerOperacao() {
        const operacao = resultado_anterior.innerText.split(" ")[1]
        console.log(this.processarOperacao)
        this.processarOperacao(operacao)
    }
    
}

const calc = new Calcular(resultado_anterior, resultado_atual)




function selecionarBotao () {

    for (var i = 0; i < numeros.length; i++ ) {
        numeros[i].addEventListener("click", function(e) {
            
            const numeroClicado = (e.target.innerText);

            if(+numeroClicado >= 0 || numeroClicado === ".") {
                calc.adicionarDigito(numeroClicado)
            } else {
                calc.processarOperacao(numeroClicado)
            }

        } 
        
        
        )
        
    }

    for (let i = 0; i < sinais.length; i++) {
        sinais[i].addEventListener('click', function(e) {

        let operacaoClicada = e.target.innerText;
        console.log(typeof(operacaoClicada))
        calc.processarOperacao(operacaoClicada)

    });

    soma.addEventListener("click", (e) => {
        let igual = e.target.innerText;
        console.log(typeof(igual))
        calc.processarOperacao(igual)
    })
}

}

selecionarBotao() 