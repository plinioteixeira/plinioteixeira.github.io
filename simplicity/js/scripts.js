/* JS INICIAL PARA CEP/ENDEREÇO */
const formulario = document.querySelector("form");
const inputCep = formulario.querySelector("#cep");
const inputTelefone = formulario.querySelector("#telefone");
const inputEndereco = formulario.querySelector("#endereco");
const inputBairro = formulario.querySelector("#bairro");
const inputCidade = formulario.querySelector("#cidade");
const inputEstado = formulario.querySelector("#estado");
const bStatus = formulario.querySelector("#status");
const botaoLocalizar = formulario.querySelector("#localizar-cep");

botaoLocalizar.addEventListener("click", function(event) {
    event.preventDefault();

    /* Pegar o cep digitado */
    let cep = inputCep.value;

    /* CEP no padrão da API */
    let url = `https://viacep.com.br/ws/${cep}/json/`;
    
    // let url = "http://viacep.com.br/ws/"+cep+"/json/"

    /* Ajax: comunicação assíncrona com o ViaCEP usando chamada fetch.  */

    // 1) Fazer a conexão com a API (ou acessar)
    fetch(url)

        // 2) recupere a resposta do acesso no formato JSON
        .then(resposta => resposta.json())

            // 3) E então, mostre os dados 
            .then(dados => {
                if ( "erro" in dados ) {
                    bStatus.innerHTML = "CEP não encontado!"
                } else {
                    bStatus.innerHTML = "CEP encontrado";
                    inputEndereco.value = dados.logradouro;
                    inputBairro.value = dados.bairro;
                    inputCidade.value = dados.localidade;
                    inputEstado.value = dados.uf;
                }
                
            });
})


/* lib ou biblioteca vanilla-masker 
https://github.com/vanilla-masker/vanilla-masker*/
VMasker(inputCep).maskPattern("99999-999");
VMasker(inputTelefone).maskPattern("(99) 99999-9999");


/* Programação do contador de caracteres do campo mensagem */
const spanMaximo = formulario.querySelector("#maximo");
const bCaracteres = formulario.querySelector("#caracteres");
const textMensagem = formulario.querySelector("#mensagem");

// Determinar a quantidade máxima de caracteres
let quantidade = 100;

// Evento para detectar a digitação (entrada) no campo
textMensagem.addEventListener("input", function() {
    
    // Capturando o que for digitado
    let conteudo = textMensagem.value;

    // Criando uma contagem regressiva 
    let contagem = quantidade - conteudo.length;

    bCaracteres.textContent = contagem;

    console.log(contagem);


    /*  DESAFIO
    se for zero, vermelho 
    senão preto */

    if (contagem == 0) {
        bCaracteres.style.color = "red";
        textMensagem.style.boxShadow = "red 0 0 10px"
    } else {
        bCaracteres.style.color = "black"
        textMensagem.style.boxShadow = "black 0 0 10px"
    }

    
});




/* Programação do formspree */
var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "obrigado por enviar";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! deu ruim! tente novamente mais tarde"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)