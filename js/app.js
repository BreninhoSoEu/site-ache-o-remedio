// -----------------------------
// LISTA DE PRODUTOS DO APP
// -----------------------------
const produtos = [
    {
        id: 1,
        nome: "Rivotril",
        categoria: "Ansiolítico",
        preco: 34.90,
        img: "assets/produtos/rivotril.png"
    },
    {
        id: 2,
        nome: "Dipirona",
        categoria: "Dor e Febre",
        preco: 12.50,
        img: "assets/produtos/dipirona.png"
    },
    {
        id: 3,
        nome: "Neosoro",
        categoria: "Antialérgico",
        preco: 9.99,
        img: "assets/produtos/neosoro.png"
    }
];

// -----------------------------
// BUSCA NA PÁGINA PRINCIPAL
// -----------------------------
function configurarBusca() {
    const campoBusca = document.getElementById("campo-busca");

    if (!campoBusca) return;

    campoBusca.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            const termo = campoBusca.value.trim();
            if (termo.length > 0) {
                window.location.href = `busca.html?query=${encodeURIComponent(termo)}`;
            }
        }
    });
}

// -----------------------------
// CARREGAR RESULTADOS DA BUSCA
// -----------------------------
function carregarResultadosBusca() {
    const container = document.getElementById("lista-resultados");
    if (!container) return;

    const url = new URL(window.location.href);
    const termo = url.searchParams.get("query");

    if (!termo) return;

    const filtrados = produtos.filter(p =>
        p.nome.toLowerCase().includes(termo.toLowerCase())
    );

    container.innerHTML = "";

    filtrados.forEach(prod => {
        const item = document.createElement("div");
        item.classList.add("item-produto");

        item.innerHTML = `
            <img class="img-produto" src="${prod.img}" alt="">
            <div class="info">
                <h3>${prod.nome}</h3>
                <p>${prod.categoria}</p>
                <span class="preco">R$${prod.preco.toFixed(2)}</span>
            </div>
        `;

        item.addEventListener("click", () => {
            window.location.href = `onde-encontrar.html?id=${prod.id}`;
        });

        container.appendChild(item);
    });
}

// -----------------------------
// PÁGINA: ONDE ENCONTRAR (FARMÁCIA)
// -----------------------------
function carregarInfoFarmacia() {
    const nomeFarmacia = document.getElementById("nome-farmacia");
    if (!nomeFarmacia) return;

    nomeFarmacia.innerText = "Drogasil";
}

// -----------------------------
// MENU INFERIOR (NAV BAR)
// -----------------------------
function configurarMenuInferior() {
    const btnHome = document.getElementById("nav-home");
    const btnCategorias = document.getElementById("nav-categorias");
    const btnCalendario = document.getElementById("nav-calendario");
    const btnPerfil = document.getElementById("nav-perfil");

    if (btnHome) btnHome.addEventListener("click", () => window.location.href = "index.html");
    if (btnCategorias) btnCategorias.addEventListener("click", () => window.location.href = "categorias.html");
    if (btnCalendario) btnCalendario.addEventListener("click", () => window.location.href = "agenda.html");
    if (btnPerfil) btnPerfil.addEventListener("click", () => window.location.href = "perfil.html");
}

// -----------------------------
// INICIALIZAÇÃO AUTOMÁTICA
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
    configurarBusca();
    configurarMenuInferior();
    carregarResultadosBusca();
    carregarInfoFarmacia();
});
