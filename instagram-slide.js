/**
 * Copyright 2026 Jake Butler
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `instagram-slide`
 *
 * @demo index.html
 * @element instagram-slide
 */
export class InstagramSlide extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "instagram-slide";
  }

  constructor() {
    super();
    this.image = "";
    this.alt = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Slide",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/instagram-slide.ar.json", import.meta.url).href +
        "/../",
    });
  }

  static get properties() {
    return {
      ...super.properties,
      image: { type: String },
      alt: { type: String },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      `,
    ];
  }

  render() {
    return html`
      <img src="${this.image}" alt="${this.alt}">
    `;
  }
}

globalThis.customElements.define(InstagramSlide.tag, InstagramSlide);