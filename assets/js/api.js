// =============== CARREGAR RECEITAS DA API ===============

async function carregarReceitas() {
  const url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert"; 
  // Aqui você pode trocar por qualquer categoria.

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.meals) {
      console.error("Nenhuma receita encontrada.");
      return;
    }

    const container = document.createElement("section");
    container.classList.add("projects");

    const cardsDiv = document.createElement("div");
    cardsDiv.classList.add("cards");

    data.meals.slice(0, 8).forEach(meal => {   // pega só 8 receitas para manter seu layout
      const card = document.createElement("a");
      card.classList.add("card");
      card.href = "#";  // futuramente pode abrir página da receita

      card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="retangulo-img">
        <h3>${meal.strMeal}</h3>
        <p>Receita deliciosa!</p>
      `;

      cardsDiv.appendChild(card);
    });

    container.appendChild(cardsDiv);

    // adiciona depois da primeira seção de cards do site
    const primeiraSection = document.querySelectorAll(".projects")[0];
    primeiraSection.insertAdjacentElement("afterend", container);

  } catch (error) {
    console.error("Erro ao carregar API:", error);
  }
}

carregarReceitas();

// =============== BUSCA POR NOME ===============

document.getElementById("btnBuscar").addEventListener("click", buscarReceita);
document.getElementById("searchInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") buscarReceita();
});

async function buscarReceita() {
  const nome = document.getElementById("searchInput").value.trim();
  const container = document.getElementById("resultadosBusca");

  if (nome === "") {
    container.innerHTML = "<p style='text-align:center;'>Digite algo para buscar.</p>";
    return;
  }

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    container.innerHTML = ""; // limpa resultados anteriores

    if (!data.meals) {
      container.innerHTML = "<p style='text-align:center;'>Nenhuma receita encontrada.</p>";
      return;
    }

    data.meals.forEach(meal => {
      const card = document.createElement("a");
      card.classList.add("card");
      card.href = "#";

      card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="retangulo-img">
        <h3>${meal.strMeal}</h3>
        <p>Veja esta receita deliciosa!</p>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Erro ao buscar receita:", error);
  }
}

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
