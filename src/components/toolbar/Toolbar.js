import Base from '@/core/Base';
import { DEFAULT_TOOLBAR_STYLES } from '@/core/constants';
import { $ } from '@/core/Dom';
import createToolbar from '@/components/toolbar/createToolbar.template';
import { updateStylesAction, saveCustomStyles } from '@/redux/actions';
import { debounce, isEqual } from '@/core/utils';

/**
 * @description
 * @export
 * @class className
 */
export default class Toolbar extends Base {
  static className = 'excel__toolbar';

  /**
   *Creates an instance of Toolbar.
   * @param {Object.<String, *>} root
   * @param {*} options
   * @memberof Toolbar
   */
  constructor(root, options) {
    super(root, {
      listeners: ['click'],
      subscribed: ['selectedCellStyleState', 'selectedCellIdState'],
      ...options,
    });

    this.state = DEFAULT_TOOLBAR_STYLES;
  }

  /**
   * @description
   * @memberof Toolbar
   */
  created() {
    super.created();

    this.onClick = debounce(this.onClick, 300);
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

    if (type) {
      const newStyles = JSON.parse(style);

      this.$dispatch(updateStylesAction(newStyles));
      this.$dispatch(
          saveCustomStyles({
            id: this.selectedCellId,
            styles: newStyles,
          }),
      );
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
