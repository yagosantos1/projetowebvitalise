function abrirProduto(produto){

    switch(produto){

        case "kit":
            window.location.href =
            "produtos/kit-completo.html";
            break;

        case "slimcaps":
            window.location.href =
            "produtos/slimcaps.html";
            break;

        case "detox":
            window.location.href =
            "produtos/detoxplus.html";
            break;

        case "turbo":
            window.location.href =
            "produtos/turbometa.html";
            break;
    }
}