import Dialog from '@/core/ui/Dialog';

export default class DialogWrapper extends Dialog {
  constructor(payload) {
    super(payload);

    this.$on('dropDown:inputChaged', (value) => {
      this.updateTitle(value);
    });

    this.open();
  }

  updateTitle(value) {
    this.$root.find('.dialog__title').text('Selected country: ' + value);
  }
}
