/**
 * Copyright 2026 Jake Butler
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";

/**
 * `dot-indicators`
 * Dot navigation indicators for the instagram card slideshow
 *
 * @element dot-indicators
 */
export class DotIndicators extends LitElement {
  static get tag() {
    return "dot-indicators";
  }

  static get properties() {
    return {
      count: { type: Number },
      current: { type: Number },
    };
  }

  constructor() {
    super();
    this.count = 0;
    this.current = 0;
  }

  static get styles() {
    return css`
      .dots {
        display: flex;
        justify-content: center;
        gap: 8px;
        padding: 8px 0 4px;
        flex-wrap: wrap;
        max-width: 100%;
      }

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #ccc;
        cursor: pointer;
        border: none;
        padding: 0;
        flex-shrink: 0;
      }

      .dot.active {
        background: #1e407c;
        transform: scale(1.2);
      }
    `;
  }

  _handleClick(i) {
    this.dispatchEvent(
      new CustomEvent("dot-click", {
        detail: i,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="dots">
        ${Array.from({ length: this.count }).map(
          (_, i) => html`
            <button
              class="dot ${this.current === i ? "active" : ""}"
              @click="${() => this._handleClick(i)}"
              aria-label="Go to slide ${i + 1}"
            ></button>
          `
        )}
      </div>
    `;
  }
}

customElements.define(DotIndicators.tag, DotIndicators);