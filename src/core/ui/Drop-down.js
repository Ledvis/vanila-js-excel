import { $ } from '@/core/Dom';

export default class DropDown {
  constructor({ value, options }) {
    this.isExpanded = true;
    this.value = value;
    this.options = options;
    this.$root = this.template;

    this.updateArrowPosition = this.updateArrowPosition.bind(this);
    this.init();
  }

  init() {
    this.$arrow = this.$root.find('.drop-down__arrow').on('click', this.updateArrowPosition);
  }

  mounted() {
    this.updateUIstate();
  }

  get styles() {
    return {
      top: this.position.height + 'px',
      left: 0 + 'px',
      height: this.position.height + 'px',
    };
  }

  get template() {
    const id = Date.now();

    return $.create('label', 'drop-down', [['for', id]]).html(`
          ${this.prepend ? `<div>${this.prepend}</div>` : ''}
          <input value="${this.value}" id="${id}" />
          <span tabindex="0" class="drop-down__arrow material-icons">
            ${this.isExpanded ? 'arrow_drop_up' : 'arrow_drop_down'}
          </span>
          <div class="drop-down__menu">
            <ul>
              ${this.options.map((option) => `<li class="drop-down__option" data-option-id="${option.id}">
                ${option.value}
              </li>`).join('')}
            </ul>
          </div>
        `);
  }

  updateUIstate() {
    this.$arrow.html(this.isExpanded ? 'arrow_drop_up' : 'arrow_drop_down');
    this.isExpanded ? this.menu.show() : this.menu.hide();
  }

  updateArrowPosition() {
    this.isExpanded = !this.isExpanded;
    this.updateUIstate();
  }
}
