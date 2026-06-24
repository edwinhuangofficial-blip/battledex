document.addEventListener("DOMContentLoaded", function() {
    document //makes it so u can press enter to search not just button
        .getElementById("searchbarid")
        .addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
            pokeSearch(); //search function
          }
        });

    document.addEventListener("keydown", function (e) {
    if (
        //so u can press / to open search bar like google
        e.key === "/" &&
        document.activeElement !== document.getElementById("searchbarid")
    ) {
        e.preventDefault();
        document.getElementById("searchbarid").focus();
    }
    });

     let isSearching = false;
        async function pokeSearch() {
            //search bar
            if (isSearching){
            return;
        }
        isSearching = true;
        const pokeName = fixPokemonName(document.getElementById("searchbarid").value);
        if (!pokeName) {
        isSearching = false;
        return;
        }
        try {
          const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon/" + pokeName,
          );
          if (response.ok) {
            window.location.href = "pokemoninfo.html?pokemon=" + pokeName;
          } else {
            window.location.href = "notfound.html?pokemon=" + pokeName;
            isSearching = false;
          }
        } catch (error) {
          alert("Check your connection and try again");
          isSearching = false;
        }
        isSearching = false;
      }

    function fixPokemonName(input){
        const prefixes = ["mega", "alola", "galar", "hisui", "paldea", "primal", "gmax"];
        
        let name = input.toLowerCase().trim().replace(/\s+/g, "-")
        .replace("alolan-", "alola-")
        .replace("galarian-", "galar-")
        .replace("hisuian-", "hisui-")
        .replace("paldean-", "paldea-")
        .replace(/^urshifu$/, "urshifu-single-strike");

        for (const prefix of prefixes) {
            if (name.endsWith("-x") || name.endsWith("-y")) {
                name = name.replace("mega-", "").replace("-x", "-mega-x").replace("-y", "-mega-y");
                break;
            }
            else if (name.startsWith(prefix + "-")) {
                name = name.replace(prefix + "-", "") + "-" + prefix;
                break;
            }
        }
        
        return name;
    }

});