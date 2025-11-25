// 1. Pegar o ID da URL
const urlParams = new URLSearchParams(window.location.search);
const mealID = urlParams.get("id");

async function carregarDetalhes() {
    if (!mealID) {
        alert("Nenhuma receita encontrada.");
        return;
    }

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.meals) {
            alert("Receita não encontrada!");
            return;
        }

        const meal = data.meals[0];

        document.getElementById("detalhe-imagem").src = meal.strMealThumb;
        document.getElementById("detalhe-titulo").textContent = meal.strMeal;
        document.getElementById("detalhe-categoria").textContent =
            "Categoria: " + meal.strCategory;
        document.getElementById("detalhe-area").textContent =
            "Origem: " + meal.strArea;
        document.getElementById("detalhe-instrucoes").textContent =
            meal.strInstructions;

        const lista = document.getElementById("lista-ingredientes");

        for (let i = 1; i <= 20; i++) {
            const ingrediente = meal[`strIngredient${i}`];
            const medida = meal[`strMeasure${i}`];

            if (ingrediente && ingrediente.trim() !== "") {
                const li = document.createElement("li");
                li.textContent = `${ingrediente} - ${medida}`;
                lista.appendChild(li);
            }
        }

    } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
    }


}

carregarDetalhes();

document.getElementById("enviarAvaliacao").addEventListener("click", function () {
    const nota = document.querySelector("input[name='estrela']:checked");
    const comentario = document.getElementById("comentario").value.trim();

    if (!nota) {
        alert("Por favor, selecione uma nota.");
        return;
    }

    if (comentario === "") {
        alert("Digite um comentário.");
        return;
    }


    const div = document.createElement("div");
    div.classList.add("avaliacao-item");

    div.innerHTML = `
        <strong>${nota.value} estrelas</strong><br>
        <p>${comentario}</p>
    `;

    document.getElementById("lista-avaliacoes").appendChild(div);

    document.getElementById("comentario").value = "";
    document.querySelector("input[name='estrela']:checked").checked = false;

    alert("Avaliação enviada!");
});
