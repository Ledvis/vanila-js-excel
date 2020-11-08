import { DEFAULT_TOOLBAR_STYLES } from '@/core/constants';

/**
 * @description
 * @param {Object.<String, *>} button
 * @return {String}
 */
function createButton({ icon, isActive, style }) {
  return `
        <div data-type="button" data-style='${JSON.stringify(style)}' class="button ${isActive ? 'button--active' : ''}">
          <i class="material-icons">${icon}</i>
        </div>
      `;
}

/**
 * @description
 * @export
 * @param {Object} state
 * @return {String}
 */
export default function createToolbar(state) {
  const buttons = [
    {
      icon: 'format_align_left',
      isActive: state.textAlign === DEFAULT_TOOLBAR_STYLES.textAlign,
      style: {
        textAlign: DEFAULT_TOOLBAR_STYLES.textAlign,
      },
    },
    {
      icon: 'format_align_center',
      isActive: state.textAlign === 'center',
      style: {
        textAlign: 'center',
      },
    },
    {
      icon: 'format_align_right',
      isActive: state.textAlign === 'right',
      style: {
        textAlign: 'right',
      },
    },
    {
      icon: 'format_bold',
      isActive: state.fontWeight === 'bold',
      style: {
        fontWeight: state.fontWeight === 'bold' ? DEFAULT_TOOLBAR_STYLES.fontWeight : 'bold',
      },
    },
    {
      icon: 'format_italic',
      isActive: state.fontStyle === 'italic',
      style: {
        fontStyle: state.fontStyle === 'italic' ? DEFAULT_TOOLBAR_STYLES.fontStyle : 'italic',
      },
    },
    {
      icon: 'format_underlined',
      isActive: state.textDecoration === 'underline',
      style: {
        textDecoration: state.textDecoration === 'underline' ? DEFAULT_TOOLBAR_STYLES.textDecoration : 'underline',
      },
    },
  ];

  return buttons.map(createButton).join('');
}
