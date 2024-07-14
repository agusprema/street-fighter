import '../css/dashboard.css';

var page = window.location.pathname.split("/").pop().split(".")[0];
var aux = window.location.pathname.split("/");
var to_build = (aux.includes('pages') ? '../' : './');
var root = window.location.pathname.split("/")
if (!aux.includes("pages")) {
    page = "dashboard";
}

(function () {
    var isWindows = navigator.platform.indexOf("Win") > -1 ? true : false;

    if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        if (document.querySelector("main")) {
            var mainpanel = document.querySelector("main");
            var ps = new PerfectScrollbar(mainpanel);
        }

        if (document.querySelectorAll(".overflow-auto")[0]) {
            var sidebar = document.querySelectorAll(".overflow-auto");
            var i = 0;
            var ps;
            sidebar.forEach((element) => {
                ps[i++] = new PerfectScrollbar(element);
            });
        }
        if (document.querySelectorAll(".overflow-y-auto")[0]) {
            var sidebar = document.querySelectorAll(".overflow-y-auto");
            var i = 0;
            var ps;
            sidebar.forEach((element) => {
                ps[i++] = new PerfectScrollbar(element);
            });
        }
        if (document.querySelectorAll(".overflow-x-auto")[0]) {
            var sidebar = document.querySelectorAll(".overflow-x-auto");
            var i = 0;
            var ps;
            sidebar.forEach((element) => {
                ps[i++] = new PerfectScrollbar(element);
            });
        }
    }
})();

// sidenav

var sidenav = document.querySelector("aside");
var sidenav_trigger = document.querySelector("[sidenav-trigger]");
var sidenav_close_button = document.querySelector("[sidenav-close]");
var burger = sidenav_trigger.firstElementChild;
var top_bread = burger.firstElementChild;
var bottom_bread = burger.lastElementChild;

sidenav_trigger.addEventListener("click", function () {
    if (page == "virtual-reality") {
        sidenav.classList.toggle("xl:left-[18%]");
    }
    sidenav_close_button.classList.toggle("hidden");
    sidenav.classList.toggle("translate-x-0");
    sidenav.classList.toggle("shadow-soft-xl");
    if (page == "rtl") {
        top_bread.classList.toggle("-translate-x-[5px]");
        bottom_bread.classList.toggle("-translate-x-[5px]");
    } else {
        top_bread.classList.toggle("translate-x-[5px]");
        bottom_bread.classList.toggle("translate-x-[5px]");
    }
});
sidenav_close_button.addEventListener("click", function () {
    sidenav_trigger.click();
});

window.addEventListener("click", function (e) {
    if (!sidenav.contains(e.target) && !sidenav_trigger.contains(e.target)) {
        if (sidenav.classList.contains("translate-x-0")) {
            sidenav_trigger.click();
        }
    }
});

var buttons = document.querySelectorAll("[data-target='tooltip_trigger']");

buttons.forEach((button) => {
    var tooltip = button.nextElementSibling;
    var placement = button.getAttribute("data-placement");

    const popperInstance = Popper.createPopper(button, tooltip, {
        modifiers: [{
            name: "offset",
            options: {
                offset: [0, 8],
            },
        }, ],
        placement: placement,
    });

    function show() {
        // Make the tooltip visible
        tooltip.classList.remove("hidden");
        tooltip.classList.add("block");

        // Enable the event listeners
        popperInstance.setOptions((options) => ({
            ...options,
            modifiers: [...options.modifiers, {
                name: "eventListeners",
                enabled: true
            }],
        }));

        // Update its position
        popperInstance.update();
    }

    function hide() {
        // Hide the tooltip

        tooltip.classList.remove("block");
        tooltip.classList.add("hidden");

        // Disable the event listeners
        popperInstance.setOptions((options) => ({
            ...options,
            modifiers: [...options.modifiers, {
                name: "eventListeners",
                enabled: false
            }],
        }));
    }

    const showEvents = ["mouseenter", "focus"];
    const hideEvents = ["mouseleave", "blur"];

    showEvents.forEach((event) => {
        button.addEventListener(event, show);
    });

    hideEvents.forEach((event) => {
        button.addEventListener(event, hide);
    });
});
// Navbar notifications dropdown

var dropdown_triggers = document.querySelectorAll("[dropdown-trigger]");
dropdown_triggers.forEach((dropdown_trigger) => {
    let dropdown_menu = dropdown_trigger.parentElement.querySelector("[dropdown-menu]");

    dropdown_trigger.addEventListener("click", function () {
        dropdown_menu.classList.toggle("opacity-0");
        dropdown_menu.classList.toggle("pointer-events-none");
        dropdown_menu.classList.toggle("before:-top-5");
        if (dropdown_trigger.getAttribute("aria-expanded") == "false") {
            dropdown_trigger.setAttribute("aria-expanded", "true");
            dropdown_menu.classList.remove("transform-dropdown");
            dropdown_menu.classList.add("transform-dropdown-show");
        } else {
            dropdown_trigger.setAttribute("aria-expanded", "false");
            dropdown_menu.classList.remove("transform-dropdown-show");
            dropdown_menu.classList.add("transform-dropdown");
        }
    });

    window.addEventListener("click", function (e) {
        if (!dropdown_menu.contains(e.target) && !dropdown_trigger.contains(e.target)) {
            if (dropdown_trigger.getAttribute("aria-expanded") == "true") {
                dropdown_trigger.click();
            }
        }
    });
});

var pageName = page;
var sidenav_target = to_build + "pages/" + pageName + ".html";

var fixedPlugin = document.querySelector("[fixed-plugin]");
var fixedPluginButton = document.querySelector("[fixed-plugin-button]");
var fixedPluginButtonNav = document.querySelector("[fixed-plugin-button-nav]");
var fixedPluginCard = document.querySelector("[fixed-plugin-card]");
var fixedPluginCloseButton = document.querySelector("[fixed-plugin-close-button]");

var navbar = document.querySelector("[navbar-main]");

var buttonNavbarFixed = document.querySelector("[navbarFixed]");

var sidenav = document.querySelector("aside");
var sidenav_icons = sidenav.querySelectorAll("li a div");


var transparentBtn = document.querySelector("[transparent-style-btn]");
var whiteBtn = document.querySelector("[white-style-btn]");

var non_active_style = ["bg-none", "bg-transparent", "text-fuchsia-500", "border-fuchsia-500"];
var active_style = ["bg-gradient-to-tl", "from-purple-700", "to-pink-500", "bg-fuchsia-500", "text-white", "border-transparent"];

var transparent_sidenav_classes = ["xl:bg-transparent", "shadow-none"];
var transparent_sidenav_highlighted = ["shadow-soft-xl"];
var transparent_sidenav_icons = ["bg-white"];

var white_sidenav_classes = ["xl:bg-white", "shadow-soft-xl"];
var white_sidenav_highlighted = ["shadow-none"];
var white_sidenav_icons = ["bg-gray-200"];

var sidenav_highlight = document.querySelector("a[href=" + CSS.escape(sidenav_target) + "]");

// color sidenav

function sidebarColor(a) {
    var color_from = a.getAttribute("data-color-from");
    var color_to = a.getAttribute("data-color-to");
    var parent = a.parentElement.children;

    var activeColorFrom;
    var activeColorTo;
    var activeSidenavIconColorClassFrom;
    var activeSidenavIconColorClassTo;
    var activeSidenavCardColorClassFrom;
    var activeSidenavCardColorClassTo;
    var activeSidenavCardIconColorClassFrom;
    var activeSidenavCardIconColorClassTo;

    var checkedSidenavIconColorFrom = "from-" + color_from;
    var checkedSidenavIconColorTo = "to-" + color_to;

    var checkedSidenavCardColorFrom = "after:from-" + (color_from == "purple-700" ? "slate-600" : color_from);
    var checkedSidenavCardColorTo = "after:to-" + (color_to == "pink-500" ? "slate-300" : color_to);

    var checkedSidenavCardIconColorClassFrom = "from-" + (color_from == "purple-700" ? "slate-600" : color_from);
    var checkedSidenavCardIconColorClassTo = "to-" + (color_to == "pink-500" ? "slate-300" : color_to);

    var sidenavCard = document.querySelector("[sidenav-card]");
    var sidenavCardIcon = document.querySelector("[sidenav-card-icon]");
    var sidenavIcon = sidenav_highlight.firstElementChild;

    for (var i = 0; i < parent.length; i++) {
        if (parent[i].hasAttribute("active-color")) {
            activeColorFrom = parent[i].getAttribute("data-color-from");
            activeColorTo = parent[i].getAttribute("data-color-to");

            parent[i].classList.toggle("border-white");
            parent[i].classList.toggle("border-slate-700");

            activeSidenavIconColorClassFrom = "from-" + activeColorFrom;
            activeSidenavIconColorClassTo = "to-" + activeColorTo;

            activeSidenavIconColorClassFrom = "from-" + activeColorFrom;
            activeSidenavIconColorClassTo = "to-" + activeColorTo;

            activeSidenavCardIconColorClassFrom = "from-" + (activeColorFrom == "purple-700" ? "slate-600" : activeColorFrom);
            activeSidenavCardIconColorClassTo = "to-" + (activeColorTo == "pink-500" ? "slate-300" : activeColorTo);
        }
        parent[i].removeAttribute("active-color");
    }

    var att = document.createAttribute("active-color");

    a.setAttributeNode(att);
    a.classList.toggle("border-white");
    a.classList.toggle("border-slate-700");

    sidenavCard.classList.remove(activeSidenavCardColorClassFrom);
    sidenavCard.classList.remove(activeSidenavCardColorClassTo);

    sidenavCardIcon.classList.remove(activeSidenavCardIconColorClassFrom);
    sidenavCardIcon.classList.remove(activeSidenavCardIconColorClassTo);

    sidenavIcon.classList.remove(activeSidenavIconColorClassFrom);
    sidenavIcon.classList.remove(activeSidenavIconColorClassTo);

    sidenavCard.classList.add(checkedSidenavCardColorFrom);
    sidenavCard.classList.add(checkedSidenavCardColorTo);

    sidenavCardIcon.classList.add(checkedSidenavCardIconColorClassFrom);
    sidenavCardIcon.classList.add(checkedSidenavCardIconColorClassTo);

    sidenavIcon.classList.add(checkedSidenavIconColorFrom);
    sidenavIcon.classList.add(checkedSidenavIconColorTo);
}


// Tabs navigation

var total = document.querySelectorAll("[nav-pills]");

total.forEach(function (item, i) {
    var moving_div = document.createElement("div");
    var first_li = item.querySelector("li:first-child [nav-link]");
    var tab = first_li.cloneNode();
    tab.innerHTML = "-";
    tab.classList.remove("bg-inherit");
    tab.classList.add("bg-white", "text-white", "shadow-soft-xxs");
    tab.style.animation = ".2s ease";

    moving_div.classList.add("z-10", "absolute", "text-slate-700", "rounded-lg", "bg-inherit", "flex-auto", "text-center", "bg-none", "border-0", "block");
    moving_div.setAttribute("moving-tab", "");
    moving_div.setAttribute("nav-link", "");
    moving_div.appendChild(tab);
    item.appendChild(moving_div);

    var list_length = item.getElementsByTagName("li").length;

    moving_div.style.boxShadow = "0 1px 5px 1px #ddd";
    moving_div.style.padding = "0px";
    moving_div.style.width = item.querySelector("li:nth-child(1)").offsetWidth + "px";
    moving_div.style.transform = "translate3d(0px, 0px, 0px)";
    moving_div.style.transition = ".5s ease";

    item.onmouseover = function (event) {
        let target = getEventTarget(event);
        let li = target.closest("li");
        if (li) {
            let nodes = Array.from(li.closest("ul").children);
            let index = nodes.indexOf(li) + 1;
            item.querySelector("li:nth-child(" + index + ") [nav-link]").onclick = function () {
                item.querySelectorAll("li").forEach(function (list_item) {
                    list_item.firstElementChild.removeAttribute("active");
                });
                li.firstElementChild.setAttribute("active", "");
                moving_div = item.querySelector("[moving-tab]");
                let sum = 0;
                if (item.classList.contains("flex-col")) {
                    for (var j = 1; j <= nodes.indexOf(li); j++) {
                        sum += item.querySelector("li:nth-child(" + j + ")").offsetHeight;
                    }
                    moving_div.style.transform = "translate3d(0px," + sum + "px, 0px)";
                    moving_div.style.height = item.querySelector("li:nth-child(" + j + ")").offsetHeight;
                } else {
                    for (var j = 1; j <= nodes.indexOf(li); j++) {
                        sum += item.querySelector("li:nth-child(" + j + ")").offsetWidth;
                    }
                    moving_div.style.transform = "translate3d(" + sum + "px, 0px, 0px)";
                    moving_div.style.width = item.querySelector("li:nth-child(" + index + ")").offsetWidth + "px";
                }
            };
        }
    };
});

// Tabs navigation resize

window.addEventListener("resize", function (event) {
    total.forEach(function (item, i) {
        item.querySelector("[moving-tab]").remove();
        var moving_div = document.createElement("div");
        var tab = item.querySelector("[nav-link][active]").cloneNode();
        tab.innerHTML = "-";
        tab.classList.remove("bg-inherit");
        tab.classList.add("bg-white", "text-white", "shadow-soft-xxs");
        tab.style.animation = ".2s ease";

        moving_div.classList.add("z-10", "absolute", "text-slate-700", "rounded-lg", "bg-inherit", "flex-auto", "text-center", "bg-none", "border-0", "block");
        moving_div.setAttribute("moving-tab", "");
        moving_div.setAttribute("nav-link", "");
        moving_div.appendChild(tab);

        item.appendChild(moving_div);

        moving_div.style.boxShadow = "0 1px 5px 1px #ddd";
        moving_div.style.padding = "0px";
        moving_div.style.transition = ".5s ease";

        let li = item.querySelector("[nav-link][active]").parentElement;

        if (li) {
            let nodes = Array.from(li.closest("ul").children);
            let index = nodes.indexOf(li) + 1;

            let sum = 0;
            if (item.classList.contains("flex-col")) {
                for (var j = 1; j <= nodes.indexOf(li); j++) {
                    sum += item.querySelector("li:nth-child(" + j + ")").offsetHeight;
                }
                moving_div.style.transform = "translate3d(0px," + sum + "px, 0px)";
                moving_div.style.width = item.querySelector("li:nth-child(" + index + ")").offsetWidth + "px";
                moving_div.style.height = item.querySelector("li:nth-child(" + j + ")").offsetHeight;
            } else {
                for (var j = 1; j <= nodes.indexOf(li); j++) {
                    sum += item.querySelector("li:nth-child(" + j + ")").offsetWidth;
                }
                moving_div.style.transform = "translate3d(" + sum + "px, 0px, 0px)";
                moving_div.style.width = item.querySelector("li:nth-child(" + index + ")").offsetWidth + "px";
            }
        }
    });

    if (window.innerWidth < 991) {
        total.forEach(function (item, i) {
            if (!item.classList.contains("flex-col")) {
                item.classList.add("flex-col", "on-resize");
            }
        });
    } else {
        total.forEach(function (item, i) {
            if (item.classList.contains("on-resize")) {
                item.classList.remove("flex-col", "on-resize");
            }
        });
    }
});

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}


var navbar = document.querySelector("[navbar-main]");

window.onscroll = function () {
    let blur = navbar.getAttribute("navbar-scroll");
    if (blur == "true") stickyNav();
};

function stickyNav() {
    if (window.scrollY >= 5) {
        navbar.classList.add("sticky", "top-[1%]", "backdrop-saturate-[200%]", "backdrop-blur-[30px]", "bg-[hsla(0,0%,100%,0.8)]", "shadow-blur", "z-110");
    } else {
        navbar.classList.remove("sticky", "top-[1%]", "backdrop-saturate-[200%]", "backdrop-blur-[30px]", "bg-[hsla(0,0%,100%,0.8)]", "shadow-blur", "z-110");
    }
}
