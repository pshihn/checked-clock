const DISPLAYS = {
  '1': [[0, 4], [1, 3], [1, 4], [2, 2], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4]],
  '2': [[0, 1], [0, 2], [0, 3], [1, 0], [1, 4], [2, 4], [3, 4], [4, 3], [5, 2], [6, 1], [7, 0], [8, 0], [8, 1], [8, 2], [8, 3], [8, 4]],
  '3': [[0, 1], [0, 2], [0, 3], [1, 0], [1, 4], [2, 4], [3, 4], [4, 3], [4, 2], [4, 1], [5, 4], [6, 4], [7, 0], [7, 4], [8, 1], [8, 2], [8, 3]],
  '4': [[0, 0], [0, 4], [1, 0], [1, 4], [2, 0], [2, 4], [3, 0], [3, 4], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4]],
  '5': [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [5, 4], [6, 4], [7, 4], [8, 0], [8, 1], [8, 2], [8, 3], [8, 4]],
  '6': [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [5, 4], [6, 4], [7, 4], [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [5, 0], [6, 0], [7, 0]],
  '7': [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4]],
  '8': [[0, 1], [0, 2], [0, 3], [1, 0], [1, 4], [2, 0], [2, 4], [3, 0], [3, 4], [5, 0], [5, 4], [6, 0], [6, 4], [7, 0], [7, 4], [4, 1], [4, 2], [4, 3], [8, 1], [8, 2], [8, 3]],
  '9': [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [1, 0], [1, 4], [2, 0], [2, 4], [3, 0], [3, 4], [5, 4], [6, 4], [7, 4], [8, 4]],
  '0': [[0, 1], [0, 2], [0, 3], [1, 0], [1, 4], [2, 0], [2, 4], [3, 0], [3, 4], [5, 0], [5, 4], [6, 0], [6, 4], [7, 0], [7, 4], [4, 0], [4, 4], [8, 1], [8, 2], [8, 3]],
  ':': [[3, 1], [5, 1]],
  '': []
};

export class CheckedClockCell extends HTMLElement {
  constructor() {
    super();
    this.value = '';
    this.checks = [];
    this.style.display = 'flex';
    this.style.flexDirection = 'column';
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.render();
  }

  setTemplate(template) {
    this.template = template;
    this.render();
  }

  setValue(v) {
    if (v !== this.value) {
      this.value = v;
      this.updateValue();
    }
  }

  render() {
    while (this.lastChild) {
      this.removeChild(this.lastChild);
    }
    this.checks = [];
    if (this.template && this.width && this.height) {
      for (let row = 0; row < this.height; row++) {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.flexDirection = 'row';
        div.style.alignItems = 'center';
        for (let col = 0; col < this.width; col++) {
          const c = this.template.content.cloneNode(true)
          div.appendChild(c);
          this.checks.push(div.lastChild);
        }
        this.appendChild(div);
      }
    }
  }

  updateValue() {
    this.checks.forEach((d) => d.checked = false);
    const points = DISPLAYS[this.value] || [];
    points.forEach((p) => {
      const check = this.checks[p[0] * this.width + p[1]];
      if (check) {
        check.checked = true;
      }
    });
  }
}

customElements.define('checked-clock-cell', CheckedClockCell);