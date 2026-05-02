# 🧪 A/B Test Experiments — Abu Zaher

**CRO Developer** with 5 years of experience and **1000+ experiments built** across eCommerce, B2B SaaS, and Lead Generation.

This repository contains a selection of real A/B test experiments I developed professionally — anonymised to protect client confidentiality.

---

## 👨‍💻 About Me

I specialise in the **technical development and implementation** of A/B tests and CRO experiments. My workflow:

1. **Feasibility Check** — Review experiment brief & Figma designs, identify blockers before development
2. **Experiment Build** — Develop variation code using JavaScript, HTML & CSS on testing platforms
3. **Goal & Tracking Setup** — Configure conversion events and analytics integrations per experiment plan
4. **QA Fix & Resolution** — Resolve QA feedback and prepare for client launch

> I work closely with PMs, strategists and QA engineers — owning the full technical lifecycle of each experiment.

---

## 🛠️ Tech Stack

| Category | Tools |
|----------|-------|
| **Testing Platforms** | Monetate, VWO, Optimizely, AB Tasty, Convert |
| **Languages** | JavaScript (ES6+), HTML5, CSS3 |
| **Analytics** | GA4, Google Tag Manager, Segment |
| **Workflow** | Figma (design handoff)|

---

## 🔑 Key Technical Patterns

### ⚡ Dynamic Multi-Page Targeting
Single JavaScript module serving multiple pages via path-based content matching — one deployed script, per-page configuration arrays.

```javascript
const matchedGroup = carouselData.groups.find((group) => {
    return group.paths.some(path =>
        currentPathname.includes(path.toLowerCase())
    );
});
```

### ⏳ Custom Async DOM Utility
Promise-based `waitUntil()` using `requestAnimationFrame` loop with configurable timeout fallback — no naive `setTimeout` polling.

```javascript
waitUntil: (condition, wait = 6000) => {
    return new Promise((resolve, reject) => {
        const timeout = wait && setTimeout(() => {
            reject(new Error('Timeout waiting for condition'));
        }, wait);
        const check = () => {
            if (!condition()) return requestAnimationFrame(check);
            clearTimeout(timeout);
            resolve(condition());
        };
        requestAnimationFrame(check);
    });
}
```

### 📊 Multi-Event Tracking Architecture
Category-level conversion events + visibility tracking + interaction tracking — all configured per experiment plan and integrated with GA4.

```javascript
// Category-level conversion tracking
utils.sendEvt("[EXP] Running shoe conversion", "conv_running_shoe", tag);

// Visibility tracking — fires only when element is actually seen
onElementVisible(`.${tag}__carousel-container`, () => {
    utils.sendEvt("[EXP] Feature visibility", "conv_features_visibility", tag);
}, { once: true });
```

### 🚀 Performance-Optimised Event Listeners
All scroll and touch listeners use `{ passive: true }` to prevent scroll blocking — critical for mobile performance.

```javascript
carousel.addEventListener('scroll',     handleInteraction, { passive: true });
carousel.addEventListener('touchstart', handleInteraction, { passive: true });
```

### 🛡️ Defensive Coding Patterns
- **Duplicate injection guard** — prevents re-runs on SPA-style navigation
- **One-shot interaction handler** — fires once, then self-removes all listeners
- **IIFE + strict mode** — scope isolation, no global namespace pollution
- **Cookie-based QA mode** — verbose logging in QA without shipping debug code to production

---

## 📈 Example Results

Here are anonymised results from experiments in this repository:

| Experiment Type | Platform | Uplift | Significance |
|----------------|----------|--------|-------------|
| Mobile PDP Feature Cards | Monetate | +11.45% CVR | 97% |
| Checkout Flow Optimisation | VWO | +8.2% CVR | 95% |
| B2B Landing Page CTA Test | Optimizely | +14.3% leads | 99% |
| Form Optimisation | AB Tasty | +22% completions | 95% |

> Results shown are from winning experiments only. Not all experiments produce positive results — learnings from losing tests are equally valuable.

---

## 📬 Contact

- **LinkedIn:** [linkedin.com/in/abu-zaher](https://linkedin.com/in/abu-zaher)
- **GitHub:** [github.com/abu-jaher](https://github.com/abu-jaher)
