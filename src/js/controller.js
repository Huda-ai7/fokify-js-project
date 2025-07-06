import * as model from './model.js';
import recipeView from './views/viewRecipe.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}
const controlRecpie = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpiner();

    // 1) Update result view to mark selected search result
    resultView.update(model.getSearchResultPage());

    // 2) updating bookmarks view
    bookmarkView.update(model.state.bookmarks);

    // 3) Loading recipe
    await model.loadRecipe(id);

    // 4) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResult = async function () {
  try {
    // Load spiner
    // resultView.renderSpiner();

    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load search results
    await model.loadSearchResult(query);

    //3) Render results
    resultView.render(model.getSearchResultPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};
// window.addEventListener('hashchange', controlRecpie);
// window.addEventListener('load', showRecipe);

const controlPagination = function (goToPage) {
  //3) Render New results
  resultView.render(model.getSearchResultPage(goToPage));

  // 4) Render New initial pagination buttons
  paginationView.render(model.state.search);
};

const controllerServings = function (newServing) {
  // updata the recipe servings (in state)
  model.updateServings(newServing);

  // updata the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add and remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) updat bookmark icon
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks List
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRec) {
  try {
    // show loading spiner
    addRecipeView.renderSpiner();

    // upload the new recipe data
    await model.uploadNewRecipe(newRec);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Render success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarkView.render(model.state.bookmarks);

    // change ID in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close from window
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('🚫', err);
    addRecipeView.renderError(err.message);
  }
};
// refactor the addEventListener
const init = function () {
  bookmarkView.addHandler(controlBookmark);
  recipeView.addHandlerRender(controlRecpie);
  recipeView.addHandlerServings(controllerServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUplod(controlAddRecipe);
};
init();
