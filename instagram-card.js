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
    this.title = "SomethingGram";
    this.author = {};
    this.images = [];
    this.activeIndex = 0;
    this.loading = true;
    this.likesByImageId = {};
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",2
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
      likesByImageId: { type: Object },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-default-coalyGray, #262626);
          font-family: var(--ddd-font-navigation);
        }

        .page-wrap {
          padding: var(--ddd-spacing-4);
        }

        .phone-card {
          width: 100%;
          max-width: 430px;
          margin: 0 auto;
          background: var(--ddd-theme-default-white, #ffffff);
          border: 1px solid var(--ddd-theme-default-limestoneLight, #e4e5e7);
          border-radius: var(--ddd-radius-lg);
          box-shadow: var(--ddd-boxShadow-sm);
          overflow: hidden;
        }

        .app-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--ddd-spacing-4);
          border-bottom: 1px solid var(--ddd-theme-default-limestoneLight, #e4e5e7);
        }

        .app-title {
          font-size: var(--ddd-font-size-l);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-beaverBlue, #1e407c);
        }

        .app-icons {
          display: flex;
          gap: var(--ddd-spacing-2);
          font-size: var(--ddd-icon-xs);
        }

        .post-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--ddd-spacing-3);
          padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
        }

        .post-header-left {
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-3);
          min-width: 0;
        }

        .profile-image {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          object-fit: cover;
          border: 2px solid var(--ddd-theme-default-limestoneLight, #e4e5e7);
          background: var(--ddd-theme-default-slateLight, #ccdae6);
          flex-shrink: 0;
        }

        .author-text {
          min-width: 0;
        }

        .author-handle {
          font-size: var(--ddd-font-size-s);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-coalyGray, #262626);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .author-channel {
          font-size: var(--ddd-font-size-xs);
          color: var(--ddd-theme-default-slateGray, #314d64);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .menu-button {
          border: none;
          background: transparent;
          font-size: var(--ddd-icon-xs);
          cursor: pointer;
          color: var(--ddd-theme-default-coalyGray, #262626);
        }

        .media-wrap {
          position: relative;
          background: var(--ddd-theme-default-limestoneMaxLight, #f2f2f4);
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }

        .arrow-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.9);
          color: var(--ddd-theme-default-coalyGray, #262626);
          font-size: 22px;
          cursor: pointer;
          box-shadow: var(--ddd-boxShadow-xs);
        }

        .arrow-button.left {
          left: var(--ddd-spacing-3);
        }

        .arrow-button.right {
          right: var(--ddd-spacing-3);
        }

        .dots {
          position: absolute;
          left: 50%;
          bottom: var(--ddd-spacing-3);
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 3;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.75);
          max-width: calc(100% - 24px);
          overflow-x: auto;
        }

        .dots::-webkit-scrollbar {
          height: 6px;
        }

        .dots::-webkit-scrollbar-thumb {
          background-color: var(--ddd-theme-default-beaverBlue, #1e407c);
          border-radius: 20px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: var(--ddd-theme-default-limestoneGray, #a2aaad);
          cursor: pointer;
          flex: 0 0 auto;
        }

        .dot.active {
          background: var(--ddd-theme-default-beaverBlue, #1e407c);
        }

        .action-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--ddd-spacing-3) var(--ddd-spacing-4) var(--ddd-spacing-2);
        }

        .action-row-left {
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-3);
        }

        .action-button {
          border: none;
          background: transparent;
          cursor: pointer;
          padding: 0;
          font-size: 28px;
          line-height: 1;
          color: var(--ddd-theme-default-coalyGray, #262626);
        }

        .action-button.liked {
          color: var(--ddd-theme-default-original87Pink, #bc204b);
        }

        .meta-text {
          padding: 0 var(--ddd-spacing-4) var(--ddd-spacing-2);
          font-size: var(--ddd-font-size-xs);
          color: var(--ddd-theme-default-slateGray, #314d64);
        }

        .likes-text,
        .views-text {
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-coalyGray, #262626);
        }

        .caption {
          padding: 0 var(--ddd-spacing-4) var(--ddd-spacing-2);
          font-size: var(--ddd-font-size-s);
          line-height: 1.4;
          word-break: break-word;
        }

        .caption-handle {
          font-weight: var(--ddd-font-weight-bold);
          margin-right: 4px;
        }

        .date-row,
        .source-row {
          padding: 0 var(--ddd-spacing-4) var(--ddd-spacing-2);
          font-size: var(--ddd-font-size-xs);
          color: var(--ddd-theme-default-slateGray, #314d64);
        }

        .source-link {
          color: var(--ddd-theme-default-link, #005fa9);
          text-decoration: none;
          font-weight: var(--ddd-font-weight-bold);
        }

        .source-link:hover {
          text-decoration: underline;
        }

        .loading,
        .empty {
          max-width: 430px;
          margin: 0 auto;
          padding: var(--ddd-spacing-6);
          background: var(--ddd-theme-default-white, #ffffff);
          border: 1px solid var(--ddd-theme-default-limestoneLight, #e4e5e7);
          border-radius: var(--ddd-radius-lg);
          box-shadow: var(--ddd-boxShadow-sm);
          text-align: center;
        }

        @media (prefers-color-scheme: dark) {
          .phone-card,
          .loading,
          .empty {
            background: #151515;
            color: #f4f4f4;
            border-color: #333;
          }

          .app-bar,
          .post-header {
            border-color: #333;
          }

          .app-title,
          .source-link {
            color: var(--ddd-theme-default-pughBlue, #96bee6);
          }

          .author-handle,
          .likes-text,
          .views-text,
          .caption,
          .action-button,
          .menu-button {
            color: #f4f4f4;
          }

          .author-channel,
          .meta-text,
          .date-row,
          .source-row {
            color: #bfc7d1;
          }

          .media-wrap {
            background: #222;
          }

          .arrow-button {
            background: rgba(0, 0, 0, 0.7);
            color: #f4f4f4;
          }

          .dots {
            background: rgba(0, 0, 0, 0.55);
          }

          .dot {
            background: #666;
          }

          .dot.active {
            background: var(--ddd-theme-default-pughBlue, #96bee6);
          }

          .profile-image {
            border-color: #444;
          }
        }

        @media (max-width: 480px) {
          .page-wrap {
            padding: var(--ddd-spacing-2);
          }

          .phone-card {
            border-radius: 16px;
          }

          .app-bar {
            padding: var(--ddd-spacing-3);
          }

          .post-header,
          .action-row,
          .caption,
          .meta-text,
          .date-row,
          .source-row {
            padding-left: var(--ddd-spacing-3);
            padding-right: var(--ddd-spacing-3);
          }

          .author-handle {
            font-size: 14px;
          }

          .author-channel {
            font-size: 12px;
          }

          .action-button {
            font-size: 24px;
          }

          .arrow-button {
            width: 36px;
            height: 36px;
            font-size: 20px;
          }

          .profile-image {
            width: 40px;
            height: 40px;
          }
        }
      `,
    ];
  }

  async firstUpdated() {
    await this.loadInstagramData();
  }

  updated(changedProperties) {
    if (changedProperties.has("activeIndex") && this.images.length) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("activeIndex", this.activeIndex);
      window.history.replaceState({}, "", currentUrl);
    }
  }

  async loadInstagramData() {
    this.loading = true;

    try {
      const response = await fetch(
        new URL("./instagram-data.json", import.meta.url).href
      );
      const loadedData = await response.json();
      this.title = loadedData.title || "SomethingGram";
      this.author = loadedData.author || {};
      this.images = Array.isArray(loadedData.images) ? loadedData.images : [];
      this.loadSavedLikesFromLocalStorage();
      this.setInitialSlideFromUrl();
    } catch (error) {
      this.images = [];
      this.author = {};
    }

    this.loading = false;
  }

  setInitialSlideFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const initialIndexFromUrl = Number(urlParams.get("activeIndex"));

    if (
      !Number.isNaN(initialIndexFromUrl) &&
      initialIndexFromUrl >= 0 &&
      initialIndexFromUrl < this.images.length
    ) {
      this.activeIndex = initialIndexFromUrl;
    } else {
      this.activeIndex = 0;
    }
  }

  loadSavedLikesFromLocalStorage() {
    const storedLikes = window.localStorage.getItem("instagram-card-likes");
    this.likesByImageId = storedLikes ? JSON.parse(storedLikes) : {};
  }

  saveLikesToLocalStorage() {
    window.localStorage.setItem(
      "instagram-card-likes",
      JSON.stringify(this.likesByImageId)
    );
  }

  toggleLikeForCurrentImage() {
    const currentImageItem = this.images[this.activeIndex];

    if (!currentImageItem) {
      return;
    }

    this.likesByImageId = {
      ...this.likesByImageId,
      [currentImageItem.id]: !this.likesByImageId[currentImageItem.id],
    };

    this.saveLikesToLocalStorage();
  }

  currentImageIsLiked(currentImageItem) {
    return Boolean(this.likesByImageId[currentImageItem.id]);
  }

  currentDisplayedLikeCount(currentImageItem) {
    return currentImageItem.likes + (this.currentImageIsLiked(currentImageItem) ? 1 : 0);
  }

  goToNextSlide() {
    if (!this.images.length) {
      return;
    }

    this.activeIndex = (this.activeIndex + 1) % this.images.length;
  }

  goToPreviousSlide() {
    if (!this.images.length) {
      return;
    }

    this.activeIndex =
      (this.activeIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlideAtIndex(indexNumber) {
    this.activeIndex = indexNumber;
  }

  shareCurrentImage() {
    const currentImageItem = this.images[this.activeIndex];
    const shareUrl = `${window.location.origin}${window.location.pathname}?activeIndex=${this.activeIndex}`;

    if (navigator.share) {
      navigator.share({
        title: currentImageItem.title,
        text: currentImageItem.description,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      window.alert("Link copied to clipboard");
    }
  }

  render() {
    if (this.loading) {
      return html`
        <div class="page-wrap">
          <div class="loading">Loading images...</div>
        </div>
      `;
    }

    if (!this.images.length) {
      return html`
        <div class="page-wrap">
          <div class="empty">Unable to load images.</div>
        </div>
      `;
    }

    const currentImageItem = this.images[this.activeIndex];
    const profileHandle = this.author.handle || "Jakebutler22";
    const profileName = this.author.name || "Jake Butler";
    const profileChannel = this.author.channel || "SomethingGram";
    const profileImage = this.author.image || "";
    const userSinceYear = this.author.userSince || "";

    return html`
      <div class="page-wrap">
        <div class="phone-card">
          <div class="app-bar">
            <div class="app-title">${this.title}</div>
            <div class="app-icons">✚ ✉️</div>
          </div>

          <div class="post-header">
            <div class="post-header-left">
              <img
                class="profile-image"
                src="${profileImage}"
                alt="${profileName}"
                loading="lazy"
              />
              <div class="author-text">
                <div class="author-handle">${profileHandle}</div>
                <div class="author-channel">${profileChannel}</div>
              </div>
            </div>
            <button class="menu-button" aria-label="Post options">⋯</button>
          </div>

          <div class="media-wrap">
            <button
              class="arrow-button left"
              @click=${this.goToPreviousSlide}
              aria-label="Previous slide"
            >
              ‹
            </button>

            <instagram-slide
              image="${currentImageItem.image}"
              alt="${currentImageItem.alt}"
            ></instagram-slide>

            <button
              class="arrow-button right"
              @click=${this.goToNextSlide}
              aria-label="Next slide"
            >
              ›
            </button>

            <div class="dots">
              ${this.images.map(
                (imageItem, indexNumber) => html`
                  <div
                    class="dot ${indexNumber === this.activeIndex ? "active" : ""}"
                    @click=${() => this.goToSlideAtIndex(indexNumber)}
                    aria-label="Go to slide ${indexNumber + 1}"
                    title="${imageItem.title}"
                  ></div>
                `
              )}
            </div>
          </div>

          <div class="action-row">
            <div class="action-row-left">
              <button
                class="action-button ${this.currentImageIsLiked(currentImageItem) ? "liked" : ""}"
                @click=${this.toggleLikeForCurrentImage}
                aria-label="Like image"
              >
                ${this.currentImageIsLiked(currentImageItem) ? "♥" : "♡"}
              </button>

              <button class="action-button" aria-label="Comment on image">
                💬
              </button>

              <button
                class="action-button"
                @click=${this.shareCurrentImage}
                aria-label="Share image"
              >
                ✈
              </button>
            </div>

            <div class="meta-text">${this.activeIndex + 1} / ${this.images.length}</div>
          </div>

          <div class="meta-text likes-text">
            ${this.currentDisplayedLikeCount(currentImageItem)} likes
          </div>

          <div class="caption">
            <span class="caption-handle">${profileHandle}</span>
            ${currentImageItem.description}
          </div>

          <div class="meta-text views-text">
            ${currentImageItem.views}
          </div>

          <div class="date-row">
            Taken: ${currentImageItem.dateTaken} · User since ${userSinceYear}
          </div>

          <div class="source-row">
            <a
              class="source-link"
              href="${currentImageItem.source}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open original source
            </a>
          </div>
        </div>
      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(InstagramCard.tag, InstagramCard);