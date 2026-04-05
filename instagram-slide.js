/**
 * Copyright 2026
 * @license Apache-2.0
 */
import { LitElement, html, css } from "lit";

export class InstagramSlide extends LitElement {
  static get tag() {
    return "instagram-slide";
  }

  static get properties() {
    return {
      image: { type: String },
      alt: { type: String },
    };
  }

  constructor() {
    super();
    this.image = "";
    this.alt = "";
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      .image-wrap {
        width: 100%;
        height: 100%;
        background: #f2f2f4;
      }

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `;
  }

  render() {
    return html`
      <div class="image-wrap">
        <img src="${this.image}" alt="${this.alt}" loading="lazy" />
      </div>
    `;
  }
}

globalThis.customElements.define(InstagramSlide.tag, InstagramSlide);