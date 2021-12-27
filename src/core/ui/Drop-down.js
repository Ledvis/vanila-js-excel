import { $ } from '@/core/Dom';
import { KEY_DOWN, KEY_UP, ENTER } from '@/components/table/Table';
import Base from '@/core/Base';
import Observer from '../Observer';
const KEYS = [KEY_DOWN, KEY_UP, ENTER];

export default class DropDown extends Base {
  constructor({ currentValue, options }) {
    const inputId = Date.now();
    const root = $.create('label', 'drop-down', [['for', inputId]]);

    super(root, {
      observer: new Observer(),
    });

    this.inputId = inputId;
    this.selectedOptionIndex = 0;
    this.currentOption = options.find(({ name }) => name?.toLowerCase() === currentValue?.toLowerCase()) || {};
    this.options = options;
    this.$menu = this.menuTemplate;
    this.$root.html(this.template).append(this.$menu.el);

    // binding
    this.updateArrowPosition = this.updateArrowPosition.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
    this.onMenuKeydown = this.onMenuKeydown.bind(this);
    this.onFocusLost = this.onFocusLost.bind(this);

    // children
    this.$inputDomEl = this.$root.find(`[id='${this.inputId}']`);
    this.menuOptions = this.$menu.findAll('.drop-down__option');
    this.$arrow = this.$root.find('.drop-down__arrow');

    this.init();
  }

  init() {
    const $option = this.$root.find(`[data-option-index="${this.selectedOptionIndex}"]`);
    this.updateInputValue($option.el.innerText.trim());
    this.hightLightActiveOption($option);
    this.addListeners();
  }

  addListeners() {
    this.$arrow.on('click', this.updateArrowPosition);
    this.$inputDomEl.on('blur', (event) => this.onFocusLost(event, 'input'));
    this.$menu.on('blur', (event) => this.onFocusLost(event, 'menu'));
    this.$menu.on('keydown', this.onMenuKeydown);
    this.$menu.on('click', this.onMenuClick );
  }

  get styles() {
    return {
      top: this.position.height + 'px',
      left: 0 + 'px',
      height: this.position.height + 'px',
    };
  }

  get template() {
    return `
          ${this.prepend ? `<div>${this.prepend}</div>` : ''}
          <input value="${this.currentOption?.name}" id="${this.inputId}" />
          <span tabindex="0" class="drop-down__arrow material-icons">
            arrow_drop_down
          </span>
        `;
  }

  get menuTemplate() {
    return $.create('div', 'drop-down__menu', [['tabindex', '0']]).html(`
      <ul>
        ${this.options.map(
      (option, index) => `<li class="drop-down__option" data-option-index="${index}">
          ${option.value}
        </li>`).join('')}
      </ul>
    `).css({ display: 'none' });
  }

  /**
   *
   * @param {Boolean} shouldExpand
   * @memberof DropDown
   */
  updateUIstate(shouldExpand) {
    this.$arrow.html(shouldExpand ? 'arrow_drop_up' : 'arrow_drop_down');
    shouldExpand ? this.$menu.css({ display: 'block' }) : this.$menu.css({ display: 'none' });
  }

  isExpanded() {
    const { innerText } = this.$arrow.el;

    return innerText === 'arrow_drop_up';
  }

  updateArrowPosition() {
    this.updateUIstate(!this.isExpanded());
  }

  onMenuKeydown(event) {
    if (KEYS.includes(event.key)) {
      event.preventDefault();

      if (event.key === KEY_DOWN) this.selectedOptionIndex++;
      else if (event.key === KEY_UP) this.selectedOptionIndex--;

      if (this.selectedOptionIndex < 0) {
        this.selectedOptionIndex = this.options.length - 1;
      } else if (this.selectedOptionIndex >= this.options.length) {
        this.selectedOptionIndex = 0;
      }

      const $option = this.$root.find(`[data-option-index="${this.selectedOptionIndex}"]`);

      this.hightLightActiveOption($option);
      this.$menu.el.scrollTop = $option.el.offsetTop - 100;

      if (event.key === ENTER) {
        const value = $option.el.innerText;
        this.updateInputValue(value.trim());
        this.updateUIstate(false);
      }
    }
  }

  onMenuClick(event) {
    event.preventDefault();

    const $target = $(event.target);
    const value = $target.el.innerText;
    const { optionIndex } = $target.dataAttr();

    if (optionIndex) {
      this.selectedOptionIndex = optionIndex;

      this.hightLightActiveOption($target);
      this.updateInputValue(value.trim());
    }
  }

  onFocusLost({ relatedTarget }, issuer) {
    if (this.isExpanded()) {
      if (issuer === 'input' && relatedTarget !== this.$menu.el) {
        this.updateUIstate();
      } else if (issuer === 'menu' && relatedTarget !== this.$arrow.el) {
        this.updateUIstate();
      }
    }
  }

  hightLightActiveOption($target) {
    this.menuOptions.forEach((el) => {
      el.classList.remove('drop-down__option--active');
    });
    $target.addClass('drop-down__option--active');
  }

  updateInputValue(value) {
    this.currentOption.name = value;

    this.$inputDomEl.el.value = this.currentOption.name;
    this.$emit('dropDown:inputChaged', value);
  }
}
