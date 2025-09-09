/* =========================================
 * Portfolio — script.js (toggle-clean)
 * 目的：
 *  1) 右上ボタン … 通常ビュー=「OVERVIEW」→押すとOverviewを開く
 *                   Overview中=「BACK」→押すと閉じて通常ビューに戻る
 *  2) Overviewのグリッド生成 / クリックで該当写真へ
 *  3) グループホバー時のキャプション追随（PCのみ）
 ========================================= */

/* ---------- サンプルデータ（後で差し替えOK） ---------- */
const PHOTOS = [
 
  { src: "/img/untitled/01/15.jpg", w: 1600, h: 1067, title: "Natsuki Oneyama",  line1: "UNTITLED.", line2: "Lucie Rox", group: "UNTITLED." },
  { src: "/img/untitled/01/22.jpg", w: 1200, h: 1600, title: "Natsuki Oneyama",  line1: "UNTITLED.", line2: "Lucie Rox", group: "UNTITLED." },
  { src: "/img/untitled/01/14.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "UNTITLED.", line2: "Lucie Rox", group: "UNTITLED." },
  { src: "/img/untitled/01/10.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "UNTITLED.", line2: "Lucie Rox", group: "UNTITLED." },
  { src: "/img/untitled/01/11.jpg", w: 1200, h: 1600, title: "Natsuki Oneyama", line1: "UNTITLED.", line2: "Lucie Rox", group: "UNTITLED." },
  { src: "/img/untitled/01/07.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "UNTITLED.", line2: "Lucie Rox", group: "UNTITLED." },
  { src: "/img/untitled/01/09.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "UNTITLED.", line2: "Lucie Rox", group: "UNTITLED." },

  { src: "/img/beautypapers/01/07.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "BEAUTY PAPERS", line2: "Jeremie Monnier", group: "BEAUTY PAPERS" },
  { src: "/img/beautypapers/01/20.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "BEAUTY PAPERS", line2: "Jeremie Monnier", group: "BEAUTY PAPERS" },
  { src: "/img/beautypapers/01/16.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "BEAUTY PAPERS", line2: "Jeremie Monnier", group: "BEAUTY PAPERS" },
  { src: "/img/beautypapers/01/14.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "BEAUTY PAPERS", line2: "Jeremie Monnier", group: "BEAUTY PAPERS" },
  { src: "/img/beautypapers/01/12.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "BEAUTY PAPERS", line2: "Jeremie Monnier", group: "BEAUTY PAPERS" },
  { src: "/img/beautypapers/01/06.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "BEAUTY PAPERS", line2: "Jeremie Monnier", group: "BEAUTY PAPERS" },
  { src: "/img/beautypapers/01/03.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "BEAUTY PAPERS", line2: "Jeremie Monnier", group: "BEAUTY PAPERS" },

  { src: "/img/sanstitle/001/13.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "SANS-TITLED", line2: "Tess Petronio", group: "SANS-TITLED" }, 
  { src: "/img/sanstitle/001/10.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "SANS-TITLED", line2: "Tess Petronio", group: "SANS-TITLED" }, 
  { src: "/img/sanstitle/001/05.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "SANS-TITLED", line2: "Tess Petronio", group: "SANS-TITLED" }, 
  { src: "/img/sanstitle/001/04.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "SANS-TITLED", line2: "Tess Petronio", group: "SANS-TITLED" }, 
  { src: "/img/sanstitle/001/02.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "SANS-TITLED", line2: "Tess Petronio", group: "SANS-TITLED" }, 
   
  { src: "/img/replicaman/ss24/22.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "REPLICA MAN", line2: "Pavel Golik", group: "REPLICA MAN" }, 
  { src: "/img/replicaman/ss24/21.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "REPLICA MAN", line2: "Pavel Golik", group: "REPLICA MAN" }, 
  { src: "/img/replicaman/ss24/18.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "REPLICA MAN", line2: "Pavel Golik", group: "REPLICA MAN" }, 
  { src: "/img/replicaman/ss24/16.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "REPLICA MAN", line2: "Pavel Golik", group: "REPLICA MAN" }, 
  { src: "/img/replicaman/ss24/03.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "REPLICA MAN", line2: "Pavel Golik", group: "REPLICA MAN" }, 
  { src: "/img/replicaman/ss24/11.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "REPLICA MAN", line2: "Pavel Golik", group: "REPLICA MAN" }, 
   
  { src: "/img/thegreatest/symmetryissue/02.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "THE GREATEST MAGAZINE", line2: "Hein Gijsbers", group: "THE GREATEST MAGAZINE" }, 
  { src: "/img/thegreatest/symmetryissue/31.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "THE GREATEST MAGAZINE", line2: "Hein Gijsbers", group: "THE GREATEST MAGAZINE" }, 
  { src: "/img/thegreatest/symmetryissue/18.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "THE GREATEST MAGAZINE", line2: "Hein Gijsbers", group: "THE GREATEST MAGAZINE" }, 
  { src: "/img/thegreatest/symmetryissue/27.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "THE GREATEST MAGAZINE", line2: "Hein Gijsbers", group: "THE GREATEST MAGAZINE" }, 
  { src: "/img/thegreatest/symmetryissue/17.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "THE GREATEST MAGAZINE", line2: "Hein Gijsbers", group: "THE GREATEST MAGAZINE" },  
  { src: "/img/thegreatest/symmetryissue/01.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "THE GREATEST MAGAZINE", line2: "Hein Gijsbers", group: "THE GREATEST MAGAZINE" }, 
  { src: "/img/thegreatest/symmetryissue/04.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "THE GREATEST MAGAZINE", line2: "Hein Gijsbers", group: "THE GREATEST MAGAZINE" },  

  { src: "/img/beauty/01/07.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "Beauty", line2: "", group: "Beauty" }, 
  { src: "/img/beauty/01/01.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "Beauty", line2: "", group: "Beauty" }, 
  { src: "/img/beauty/01/02.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "Beauty", line2: "", group: "Beauty" }, 
  { src: "/img/beauty/01/03.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "Beauty", line2: "", group: "Beauty" },      
  { src: "/img/beauty/01/04.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "Beauty", line2: "", group: "Beauty" }, 
  { src: "/img/beauty/01/05.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "Beauty", line2: "", group: "Beauty" }, 
  { src: "/img/beauty/01/06.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "Beauty", line2: "", group: "Beauty" },   
  { src: "/img/beauty/01/08.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "Beauty", line2: "", group: "Beauty" }, 
  
  { src: "/img/numeroswitzerland/issue01-2/02.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "NUMERO SWITZERLAND", line2: "Antoine & Charlie", group: "NUMERO SWITZERLAND" }, 
  { src: "/img/numeroswitzerland/issue01-2/09.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "NUMERO SWITZERLAND", line2: "Antoine & Charlie", group: "NUMERO SWITZERLAND" }, 
  { src: "/img/numeroswitzerland/issue01-2/03.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "NUMERO SWITZERLAND", line2: "Antoine & Charlie", group: "NUMERO SWITZERLAND" }, 
  { src: "/img/numeroswitzerland/issue01-2/05.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "NUMERO SWITZERLAND", line2: "Antoine & Charlie", group: "NUMERO SWITZERLAND" }, 
  { src: "/img/numeroswitzerland/issue01-2/06.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "NUMERO SWITZERLAND", line2: "Antoine & Charlie", group: "NUMERO SWITZERLAND" }, 
  { src: "/img/numeroswitzerland/issue01-2/07.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "NUMERO SWITZERLAND", line2: "Antoine & Charlie", group: "NUMERO SWITZERLAND" }, 

  { src: "/img/10menmagazine/issue58/15.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "10 men", line2: "Allan Hamitouhe", group: "10 men" }, 
  { src: "/img/10menmagazine/issue58/22.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "10 men", line2: "Allan Hamitouhe", group: "10 men" }, 
  { src: "/img/10menmagazine/issue58/10.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "10 men", line2: "Allan Hamitouhe", group: "10 men" }, 
  { src: "/img/10menmagazine/issue58/08.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "10 men", line2: "Allan Hamitouhe", group: "10 men" }, 
  { src: "/img/10menmagazine/issue58/05.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "10 men", line2: "Allan Hamitouhe", group: "10 men" }, 

  { src: "/img/numeroswitzerlandhomme/issue01/14.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "NUMERO SWITZERLAND HOMME", line2: "Jonathan Wolpert", group: "NUMERO SWITZERLAND HOMME" }, 
  { src: "/img/numeroswitzerlandhomme/issue01/03.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "NUMERO SWITZERLAND HOMME", line2: "Jonathan Wolpert", group: "NUMERO SWITZERLAND HOMME" }, 
  { src: "/img/numeroswitzerlandhomme/issue01/13.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "NUMERO SWITZERLAND HOMME", line2: "Jonathan Wolpert", group: "NUMERO SWITZERLAND HOMME" }, 
  { src: "/img/numeroswitzerlandhomme/issue01/15.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "NUMERO SWITZERLAND HOMME", line2: "Jonathan Wolpert", group: "NUMERO SWITZERLAND HOMME" }, 

  { src: "/img/crash/103/11.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "CRASH", line2: "Manuel Obadia-Wills", group: "CRASH" }, 
  { src: "/img/crash/103/09.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "CRASH", line2: "Manuel Obadia-Wills", group: "CRASH" }, 
  { src: "/img/crash/103/07.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "CRASH", line2: "Manuel Obadia-Wills", group: "CRASH" }, 
  { src: "/img/crash/103/08.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "CRASH", line2: "Manuel Obadia-Wills", group: "CRASH" }, 
  { src: "/img/crash/103/04.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "CRASH", line2: "Manuel Obadia-Wills", group: "CRASH" }, 

  { src: "/img/lampoon/muscleissue/08.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "LAMPOON", line2: "Manon Clavelier", group: "LAMPOON" }, 
  { src: "/img/lampoon/muscleissue/18.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "LAMPOON", line2: "Manon Clavelier", group: "LAMPOON" }, 
  { src: "/img/lampoon/muscleissue/07.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "LAMPOON", line2: "Manon Clavelier", group: "LAMPOON" }, 
  { src: "/img/lampoon/muscleissue/03.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "LAMPOON", line2: "Manon Clavelier", group: "LAMPOON" },     
  { src: "/img/lampoon/muscleissue/06.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "LAMPOON", line2: "Manon Clavelier", group: "LAMPOON" }, 
  { src: "/img/lampoon/muscleissue/05.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "LAMPOON", line2: "Manon Clavelier", group: "LAMPOON" }, 

  { src: "/img/dapperdan/25/07.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "DAPPER DAN", line2: "Joe Lai", group: "DAPPER DAN" }, 
  { src: "/img/dapperdan/25/05.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "DAPPER DAN", line2: "Joe Lai", group: "DAPPER DAN" }, 
  { src: "/img/dapperdan/25/03.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "DAPPER DAN", line2: "Joe Lai", group: "DAPPER DAN" }, 
  { src: "/img/dapperdan/25/02.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "DAPPER DAN", line2: "Joe Lai", group: "DAPPER DAN" }, 
 
  { src: "/img/nicotine/issue07/01.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "NICOTINE", line2: "Fernando Uceda", group: "NICOTINE" }, 
  { src: "/img/nicotine/issue07/14.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "NICOTINE", line2: "Fernando Uceda", group: "NICOTINE" }, 
  { src: "/img/nicotine/issue07/12.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "NICOTINE", line2: "Fernando Uceda", group: "NICOTINE" }, 
  { src: "/img/nicotine/issue07/10.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "NICOTINE", line2: "Fernando Uceda", group: "NICOTINE" }, 
  { src: "/img/nicotine/issue07/16.jpg", w: 1600, h: 1100, title: "Natsuki Oneyama",  line1: "NICOTINE", line2: "Fernando Uceda", group: "NICOTINE" }, 


];

/* ---------- 要素参照 ---------- */
const hero = document.getElementById("hero");
const viewer = document.getElementById("viewer");
const counterEl = document.getElementById("counter");

// PC固定キャプション
const dTitle = document.getElementById("dTitle");
const dLine1 = document.getElementById("dLine1");
const dLine2 = document.getElementById("dLine2");

// モバイルキャプション
const mTitle = document.getElementById("mTitle");
const mLine1 = document.getElementById("mLine1");
const mLine2 = document.getElementById("mLine2");

// 左右クリック領域
const navPrev = document.querySelector(".navPrev");
const navNext = document.querySelector(".navNext");

// Overview関連
const overviewPanel   = document.getElementById("overviewPanel");
const btnOverview     = document.getElementById("btnOverview");
const ovCats          = document.getElementById("ovCategories");
const ovPanePhotos    = document.getElementById("ovPhotos");
const ovPaneVideo     = document.getElementById("ovVideo");
const ovPaneInfo      = document.getElementById("ovInfo");
const ovPaneContact   = document.getElementById("ovContact");
const overviewGrid    = document.getElementById("overviewGrid");

let ovProjCaption = null;

/* ---------- 状態 ---------- */
let index = 0;

// --- 同時再生シールド：#ovVideo 内の <video> では、他の play リスナーに届かせない ---
document.addEventListener('play', (e) => {
  const v = e.target;
  const wrap = document.getElementById('ovVideo');
  // 動画ギャラリー内の <video> だけ対象
  if (wrap && v instanceof HTMLVideoElement && wrap.contains(v)) {
    e.stopImmediatePropagation(); // ここで以降の「他をpauseする」リスナーを遮断
  }
}, true); // ← capture で登録（重要）


/* ---------- 初期化 ---------- */
document.addEventListener("DOMContentLoaded", () => {
  render(index);

  // 左右クリック
  navPrev?.addEventListener("click", prev);
  navNext?.addEventListener("click", next);

  // キーボード（Overview開時はEscで閉じる）
  window.addEventListener("keydown", (e) => {
    if (overviewPanel.classList.contains("is-open")) {
      if (e.key === "Escape") closeOverview();
      return;
    }
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });

  // ------ 右上ボタン：トグル（これだけが唯一のハンドラ） ------
  // 既存のonclickやaddEventListenerがあると競合するのでクリアしてから付け直す
  if (btnOverview) {
    const clean = btnOverview.cloneNode(true);
    btnOverview.parentNode.replaceChild(clean, btnOverview);
  }
  const ovBtn = document.getElementById("btnOverview");
  ovBtn.textContent = "OVERVIEW"; // 通常ビューの初期表示
  ovBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (overviewPanel.classList.contains("is-open")) {
      closeOverview();
      ovBtn.textContent = "OVERVIEW";
    } else {
      openOverview();
      ovBtn.textContent = "PORTFOLIO";
    }
    
  });
  // -------------------------------------------------------------

  // Overviewのタブ（VIDEO/INFO）
  ovCats?.addEventListener("click", (e) => {
    const b = e.target.closest(".ov-cat");
    if (!b) return;
    switchTab(b.dataset.tab);
  });
  // Overview ヘッダーの BACK で閉じる → 通常ビューに戻る
document.getElementById('btnOvBack')?.addEventListener('click', (e) => {
  e.preventDefault();
  closeOverview(); // パネルを閉じる
  // 右上のメインボタンの表示を「OVERVIEW」に戻す
  const topBtn = document.getElementById('btnOverview');
  if (topBtn) topBtn.textContent = 'OVERVIEW';
  // 必要ならスクロール頂点へ
  // window.scrollTo({ top: 0, behavior: 'smooth' });
});
});
// === A) ホバー中だけ controls を出す + 右上フルスクリーン ===
function enableHoverControls(){
  document.querySelectorAll('#ovVideo .ov-video').forEach(tile=>{
    if (tile.dataset.hoverInit) return;
    tile.dataset.hoverInit = '1';

    const v = tile.querySelector('video'); // .ov-video-el でもOK
    if (!v) return;

    // 初期は非表示
    v.controls = false;

    // PC: ホバーで表示/離れたら非表示
    tile.addEventListener('mouseenter', ()=>{ v.controls = true;  });
    tile.addEventListener('mouseleave', ()=>{ v.controls = false; });

    // SP: タップで3秒表示
    if (window.matchMedia('(hover:none)').matches){
      tile.addEventListener('click', ()=>{
        v.controls = true;
        clearTimeout(v._hideT);
        v._hideT = setTimeout(()=>{ v.controls = false; }, 3000);
      });
    }

    // 右上フルスクリーンボタン
    const frame = tile.querySelector('.ov-video-frame') || tile;
    if (!frame.querySelector('.ov-fs-btn')){
      const btn = document.createElement('button');
      btn.className = 'ov-fs-btn';
      btn.type = 'button';
      btn.setAttribute('aria-label','Fullscreen');
      btn.innerHTML = '⤢';
      frame.appendChild(btn);
      btn.addEventListener('click', (e)=>{
        e.stopPropagation();
        const req = frame.requestFullscreen || frame.webkitRequestFullscreen || frame.msRequestFullscreen;
        if (req) req.call(frame);
        else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen(); // iOS
        v.controls = true;
      });
    }
    // ★ サムネクリック → その写真から開始
document.getElementById('overviewGrid')?.addEventListener('click', (e)=>{
  const a = e.target.closest('#overviewGrid a');
  if (!a) return;
  e.preventDefault();

  const i = Number(a.dataset.idx);
  if (!Number.isFinite(i)) return;

  // あなたのビューアに合わせて開始位置をセット
  try { window.index = i; } catch(e){}
  if (typeof render === 'function') render(i);  // ← いつもの表示関数
  if (typeof closeOverview === 'function') closeOverview(); // パネルを閉じるなら
});

  });
}
window.enableHoverControls = enableHoverControls; // ← 公開


/* ---------- 画像ビュー描画 ---------- */
function render(i){
  const item = PHOTOS[i];
  if (!item) return;

  hero.src = item.src;
  hero.alt = item.title || "";

  // PCキャプション
  dTitle.textContent = item.title || "";
  dLine1.textContent = item.line1 || "";
  dLine2.textContent = item.line2 || "";

  // モバイルキャプション
  mTitle.textContent = item.title || "";
  mLine1.textContent = item.line1 || "";
  mLine2.textContent = item.line2 || "";

  const pad2 = (n) => String(n).padStart(2, "0");
  counterEl.textContent = `${pad2(i+1)}/${pad2(PHOTOS.length)}`;
}

function prev(){ index = (index - 1 + PHOTOS.length) % PHOTOS.length; render(index); }
function next(){ index = (index + 1) % PHOTOS.length; render(index); }

/* ---------- Overview 開閉 ---------- */
function openOverview(){
  overviewPanel.classList.add("is-open");
  overviewPanel.setAttribute("aria-hidden", "false");

  // ← これを1回だけ。showTabが無い場合はフォールバック
  if (typeof showTab === 'function') {
    showTab('photos');
  } else {
    onShowPhotosPane(); // ← showTabが無い環境用
  }

  overviewPanel.scrollTop = 0;
}
function closeOverview(){
  overviewPanel.classList.remove("is-open");
  overviewPanel.setAttribute("aria-hidden", "true");
}



  // クリックで写真ビューへ & 閉じる
  overviewGrid.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    e.preventDefault();
    const idx = Number(a.dataset.idx || 0);
    index = Number.isFinite(idx) ? idx : 0;
    render(index);
    closeOverview();
    const ovBtn = document.getElementById("btnOverview");
    if (ovBtn) ovBtn.textContent = "OVERVIEW";
  });

  // グループホバー（PC）
  overviewGrid.addEventListener("pointerenter", () => {
    if (!isHoverPointer()) return;
    overviewGrid.classList.add("is-group-hover");
  }, true);

  overviewGrid.addEventListener("pointerleave", () => {
    if (!isHoverPointer()) return;
    overviewGrid.classList.remove("is-group-hover");
    overviewGrid.querySelectorAll("a.is-in-group").forEach(el => el.classList.remove("is-in-group"));
    hideOvProjCaption();
  }, true);

  overviewGrid.addEventListener("pointerover", (e) => {
    if (!isHoverPointer()) return;
    const a = e.target.closest("a");
    if (!a) return;
    const group = a.dataset.group || "";

    overviewGrid.querySelectorAll("a.is-in-group").forEach(el => el.classList.remove("is-in-group"));
    if (group) {
      overviewGrid.querySelectorAll(`a[data-group="${cssEscape(group)}"]`).forEach(el => el.classList.add("is-in-group"));
      showOvProjCaption(group, a);  // ← サムネの近くに追随
    } else {
      hideOvProjCaption();
    }
  });

  // Justified Gallery 初期化
  if (window.jQuery && jQuery.fn.justifiedGallery) {
    jQuery(overviewGrid)
      .addClass("is-layingout")
      .justifiedGallery({
        rowHeight: 220,
        margins: 8,
        lastRow: "nojustify",
        captions: false,
        waitThumbnailsLoad: true
      })
      .on("jg.complete", () => {
        jQuery(overviewGrid).removeClass("is-layingout");
      });
  }





/* ---------- タブ切替 ---------- */
function switchTab(tab){
  ovCats?.querySelectorAll(".ov-cat").forEach(b => b.classList.remove("is-active"));
  ovCats?.querySelector(`.ov-cat[data-tab="${tab}"]`)?.classList.add("is-active");

  hidePane(ovPanePhotos); hidePane(ovPaneVideo); hidePane(ovPaneInfo); hidePane(ovPaneContact);
  if (tab === "video") showPane(ovPaneVideo);
  else if (tab === "info") showPane(ovPaneInfo);
  else if (tab === "contact") showPane(ovPaneContact);
  else showPane(ovPanePhotos);
}
function hidePane(el){ if (el) el.hidden = true; }
function showPane(el){ if (el) el.hidden = false; }

/* ---------- ユーティリティ ---------- */
function isHoverPointer(){
  return window.matchMedia && window.matchMedia("(hover:hover) and (pointer:fine)").matches;
}
function cssEscape(s){ return String(s).replace(/["\\]/g, "\\$&"); }

/* ---------- 浮遊キャプション（追随） ---------- */
function ensureOvProjCaption(){
  if (ovProjCaption) return ovProjCaption;
  ovProjCaption = document.createElement("div");
  ovProjCaption.className = "ov-proj-caption";
  ovProjCaption.style.position = "absolute";
  ovProjCaption.style.left = "16px";
  ovProjCaption.style.top  = "0px";
  ovProjCaption.style.pointerEvents = "none";
  ovProjCaption.style.fontSize = "10px";
  ovProjCaption.style.fontWeight = "500";
  ovProjCaption.style.color = "#000";
  ovProjCaption.style.display = "none";
  ovPanePhotos.appendChild(ovProjCaption); // #ovPhotos 基準
  return ovProjCaption;
}
function showOvProjCaption(text, anchorEl){
  const el = ensureOvProjCaption();
  el.textContent = text;
  el.style.display = "block";
  const cr = ovPanePhotos.getBoundingClientRect();
  const ar = anchorEl.getBoundingClientRect();
  const x = ar.left - cr.left + 4;
  const y = ar.top  - cr.top  + 4;
  el.style.left = `${x}px`;
  el.style.top  = `${y}px`;
}
function hideOvProjCaption(){
  if (!ovProjCaption) return;
  ovProjCaption.style.display = "none";
}

// =======================================================
// ここから Video セクション関連のコードを追加
// =======================================================

// --- Overview タブ切り替え（置き換え）---
const panes = {
  photos: document.getElementById('ovPhotos'),
  video:  document.getElementById('ovVideo'),
  info:   document.getElementById('ovInfo')
};

function showTab(tab){
  // 1) いったん全部隠す
  panes.photos.hidden = true;
  panes.video.hidden  = true;
  panes.info.hidden   = true;

  // 2) 選ばれたタブだけ表示（既定は photos）
  if (tab === 'photos') {
  panes.photos.hidden = false;

  // ★ここがポイント：フィルターを解除して「全件」を描画
  if (typeof filterByGroup === 'function') {
    filterByGroup(null);   // ← 絞り込み解除（全写真）
    // 見た目の選択状態もリセット（点灯しているタグを消灯）
    document.getElementById('clientTags')
      ?.querySelectorAll('.chip.is-active')
      .forEach(el => el.classList.remove('is-active'));
  } else if (typeof onShowPhotosPane === 'function') {
    // もし filterByGroup が無い場合だけ、いつもの並べ直しを呼ぶ
    onShowPhotosPane();
  }

               // ← ここで並べ直す！
  } else if (tab === 'video') {
    panes.video.hidden = false;
      requestAnimationFrame(enableHoverControls); 
    // onShowVideoPane();               // （あればここで呼ぶ）
  } else if (tab === 'info') {
    panes.info.hidden = false;
  } else {
    // 想定外は photos に戻す
    panes.photos.hidden = false;
    onShowPhotosPane();
  }

  // 3) ボタンの is-active を更新
  document.querySelectorAll('#ovCategories .ov-cat').forEach(b=>{
    b.classList.toggle('is-active', b.dataset.tab === (tab || 'photos'));
  });
}



  




// カテゴリクリック
document.getElementById('ovCategories')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.ov-cat');
  if(!btn) return;
  showTab(btn.dataset.tab);
});

// --- openOverview の末尾（パネルを開いた直後）に1行追加 ---
// 例：デフォルトで VIDEO を見せたいなら
// showTab('video');
// 逆に常に写真から始めたいなら
// showTab('photos');


// --- Video lazy load & single-play policy ---
const videoEls = Array.from(document.querySelectorAll('.ov-video-el'));

function mountSources(v){
  if(v.dataset.mounted) return;
  const canPlayHevc = v.canPlayType('video/mp4; codecs="hvc1"'); // Safari系
  const frag = document.createDocumentFragment();
  if(canPlayHevc && v.dataset.srcHevc){
    const s = document.createElement('source');
    s.src = v.dataset.srcHevc;
    s.type = 'video/mp4; codecs="hvc1"';
    frag.appendChild(s);
  }
  if(v.dataset.srcMp4){
    const s2 = document.createElement('source');
    s2.src = v.dataset.srcMp4;
    s2.type = 'video/mp4';
    frag.appendChild(s2);
  }
  v.appendChild(frag);
  v.dataset.mounted = '1';
  v.load();
}

const io = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries)=>{
      entries.forEach(ent=>{
        if(ent.isIntersecting){
          mountSources(ent.target);
          io.unobserve(ent.target);
        }
      });
    }, { root: document.querySelector('#overviewPanel'), threshold: 0.2 })
  : null;

videoEls.forEach(v=>{
  if(io) io.observe(v); else mountSources(v);
  v.addEventListener('play', ()=>{
    videoEls.forEach(o=>{ if(o!==v && !o.paused) o.pause(); });
  });
});

// =======================================================
// ここまで追加
// =======================================================


// ====== PHOTO フィルター準備 ======
// 現在のフィルター（null なら全件）
// ====== Selected Clients → PHOTOS フィルター（Allタブなし） ======

// ===== PHOTO データ（_group を補完） =====
// ← 置き換え or 追加
const ALL_PHOTOS = (window.PHOTOS || (typeof PHOTOS !== 'undefined' ? PHOTOS : []))
  .map((p, i) => ({
    ...p,
    _i: i, // ★ 元の配列での番号
    _group: (p.group || p.line1 || p.title || '').toString().trim()
  }));


// ===== グリッド描画（重複しないよう destroy → empty → append の順） =====
let photosBootstrapped = false;  // 初回描画済みフラグ

function renderPhotos(list){
  const $grid = $('#overviewGrid');

  // 1) 既存インスタンスを破棄（先に destroy）
  try { $grid.justifiedGallery('destroy'); } catch(e) {}

  // 2) 中身クリア
  $grid.empty();

  // 3) まとめて追加
  const frag = document.createDocumentFragment();
  list.forEach(p => {
    const a = document.createElement('a');
    a.href = p.src;
    a.dataset.group = p._group;
    a.dataset.idx = (p._i ?? i);
    if (p.title) a.title = p.title;
    const img = document.createElement('img');
    img.src = p.src;
    img.width = p.w; img.height = p.h;
    img.alt = p.title || p.line1 || '';
    a.appendChild(img);
    frag.appendChild(a);
  });
  $grid[0].appendChild(frag);

  // 4) 再初期化
  $grid.justifiedGallery({ rowHeight: 160, margins: 8, lastRow: 'nojustify' });
  photosBootstrapped = true;
}

// ===== フィルター =====
let currentGroup = null; // null = 全件
function filterByGroup(group){
  currentGroup = group || null;
  const list = currentGroup ? ALL_PHOTOS.filter(p => p._group === currentGroup) : ALL_PHOTOS;
  renderPhotos(list);
}

// ===== INFO の「Selected Clients」→ タグ生成（All なし） =====
function mountClientTags(){
  const collator = new Intl.Collator('en', { sensitivity: 'base', numeric: true }); // 文字順の基準
  const groups = [...new Set(ALL_PHOTOS.map(p => (p._group || '').trim()).filter(Boolean))]
  .sort(collator.compare);

  const $ul = $('#clientTags');
  if (!$ul.length) return;

  $ul.empty();
  groups.forEach(g => {
    $ul.append(`<li><button type="button" class="chip" data-group="${g}">${g}</button></li>`);
  });

  // クリック：同じタグ再押しで解除
  $ul.off('click').on('click', 'button.chip', e => {
    const btn = e.currentTarget;
    const g = btn.dataset.group;
    const active = btn.classList.contains('is-active');

    $ul.find('.chip').removeClass('is-active');
    if (!active) btn.classList.add('is-active');

    showTab('photos');                // 写真ペインに切替
    filterByGroup(active ? null : g); // フィルターON/OFF
  });
}
mountClientTags();

// ===== PHOTOS ペインが「見える」瞬間のケア =====
function onShowPhotosPane(){
  if (!photosBootstrapped) {
    renderPhotos(ALL_PHOTOS);         // 初回だけ描画
  } else {
    // 非表示でレイアウトが0幅になっていた場合に復活
    requestAnimationFrame(() => $('#overviewGrid').justifiedGallery('norewind'));
  }
}



/* （必要なら外から呼べるように） */
window.openOverview = openOverview;
window.closeOverview = closeOverview;


