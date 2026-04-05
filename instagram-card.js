/**
 * Copyright 2026
 * @license Apache-2.0
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./instagram-slide.js";

export class InstagramCard extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "instagram-card";
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

  constructor() {
    super();
    this.title = "InvincibleGram";
    this.author = {};
    this.images = [];
    this.activeIndex = 0;
    this.loading = true;
    this.likesByImageId = {};
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-default-coalyGray, #262626);
          font-family: var(--ddd-font-navigation, Arial, sans-serif);
        }

        .page-wrap {
          padding: 16px;
        }

        .phone-card {
          width: 100%;
          max-width: 430px;
          margin: 0 auto;
          background: #ffffff;
          border: 1px solid #e4e5e7;
          border-radius: 18px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .app-bar {
          display: flex;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #e4e5e7;
        }

        .app-title {
          font-size: 22px;
          font-weight: 700;
          color: var(--ddd-theme-default-beaverBlue, #1e407c);
        }

        .post-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 16px;
        }

        .post-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .profile-image {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          object-fit: cover;
          border: 2px solid #e4e5e7;
          background: #ccdae6;
          flex-shrink: 0;
        }

        .author-text {
          min-width: 0;
        }

        .author-handle {
          font-size: 14px;
          font-weight: 700;
          color: #262626;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .author-channel {
          font-size: 12px;
          color: #5b6b7a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .menu-button {
          border: none;
          background: transparent;
          color: #262626;
          font-size: 24px;
          line-height: 1;
          cursor: pointer;
        }

        .media-wrap {
          position: relative;
          background: #f2f2f4;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }

        .arrow-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.9);
          color: #262626;
          font-size: 22px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .arrow-left {
          left: 12px;
        }

        .arrow-right {
          right: 12px;
        }

        .dot-row {
          position: absolute;
          left: 50%;
          bottom: 12px;
          transform: translateX(-50%);
          display: flex;
          gap: 2px;
          z-index: 2;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.82);
          max-width: calc(100% - 24px);
          overflow-x: auto;
        }

        .dot-button {
          width: 20px;
          height: 20px;
          border-radius: 999px;
          border: none;
          background: transparent;
          cursor: pointer;
          flex: 0 0 auto;
          padding: 0;
          position: relative;
        }

        .dot-button::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #a2aaad;
        }

        .dot-button.active::after {
          background: #1e407c;
        }

        .action-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 16px 8px;
        }

        .action-left {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .action-button {
          border: 1px solid #d9dde2;
          background: #ffffff;
          color: #262626;
          border-radius: 999px;
          padding: 8px 12px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .action-button.liked {
          border-color: #bc204b;
          color: #bc204b;
        }

        .meta-text {
          font-size: 12px;
          color: #5b6b7a;
        }

        .likes-text {
          padding: 0 16px 8px;
          font-size: 13px;
          font-weight: 700;
          color: #262626;
        }

        .caption {
          padding: 0 16px 8px;
          font-size: 14px;
          line-height: 1.45;
          color: #262626;
          word-break: break-word;
        }

        .caption-handle {
          font-weight: 700;
          margin-right: 4px;
        }

        .details-row {
          padding: 0 16px 8px;
          font-size: 12px;
          color: #5b6b7a;
        }

        .source-row {
          padding: 0 16px 16px;
        }

        .source-link {
          color: #005fa9;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
        }

        .source-link:hover {
          text-decoration: underline;
        }

        .loading-card,
        .empty-card {
          max-width: 430px;
          margin: 0 auto;
          padding: 24px;
          background: #ffffff;
          border: 1px solid #e4e5e7;
          border-radius: 18px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
          text-align: center;
        }

        @media (prefers-color-scheme: dark) {
          .phone-card,
          .loading-card,
          .empty-card {
            background: #151515;
            color: #f4f4f4;
            border-color: #333333;
          }

          .app-bar,
          .post-header {
            border-color: #333333;
          }

          .app-title,
          .source-link {
            color: #96bee6;
          }

          .author-handle,
          .likes-text,
          .caption,
          .menu-button {
            color: #f4f4f4;
          }

          .author-channel,
          .meta-text,
          .details-row {
            color: #c5cbd3;
          }

          .action-button {
            background: #1e1e1e;
            color: #f4f4f4;
            border-color: #444444;
          }

          .action-button.liked {
            color: #ff7d9b;
            border-color: #ff7d9b;
          }

          .media-wrap {
            background: #222222;
          }

          .arrow-button {
            background: rgba(0, 0, 0, 0.72);
            color: #f4f4f4;
          }

          .dot-row {
            background: rgba(0, 0, 0, 0.5);
          }

          .dot-button {
            background: #666666;
          }

          .dot-button.active {
            background: #96bee6;
          }

          .profile-image {
            border-color: #444444;
          }
        }

        @media (max-width: 480px) {
          .page-wrap {
            padding: 8px;
          }

          .app-bar {
            padding: 12px;
          }

          .post-header,
          .action-row,
          .likes-text,
          .caption,
          .details-row,
          .source-row {
            padding-left: 12px;
            padding-right: 12px;
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

  firstUpdated() {
    this.loadInstagramData();
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
      
      const response = await fetch("/api/instagram-data");

      if (!response.ok) {
        throw new Error(`Failed loading JSON data: ${response.status}`);
      }

      const data = await response.json();

      this.title = data.title || "InvincibleGram";
      this.author = data.author || {};
      this.images = Array.isArray(data.images) ? data.images : [];

      this.loadSavedLikesFromLocalStorage();
      this.setInitialSlideFromUrl();
    } catch (error) {
      console.error("Could not load instagram data:", error);
      this.images = [];
      this.author = {};
    }

    this.loading = false;
  }

  setInitialSlideFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const requestedIndex = Number(urlParams.get("activeIndex"));

    if (
      !Number.isNaN(requestedIndex) &&
      requestedIndex >= 0 &&
      requestedIndex < this.images.length
    ) {
      this.activeIndex = requestedIndex;
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

  currentImageItem() {
    return this.images[this.activeIndex] || null;
  }

  currentImageIsLiked(imageItem) {
    if (!imageItem) {
      return false;
    }
    return Boolean(this.likesByImageId[imageItem.id]);
  }

  currentDisplayedLikeCount(imageItem) {
    if (!imageItem) {
      return 0;
    }
    return imageItem.likes + (this.currentImageIsLiked(imageItem) ? 1 : 0);
  }

  toggleLikeForCurrentImage() {
    const imageItem = this.currentImageItem();

    if (!imageItem) {
      return;
    }

    this.likesByImageId = {
      ...this.likesByImageId,
      [imageItem.id]: !this.likesByImageId[imageItem.id],
    };

    this.saveLikesToLocalStorage();
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

  async shareCurrentImage() {
    const imageItem = this.currentImageItem();

    if (!imageItem) {
      return;
    }

    const shareUrl = `${window.location.origin}${window.location.pathname}?activeIndex=${this.activeIndex}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: imageItem.title,
          text: imageItem.description,
          url: shareUrl,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        window.alert("Link copied to clipboard.");
      } else {
        window.prompt("Copy this link:", shareUrl);
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  }

  render() {
    if (this.loading) {
      return html`
        <div class="page-wrap">
          <div class="loading-card">Loading images...</div>
        </div>
      `;
    }

    if (!this.images.length) {
      return html`
        <div class="page-wrap">
          <div class="empty-card">Unable to load images.</div>
        </div>
      `;
    }

    const imageItem = this.currentImageItem();
    const profileHandle = this.author.handle || "markgrayson17";
    const profileName = this.author.name || "Mark Grayson";
    const profileChannel = this.author.channel || "Invincible Official";
    const profileImage = this.author.image || "";
    const userSinceYear = this.author.userSince || "2026";

    return html`
      <div class="page-wrap">
        <div class="phone-card">
          <div class="app-bar">
            <div class="app-title">${this.title}</div>
          </div>

          <div class="post-header">
            <div class="post-header-left">
              <img
                class="profile-image"
                src="${profileImage}"
                alt="${profileName}"
                loading="eager"
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
              class="arrow-button arrow-left"
              @click=${this.goToPreviousSlide}
              aria-label="Previous slide"
            >
              ‹
            </button>

            <instagram-slide
              image="${imageItem.image}"
              alt="${imageItem.alt}"
            ></instagram-slide>

            <button
              class="arrow-button arrow-right"
              @click=${this.goToNextSlide}
              aria-label="Next slide"
            >
              ›
            </button>

            <div class="dot-row" aria-label="Slide indicators">
              ${this.images.map(
                (item, indexNumber) => html`
                  <button
                    class="dot-button ${indexNumber === this.activeIndex
                      ? "active"
                      : ""}"
                    @click=${() => this.goToSlideAtIndex(indexNumber)}
                    aria-label="Go to slide ${indexNumber + 1}"
                    title="${item.title}"
                  ></button>
                `
              )}
            </div>
          </div>

          <div class="action-row">
            <div class="action-left">
              <button
                class="action-button ${this.currentImageIsLiked(imageItem)
                  ? "liked"
                  : ""}"
                @click=${this.toggleLikeForCurrentImage}
                aria-label="Like current image"
              >
                ${this.currentImageIsLiked(imageItem) ? "Liked" : "Like"}
              </button>

              <button
                class="action-button"
                aria-label="Comment button placeholder"
              >
                Comment
              </button>

              <button
                class="action-button"
                @click=${this.shareCurrentImage}
                aria-label="Share current image"
              >
                Share
              </button>
            </div>

            <div class="meta-text">
              ${this.activeIndex + 1} / ${this.images.length}
            </div>
          </div>

          <div class="likes-text">
            ${this.currentDisplayedLikeCount(imageItem)} likes
          </div>

          <div class="caption">
            <span class="caption-handle">${profileHandle}</span>
            ${imageItem.description}
          </div>

          <div class="details-row">
            ${imageItem.views} · Taken ${imageItem.dateTaken} · User since
            ${userSinceYear}
          </div>

          <div class="source-row">
            <a
              class="source-link"
              href="${imageItem.source}"
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