import { CheckedClockCell } from './checked-clock-cell.js';

export class CheckedClock extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' })
    const slot = document.createElement('slot');
    this.slotListener = this.onSlotChange.bind(this);
    slot.addEventListener('slotchange', this.slotListener);
    this.shadow.appendChild(slot);

    this.style.display = 'flex';
    this.style.flexDirection = 'row';
    this.style.alignItems = 'center';

    this.cells = [
      this.createCell(5, 9),
      this.createCell(1, 9),
      this.createCell(5, 9),
      this.createCell(3, 9),
      this.createCell(5, 9),
      this.createCell(1, 9),
      this.createCell(5, 9),
      this.createCell(3, 9),
      this.createCell(5, 9),
      this.createCell(1, 9),
      this.createCell(5, 9)
    ];
  }

  disconnectedCallback() {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  createCell(width, height) {
    const cell = new CheckedClockCell();
    cell.setSize(width, height);
    this.appendChild(cell);
    return cell;
  }

  getSlotElements(slot) {
    return slot.assignedElements ? slot.assignedElements() : slot.assignedNodes().filter((n) => n.nodeType === this.ELEMENT_NODE);
  }

  onSlotChange() {
    const slot = this.shadow.querySelector('slot');
    slot.removeEventListener('slotchange', this.slotListener);
    const element = this.getSlotElements(slot)[0];
    if (element) {
      this.template = document.createElement('template');
      this.template.content.appendChild(element);
      this.cells.forEach((c) => c.setTemplate(this.template));
      this.updateTime();
      this.timer = window.setInterval(() => {
        this.updateTime();
      }, 1000);
    }
  }

  padNumber(n) {
    const s = `${n}`;
    if (s.length == 2) {
      return [s.charAt(0), s.charAt(1)];
    }
    return ['0', s.charAt(0)];
  }

  updateTime() {
    const date = new Date();
    const h = this.padNumber(date.getHours());
    const m = this.padNumber(date.getMinutes());
    const s = this.padNumber(date.getSeconds());
    this.cells[0].setValue(h[0]);
    this.cells[2].setValue(h[1]);
    this.cells[3].setValue(':');
    this.cells[4].setValue(m[0]);
    this.cells[6].setValue(m[1]);
    this.cells[7].setValue(':');
    this.cells[8].setValue(s[0]);
    this.cells[10].setValue(s[1]);
  }
}

customElements.define('checked-clock', CheckedClock);