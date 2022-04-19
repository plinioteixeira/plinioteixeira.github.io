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
    let url = `http://viacep.com.br/ws/${cep}/json/`;
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
VMasker(inputTelefone).maskPattern("(99) 9999-9999");