import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   *
   * @param {Object | Object[]} data the data to be render (e.g. recipe)
   * @param {boolean} [render=true] if false, creat markup string insted of rendering in DOM
   * @returns {undefined | string} a markup string is returned if render=false
   * @this {Object} view instance
   * @author Huda Ali
   * @todo Finsh implementaion
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkUp();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkUp();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDom.querySelectorAll('*'));
    const currElement = Array.from(this._parentElement.querySelectorAll('*'));
    newElement.forEach((newEl, i) => {
      const curEl = currElement[i];
      console.log(curEl, newEl.isEqualNode(curEl));

      // UPDATE change text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('😘', newEl.firstChild?.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // UPDATE change Attributes
      if (!newEl.isEqualNode(curEl)) {
        console.log(newEl.attributes);
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpiner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> 
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
              <p>${message}</p>
          </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
              <p>${message}</p>
          </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
