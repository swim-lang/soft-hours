(() => {
  const REVIEW_PROJECT = "soft-hours";
  const REVIEW_TABLE = "soft_hours_review_comments";
  const REVIEW_MODE_KEY = "soft-hours-review-mode";
  const REVIEW_CONFIG = window.SOFT_HOURS_REVIEW_CONFIG || {};
  const REVIEW_SUPABASE_URL = (REVIEW_CONFIG.supabaseUrl || "").replace(/\/$/, "");
  const REVIEW_SUPABASE_ANON_KEY = REVIEW_CONFIG.supabaseAnonKey || "";
  const HAS_REVIEW_SUPABASE = Boolean(REVIEW_SUPABASE_URL && REVIEW_SUPABASE_ANON_KEY);
  const params = new URLSearchParams(window.location.search);
  const reviewPath = window.location.pathname.replace(/\/$/, "") === "/review";
  const reviewRequested = reviewPath || params.has("review");

  if (!reviewRequested && !window.sessionStorage.getItem(REVIEW_MODE_KEY)) {
    return;
  }

  const initialMode = params.get("review") === "comment"
    ? "comment"
    : window.sessionStorage.getItem(REVIEW_MODE_KEY) || (reviewRequested ? "browse" : "");

  const state = {
    mode: initialMode,
    comments: [],
    activeTarget: null,
    panelOpen: false,
    notice: "",
    syncWarning: HAS_REVIEW_SUPABASE ? "" : "Supabase review database is not configured. Comments cannot be saved yet.",
  };

  const reviewLayer = document.createElement("div");
  reviewLayer.className = "review-layer";
  document.body.appendChild(reviewLayer);

  let noticeTimer = 0;

  const escapeHtml = (value) => String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  }[char]));

  const cssEscape = (value) => {
    if (window.CSS && typeof window.CSS.escape === "function") {
      return window.CSS.escape(value);
    }
    return String(value).replace(/"/g, "\\\"");
  };

  const pageName = () => {
    const path = window.location.pathname.replace(/\/$/, "");
    if (!path || path === "/review" || path === "/index.html") {
      return "home";
    }
    return path.split("/").pop().replace(/\.html$/, "") || "home";
  };

  const textQuote = (element) => (element.innerText || element.textContent || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 240);

  const toReviewComment = (row) => ({
    id: row.id,
    project: row.project,
    page: row.page,
    path: row.path,
    reviewId: row.review_id,
    selector: row.selector,
    textQuote: row.text_quote || "",
    comment: row.comment,
    status: row.status || "open",
    viewport: row.viewport || null,
    createdAt: row.created_at,
    resolvedAt: row.resolved_at || null,
  });

  const toReviewRow = (item) => ({
    id: item.id,
    project: item.project,
    page: item.page,
    path: item.path,
    review_id: item.reviewId,
    selector: item.selector,
    text_quote: item.textQuote,
    comment: item.comment,
    status: item.status,
    viewport: item.viewport,
    created_at: item.createdAt,
    resolved_at: item.resolvedAt || null,
  });

  const reviewRequest = async (path, options = {}) => {
    const response = await fetch(`${REVIEW_SUPABASE_URL}/rest/v1/${path}`, {
      ...options,
      headers: {
        apikey: REVIEW_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${REVIEW_SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    if (response.status === 204) {
      return [];
    }

    return response.json();
  };

  const openComments = () => state.comments.filter((item) => item.status !== "resolved");

  const markCommentedSections = () => {
    document.querySelectorAll("[data-review-id]").forEach((node) => {
      const hasComment = state.comments.some((item) => item.status !== "resolved" && item.reviewId === node.dataset.reviewId);
      node.classList.toggle("has-review-comment", hasComment);
    });
  };

  const showNotice = (message) => {
    state.notice = message;
    window.clearTimeout(noticeTimer);
    noticeTimer = window.setTimeout(() => {
      state.notice = "";
      render();
    }, 2800);
    render();
  };

  const loadComments = async () => {
    if (!HAS_REVIEW_SUPABASE) {
      state.syncWarning = "Supabase review database is not configured. Comments cannot be saved yet.";
      render();
      return;
    }

    try {
      const rows = await reviewRequest(`${REVIEW_TABLE}?project=eq.${REVIEW_PROJECT}&select=*&order=created_at.desc`);
      state.comments = rows.map(toReviewComment);
      state.syncWarning = "";
      markCommentedSections();
      render();
    } catch (error) {
      console.warn("Could not load Soft Hours review comments.", error);
      state.syncWarning = "Could not connect to the Supabase review database.";
      render();
    }
  };

  const setMode = (mode) => {
    state.mode = mode;
    state.activeTarget = null;
    window.sessionStorage.setItem(REVIEW_MODE_KEY, mode);
    document.documentElement.dataset.reviewMode = mode || "";
    render();
    if (mode === "browse" || mode === "comment") {
      loadComments();
    }
  };

  const jumpToComment = (reviewId) => {
    const target = document.querySelector(`[data-review-id="${cssEscape(reviewId)}"]`);
    if (!target) {
      showNotice("That section is not on this page.");
      return;
    }

    state.panelOpen = false;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.add("review-jump");
    window.setTimeout(() => target.classList.remove("review-jump"), 1800);
    render();
  };

  const resolveComment = async (id) => {
    if (!HAS_REVIEW_SUPABASE) {
      showNotice("Supabase is required to resolve comments.");
      return;
    }

    try {
      const resolvedAt = new Date().toISOString();
      const rows = await reviewRequest(`${REVIEW_TABLE}?id=eq.${encodeURIComponent(id)}&project=eq.${REVIEW_PROJECT}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "resolved", resolved_at: resolvedAt }),
      });
      const saved = rows[0] ? toReviewComment(rows[0]) : null;
      state.comments = state.comments.map((item) => (item.id === id ? saved || { ...item, status: "resolved", resolvedAt } : item));
      markCommentedSections();
      showNotice("Comment resolved.");
      render();
    } catch (error) {
      console.warn("Could not resolve Soft Hours review comment.", error);
      showNotice("Could not resolve in Supabase.");
    }
  };

  const saveComment = async (event) => {
    event.preventDefault();
    const textarea = reviewLayer.querySelector("[data-review-draft]");
    const draft = textarea ? textarea.value.trim() : "";

    if (!state.activeTarget || !draft) {
      return;
    }

    if (!HAS_REVIEW_SUPABASE) {
      state.syncWarning = "Supabase review database is not configured. This comment was not saved.";
      showNotice("Supabase is required to save comments.");
      return;
    }

    const item = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      project: REVIEW_PROJECT,
      page: pageName(),
      path: window.location.pathname + window.location.search + window.location.hash,
      reviewId: state.activeTarget.reviewId,
      selector: state.activeTarget.selector,
      textQuote: state.activeTarget.textQuote,
      comment: draft,
      status: "open",
      viewport: { width: window.innerWidth, height: window.innerHeight },
      createdAt: new Date().toISOString(),
      resolvedAt: null,
    };

    try {
      const rows = await reviewRequest(REVIEW_TABLE, { method: "POST", body: JSON.stringify(toReviewRow(item)) });
      state.comments = [rows[0] ? toReviewComment(rows[0]) : item, ...state.comments];
      state.activeTarget = null;
      state.panelOpen = true;
      state.syncWarning = "";
      markCommentedSections();
      showNotice("Comment saved to Supabase.");
      render();
    } catch (error) {
      console.warn("Could not save Soft Hours review comment.", error);
      state.syncWarning = "Could not save to the Supabase review database.";
      showNotice("Comment was not saved.");
      render();
    }
  };

  const exportComments = () => {
    const blob = new Blob([JSON.stringify(state.comments, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `soft-hours-review-comments-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const toolbarMarkup = () => `
    <div class="review-toolbar" role="toolbar" aria-label="Soft Hours review tools">
      <button type="button" data-review-mode="browse" class="${state.mode === "browse" ? "active" : ""}">Browse</button>
      <button type="button" data-review-mode="comment" class="${state.mode === "comment" ? "active" : ""}">Comment</button>
      <button type="button" data-review-panel>Comments <span class="review-count">${openComments().length}</span></button>
      <button type="button" data-review-export>Export</button>
      <button type="button" data-review-close aria-label="Close review tools">Close</button>
    </div>
  `;

  const choiceMarkup = () => `
    <div class="review-mode-choice" role="dialog" aria-modal="true" aria-labelledby="reviewChoiceTitle">
      <div class="review-mode-card">
        <span>Soft Hours private review</span>
        <h2 id="reviewChoiceTitle">Open the site for review.</h2>
        <p>Preview normally or switch into comment mode to leave section-level notes. Comments are only marked saved after Supabase accepts them.</p>
        <div class="review-mode-actions">
          <button type="button" data-review-mode="browse">Preview website</button>
          <button type="button" data-review-mode="comment">Leave revisions</button>
        </div>
        ${state.syncWarning ? `<p class="review-warning">${escapeHtml(state.syncWarning)}</p>` : ""}
      </div>
    </div>
  `;

  const popoverMarkup = () => state.activeTarget ? `
    <form class="review-popover" style="top:${state.activeTarget.top}px;left:${state.activeTarget.left}px" data-review-popover>
      <span class="review-popover-meta">${escapeHtml(state.activeTarget.reviewId)}</span>
      <p>${escapeHtml(state.activeTarget.textQuote || "Selected section")}</p>
      <textarea data-review-draft placeholder="Leave a revision note" autofocus></textarea>
      ${state.syncWarning ? `<small>${escapeHtml(state.syncWarning)}</small>` : ""}
      <div class="review-popover-actions">
        <button type="button" data-review-cancel>Cancel</button>
        <button type="submit">Save to Supabase</button>
      </div>
    </form>
  ` : "";

  const panelMarkup = () => state.panelOpen ? `
    <aside class="review-panel" aria-label="Review comments">
      <div class="review-panel-header">
        <span>Review comments</span>
        <button type="button" data-review-panel-close aria-label="Close comments panel">Close</button>
      </div>
      ${state.syncWarning ? `<p class="review-warning">${escapeHtml(state.syncWarning)}</p>` : ""}
      <div class="review-panel-list">
        ${state.comments.length ? state.comments.map((item) => `
          <article class="${item.status === "resolved" ? "is-resolved" : ""}">
            <div class="review-panel-meta">${escapeHtml(item.page)} / ${escapeHtml(item.reviewId)}</div>
            <p>${escapeHtml(item.comment)}</p>
            ${item.textQuote ? `<blockquote>${escapeHtml(item.textQuote)}</blockquote>` : ""}
            <div class="review-panel-actions">
              <button type="button" data-review-jump="${escapeHtml(item.reviewId)}">Jump</button>
              ${item.status !== "resolved" ? `<button type="button" data-review-resolve="${escapeHtml(item.id)}">Resolve</button>` : ""}
            </div>
          </article>
        `).join("") : "<p>No comments loaded yet.</p>"}
      </div>
    </aside>
  ` : "";

  const render = () => {
    document.documentElement.dataset.reviewMode = state.mode || "";
    reviewLayer.innerHTML = [
      !state.mode ? choiceMarkup() : "",
      state.mode ? toolbarMarkup() : "",
      popoverMarkup(),
      panelMarkup(),
      state.notice ? `<div class="review-toast">${escapeHtml(state.notice)}</div>` : "",
    ].join("");
  };

  reviewLayer.addEventListener("click", (event) => {
    const modeButton = event.target.closest("button[data-review-mode]");
    if (modeButton) {
      setMode(modeButton.dataset.reviewMode);
      return;
    }

    if (event.target.closest("[data-review-panel]")) {
      state.panelOpen = true;
      render();
      return;
    }

    if (event.target.closest("[data-review-panel-close]")) {
      state.panelOpen = false;
      render();
      return;
    }

    if (event.target.closest("[data-review-cancel]")) {
      state.activeTarget = null;
      render();
      return;
    }

    if (event.target.closest("[data-review-export]")) {
      exportComments();
      return;
    }

    if (event.target.closest("[data-review-close]")) {
      state.mode = "";
      state.activeTarget = null;
      state.panelOpen = false;
      window.sessionStorage.removeItem(REVIEW_MODE_KEY);
      document.documentElement.dataset.reviewMode = "";
      reviewLayer.remove();
      return;
    }

    const jumpButton = event.target.closest("[data-review-jump]");
    if (jumpButton) {
      jumpToComment(jumpButton.dataset.reviewJump);
      return;
    }

    const resolveButton = event.target.closest("[data-review-resolve]");
    if (resolveButton) {
      resolveComment(resolveButton.dataset.reviewResolve);
    }
  });

  reviewLayer.addEventListener("submit", saveComment);

  document.addEventListener("click", (event) => {
    if (state.mode !== "comment") {
      return;
    }

    if (event.target.closest(".review-layer, .review-toolbar, .review-panel, .review-popover, .review-mode-choice")) {
      return;
    }

    const target = event.target.closest("[data-review-id]");
    if (!target) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    const rect = target.getBoundingClientRect();
    state.activeTarget = {
      reviewId: target.dataset.reviewId,
      selector: `[data-review-id="${target.dataset.reviewId}"]`,
      textQuote: textQuote(target),
      top: Math.min(window.innerHeight - 360, Math.max(16, rect.top + 16)),
      left: Math.min(window.innerWidth - 390, Math.max(16, rect.left + 16)),
    };
    render();
  }, true);

  render();
  if (state.mode === "browse" || state.mode === "comment") {
    loadComments();
  }
})();
