import { $ } from '@/core/Dom';

/**
 * { function_description }
 *
 * @class      Loader
 */
export function Loader() {
  return $.create('div', 'lds-spinner').html(`
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
  `);
}
