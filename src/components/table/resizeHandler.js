import { $ } from '@/core/Dom';

const MIN_COLUMN_WIDTH = 40;
const MIN_COLUMN_HEIGHT = 24;
const RESIZER_COLUMN = 'column';
const RESIZER_ROW = 'row';

/**
 * @description
 * @export
 * @param {Object} $root
 * @param {HTMLElement} target
 */
export default function($root, target) {
  const $resizer = $(target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const $slider = $($resizer.children());
  $slider.el = $slider.el.length === 1 ? $slider.el[0] : $slider.el;
  const { height: tableHeight, width: tableWidth } = $root.position();

  if (!$parent.el) return;

  const targetIndex = $parent.data.orderNumber;
  const resizerType = $resizer.data.resizer;
  const cellElements = $root.findAll(`[data-type="cell-${targetIndex}"]`);
  let targetDelta;
  let value;
  const sliderOffset = resizerType === RESIZER_COLUMN ?
      { 'bottom': -tableHeight + 'px' } :
      { 'right': -tableWidth + 'px' };

  $slider.css(sliderOffset);
  $resizer.css({ opacity: 1 });

  const {
    x: parentX, y: parentY, right: parentRight, bottom: parentBottom, width: parentWidth, height: parentHeight,
  } = $parent.position();

  document.onmousemove = ({ pageX, pageY }) => {
    if (resizerType === RESIZER_COLUMN) {
      targetDelta = pageX - parentRight;

      if (pageX > parentX + MIN_COLUMN_WIDTH) {
        $resizer.css({ right: -targetDelta + 'px' });
      }
    } else if (resizerType === RESIZER_ROW) {
      if (pageY > parentY + MIN_COLUMN_HEIGHT) {
        targetDelta = pageY - parentBottom;
        $resizer.css({ bottom: -targetDelta + 'px' });
      }
    }
  };

  document.onmouseup = () => {
    if (resizerType === RESIZER_COLUMN) {
      value = parentWidth + targetDelta + 'px';

      $parent.css({ width: value });
      $resizer.css({ right: 0 });
      $slider.css({ bottom: 0 });
      cellElements.forEach((el) => el.style.width = value);
    } else if (resizerType === RESIZER_ROW) {
      value = parentHeight + targetDelta + 'px';

      $parent.css({ height: value });
      $resizer.css({ bottom: 0 });
      $slider.css({ right: 0 });
    }

    $resizer.css({ opacity: 0 });
    document.onmousemove = null;
  };
}
