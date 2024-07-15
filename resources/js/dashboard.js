import '../css/dashboard.css';

var sidenav = document.querySelector("aside");
var sidenav_trigger = document.querySelector("[sidenav-trigger]");
var sidenav_close_button = document.querySelector("[sidenav-close]");
var burger = sidenav_trigger.firstElementChild;
var top_bread = burger.firstElementChild;
var bottom_bread = burger.lastElementChild;

var buttons = document.querySelectorAll("[data-target='tooltip_trigger']");

var dropdown_triggers = document.querySelectorAll("[dropdown-trigger]");

var navbar = document.querySelector("[navbar-main]");
var total = document.querySelectorAll("[nav-pills]");

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
sidenav_trigger.addEventListener("click", function () {
    sidenav_close_button.classList.toggle("hidden");
    sidenav.classList.toggle("translate-x-0");
    sidenav.classList.toggle("shadow-soft-xl");
    top_bread.classList.toggle("translate-x-[5px]");
    bottom_bread.classList.toggle("translate-x-[5px]");
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
