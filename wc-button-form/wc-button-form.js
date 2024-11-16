const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <link rel="stylesheet" href="/wc-button-form/wc-button-form.css">
  <button><slot>Open Form</slot></button>
  <div class="modal" id="modal">
    <div class="modal-content">
      <form id="form">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <button type="submit">Submit</button>
        <button id="cancel" style="cursor:pointer;">Cancel</button>
      </form>
    </div>
  </div>
`;

class WcButtonForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });

    this.render();
  }

  connectedCallback() {
    this.shadowRoot.querySelector('button').addEventListener('click', () => this.openModal());
    this.shadowRoot.querySelector('#cancel').addEventListener('click', () => this.closeModal());
    this.shadowRoot.querySelector('form').addEventListener('submit', (e) => this.handleSubmit(e));
  }

  render() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  openModal() {
    this.shadowRoot.getElementById('modal').style.display = 'block';
  }

  closeModal() {
    this.shadowRoot.getElementById('modal').style.display = 'none';
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(`Submitted Name: ${this.shadowRoot.getElementById('name').value}`);
    this.closeModal();
  }
}

customElements.define('wc-button-form', WcButtonForm);