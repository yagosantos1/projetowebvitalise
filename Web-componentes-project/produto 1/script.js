document.addEventListener("DOMContentLoaded", () => {

    const btnComprar = document.querySelector(".btn-comprar");
    const avaliacoes = document.querySelector(".avaliacoes span");

    // Número inicial de avaliações
    let totalAvaliacoes = 523;

    // Simulação de novas avaliações
    setInterval(() => {
        totalAvaliacoes++;

        avaliacoes.textContent =
            `(${totalAvaliacoes} avaliações)`;
    }, 15000);

    // Comprar produto
    btnComprar.addEventListener("click", () => {

        btnComprar.disabled = true;

        btnComprar.innerHTML = "✔ Adicionado ao Carrinho";

        btnComprar.style.background = "#2E7D32";

        alert("Produto adicionado ao carrinho com sucesso!");

        setTimeout(() => {

            btnComprar.disabled = false;

            btnComprar.innerHTML = "Comprar Agora";

            btnComprar.style.background = "#43A047";

        }, 3000);

    });

});