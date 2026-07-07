// Course-syllabus accordion: native <details> + expand/collapse-all.
(function () {
  var btn = document.querySelector('[data-toggle-all]');
  var items = Array.prototype.slice.call(document.querySelectorAll('details.mod-item'));
  if (!btn || !items.length) return;
  function allOpen() { return items.every(function (d) { return d.open; }); }
  function sync() { btn.textContent = allOpen() ? 'Collapse all sections' : 'Expand all sections'; }
  btn.addEventListener('click', function () {
    var open = allOpen();
    items.forEach(function (d) { d.open = !open; });
    sync();
  });
  items.forEach(function (d) { d.addEventListener('toggle', sync); });
  sync();
})();
