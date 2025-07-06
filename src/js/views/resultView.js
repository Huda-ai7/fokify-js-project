import View from './View.js';
import icons from 'url:../../img/icons.svg';
import perview from './perviewView.js';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found for your query! please try again ;)';
  _message = 'Success Message';

  _generateMarkUp() {
    return this._data.map(result => perview.render(result, false)).join('');
  }
}
export default new ResultView();
