/**
 * Copyright 2026 Jake Butler
 * @license Apache-2
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./instagram-slide.js";

const instagramPostData = {
  title: "InvincibleGram",
  author: {
    name: "Mark Grayson",
    handle: "markgrayson17",
    image:
      "https://i.pinimg.com/736x/82/f1/63/82f163dcb5de22326d3c89a9b1b4b772.jpg",
    userSince: "2026",
    channel: "Invincible Official",
  },
  images: [
    {
      id: "inv-1",
      title: "Almost Killed Cecil",
      description: "This was like the fourth time I almost killed Cecil.",
      alt: "Invincible standing over Cecil in a tense confrontation",
      image:
        "https://4kwallpapers.com/images/wallpapers/invincible-season-3-2048x2048-20175.png",
      thumbnail:
        "https://4kwallpapers.com/images/wallpapers/invincible-season-3-2048x2048-20175.png",
      full: "https://4kwallpapers.com/images/wallpapers/invincible-season-3-2048x2048-20175.png",
      source: "https://www.amazon.com/invincible",
      dateTaken: "2026-01-01",
      views: "256 views",
      likes: 31,
    },
    {
      id: "inv-2",
      title: "Aura Farming",
      description: "Chicago was obliterated but im aura farming.",
      alt: "Invincible posing heroically with a destroyed city behind him",
      image: "https://images.alphacoders.com/114/1140274.jpg",
      thumbnail: "https://images.alphacoders.com/114/1140274.jpg",
      full: "https://images.alphacoders.com/114/1140274.jpg",
      source: "https://www.amazon.com/invincible",
      dateTaken: "2026-01-02",
      views: "256 views",
      likes: 31,
    },
    {
      id: "inv-3",
      title: "Before Reanimen",
      description: "Me before I destroy reanimen.",
      alt: "Invincible ready for battle in his blue and yellow suit",
      image:
        "https://c4.wallpaperflare.com/wallpaper/728/77/205/invincible-mark-grayson-invincible-superhero-hd-wallpaper-preview.jpg",
      thumbnail:
        "https://c4.wallpaperflare.com/wallpaper/728/77/205/invincible-mark-grayson-invincible-superhero-hd-wallpaper-preview.jpg",
      full: "https://c4.wallpaperflare.com/wallpaper/728/77/205/invincible-mark-grayson-invincible-superhero-hd-wallpaper-preview.jpg",
      source: "https://www.amazon.com/invincible",
      dateTaken: "2026-01-03",
      views: "256 views",
      likes: 31,
    },
    {
      id: "inv-4",
      title: "Invincible War",
      description: "The start of the invincible war #notcoolbro",
      alt: "Multiple versions of Invincible facing off during the Invincible War",
      image:
        "https://static0.colliderimages.com/wordpress/wp-content/uploads/2025/03/invincible-season-3-mark-multiverse.jpg?w=1200&h=900&fit=crop",
      thumbnail:
        "https://static0.colliderimages.com/wordpress/wp-content/uploads/2025/03/invincible-season-3-mark-multiverse.jpg?w=1200&h=900&fit=crop",
      full: "https://static0.colliderimages.com/wordpress/wp-content/uploads/2025/03/invincible-season-3-mark-multiverse.jpg?w=1200&h=900&fit=crop",
      source: "https://www.amazon.com/invincible",
      dateTaken: "2026-01-04",
      views: "256 views",
      likes: 31,
    },
    {
      id: "inv-5",
      title: "Beautiful Day",
      description: "Smilin on a beautiful day",
      alt: "Mark Grayson smiling in his Invincible costume",
      image:
        "https://i.pinimg.com/736x/82/f1/63/82f163dcb5de22326d3c89a9b1b4b772.jpg",
      thumbnail:
        "https://i.pinimg.com/736x/82/f1/63/82f163dcb5de22326d3c89a9b1b4b772.jpg",
      full: "https://i.pinimg.com/736x/82/f1/63/82f163dcb5de22326d3c89a9b1b4b772.jpg",
      source: "https://www.amazon.com/invincible",
      dateTaken: "2026-01-05",
      views: "256 views",
      likes: 31,
    },
    {
      id: "inv-6",
      title: "Handsome and Wealthy",
      description: "Handsome and Wealthy - Migos.",
      alt: "Invincible looking confident in full costume",
      image:
        "https://i.pinimg.com/736x/26/9b/05/269b052619e530b5d7f2cfe193c4fdf7.jpg",
      thumbnail:
        "https://i.pinimg.com/736x/26/9b/05/269b052619e530b5d7f2cfe193c4fdf7.jpg",
      full: "https://i.pinimg.com/736x/26/9b/05/269b052619e530b5d7f2cfe193c4fdf7.jpg",
      source: "https://www.amazon.com/invincible",
      dateTaken: "2026-01-06",
      views: "256 views",
      likes: 31,
    },
    {
      id: "inv-7",
      title: "Who I Saw In Space",
      description: "Cecil you would not believe who I saw in space...",
      alt: "Invincible and Conquest facing off in an intense battle",
      image:
        "https://www.dexerto.com/cdn-image/wp-content/uploads/2026/04/02/Does-Mark-survive-Invincible-vs-Conquest-2-Comics-reveal-fate-after-S4E5-explained.jpg?width=1200&quality=75&format=auto",
      thumbnail:
        "https://www.dexerto.com/cdn-image/wp-content/uploads/2026/04/02/Does-Mark-survive-Invincible-vs-Conquest-2-Comics-reveal-fate-after-S4E5-explained.jpg?width=1200&quality=75&format=auto",
      full: "https://www.dexerto.com/cdn-image/wp-content/uploads/2026/04/02/Does-Mark-survive-Invincible-vs-Conquest-2-Comics-reveal-fate-after-S4E5-explained.jpg?width=1200&quality=75&format=auto",
      source: "https://www.amazon.com/invincible",
      dateTaken: "2026-01-07",
      views: "256 views",
      likes: 31,
    },
    {
      id: "inv-8",
      title: "For My Mom",
      description: "Took these for my mom.",
      alt: "Invincible mid-flight over the city",
      image:
        "https://images2.minutemediacdn.com/image/upload/c_fill,w_1200,ar_1:1,f_auto,q_auto,g_auto/images/ImageExchange/mmsport/385/01jec3s056171qbvv6d6.jpg",
      thumbnail:
        "https://images2.minutemediacdn.com/image/upload/c_fill,w_1200,ar_1:1,f_auto,q_auto,g_auto/images/ImageExchange/mmsport/385/01jec3s056171qbvv6d6.jpg",
      full: "https://images2.minutemediacdn.com/image/upload/c_fill,w_1200,ar_1:1,f_auto,q_auto,g_auto/images/ImageExchange/mmsport/385/01jec3s056171qbvv6d6.jpg",
      source: "https://www.amazon.com/invincible",
      dateTaken: "2026-01-08",
      views: "256 views",
      likes: 31,
    },
    {
      id: "inv-9",
      title: "Saving Dad",
      description: "Conquest about to squeeze my dads head off until I stepped in.",
      alt: "Conquest grabbing Omni-Man while Invincible intervenes",
      image: "https://i.ytimg.com/vi/yYvkXGgTdfE/sddefault.jpg",
      thumbnail: "https://i.ytimg.com/vi/yYvkXGgTdfE/sddefault.jpg",
      full: "https://i.ytimg.com/vi/yYvkXGgTdfE/sddefault.jpg",
      source: "https://www.amazon.com/invincible",
      dateTaken: "2026-01-09",
      views: "256 views",
      likes: 31,
    },
    {
      id: "inv-10",
      title: "Worst Day Ever",
      description: "#worstdayever",
      alt: "Invincible beaten and battered after a brutal fight",
      image: "https://i.redd.it/y8crj0fz6sfb1.jpg",
      thumbnail: "https://i.redd.it/y8crj0fz6sfb1.jpg",
      full: "https://i.redd.it/y8crj0fz6sfb1.jpg",
      source: "https://www.amazon.com/invincible",
      dateTaken: "2026-01-10",
      views: "256 views",
      likes: 31,
    },
    {
      id: "inv-11",
      title: "Dad Is Back",
      description: "My dad just showed back up with seth rogan.",
      alt: "Omni-Man returning alongside a familiar face",
      image:
        "https://www.absolutegeeks.com/wp-content/uploads/2026/04/first-clip-from-s4-episode-5-v0-dzg0ZHByZDVlN3NnMdoNIpYArfRzKYHAiyXKBCv70J-_LyK0MPAzUDgTLICN.png.webp",
      thumbnail:
        "https://www.absolutegeeks.com/wp-content/uploads/2026/04/first-clip-from-s4-episode-5-v0-dzg0ZHByZDVlN3NnMdoNIpYArfRzKYHAiyXKBCv70J-_LyK0MPAzUDgTLICN.png.webp",
      full: "https://www.absolutegeeks.com/wp-content/uploads/2026/04/first-clip-from-s4-episode-5-v0-dzg0ZHByZDVlN3NnMdoNIpYArfRzKYHAiyXKBCv70J-_LyK0MPAzUDgTLICN.png.webp",
      source: "https://www.amazon.com/invincible",
      dateTaken: "2026-01-11",
      views: "256 views",
      likes: 31,
    },
    {
      id: "inv-12",
      title: "Monday Workout",
      description: "Benching the weight of the moon on a monday",
      alt: "Invincible training and lifting an enormous amount of weight",
      image:
        "https://preview.redd.it/how-big-of-a-role-do-yall-think-cecils-training-played-in-v0-h0qmpr9g8koe1.jpeg?width=640&crop=smart&auto=webp&s=a2a490587a631246c5412e66b964835fe9d9d230",
      thumbnail:
        "https://preview.redd.it/how-big-of-a-role-do-yall-think-cecils-training-played-in-v0-h0qmpr9g8koe1.jpeg?width=640&crop=smart&auto=webp&s=a2a490587a631246c5412e66b964835fe9d9d230",
      full: "https://preview.redd.it/how-big-of-a-role-do-yall-think-cecils-training-played-in-v0-h0qmpr9g8koe1.jpeg?width=640&crop=smart&auto=webp&s=a2a490587a631246c5412e66b964835fe9d9d230",
      source: "https://www.amazon.com/invincible",
      dateTaken: "2026-01-12",
      views: "256 views",
      likes: 31,
    },
    {
      id: "inv-13",
      title: "Still Have You Dad",
      description: "I'd still have you, dad.",
      alt: "Mark Grayson and Omni-Man sharing a quiet moment together",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6mahPXG8DzTq2wOcvMwxUa68QYkSTnjVUqA&s",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6mahPXG8DzTq2wOcvMwxUa68QYkSTnjVUqA&s",
      full: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6mahPXG8DzTq2wOcvMwxUa68QYkSTnjVUqA&s",
      source: "https://www.amazon.com/invincible",
      dateTaken: "2026-01-13",
      views: "256 views",
      likes: 31,
    },
    {
      id: "inv-14",
      title: "Tearing Up Flaxus",
      description: "My dad tearing up flaxus.",
      alt: "Omni-Man unleashing his full power on the planet Flaxus",
      image: "https://i.ytimg.com/vi/1v9C45OP_8w/maxresdefault.jpg",
      thumbnail: "https://i.ytimg.com/vi/1v9C45OP_8w/maxresdefault.jpg",
      full: "https://i.ytimg.com/vi/1v9C45OP_8w/maxresdefault.jpg",
      source: "https://www.amazon.com/invincible",
      dateTaken: "2026-01-14",
      views: "256 views",
      likes: 31,
    },
    {
      id: "inv-15",
      title: "Bailing Out Oliver",
      description: "Oliver before I bailed him out for the 20th time",
      alt: "Invincible rescuing his younger brother Oliver from a dangerous situation",
      image:
        "https://preview.redd.it/this-conquest-frame-hits-different-v0-knxbu1c0ijsg1.png?width=640&crop=smart&auto=webp&s=13f31bff692d3d96a6a22df571a2b2d54fd0bf51",
      thumbnail:
        "https://preview.redd.it/this-conquest-frame-hits-different-v0-knxbu1c0ijsg1.png?width=640&crop=smart&auto=webp&s=13f31bff692d3d96a6a22df571a2b2d54fd0bf51",
      full: "https://preview.redd.it/this-conquest-frame-hits-different-v0-knxbu1c0ijsg1.png?width=640&crop=smart&auto=webp&s=13f31bff692d3d96a6a22df571a2b2d54fd0bf51",
      source: "https://www.amazon.com/invincible",
      dateTaken: "2026-01-15",
      views: "256 views",
      likes: 31,
    },
  ],
};

export class InstagramCard extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "instagram-card";
  }

  constructor() {
    super();
    this.title = "InvincibleGram";
    this.author = {};
    this.images = [];
    this.activeIndex = 0;
    this.loading = true;
    this.likesByImageId = {};
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
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
          font-family: var(--ddd-font-navigation, Arial, sans-serif);
        }

        .page-wrap {
          padding: var(--ddd-spacing-4, 16px);
        }

        .phone-card {
          width: 100%;
          max-width: 430px;
          margin: 0 auto;
          background: var(--ddd-theme-default-white, #ffffff);
          border: 1px solid var(--ddd-theme-default-limestoneLight, #e4e5e7);
          border-radius: 16px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .app-bar {
          display: flex;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid var(--ddd-theme-default-limestoneLight, #e4e5e7);
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
          border: 2px solid var(--ddd-theme-default-limestoneLight, #e4e5e7);
          background: #ccdae6;
          flex-shrink: 0;
        }

        .author-text {
          min-width: 0;
        }

        .verified-row {
          display: flex;
          align-items: center;
          gap: 4px;
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

        .author-handle {
          font-size: 14px;
          font-weight: 700;
          color: var(--ddd-theme-default-coalyGray, #262626);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .author-channel {
          font-size: 12px;
          color: var(--ddd-theme-default-slateGray, #314d64);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .menu-button {
          border: none;
          background: transparent;
          font-size: 24px;
          cursor: pointer;
          color: var(--ddd-theme-default-coalyGray, #262626);
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
          z-index: 3;
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

        .arrow-button.left {
          left: 12px;
        }

        .arrow-button.right {
          right: 12px;
        }

        .dots {
          position: absolute;
          left: 50%;
          bottom: 12px;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 3;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.78);
          max-width: calc(100% - 24px);
          overflow-x: auto;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #a2aaad;
          cursor: pointer;
          flex: 0 0 auto;
          border: none;
          padding: 0;
        }

        .dot.active {
          background: #1e407c;
        }

        .action-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px 8px;
        }

        .action-row-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .action-button {
          border: none;
          background: transparent;
          cursor: pointer;
          padding: 0;
          font-size: 28px;
          line-height: 1;
          color: #262626;
        }

        .action-button.liked {
          color: #bc204b;
        }

        .meta-text {
          padding: 0 16px 8px;
          font-size: 12px;
          color: #314d64;
        }

        .likes-text,
        .views-text {
          font-weight: 700;
          color: #262626;
        }

        .caption {
          padding: 0 16px 8px;
          font-size: 14px;
          line-height: 1.4;
          word-break: break-word;
        }

        .caption-handle {
          font-weight: 700;
          margin-right: 4px;
        }

        .date-row,
        .source-row {
          padding: 0 16px 8px;
          font-size: 12px;
          color: #314d64;
        }

        .source-link {
          color: #005fa9;
          text-decoration: none;
          font-weight: 700;
        }

        .source-link:hover {
          text-decoration: underline;
        }

        .loading,
        .empty {
          max-width: 430px;
          margin: 0 auto;
          padding: 24px;
          background: #ffffff;
          border: 1px solid #e4e5e7;
          border-radius: 16px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
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
            color: #96bee6;
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
            background: #96bee6;
          }

          .profile-image {
            border-color: #444;
          }
        }

        @media (max-width: 480px) {
          .page-wrap {
            padding: 8px;
          }

          .phone-card {
            border-radius: 16px;
          }

          .app-bar {
            padding: 12px;
          }

          .post-header,
          .action-row,
          .caption,
          .meta-text,
          .date-row,
          .source-row {
            padding-left: 12px;
            padding-right: 12px;
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
      throw new Error("Failed loading API data");
    }

    const data = await response.json();

    this.title = data.title;
    this.author = data.author;
    this.images = data.images;

    this.loadSavedLikesFromLocalStorage();
    this.setInitialSlideFromUrl();
  } catch (error) {
    console.error(error);
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
    return (
      currentImageItem.likes +
      (this.currentImageIsLiked(currentImageItem) ? 1 : 0)
    );
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

    if (!currentImageItem) {
      return;
    }

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
    const profileChannel = this.author.channel || "InvincibleGram";
    const profileImage = this.author.image || "";
    const userSinceYear = this.author.userSince || "";

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
                loading="lazy"
              />
              <div class="author-text">
                <div class="verified-row">
                  <span class="author-handle">${profileHandle}</span>
                  <span class="verified-badge" title="Verified">✓</span>
                </div>
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
                  <button
                    class="dot ${indexNumber === this.activeIndex ? "active" : ""}"
                    @click=${() => this.goToSlideAtIndex(indexNumber)}
                    aria-label="Go to slide ${indexNumber + 1}"
                    title="${imageItem.title}"
                  ></button>
                `
              )}
            </div>
          </div>

          <div class="action-row">
            <div class="action-row-left">
              <button
                class="action-button ${this.currentImageIsLiked(currentImageItem)
                  ? "liked"
                  : ""}"
                @click=${this.toggleLikeForCurrentImage}
                aria-label="Like image"
              >
                ${this.currentImageIsLiked(currentImageItem) ? "❤️" : "🤍"}
              </button>

              <button class="action-button" aria-label="Comment on image">
                💬
              </button>

              <button
                class="action-button"
                @click=${this.shareCurrentImage}
                aria-label="Share image"
              >
                ✈️
              </button>
            </div>

            <div class="meta-text">
              ${this.activeIndex + 1} / ${this.images.length}
            </div>
          </div>

          <div class="meta-text likes-text">
            ${this.currentDisplayedLikeCount(currentImageItem)} likes
          </div>

          <div class="caption">
            <span class="caption-handle">${profileHandle}</span>
            ${currentImageItem.description}
          </div>

          <div class="meta-text views-text">${currentImageItem.views}</div>

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