Game.registerMod("Flux", {
  init: function () {
    // Add Tailwind CSS CDN first
    const tailwindScript = document.createElement("script");
    tailwindScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(tailwindScript);

    // Load helpers.js after Tailwind is added
    const modPath = this.dir.replace(/\\/g, "/");
    const script = document.createElement("script");
    script.src = modPath + "/helpers.js";
    document.head.appendChild(script);

    // Load CSS file from mod directory
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = modPath + "/styles.css";
    document.head.appendChild(link);

    this.AutoClickMode = false;
    this.GoldenClickMode = false;
    this.FortuneClickMode = false;

    // Initialize buttons after a short delay to ensure helpers are loaded
    window.setTimeout(() => {
      this.createButtons();
      this.AutoClickInterval = window.setInterval(() => this.ClickCookie(), 25);
      this.GoldenClickInterval = window.setInterval(() => this.ClickGoldenCookie(), 25);
      this.FortuneClickInterval = window.setInterval(() => this.ClickFortune(), 25);
    }, 1000);

    Game.Notify(`Flux Initialized!`, "", [16, 5]);
  },

  ClickCookie: function () {
    if (!this.AutoClickMode) return;
    var cookie = document.getElementById("bigCookie");
    FluxHelpers.dispatchEvent(cookie, "click");
  },

  ClickGoldenCookie: function () {
    if (!this.GoldenClickMode) return;
    var goldenCookie = document.getElementById("shimmers").firstChild;
    FluxHelpers.dispatchEvent(goldenCookie, "click");
  },

  ClickFortune: function () {
    if (!this.FortuneClickMode) return;
    if (Game.TickerEffect && Game.TickerEffect.type === "fortune") {
      Game.tickerL.click();
    }
  },

  AutoClickCallback: function () {
    this.AutoClickMode = !this.AutoClickMode;
    FluxHelpers.setButtonStatus(this.AutoButton, this.AutoClickMode);
  },

  GoldenAutoClickCallback: function () {
    this.GoldenClickMode = !this.GoldenClickMode;
    FluxHelpers.setButtonStatus(this.AutoGoldenButton, this.GoldenClickMode);
  },

  FortuneAutoClickCallback: function () {
    this.FortuneClickMode = !this.FortuneClickMode;
    FluxHelpers.setButtonStatus(this.AutoFortuneButton, this.FortuneClickMode);
  },

  createButtons: function () {
    var container = document.createElement("div");
    container.className =
      "fixed bottom-24 z-[999] left-4 flex flex-col gap-2 z-50 bg-slate-900/80 p-2 rounded-lg";

    var autoButton = document.createElement("div");
    FluxHelpers.setButtonProps(autoButton, "Autoclicker", this.AutoClickCallback, this);
    autoButton.className =
      "px-4 py-2 bg-slate-600 hover:bg-blue-600 text-white text-center rounded shadow-md cursor-pointer transition-colors";

    var autoGoldenButton = document.createElement("div");
    FluxHelpers.setButtonProps(
      autoGoldenButton,
      "Claim Goldens",
      this.GoldenAutoClickCallback,
      this
    );
    autoGoldenButton.className =
      "px-4 py-2 bg-slate-600 hover:bg-orange-600 text-white rounded shadow-md cursor-pointer transition-colors";

    var autoFortuneButton = document.createElement("div");
    FluxHelpers.setButtonProps(
      autoFortuneButton,
      "Claim Fortunes",
      this.FortuneAutoClickCallback,
      this
    );
    autoFortuneButton.className =
      "px-4 py-2 bg-slate-600 hover:bg-green-600 text-white rounded shadow-md cursor-pointer transition-colors";

    container.appendChild(autoButton);
    container.appendChild(autoGoldenButton);
    container.appendChild(autoFortuneButton);

    var gameContainer = document.getElementById("sectionLeft");
    gameContainer.appendChild(container);

    this.ButtonContainer = container;
    this.AutoButton = autoButton;
    this.AutoGoldenButton = autoGoldenButton;
    this.AutoFortuneButton = autoFortuneButton;
  },

  save: function () {
    // Save mod state if needed
    return JSON.stringify({
      autoClick: this.AutoClickMode,
      goldenClick: this.GoldenClickMode,
      fortuneClick: this.FortuneClickMode,
    });
  },

  load: function (str) {
    // Load mod state if available
    try {
      const state = JSON.parse(str);
      this.AutoClickMode = state.autoClick || false;
      this.GoldenClickMode = state.goldenClick || false;
      this.FortuneClickMode = state.fortuneClick || false;
    } catch (e) {
      console.log("Error loading AutoClicker state:", e);
    }
  },
});
