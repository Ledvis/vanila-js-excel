import Base from '@/core/Base';
import DialogWrapper from '@/core/ui/Dialog-wrapper';
import DropDown from '@/core/ui/Drop-down';
import { DEFAULT_TOOLBAR_STYLES } from '@/core/constants';
import { $ } from '@/core/Dom';
import createToolbar from '@/components/toolbar/createToolbar.template';
import { updateStylesAction, saveCustomStyles } from '@/redux/actions';
import { isEqual } from '@/core/utils';
import countries from '@/countries.json';
import { Input } from '@/core/ui/Input';

/**
 * @description
 * @export
 * @class className
 */
export default class Toolbar extends Base {
  static className = 'excel__toolbar';

  /**
   *Creates an instance of Toolbar.
   * @param {*} options
   * @memberof Toolbar
   */
  constructor(options) {
    const root = $.create('div', Toolbar.className);

    super(root, {
      listeners: ['click'],
      subscribed: ['selectedCellStyleState', 'selectedCellIdState'],
      ...options,
    });

    this.state = DEFAULT_TOOLBAR_STYLES;
    this.appendDialog();
  }

  /**
   * @description
   * @memberof Toolbar
   */
  created() {
    super.created();
  }

  /**
   * @description
   * @readonly
   * @memberof Toolbar
   */
  get template() {
    return createToolbar(this.state);
  }

  /**
   * @description
   * @param {Event} event
   * @memberof Toolbar
   */
  onClick(event) {
    const $target = $(event.target);
    const { type, style } = $target.dataAttr();

    switch (type) {
      case 'button': {
        const newStyles = JSON.parse(style);

        this.$dispatch(updateStylesAction(newStyles));
        this.$dispatch(saveCustomStyles({
          id: this.selectedCellId,
          styles: newStyles,
        }));

        break;
      }

      case 'share': {
        this.dialog.open();
      }
    }
  }

  /**
   * @description
   * @param {Object.<string, *>} { selectedCellStyleState, selectedCellIdState }
   * @memberof Toolbar
   */
  onStoreUpdate({ selectedCellStyleState, selectedCellIdState }) {
    if (selectedCellIdState) this.selectedCellId = selectedCellIdState;
    if (selectedCellStyleState) {
      const prevState = { ...this.state };
      this.state = selectedCellStyleState;

      if (!isEqual(prevState, this.state)) this.render();
    }
  }

  /**
   * @description
   * @memberof Toolbar
   */
  mounted() {
    super.mounted();

    this.$on('table:groupSelected', (cellIds) => (this.selectedCellId = cellIds));
  }

  destroyed() {
    if (this.dialog.isOpened) this.dialog.close();
  }

  appendDialog() {
    const input = new Input({ labelText: 'Some label text', shadowText: 'Some shadow text', isClearable: true });
    const dropdown = new DropDown({
      currentValue: 'Ukraine',
      options: countries.map((country) => {
        return {
          id: country.id,
          value: country.name,
        };
      }),
    });
    const container = $.create('div', 'toolbar__container')
        .append(dropdown.$root)
        .append(input.$root);

    this.dialog = new DialogWrapper({ contentEl: container.el, title: 'Choose your country' });
  }

  /**
   * @description
   * @memberof Toolbar
   */
  render() {
    this.$root.html(this.template);
  }

  /**
   * @description
   * @return {string}
   * @memberof Toolbar
   */
  toHTML() {
    return this.template;
  }
}
