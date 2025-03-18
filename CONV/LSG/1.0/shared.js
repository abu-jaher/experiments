(t=>{
	"use strict";
	const i = "cv-pjs"
	  , e = "undefined" != typeof unsafeWindow ? unsafeWindow : t
	  , a = (()=>{
		const t = "conv_exclude";
		let i = new URLSearchParams(e.location.search).get(`${t}`)
		  , a = document.cookie.includes(`${t}=true`);
		return "true" === i ? document.cookie = `${t}=true;domain=${e.location.host.replace("www", "")};path=/;secure;` : "false" === i && (document.cookie = `${t}=;domain=${e.location.host.replace("www", "")};path=/;secure;expires=Thu, 01 Jan 1970 00:00:00 GMT`,
		a = null),
		"true" === i || a
	}
	)();
	if (e[i] || a)
		return;
	let n, o, r = document.cookie.includes("cfQA") || e.location.search.includes("kameleoon-experiment-id");
	e[i] = {
		initHotjar: (t,i,a)=>{
			r && !a || (i = i || "CONV_" + t.replace("cv-", "") + "_" + e[t].variation,
			n.waitUntil((()=>"function" == typeof e.hj), (()=>{
				hj("event", i),
				n.log(`Hotjar initialised: ${i}`, t)
			}
			), t))
		},
		log: (t,e=i)=>{
			r && console.log(`[CONV] ${e} --\x3e`, t)
		},
		waitUntil: (t,a,o=i,r=5e3)=>{
			let s;
			const l = setTimeout((()=>{
				s = !0
			}
			), r)
			  , d = ()=>{
				clearTimeout(l),
				s = !0
			}
			  , u = ()=>{
				try {
					const i = "string" == typeof t ? document.querySelector(t) : void 0
					  , n = "function" == typeof t ? t() : void 0;
					if (s)
						return;
					i ? (a(i),
					d()) : n && (a(),
					d()),
					e.requestAnimationFrame(u)
				} catch (t) {
					n.log(t, o)
				}
			}
			;
			e.requestAnimationFrame(u)
		},
		addStyles: (t,i)=>{
			if (!document.querySelector(`style#${t}`)) {
				const e = document.createElement("style");
				e.textContent = i,
				e.id = t,
				document.querySelector("head").insertAdjacentElement("beforeend", e)
			}
		}
	}
}
)(window);
((w) => {
	"use strict";

	const tag = "cv-1-0";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["cv-pjs"];

	window[tag] = window[tag] || {
		init: () => {
			try {
				utils.waitUntil("body", (elDocBody) => {
					elDocBody.classList.add(tag);
				});

				window[tag].initVariation();

				window[tag].initTracking();
				utils.initHotjar(tag);

				utils.log(`${window[tag].variation} is running`, tag);
			} catch (err) {
				utils.log(err, tag);
			}
		},

		initTracking: () => {},
	};
})(window);