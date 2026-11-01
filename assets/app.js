/* Plan-Radar v2 · tiny interaction layer */
(function () {
  "use strict";

  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  document.querySelectorAll(".nav a[data-page]").forEach(function (a) {
    if (a.getAttribute("data-page").split(",").indexOf(page) !== -1) {
      a.classList.add("active");
    }
  });

  /* filter chips: hide cards and table rows by data-kind */
  document.querySelectorAll("[data-filter-group]").forEach(function (group) {
    var buttons = group.querySelectorAll("[data-filter]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var filter = btn.getAttribute("data-filter");
        var scope = document;
        var items = scope.querySelectorAll("[data-kind]");
        var visible = 0;
        items.forEach(function (el) {
          var show = filter === "all" || el.getAttribute("data-kind") === filter;
          el.hidden = !show;
          if (show) visible++;
        });
        var empty = scope.querySelector("[data-empty]");
        if (empty) empty.hidden = visible > 0;
      });
    });
  });

  /* card / table view */
  document.querySelectorAll(".view-toggle").forEach(function (toggle) {
    var buttons = toggle.querySelectorAll("[data-view]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var view = btn.getAttribute("data-view");
        var cards = document.querySelector("[data-cards]");
        var table = document.querySelector("[data-table]");
        if (cards) cards.hidden = view !== "cards";
        if (table) table.hidden = view !== "table";
      });
    });
  });

  /* shareable view: ?view=table */
  if (new URLSearchParams(location.search).get("view") === "table") {
    var tableBtn = document.querySelector('[data-view="table"]');
    if (tableBtn) tableBtn.click();
  }

  /* model page: highlight the region and point "按套餐" back to it */
  if (page === "models.html") {
    var region = new URLSearchParams(location.search).get("region");
    var target = region === "cn" ? "cn.html" : "global.html";
    document.querySelectorAll(".nav a[data-page]").forEach(function (a) {
      if (a.getAttribute("data-page") === target) a.classList.add("active");
    });
    var back = document.querySelector("[data-back-plans]");
    if (back) back.setAttribute("href", target);
  }
})();
