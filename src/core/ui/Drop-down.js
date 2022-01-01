import { findBestMatch } from 'string-similarity';
import { $ } from '@/core/Dom';
import { KEY_DOWN, KEY_UP, ENTER } from '@/components/table/Table';
import Base from '@/core/Base';
import Observer from '@/core/Observer';
import { debounce } from '@/core/utils';
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
    this.hint = [];
    this.autoCompleteValue = '';
    this.$menu = this.menuTemplate;
    this.$root.html(this.template).append(this.$menu.el);

    // binding
    this.openMenu = this.openMenu.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
    this.onMenuKeydown = this.onMenuKeydown.bind(this);
    this.onFocusLost = this.onFocusLost.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onInputAutoComplete = this.onInputAutoComplete.bind(this);

    // children
    this.$inputDomEl = this.$root.find(`[id='${this.inputId}']`);
    this.menuOptions = this.$menu.findAll('.drop-down__option');
    this.$arrow = this.$root.find('.drop-down__arrow');
    this.$hintInvisible = this.$root.find('.drop-down__hint-invisible');
    this.$hintVisible = this.$root.find('.drop-down__hint-visible');

    this.init();
  }

  init() {
    this.$currentOption = this.$root.find(`[data-option-index="${this.selectedOptionIndex}"]`);
    this.updateInputValue(this.$currentOption.el.innerText.trim());
    this.hightLightActiveOption(this.$currentOption);
    this.addListeners();
    // this.updateUIstate = debounce(this.updateUIstate, 100);
  }

  addListeners() {
    this.$arrow.on('click', this.openMenu);
    this.$inputDomEl.on('input', this.onSearch);
    this.$inputDomEl.on('blur', (event) => this.onFocusLost(event, 'input'));
    this.$inputDomEl.on('keydown', this.onInputAutoComplete);
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
          <div class="drop-down__hint">
            <span class="drop-down__hint-invisible"></span>
            <span class="drop-down__hint-visible"></span>
          </div>
          <span tabindex="0" class="drop-down__arrow material-icons">
            arrow_drop_down
          </span>
        `;
  }

  get menuTemplate() {
    return $.create('div', 'drop-down__menu', [['tabindex', '0']]).html(`
      <ul>
        ${this.options.map(
      (option, index) => `<li class="drop-down__option" id="${option.value}" data-option-index="${index}">
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

  async openMenu() {
    const isOpened = this.isExpanded();

    this.updateUIstate(!isOpened);

    if (!isOpened) {
      this.$currentOption.el.scrollIntoView();
    }
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

      this.$currentOption = this.$root.find(`[data-option-index="${this.selectedOptionIndex}"]`);

      this.hightLightActiveOption(this.$currentOption);
      this.$menu.el.scrollTop = this.$currentOption.el.offsetTop - 100;

      if (event.key === ENTER) {
        const value = this.$currentOption.el.innerText;
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
        this.updateUIstate(false);
      } else if (issuer === 'menu' && relatedTarget !== this.$arrow.el) {
        this.updateUIstate(false);
      }
    }
  }

  onSearch({ target }) {
    const { bestMatch } = findBestMatch(target.value?.toLowerCase(), this.options.map(({ value }) => value));

    if (bestMatch.rating >= 0.5) {
      const visibleHint = [...bestMatch.target].splice(target.value.length).join('');

      this.$hintInvisible.el.innerText = target.value;
      this.$hintVisible.el.innerText = visibleHint;
      this.$hintVisible.addClass('drop-down__hint-visible--active');
      this.autoCompleteValue = bestMatch.target;
    } else {
      this.clearSearchHint();
    }
  }

  clearSearchHint() {
    this.$hintInvisible.el.innerText = '';
    this.$hintVisible.el.innerText = '';
    this.$hintVisible.removeClass('drop-down__hint-visible--active');
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

  onInputAutoComplete({ key }) {
    if (key === ENTER && this.autoCompleteValue) {
      this.updateInputValue(this.autoCompleteValue);
      this.$currentOption = this.$root.find(`#${this.autoCompleteValue}`);

      this.hightLightActiveOption(this.$currentOption);

      this.clearSearchHint();
    }
  }
}
