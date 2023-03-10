// Lista todas as pizzas - arquivo foi importado no HTML
//console.log(pizzaJson);

// Armazena a quantidade de itens a serem adicionados no carrinho (modal)
let modalQt = 1;


// Armazena os itens adicionados no carrinho
let cart = [];

// O modal passa a ter uma key com o número de identificação da pizza
let modalKey = 0;


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

        // O modal passa a ter uma key com o número de identificação da pizza
        modalKey = key;

        // Exibe as informaçõs da pizza clicada no console.
        // console.log(pizzaJson[key]);


        // PREENCHE O MODAL COM AS INFORMAÇÕES DA PIZZA
        c('.pizzaBig img').src = pizzaJson[key].img; //  Insere a imagem da pizza
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name; //  Insere o nome
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description; //  Insere a descrição
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`; //  Insere o preço


        // Pega o item que essas DUAS CLASSES, acessa a lista de classes e remove o selected
        c('.pizzaInfo--size.selected').classList.remove('selected');


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


// BOTÕES DE DECREMENTO / INCREMENTO
c('.pizzaInfo--qtmenos').addEventListener('click', () => {

    // Condição para determinar o DECREMENTO apenas se o valor for > 1, evitando atingir números negativos
    if (modalQt > 1) {

        modalQt--; // A cada CLICK DECREMENTA 1
        c('.pizzaInfo--qt').innerHTML = modalQt; // Atualiza o valor no modal

    }

});

c('.pizzaInfo--qtmais').addEventListener('click', () => {

    modalQt++; // A cada CLICK INCREMENTA 1
    c('.pizzaInfo--qt').innerHTML = modalQt; // Atualiza o valor no modal

});


// SELEÇÃO TAMANHO DA PIZZA
cs('.pizzaInfo--size').forEach((size, sizeIndex) => {

    // Seleciona um tamnho e desmarca as demais
    size.addEventListener('click', (e) => {
        c('.pizzaInfo--size.selected').classList.remove('selected'); // Remove as seleções
        size.classList.add('selected');

    });

});



// ADIÇÃO DE ITENS AO CARRINHO
c('.pizzaInfo--addButton').addEventListener('click', () => {
    // INFORMAÇÕES QUE CONSTARÃO NO CARRINHO
    // 1. Nome da pizaa, 2. Tamanho e 3. quantidade.

    // Por meio do modalKey é possível acessar o pizzaJson

    // 1. Nome da pizaa
    // console.log(`Pizza: ${modalKey}`);


    // 2. Tamanho
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key')); // Pega o tamanho por meio desse atributo - converte em Inteiro

    // console.log(`Tamanho: ${size}`);

    // 3. quantidade.
    // console.log(`Quantidade: ${modalQt}`);



    // VERIFICAÇÕES
    // Pizzas de mesmo tamanho e nome precisam estar juntas - APENAS se for de tamanho diferente deve ser separada
    let identifier = pizzaJson[modalKey].id + '@' + size; // Identificador para Pizza ID da PIZZA + TAMANHO

    // Verifica se já tem o item no carrinho - Pizza com mesmo nome / tamanho
    let key = cart.findIndex((item) => item.identifier == identifier); // Se ENCONTRAR, retorna, SENÃO -1

    // Se encontrar o item
    if (key > -1) {

        cart[key].qt += modalQt; // Atualiza a quantidade

        // Caso não encontre
    } else {

        // Adiciona ao carrinho
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id, // Pega o ID real da pizza
            size,
            qt: modalQt
        });

    }


    // Atualiza o carrinho
    updateCart();

    // Ao inserir item ao carrinho, FECHA o modal
    closeModal();

});


// Aparecimento do carrinho VERSÃO MOBILE
c('.menu-openner').addEventListener('click', () => {

    // Exibe o carrinho se não estiver vazio
    if (cart.length > 0) {
        c('aside').style.left = '0';
    }

});


// Fecha carrinho - Mobile
c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '100vw';
});


// ATUALIZA O CARRINHO DE COMPRAS
// Determina se haverá ou não exibição dele e preenchimento do carrinho

function updateCart() {

    // ATUALIZAÇÕES MOBILE
    c('.menu-openner span').innerHTML = cart.length; // Exibe quantidade de itens no carrinho



    // Verifica se há itens no carrinho para exibi-los
    if (cart.length > 0) {
        // Mostra carrinho
        c('aside').classList.add('show');
        c('.cart').innerHTML = ''; // Zera lista e mostra com o loop abaixo


        // VARIÁVEIS PARA PREÇO
        let subtotal = 0;
        let desconto = 0;
        let total = 0;


        // Exibe informações do(s) item(ns) adicionado(s)
        // Mapeia o carrinho
        for (let i in cart) {

            // Identifica a pizza com base no ID e retorna o ITEM INTEIRO
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);

            subtotal += pizzaItem.price * cart[i].qt; // Multiplica a pizza pela quantidade


            // Clona o modelo e exibe as informações na tela
            let cartItem = c('.models .cart--item').cloneNode(true); // Clona


            let pizzaSizeName;

            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            // Preenche o carrinho com as informações do ITEM
            cartItem.querySelector('img').src = pizzaItem.img; // Exibe a imagem
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName; // Exibe a imagem
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt; // Exibe a quantidade 

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {

                if (cart[i].qt > 1) {
                    cart[i].qt--; // Decrementa a qtd dentro do carrinho

                } else {
                    // Caso o item seja 1 e queira diminuir mais - some com o item do carrinho => Remove
                    cart.splice(i, 1);
                }

                updateCart(); // Atualiza carrinho

            });

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++; // Incremento a qtd dentro do carrinho
                updateCart(); // Atualiza carrinho
            });



            // Adiciona o clone dentro de CART
            c('.cart').append(cartItem);

        }



        desconto = subtotal * 0.1; // Calcula o desconto

        total = subtotal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;


    } else {
        // Oculta carrinho
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw'; // Para MOBILE
    }

}