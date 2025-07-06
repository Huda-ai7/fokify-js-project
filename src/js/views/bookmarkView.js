import View from './View.js';
import icons from 'url:../../img/icons.svg';
import perview from './perviewView.js';

class BookmarView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmark yet. Find a nice recipe;)';
  _message = 'Success Message';

  addHandler(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkUp() {
    return this._data.map(bookmark => perview.render(bookmark, false)).join('');
  }
}
export default new BookmarView();
