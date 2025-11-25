// BUSCA POR CATEGORIA //

async function buscarReceitas(categoria) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;

    document.getElementById("resultado").innerHTML = "<p>Carregando receitas...</p>";

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (!dados.meals) {
            document.getElementById("resultado").innerHTML =
                "<p>Nenhuma receita encontrada.</p>";
            return;
        }

        const html = dados.meals
            .map(meal => `
                <div class="receita-card">
                    <img src="${meal.strMealThumb}">
                    <h3>${meal.strMeal}</h3>

                    <button class="btn-detalhes" onclick="verDetalhes(${meal.idMeal})">
                        Ver detalhes
                    </button>
                </div>
            `)
            .join("");

        document.getElementById("resultado").innerHTML = `
            <h2>Receitas da categoria: ${categoria}</h2>
            <div class="grid-receitas">${html}</div>
        `;
    } catch (e) {
        document.getElementById("resultado").innerHTML =
            "<p>Erro ao carregar receitas.</p>";
    }
}

// Função usada pelo botão
function verDetalhes(id) {
    window.location.href = `detalhes.html?id=${id}`;
}
