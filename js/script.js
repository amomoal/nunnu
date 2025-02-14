console.log("script.js 読み込まれた！");

document.addEventListener("DOMContentLoaded", function () {
  // ページトップボタン（.pagetop）を隠す
  const topBtn = document.querySelector(".pagetop");
  if (topBtn) {
    topBtn.style.display = "none";

    // スクロール時に表示・非表示を切り替える
    window.addEventListener("scroll", function () {
      if (window.scrollY > 70) {
        topBtn.style.display = "block";
      } else {
        topBtn.style.display = "none";
      }
    });

    // ボタンをクリックしたらスクロールして上に戻る
    topBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ドロワーメニュー（#MenuButtonのクリックで開閉）
  const menuButton = document.getElementById("MenuButton");
  if (menuButton) {
    menuButton.addEventListener("click", function () {
      document.querySelector(".js-drawer-open")?.classList.toggle("open");
      document.querySelector(".drawer-menu")?.classList.toggle("open");
      document.documentElement.classList.toggle("is-fixed");
    });
  }

  // スムーススクロール（アンカーリンク対応）
  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetID = this.getAttribute("href").substring(1);
      const target = document.getElementById(targetID);

      if (target) {
        const headerHeight = document.querySelector("header")?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });
});

// _____________________
document.addEventListener("DOMContentLoaded", function () {
  const mainImage = document.getElementById("mainImage");
  const body = document.body;
  const buttonContainer = document.querySelector(".button-container");

  // JSON を取得
  fetch("json/characters.json")
    .then(response => response.json())
    .then(data => {
        const characterData = data.characters;
        const defaultChar = data.defaultCharacter; // JSONから初期キャラを取得

        // 初期設定
        const initialCharacter = characterData[defaultChar];
        body.style.backgroundImage = `url('${initialCharacter.background}')`;
        mainImage.src = initialCharacter.mainImage;

        // ボタンを動的に生成
        buttonContainer.innerHTML = "";
        Object.keys(characterData).forEach(charKey => {
            const charInfo = characterData[charKey];

            const button = document.createElement("button");
            button.classList.add("character-btn");
            button.setAttribute("data-char", charKey);

            const img = document.createElement("img");
            img.src = charInfo.defaultButtonImage;
            img.alt = charKey;

            button.addEventListener("click", function () {
                body.style.backgroundImage = `url('${charInfo.background}')`;
                mainImage.src = charInfo.mainImage;

                document.querySelectorAll(".character-btn img").forEach(btnImg => {
                    const btnCharKey = btnImg.parentElement.getAttribute("data-char");
                    btnImg.src = characterData[btnCharKey].defaultButtonImage;
                });

                img.src = charInfo.buttonImage;
            });

            button.appendChild(img);
            buttonContainer.appendChild(button);
        });
    })
    .catch(error => console.error("❌ JSON の読み込みに失敗:", error));
});

// --------news--------
document.addEventListener("DOMContentLoaded", function () {
  const newsList = document.querySelector(".news-list");

  fetch("json/news.json")
    .then(response => response.json())
    .then(data => {
      // ニュースを生成
      data.forEach(news => {
        const li = document.createElement("li");

        const dateSpan = document.createElement("span");
        dateSpan.classList.add("news-date");
        dateSpan.textContent = news.date;

        const link = document.createElement("a");
        link.href = news.url;
        link.textContent = news.title;

        const hr = document.createElement("hr");

        li.appendChild(dateSpan);
        li.appendChild(link);
        li.appendChild(hr);
        newsList.appendChild(li);
      });
    })
    .catch(error => console.error("❌ ニュースの読み込みに失敗:", error));
});

//  --------------------
document.addEventListener("DOMContentLoaded", function () {
  const galleries = [
    { id: "gallery1", json: "json/gallery.json", maxImages: 12 },
    { id: "gallery2", json: "json/gallery2.json", maxImages: 9 }
  ];

  galleries.forEach(gallery => loadGallery(gallery.id, gallery.json, gallery.maxImages));
});

function loadGallery(galleryId, jsonPath, maxImages) {
  const galleryGrid = document.getElementById(galleryId);
  if (!galleryGrid) {
    console.warn(`❌ ${galleryId} が見つからない！HTMLを確認してくれ！`);
    return;
  }

  fetch(jsonPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTPエラー！ステータス: ${response.status}`);
      }
      return response.json();
    })
    .then(images => {
      galleryGrid.innerHTML = ""; // 画像をクリアしてから追加（重複防止）

      images.slice(0, maxImages).forEach(image => {
        const galleryItem = document.createElement("a");
        galleryItem.href = image.src;
        galleryItem.classList.add("gallery-item");

        const img = document.createElement("img");
        img.src = image.src;
        img.alt = image.alt;

        galleryItem.appendChild(img);
        galleryGrid.appendChild(galleryItem);
      });

      setupLightbox();
    })
    .catch(error => console.error(`❌ ${galleryId} の読み込みに失敗:`, error));
}

function setupLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach(item => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      const imageUrl = this.href;

      // 既存のライトボックスがあれば削除（念のため）
      const existingLightbox = document.querySelector(".lightbox");
      if (existingLightbox) {
        existingLightbox.remove();
      }

      // ライトボックスの要素を作成
      const lightbox = document.createElement("div");
      lightbox.classList.add("lightbox");
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <img src="${imageUrl}" alt="拡大画像">
        </div>
      `;

      document.body.appendChild(lightbox);

      // 🔥 ライトボックス削除関数（エラー防止）
      function closeLightbox() {
        if (document.body.contains(lightbox)) {
          document.body.removeChild(lightbox);
        }
      }

      // 🔥 背景クリックで閉じる
      lightbox.addEventListener("click", closeLightbox);

      // 🔥 画像クリックで閉じる
      const lightboxImage = lightbox.querySelector("img");
      lightboxImage.addEventListener("click", closeLightbox);

      // 🔥 ESCキーで閉じる
      document.addEventListener("keydown", function escHandler(e) {
        if (e.key === "Escape") {
          closeLightbox();
          document.removeEventListener("keydown", escHandler);
        }
      });
    });
  });
}

