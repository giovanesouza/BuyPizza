// Lista todas as pizzas - arquivo foi importado no HTML
//console.log(pizzaJson);

// Armazena a quantidade de itens a serem adicionados no carrinho (modal)
let modalQt = 1;


// Função com abreviação de QuerySelector - Recebe elemento e o retorna 1 ITEM (Sem os {} não precisa do return)
const c = (el) => document.querySelector(el);

// Função com abreviação de QuerySelectorAll - Recebe elemento e o retorna 1 ARRAY (Sem os {} não precisa do return)
const cs = (el) => document.querySelectorAll(el);



// LISTAGEM DAS PIZZAS

// Faz mapeamento das Pizzas e realiza 
// 2 PARÂMETROS: o próprio item (cada objeto), o index (número do array)
pizzaJson.map((item, index) => {

    // Faz um clone dos elementos HTML que representam 1 PIZZA => cloneNode(true)
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    // Seta o atributo com o valor do INDEX referente a cada Pizza
    // Este atributo é utilizado para identificar qual pizza foi selecionada/add ao carro de compras (Guarda as informações da pizza)
    pizzaItem.setAttribute('data-key', index);

    // PREENCHE O CLONE com as informações da PIZZA
    pizzaItem.querySelector('.pizza-item--img img').src = item.img; // Dentro do PizzaItem, seleciona o elemento item--img img (imagem) e insere o endereço dela via SRC


    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`; // Dentro do PizzaItem, seleciona o elemento item--name e insere o PREÇO com 2 casas decimais
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name; // Dentro do PizzaItem, seleciona o elemento item--name e insere o NOME
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description; // Dentro do PizzaItem, seleciona o elemento item--desc e insere a DESCRIÇÃO

    // Seleciona a tag a dentro do PizzaItem, adiciona evento
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        // Bloqueia ação natual do link - atualização da pág
        e.preventDefault();

        modalQt = 1; // Reseta a quantidade de itens para 1 a cada vez que clicar na pizza (Abertura do Modal)



        // Pega as informações da pizza CLICADA
        // .closest() = 'ache o elemento mais próximo de..'
        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        // Exibe as informaçõs da pizza clicada no console.
        // console.log(pizzaJson[key]);


        // PREENCHE O MODAL COM AS INFORMAÇÕES DA PIZZA
        c('.pizzaBig img').src = pizzaJson[key].img; //  Insere a imagem da pizza
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name; //  Insere o nome
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description; //  Insere a descrição
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`; //  Insere o preço


        // Pega o item que essas DUAS CLASSES, acessa a lista de classes e remove o selected
        c('.pizzaInfo--size.selected').classList.remove('selected')


        // SELECIONA E ATRIBUI VALOR DA GRAMATURA DAS PIZZAS CONFORME O TAMANHO
        cs('.pizzaInfo--size').forEach((size, sizeIndex) => {

            // Deixa a opção de grande selecionada como padrão - add classe selected.
            if (sizeIndex == 2) {
                size.classList.add('selected');
            }

            // ACESSA O SPAN que tem dentro do .pizzaInfo--size e insere as gramaturas referente a cada tamanho/pizza
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];


        });



        c('.pizzaInfo--qt').innerHTML = modalQt;


        // EXIBE MODAL
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';

        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);


    });


    // LISTA/RENDERIZA as pizzas na tela - Pizza-area
    // .append(): Pega o conteúdo que já existe no elemento e adiciona outras.
    c('.pizza-area').append(pizzaItem);


});


// EVENTOS DO MODAL

// Função para fechar o modal
function closeModal() {
    c('.pizzaWindowArea').style.opacity = 0;

    setTimeout(() => {
        c('.pizzaWindowArea').style.display = 'none';
    }, 500);

};

// Seleciona os botões de cancelar e voltar na página e atribui a função a cada um
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {

    item.addEventListener('click', closeModal);

});