/**
 * Copyright 2026 Jake Butler
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./dot-indicators.js";

/**
 * `instagram-card`
 * Instagram-style photo gallery card that fetches from /api/posts
 *
 * @demo index.html
 * @element instagram-card
 */
export class InstagramCard extends DDDSuper(LitElement) {
  static get tag() {
    return "instagram-card";
  }

  static get properties() {
    return {
      ...super.properties,
      posts: { type: Array },
      authors: { type: Array },
      currentIndex: { type: Number },
      loading: { type: Boolean },
      error: { type: String },
    };
  }

  constructor() {
    super();
    this.posts = [];
    this.authors = [];
    this.currentIndex = 0;
    this.loading = false;
    this.error = "";
    this._touchStartX = undefined;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("popstate", this._handlePopState);
    this.loadData();
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this._handlePopState);
    super.disconnectedCallback();
  }

  _handlePopState = () => {
    if (!this.posts?.length) return;
    const params = new URLSearchParams(window.location.search);
    const index = Number(params.get("activeIndex"));
    if (!Number.isNaN(index)) {
      this.currentIndex = Math.max(0, Math.min(index - 1, this.posts.length - 1));
    }
  };

  _updateRoute() {
    const url = new URL(window.location.href);
    url.searchParams.set("activeIndex", this.currentIndex + 1);
    window.history.replaceState({}, "", url);
  }

  _loadIndexFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const index = Number(params.get("activeIndex"));
    if (!Number.isNaN(index) && this.posts?.length) {
      this.currentIndex = Math.max(0, Math.min(index - 1, this.posts.length - 1));
    } else {
      this.currentIndex = 0;
    }
    const post = this.posts?.[this.currentIndex];
    if (post) {
      post.liked = localStorage.getItem("liked-" + post.postID) === "true";
    }
  }

  async loadData() {
    this.loading = true;
    this.error = "";
    try {
      const response = await fetch("/api/posts");
      if (!response.ok) throw new Error("Failed to load data");
      const data = await response.json();
      this.posts = data.posts || [];
      this.authors = data.authors || [];
      this._loadIndexFromUrl();
    } catch (e) {
      this.error = "Could not load images.";
      this.posts = [];
      this.authors = [];
      console.error(e);
    }
    this.loading = false;
  }

  _previousImage() {
    if (!this.posts?.length) return;
    this.currentIndex = (this.currentIndex - 1 + this.posts.length) % this.posts.length;
    this._updateRoute();
  }

  _nextImage() {
    if (!this.posts?.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.posts.length;
    this._updateRoute();
  }

  _setImage(index) {
    if (!this.posts?.length) return;
    this.currentIndex = index;
    this._updateRoute();
  }

  toggleLike() {
    const post = this.posts?.[this.currentIndex];
    if (!post) return;
    post.liked = !post.liked;
    localStorage.setItem("liked-" + post.postID, post.liked ? "true" : "false");
    this.requestUpdate();
  }

  updated(changedProperties) {
    if (changedProperties.has("currentIndex")) {
      const post = this.posts?.[this.currentIndex];
      if (!post) return;
      post.liked = localStorage.getItem("liked-" + post.postID) === "true";
    }
  }

  sharePost() {
    const post = this.posts?.[this.currentIndex];
    if (!post) return;
    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.set("activeIndex", this.currentIndex + 1);
    if (navigator.share) {
      navigator.share({ title: post.title, text: post.caption, url: shareUrl.toString() });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl.toString());
      alert("Link copied to clipboard");
    } else {
      alert(shareUrl.toString());
    }
  }

  _onPointerDown(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    this._touchStartX = event.clientX;
  }

  _onPointerUp(event) {
    if (typeof this._touchStartX !== "number") return;
    const delta = event.clientX - this._touchStartX;
    if (Math.abs(delta) > 40) {
      delta < 0 ? this._nextImage() : this._previousImage();
    }
    this._touchStartX = undefined;
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
          padding: var(--ddd-spacing-4);
          border-bottom: 1px solid var(--ddd-theme-default-limestoneLight, #e4e5e7);
        }

        .app-title {
          font-size: var(--ddd-font-size-l);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-beaverBlue, #1e407c);
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

        .author-text { min-width: 0; }

        .author-name-row {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .author-handle {
          font-size: var(--ddd-font-size-s);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-coalyGray, #262626);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .verified-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          background: #3897f0;
          border-radius: 999px;
          color: white;
          font-size: 10px;
          font-weight: bold;
          flex-shrink: 0;
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

        .media-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .controls {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          padding: 0 var(--ddd-spacing-3);
          box-sizing: border-box;
          pointer-events: none;
        }

        .arrow-button {
          pointer-events: all;
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

        .action-button.liked { color: var(--ddd-theme-default-original87Pink, #bc204b); }

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

        .loading-state,
        .error-state {
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
          .phone-card, .loading-state, .error-state {
            background: #151515;
            color: #f4f4f4;
            border-color: #333;
          }
          .app-bar, .post-header { border-color: #333; }
          .app-title { color: var(--ddd-theme-default-pughBlue, #96bee6); }
          .author-handle, .likes-text, .views-text,
          .caption, .action-button, .menu-button { color: #f4f4f4; }
          .author-channel, .meta-text, .date-row { color: #bfc7d1; }
          .media-wrap { background: #222; }
          .arrow-button { background: rgba(0, 0, 0, 0.7); color: #f4f4f4; }
          .profile-image { border-color: #444; }
        }

        @media (max-width: 480px) {
          .page-wrap { padding: var(--ddd-spacing-2); }
          .phone-card { border-radius: 16px; }
          .app-bar { padding: var(--ddd-spacing-3); }
          .post-header, .action-row, .caption,
          .meta-text, .date-row {
            padding-left: var(--ddd-spacing-3);
            padding-right: var(--ddd-spacing-3);
          }
          .author-handle { font-size: 14px; }
          .author-channel { font-size: 12px; }
          .action-button { font-size: 24px; }
          .arrow-button { width: 36px; height: 36px; font-size: 20px; }
          .profile-image { width: 40px; height: 40px; }
        }
      `,
    ];
  }

  render() {
    if (this.loading) {
      return html`<div class="page-wrap"><div class="loading-state">Loading images...</div></div>`;
    }

    if (this.error) {
      return html`<div class="page-wrap"><div class="error-state">${this.error}</div></div>`;
    }

    const post = this.posts?.[this.currentIndex];
    const author = this.authors?.find((a) => a.authorID === post?.authorID);

    if (!post || !author) {
      return html`<div class="page-wrap"><div class="error-state">No posts found.</div></div>`;
    }

    const likeCount = post.likes + (post.liked ? 1 : 0);

    return html`
      <div class="page-wrap">
        <div class="phone-card">

          <div class="app-bar">
            <div class="app-title">InvincibleGram</div>
          </div>

          <div class="post-header">
            <div class="post-header-left">
              <img
                class="profile-image"
                src="${author.profileImg}"
                alt="${author.username} profile picture"
                loading="lazy"
              />
              <div class="author-text">
                <div class="author-name-row">
                  <span class="author-handle">${author.username}</span>
                  <span class="verified-badge" title="Verified">✓</span>
                </div>
                <div class="author-channel">
                  ${author.channel} · User since ${author.userSince}
                </div>
              </div>
            </div>
            <button class="menu-button" aria-label="Post options">⋯</button>
          </div>

          <div
            class="media-wrap"
            @pointerdown="${this._onPointerDown}"
            @pointerup="${this._onPointerUp}"
          >
            <img
              src="${post.image}"
              alt="${post.alt}"
              loading="lazy"
              fetchpriority="high"
            />
            <div class="controls">
              <button
                class="arrow-button"
                @click="${this._previousImage}"
                title="Previous slide"
                aria-label="Previous slide"
              >‹</button>
              <button
                class="arrow-button"
                @click="${this._nextImage}"
                title="Next slide"
                aria-label="Next slide"
              >›</button>
            </div>
          </div>

          <dot-indicators
            .count="${this.posts.length}"
            .current="${this.currentIndex}"
            @dot-click="${(e) => this._setImage(e.detail)}"
          ></dot-indicators>

          <div class="action-row">
            <div class="action-row-left">
              <button
                class="action-button ${post.liked ? "liked" : ""}"
                @click="${this.toggleLike}"
                aria-label="Like post"
              >
                ${post.liked ? "❤️" : "🤍"}
              </button>
              <button class="action-button" aria-label="Comment">💬</button>
              <button
                class="action-button"
                @click="${this.sharePost}"
                aria-label="Share post"
              >✈️</button>
            </div>
            <div class="meta-text">${this.currentIndex + 1} / ${this.posts.length}</div>
          </div>

          <div class="meta-text likes-text">${likeCount} likes</div>

          <div class="caption">
            <span class="caption-handle">${author.username}</span>
            ${post.caption}
          </div>

          <div class="meta-text views-text">${post.views}</div>

          <div class="date-row">Taken: ${post.dateTaken}</div>

        </div>
      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(InstagramCard.tag, InstagramCard);