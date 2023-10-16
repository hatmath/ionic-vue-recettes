# 420-326: Laboratoire 02

# Entête
   
    Projet: 	Laboratoire 02 : Application Recettes Mobile avec Ionic - Vue
    Codeurs:	Mathieu Hatin (2296939)
    Cours: 		Technologies connexes pour applications multiplateformes (420-326-AH)
	Date:		Octobre 2023

## Notes personnelles

    menu - Accueil (/folder/Accueil)

        Lookup a single random meal (une recette aléatoire)
        https://www.themealdb.com/api/json/v1/1/random.php 

    menu chicken, seafood, dessert (catégories)

        menu chicken (/liste/Chicken)
        Filter by Category
        https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken
    
    vue détail d'une recette (/Detail/:idMeal)

        Le idMeal est présent partout dans les liste par catégorie retourné comme dans le détail d'une recette spécifique

        exemple dessert idMeal 53049
        Lookup full meal details by id
        https://www.themealdb.com/api/json/v1/1/lookup.php?i=53049

        éléments dans la présentation d'une recette
        - barre de titre écrit "Recette" avec icone arrière la où on était!
        - l'image (moyenne grosseur) json:[meals.strMealThumb]
        - nom (gras titre) json:[meals.strMeal]
        - Origine: (normal texte) (hardcode en français)
            - espace
            - json:[meals.strArea]
        - Catégorie: (normal texte) (hardcode en français)
            - espace
            - json:[meals.strCategory]
        - Ingrédients (gras titre) (hardcode en français)
            - liste des ingrédients (normal texte décaller)
                - chaque item est une fusion de 
                    - json:[meals.strMeasure1] 
                    - espace 
                    - json:[meals.strIngredient1] 
                    * avec le chiffre identique *
        - Instructions (gras titre) (hardcode en français) 
            - json:[meals.strInstructions]
    
    Icônes standard
        https://ionic.io/ionicons

## Installation nécessaire

    VirtualScroller (vue-virtual-scroller)
        https://www.npmjs.com/package/vue-virtual-scroller

        npm install vue-virtual-scroller@next

    Mais il y a aussi vue3-virtual-scroller ... et c'est celui que nous allons utiliser!

    VirtualScroller (vue3-virtual-scroller)
        https://dev.to/aaronksaunders/using-vue3-virtualscroller-in-ionic-vue-app-28n6
        https://www.npmjs.com/package/vue3-virtual-scroller
        https://www.youtube.com/watch?v=Uzq1KQV8f4k

        Modif pour support TS
        https://binhong.me/blog/2021-12-12-vue-3-vite/
        https://stackoverflow.com/questions/54622621/what-does-the-shims-tsx-d-ts-file-do-in-a-vue-typescript-project
        
        npm install --save vue3-virtual-scroller

## À faire / Correction / Amélioration
