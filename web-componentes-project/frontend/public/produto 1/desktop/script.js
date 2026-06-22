// FUNÇÃO PARA TROCAR IMAGEM
function trocarImagem(src) {
    document.getElementById('imagemPrincipal').src = src;
}

// FUNÇÃO PARA ABRIR ABAS
function abrirAba(nomeAba) {
    // Esconde todos os conteúdos das abas
    const abas = document.querySelectorAll('.aba-conteudo');
    abas.forEach(aba => {
        aba.classList.remove('ativa');
    });

    // Remove a classe 'ativa' de todos os botões
    const botoes = document.querySelectorAll('.aba-btn');
    botoes.forEach(botao => {
        botao.classList.remove('ativa');
    });

    // Mostra a aba selecionada
    document.getElementById(nomeAba).classList.add('ativa');

    // Marca o botão como ativo
    event.target.classList.add('ativa');
}

// FUNÇÃO PARA ADICIONAR AO CARRINHO
function adicionarAoCarrinho() {
    const nomeProduto = document.querySelector('.produto-detalhes h1').textContent;
    const preco = document.querySelector('.preco-atual').textContent;
    
    // Simula adição ao carrinho
    alert(`✓ ${nomeProduto} foi adicionado ao carrinho!\n\nPreço: ${preco}`);
    
    // Aqui você pode integrar com um carrinho real
    // Por exemplo, salvar no localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push({
        nome: nomeProduto,
        preco: preco,
        data: new Date().toLocaleString('pt-BR')
    });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// FUNÇÃO PARA ALTERNAR MENU (RESPONSIVO)
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

// FUNÇÃO PARA CALCULAR DESCONTO
function calcularDesconto() {
    const precoOriginal = parseFloat(document.querySelector('.preco-original').textContent.replace('R$ ', ''));
    const precoAtual = parseFloat(document.querySelector('.preco-atual').textContent.replace('R$ ', ''));
    const desconto = ((precoOriginal - precoAtual) / precoOriginal * 100).toFixed(0);
    return desconto;
}

// FUNÇÃO PARA MOSTRAR DESCONTO
function mostrarDesconto() {
    const desconto = calcularDesconto();
    console.log(`Desconto: ${desconto}%`);
}

// FUNÇÃO PARA COMPARTILHAR PRODUTO
function compartilharProduto() {
    const url = window.location.href;
    const titulo = document.querySelector('.produto-detalhes h1').textContent;
    
    if (navigator.share) {
        navigator.share({
            title: titulo,
            text: 'Confira este produto incrível!',
            url: url
        });
    } else {
        // Fallback para copiar link
        navigator.clipboard.writeText(url);
        alert('Link copiado para a área de transferência!');
    }
}

// FUNÇÃO PARA AVALIAR PRODUTO
function avaliarProduto(estrelas) {
    alert(`Você avaliou este produto com ${estrelas} estrelas! Obrigado!`);
    // Aqui você pode enviar a avaliação para um servidor
}

// FUNÇÃO PARA ADICIONAR À LISTA DE DESEJOS
function adicionarAoDesejos() {
    const nomeProduto = document.querySelector('.produto-detalhes h1').textContent;
    alert(`${nomeProduto} foi adicionado à sua lista de desejos!`);
    
    // Salvar no localStorage
    let desejos = JSON.parse(localStorage.getItem('desejos')) || [];
    if (!desejos.includes(nomeProduto)) {
        desejos.push(nomeProduto);
        localStorage.setItem('desejos', JSON.stringify(desejos));
    }
}

// FUNÇÃO PARA ROLAR PARA ELEMENTO
function rolarPara(elementoId) {
    const elemento = document.getElementById(elementoId);
    if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth' });
    }
}

// FUNÇÃO PARA VALIDAR QUANTIDADE
function validarQuantidade(valor) {
    if (valor < 1) return 1;
    if (valor > 10) return 10;
    return valor;
}

// INICIALIZAR QUANDO O DOCUMENTO CARREGAR
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de produto carregada com sucesso!');
    
    // Você pode adicionar mais inicializações aqui
    // Por exemplo, carregar dados do servidor, validar carrinho, etc.
});

// FUNÇÃO PARA ENVIAR COMENTÁRIO
function enviarComentario() {
    const comentario = prompt('Digite seu comentário sobre este produto:');
    if (comentario && comentario.trim() !== '') {
        alert('Obrigado pelo seu comentário! Ele será revisado em breve.');
        
        // Salvar comentário
        let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
        comentarios.push({
            texto: comentario,
            data: new Date().toLocaleString('pt-BR')
        });
        localStorage.setItem('comentarios', JSON.stringify(comentarios));
    }
}

// FUNÇÃO PARA APLICAR CUPOM
function aplicarCupom() {
    const cupom = prompt('Digite o código do cupom:');
    if (cupom) {
        // Simular validação de cupom
        const cupomValido = cupom.toUpperCase() === 'VITASLIM10';
        if (cupomValido) {
            alert('✓ Cupom aplicado com sucesso! Desconto de 10% adicionado!');
        } else {
            alert('✗ Cupom inválido ou expirado.');
        }
    }
}

// FUNÇÃO PARA MOSTRAR NOTIFICAÇÃO
function mostrarNotificacao(mensagem, tipo = 'sucesso') {
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao ${tipo}`;
    notificacao.textContent = mensagem;
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${tipo === 'sucesso' ? '#4a6741' : '#dc3545'};
        color: white;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s;
    `;
    
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.remove();
    }, 3000);
}
