import { $ } from '@/core/Dom';

export class Input {
  constructor({ labelText, shadowText, isClearable }) {
    const $root = $.create('div', 'input');

    this.labelText = labelText;
    this.shadowText = shadowText;
    this.isClearable = isClearable;
    this.$root = $root;
    this.$root.html(this.template);

    // children
    this.$input = this.$root.find('.input__native');
    this.$label = this.$root.find('.input__label');
    if (this.shadowText) this.$shadow = this.$root.find('.input__shadow');
    if (this.isClearable) this.$clear = this.$root.find('.input__clear');

    // binding
    this.onFocus = this.onFocus.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onClear = this.onClear.bind(this);

    // handlers
    this.$input.el.onfocus = () => this.onFocus('add');
    this.$input.el.onblur = () => this.onFocus('remove');
    this.$input.el.oninput = this.onInput;
    if (this.$shadow) this.$clear.el.onclick = this.onClear;
  }

  get template() {
    return `
      <div class="input__label">${this.labelText}</div>
      ${this.shadowText ? `<div class="input__shadow">${this.shadowText}</div>` : ''}
      <input type="text" class="input__native ${this.isClearable && 'input__native--clearable'}" />
      ${this.isClearable ? `
        <svg class="input__clear" aria-hidden="true" role="presentation" viewBox="0 0 24 24" tabindex="0" type="button">
          <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7
          L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"></path>
        </svg>
      ` : ''}
    `;
  }

  get value() {
    return this.$input.el.value;
  }

  onFocus(action) {
    if (action === 'add') {
      this.$label.addClass('input__label--up');

      if (!this.value && this.$shadow) this.$shadow.addClass('input__shadow--active');
    } else if (action === 'remove' && !this.value) {
      this.$label.removeClass('input__label--up');

      if (this.$shadow) this.$shadow.removeClass('input__shadow--active');
    }
  }

  onInput({ target }) {
    if (this.$shadow && target.value) this.$shadow.removeClass('input__shadow--active');
    else if (this.$shadow && !target.value) this.$shadow.addClass('input__shadow--active');
  }

  onClear(event) {
    event.stopPropagation();

    this.$input.el.value = '';
    this.onFocus('remove');
  }
}
