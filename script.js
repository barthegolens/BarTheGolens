const precos = {
    pneu: 1100,
    chave: 2300,
    reparo: 1100,
    kitBasico: 1100,
    kitAvancado: 3400,

    ursinhos: 5000,
    combos: 2500,
    alcoolicos: 0
};

const nomes = {
    pneu: "Pneu",
    chave: "Chave",
    reparo: "Reparo",
    kitBasico: "Kit Básico",
    kitAvancado: "Kit Avançado",

    ursinhos: "Ursinhos",
    combos: "Combos",
    alcoolicos: "Alcoólicos"
};

const campos = {
    pneu: document.getElementById("pneu"),
    chave: document.getElementById("chave"),
    reparo: document.getElementById("reparo"),
    kitBasico: document.getElementById("kitBasico"),
    kitAvancado: document.getElementById("kitAvancado"),

    ursinhos: document.getElementById("ursinhos"),
    combos: document.getElementById("combos"),
    alcoolicos: document.getElementById("alcoolicos")
};

const usarTuning =
    document.getElementById("usarTuning");

const campoTuning =
    document.getElementById("campoTuning");

const tuning =
    document.getElementById("tuning");

const tuningFinal =
    document.getElementById("tuningFinal");

const resumo =
    document.getElementById("resumo");

const valorTotal =
    document.getElementById("valorTotal");

const botaoCalcular =
    document.getElementById("calcular");

const botaoLimpar =
    document.getElementById("limpar");


function formatarDinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


function obterQuantidade(campo) {
    const valor = Number(campo.value);

    if (!Number.isFinite(valor) || valor < 0) {
        return 0;
    }

    return Math.floor(valor);
}


function calcular() {

    let total = 0;
    let itensResumo = "";


    /* SERVIÇOS */

    for (const servico in campos) {

        const quantidade =
            obterQuantidade(campos[servico]);

        if (quantidade > 0) {

            const valorItem =
                quantidade * precos[servico];

            total += valorItem;

            itensResumo += `
                <div class="item-resumo">

                    <span>
                        ${nomes[servico]} (${quantidade}x)
                    </span>

                    <strong>
                        ${formatarDinheiro(valorItem)}
                    </strong>

                </div>
            `;
        }
    }


    /* TUNING +50% */

    let valorFinalTuning = 0;

    if (usarTuning.checked) {

        const valorOriginal =
            Math.max(
                0,
                Number(tuning.value) || 0
            );

        valorFinalTuning =
            valorOriginal * 1.50;

        total += valorFinalTuning;

        if (valorOriginal > 0) {

            itensResumo += `
                <div class="item-resumo">

                    <span>
                        Tuning (+50%)
                    </span>

                    <strong>
                        ${formatarDinheiro(valorFinalTuning)}
                    </strong>

                </div>
            `;
        }
    }


    /* MOSTRAR RESULTADO DO TUNING */

    tuningFinal.textContent =
        formatarDinheiro(valorFinalTuning);


    /* RESUMO */

    if (itensResumo) {

        resumo.innerHTML =
            itensResumo;

    } else {

        resumo.innerHTML = `
            <p class="vazio">
                Nenhum serviço selecionado.
            </p>
        `;
    }


    /* TOTAL */

    valorTotal.textContent =
        formatarDinheiro(total);
}


function atualizarCampoTuning() {

    if (usarTuning.checked) {

        campoTuning.classList.add("ativo");

    } else {

        campoTuning.classList.remove("ativo");

        tuning.value = 0;
    }

    calcular();
}


function limpar() {

    Object.values(campos).forEach(
        (campo) => {
            campo.value = 0;
        }
    );

    usarTuning.checked = false;

    tuning.value = 0;

    campoTuning.classList.remove("ativo");

    calcular();
}


/* BOTÕES */

botaoCalcular.addEventListener(
    "click",
    calcular
);

botaoLimpar.addEventListener(
    "click",
    limpar
);


/* TUNING */

usarTuning.addEventListener(
    "change",
    atualizarCampoTuning
);

tuning.addEventListener(
    "input",
    calcular
);


/* ATUALIZAÇÃO AUTOMÁTICA */

Object.values(campos).forEach(
    (campo) => {

        campo.addEventListener(
            "input",
            calcular
        );

    }
);


/* INICIAR */

calcular();
