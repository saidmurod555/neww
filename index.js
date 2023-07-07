(fetchCountries = async () => {
  const e = await fetch("https://restcountries.com/v2/all"),
    t = await e.json();
  console.log(t), (localStorage.jsonData = JSON.stringify(t));
  for (var n = 0; n < t.length; n++) {
    const e = document.createElement("div");
    e.classList.add("country-item");
    const r = document.createElement("img");
    r.classList.add("flag"),
      r.setAttribute("src", t[n].flag),
      r.setAttribute("alt", "flag-img");
    const i = document.createElement("h3");
    i.textContent = t[n].name;
    var a = ["Aholis soni", "Mintaqa", "Poytaxti"],
      l = [t[n].population, t[n].region, t[n].capital];
    const s = document.createElement("ul");
    for (var o = 0; o < a.length; o++) {
      const e = document.createElement("li");
      (e.textContent = a[o] + ": " + l[o]), s.appendChild(e);
    }
    e.appendChild(r),
      e.appendChild(i),
      e.appendChild(s),
      e.addEventListener("click", function (e) {
        displayCountryDetails(e, t);
      }),
      document.querySelector("#countries-box").appendChild(e);
  }
}),
  fetchCountries();
const search = document.forms["input-form"].querySelector("input");
function selectRegions() {
  const e = document.getElementById("regions");
  document.getElementById("search").value = "";
  const t = e.options[e.selectedIndex].text.toLowerCase(),
    n = document.getElementsByTagName("li");
  for (var a = 1; a < n.length; a += 3)
    -1 != n[a].innerText.toLowerCase().indexOf(t)
      ? (n[a].parentElement.parentElement.style.display = "block")
      : (n[a].parentElement.parentElement.style.display = "none");
}
function toggleTheme() {
  var e = document.documentElement.getAttribute("data-theme"),
    t = document.getElementById("dark-mode-text");
  "light" === e
    ? ((targetTheme = "dark"),
      (t.innerText = "Light Mode"),
      document
        .getElementsByTagName("ion-icon")[0]
        .setAttribute("name", "sunny-outline"))
    : "dark" === e &&
      ((targetTheme = "light"),
      (t.innerText = "Dark Mode"),
      document
        .getElementsByTagName("ion-icon")[0]
        .setAttribute("name", "moon-outline")),
    document.documentElement.setAttribute("data-theme", targetTheme);
}
function displayCountryDetails(e, t) {
  var n = document.getElementsByClassName("main"),
    a = document.getElementsByClassName("details-section");
  if (
    "IMG" === e.target.tagName ||
    "H3" === e.target.tagName ||
    "UL" === e.target.tagName
  ) {
    var l = e.target.parentElement.children;
    (n[0].style.display = "none"),
      (a[0].style.display = "block"),
      setData(t, l, a, !1);
  } else
    "LI" === e.target.tagName &&
      ((l = e.target.parentElement.parentElement.children),
      (n[0].style.display = "none"),
      (a[0].style.display = "block"),
      setData(t, l, a, !1));
}
function setData(e, t, n, a) {
  document.getElementsByClassName("text-grid")[0].style.display = "grid";
  for (var l = 0; l < e.length; l++)
    if (
      e[l].name.toLowerCase() ===
      (a ? t.toLowerCase() : t[1].innerText.toLowerCase())
    ) {
      (n[0].querySelectorAll("h3")[0].innerText = e[l].name),
        (n[0].querySelectorAll("img")[0].src = e[l].flag),
        (n[0].querySelectorAll("img")[0].alt = "flag-image"),
        (n[0].querySelectorAll(".native-name")[0].innerText = e[l].nativeName),
        (n[0].querySelectorAll(".region")[0].innerText = e[l].region),
        e[l] && e[l].capital
          ? (n[0].querySelectorAll(".capital")[0].innerText = e[l].capital)
          : (n[0].querySelectorAll(".capital")[0].innerText = ""),
        e[l] &&
          e[l].currencies &&
          (n[0].querySelectorAll(".currencies")[0].innerText =
            e[l].currencies[0].name);
      var o = e[l].borders,
        r = [];
      if (e[l] && e[l].borders)
        for (var i = 0; i < e.length; i++)
          for (k = 0; k < o.length; k++)
            e[i].alpha3Code === o[k] && r.push(e[i].name);
      else r.push("I do not have any borders!");
      const t = document.getElementById("neighboring-countries");
      for (t.innerHTML = "", i = 0; i < r.length; i++) {
        var s = document.createElement("li");
        (s.textContent = r[i]),
          s.addEventListener("click", function (t) {
            setData(e, t.target.innerText, n, !0);
          }),
          t.appendChild(s);
      }
    }
}
function back() {
  const e = document.getElementsByClassName("main");
  (document.getElementsByClassName("details-section")[0].style.display =
    "none"),
    (e[0].style.display = "block");
}
search.addEventListener("keyup", function (e) {
  const t = e.target.value.toLowerCase(),
    n = document.getElementsByTagName("h3");
  (document.getElementById("regions").selectedIndex = 0),
    Array.from(n).forEach(function (e) {
      -1 != e.innerText.toLowerCase().indexOf(t)
        ? (e.parentElement.style.display = "block")
        : (e.parentElement.style.display = "none");
    });
});
