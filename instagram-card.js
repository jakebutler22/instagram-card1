/**
 * Copyright 2026 Jake Butler
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./instagram-slide.js";

export class InstagramCard extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "instagram-card";
  }

  constructor() {
    super();
    this.title = "";
    this.author = {};
    this.images = [];
    this.activeIndex = 0;
    this.loading = true;
    this.likes = {};
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/instagram-card.ar.json", import.meta.url).href +
        "/../",
    });
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      author: { type: Object },
      images: { type: Array },
      activeIndex: { type: Number, reflect: true },
      loading: { type: Boolean, reflect: true },
      likes: { type: Object },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
        }

        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }

        h3 span {
          font-size: var(--instagram-card-label-font-size, var(--ddd-font-size-s));
        }

        .card {
          position: relative;
          width: 100%;
          max-width: 760px;
          margin: 0 auto;
          padding: 24px 24px 20px;
          background: white;
          border: var(--ddd-border-md);
          border-radius: var(--ddd-radius-lg);
          box-shadow: var(--ddd-boxShadow-sm);
          box-sizing: border-box;
        }

        .app-title {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #1f4fa3;
        }

        .post-shell {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          max-width: 540px;
          margin: 0 auto;
        }

        .media-frame {
          position: relative;
        }

        .user-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(255, 255, 255, 0.94);
          padding: 10px 16px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 8px;
          z-index: 3;
          color: #1f4fa3;
        }

        .media-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          align-items: stretch;
        }

        .media-box {
          position: relative;
          background: #d9d9d9;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border-radius: 12px;
        }

        .slide-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 42px;
          height: 42px;
          border-radius: 999px;
          border: 1px solid rgba(0, 0, 0, 0.15);
          background: rgba(255, 255, 255, 0.92);
          color: #222;
          display: grid;
          place-items: center;
          cursor: pointer;
          z-index: 4;
          font-size: 24px;
          line-height: 1;
          padding: 0;
        }

        .arrow.left {
          left: 12px;
        }

        .arrow.right {
          right: 12px;
        }

        .actions {
          display: flex;
          flex-direction: column;
          gap: 14px;
          justify-content: center;
          font-size: 30px;
          color: #111;
          min-width: 44px;
        }

        .action-button {
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 30px;
          line-height: 1;
          padding: 0;
        }

        .dots {
          position: absolute;
          left: 14px;
          bottom: 12px;
          display: flex;
          gap: 8px;
          z-index: 3;
          flex-wrap: wrap;
          max-width: calc(100% - 28px);
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: #d3c8c8;
          cursor: pointer;
        }

        .dot.active {
          background: #111;
        }

        .caption {
          background: #d9d9d9;
          padding: 16px 20px;
          font-size: 18px;
          color: #1f4fa3;
          border-radius: 10px;
        }

        .views {
          text-align: right;
          font-size: 16px;
          color: #222;
        }

        .likes {
          text-align: right;
          font-size: 16px;
          color: #222;
        }

        .source {
          text-align: right;
          font-size: 16px;
        }

        .source a {
          color: #1f4fa3;
          text-decoration: none;
          font-weight: 600;
        }

        .source a:hover {
          text-decoration: underline;
        }

        .loading {
          max-width: 720px;
          margin: 0 auto;
          padding: 24px;
          background: white;
          border: var(--ddd-border-md);
          border-radius: var(--ddd-radius-lg);
        }

        @media (prefers-color-scheme: dark) {
          .card {
            background: #181818;
            color: #f5f5f5;
          }

          .app-title,
          .caption,
          .source a,
          .user-tag {
            color: #9fc2ff;
          }

          .caption,
          .media-box {
            background: #2a2a2a;
          }

          .views,
          .likes,
          .actions,
          .arrow {
            color: #f5f5f5;
          }

          .arrow {
            background: rgba(24, 24, 24, 0.92);
            border-color: rgba(255, 255, 255, 0.15);
          }

          .dot {
            background: #666;
          }

          .dot.active {
            background: #f5f5f5;
          }
        }

        @media (max-width: 640px) {
          .wrapper {
            padding: var(--ddd-spacing-2);
          }

          .card {
            padding: 18px 14px 18px;
          }

          .user-tag {
            font-size: 16px;
            padding: 8px 12px;
            top: 10px;
            left: 10px;
          }

          .actions {
            font-size: 24px;
          }

          .action-button {
            font-size: 24px;
          }

          .arrow {
            width: 38px;
            height: 38px;
            font-size: 20px;
          }
        }
      `,
    ];
  }

  async firstUpdated() {
    await this.loadImages();
  }

  updated(changedProperties) {
    if (changedProperties.has("activeIndex") && this.images.length) {
      const url = new URL(window.location.href);
      url.searchParams.set("activeIndex", this.activeIndex);
      window.history.replaceState({}, "", url);
    }
  }

  async loadImages() {
    this.loading = true;

    try {
      const response = await fetch(
        new URL("./instagram-data.json", import.meta.url).href
      );
      const data = await response.json();
      this.title = data.title || "SomethingGram";
      this.author = data.author || {};
      this.images = Array.isArray(data.images) ? data.images : [];
      this.loadLikes();
      this.setInitialSlide();
    } catch (e) {
      this.images = [];
      this.author = {};
    }

    this.loading = false;
  }

  setInitialSlide() {
    const params = new URLSearchParams(window.location.search);
    const index = Number(params.get("activeIndex"));
    if (!Number.isNaN(index) && index >= 0 && index < this.images.length) {
      this.activeIndex = index;
    } else {
      this.activeIndex = 0;
    }
  }

  loadLikes() {
    const stored = window.localStorage.getItem("instagram-card-likes");
    this.likes = stored ? JSON.parse(stored) : {};
  }

  saveLikes() {
    window.localStorage.setItem(
      "instagram-card-likes",
      JSON.stringify(this.likes)
    );
  }

  toggleLike() {
    const item = this.images[this.activeIndex];
    if (!item) return;
    this.likes = {
      ...this.likes,
      [item.id]: !this.likes[item.id],
    };
    this.saveLikes();
  }

  isLiked(item) {
    return Boolean(this.likes[item.id]);
  }

  currentLikeCount(item) {
    return item.likes + (this.isLiked(item) ? 1 : 0);
  }

  nextSlide() {
    if (!this.images.length) return;
    this.activeIndex = (this.activeIndex + 1) % this.images.length;
  }

  prevSlide() {
    if (!this.images.length) return;
    this.activeIndex = (this.activeIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index) {
    this.activeIndex = index;
  }

  render() {
    if (this.loading) {
      return html`
<div class="wrapper">
  <div class="loading">Loading images...</div>
</div>`;
    }

    if (!this.images.length) {
      return html`
<div class="wrapper">
  <div class="loading">Unable to load images.</div>
</div>`;
    }

    const item = this.images[this.activeIndex];
    const handle = this.author.handle || "Jakebutler22";

    return html`
<div class="wrapper">
  <div class="card">
    <div class="app-title">${this.title}</div>

    <div class="post-shell">
      <div class="media-frame">
        <div class="user-tag">${handle}</div>

        <div class="media-row">
          <div class="media-box">
            <button class="arrow left" @click=${this.prevSlide} aria-label="Previous slide">‹</button>

            <img
              class="slide-image"
              src="${item.image}"
              alt="${item.alt}"
              loading="lazy"
            />

            <button class="arrow right" @click=${this.nextSlide} aria-label="Next slide">›</button>

            <div class="dots">
              ${this.images.map((slide, index) => html`
                <div
                  class="dot ${index === this.activeIndex ? "active" : ""}"
                  @click=${() => this.goToSlide(index)}
                  aria-label="Go to slide ${index + 1}"
                ></div>
              `)}
            </div>
          </div>

          <div class="actions">
            <button class="action-button" @click=${this.toggleLike} aria-label="Like slide">
              ${this.isLiked(item) ? "❤️" : "🤍"}
            </button>
            <div>✈️</div>
          </div>
        </div>
      </div>

      <div class="caption">${handle}: ${item.description}</div>
      <div class="views">${item.views}</div>
      <div class="likes">${this.currentLikeCount(item)} Likes</div>

      <div class="source">
        ${item.source
          ? html`<a href="${item.source}" target="_blank" rel="noopener noreferrer">Original source</a>`
          : ""}
      </div>
    </div>
  </div>
</div>`;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(InstagramCard.tag, InstagramCard);