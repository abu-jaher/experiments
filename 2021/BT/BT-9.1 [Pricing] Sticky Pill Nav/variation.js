(() => {
	try {

		const pillNavActive = false;
		const pillNavSticky = true;

		const waitForElement = (selector, trigger, delayInterval, delayTimeout) => {
			const interval = setInterval(() => {
				if (
					document &&
					document.querySelector(selector) &&
					document.querySelectorAll(selector).length > 0
				) {
					clearInterval(interval);
					trigger();
				}
			}, delayInterval);
			setTimeout(() => {
				clearInterval(interval);
			}, delayTimeout);
		}

		const ensureDomElementExists = function (id, label) {
			const existingElement = document.querySelectorAll('#' + id)[0];
			if (existingElement == null) {
				let xpath = `//h3[contains(text(),'${label}')]`;
				var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				var newAnchor = document.createElement('span');
				newAnchor.id = id;
				try {
					matchingElement.prepend(newAnchor);
				} catch (ex) {
					console.log(`FunnelEnvy.ensureDomElementExists(): Could not find an element matching label: ${label}`)
				}
				console.log(`FunnelEnvy.ensureDomElementExists(): Inserting scroll-to anchor for #${id}`)
			}
		}

		const run = function () {
			window._conv_q = window._conv_q || [];
			window.feTriggerQuicklinksConversion = () => {
				window._conv_q.push(["triggerConversion", "100456493"]);
			}

			let locationHref = document.location.href;

			const FUNDRAISING_SOFTWARE = 'fundraising-software';
			const IMPACT_MANAGEMENT = 'impact-management';
			const STRATEGIC_PHILANTHROPY = 'strategic-philanthropy';

			//    https://www.bonterratech.com/pricing/fundraising-software
			// vs https://www.bonterratech.com/pricing/impact-management
			// vs https://www.bonterratech.com/pricing/strategic-philanthropy

			let whichPricingPageAmIOn = undefined;
			if (new RegExp(FUNDRAISING_SOFTWARE).test(locationHref)) {
				whichPricingPageAmIOn = FUNDRAISING_SOFTWARE;
			} else if (new RegExp(IMPACT_MANAGEMENT).test(locationHref)) {
				whichPricingPageAmIOn = IMPACT_MANAGEMENT;
			} else if (new RegExp(STRATEGIC_PHILANTHROPY).test(locationHref)) {
				whichPricingPageAmIOn = STRATEGIC_PHILANTHROPY;
			}

			let htmlToInsert = ``;
			const DIV_STARTING_TAG = `<div class="paragraph flexible-framer container module paragraph--type--flexible-framer paragraph--view-mode--default">`;
			const H2_STARTING_TAG = `<h2 class="section-title col-lg-6 offset-lg-3 section-title col-lg-6 offset-lg-3 field field--name-field-headline field--type-string field--label-hidden field__items">`;
			const DIV_P_CONTAINER_STARTING_TAG = `<div class="container">`;
			const P_STARTING_TAG = `<p id="special-subheader" style="font-color: black; margin-top: -30px;">`;
			const EVERYTHING_BEFORE_THE_HREF = `<div class="col full-w-m"><a class="custom-link"  onclick="feTriggerQuicklinksConversion()" ontouchstart="feTriggerQuicklinksConversion()" style="border-bottom-width: 0" `;

			if (whichPricingPageAmIOn != null) {
				if (whichPricingPageAmIOn == FUNDRAISING_SOFTWARE) {
					htmlToInsert = `
						${DIV_STARTING_TAG}
							${H2_STARTING_TAG}Fundraising software for every nonprofit</h2>
						</div>`;

					htmlToInsert += `
						${DIV_P_CONTAINER_STARTING_TAG}
							${P_STARTING_TAG}
								Whether you're starting small or scaling big, Bonterra fundraising technology can help you attract donors, increase engagement, and empower your supporters. Choose from three product tiers based on your nonprofit’s unique fundraising needs.
							</p>
						</div>
						<div class="container mt-5">
							<div class="row custom-section">
								${EVERYTHING_BEFORE_THE_HREF} href="#engagement"><span class="underline-custom">Engagement</span></a></div>
								${EVERYTHING_BEFORE_THE_HREF} href="#volunteer-management"><span class="underline-custom">Volunteer Management</span></a></div>
								${EVERYTHING_BEFORE_THE_HREF} href="#giving-days"><span class="underline-custom">Giving Days</span></a></div>
								${EVERYTHING_BEFORE_THE_HREF} href="#events-and-auctions"><span class="underline-custom">Events + Auctions</span></a></div>
								${EVERYTHING_BEFORE_THE_HREF} href="#nonprofit-crm"><span class="underline-custom">Nonprofit CRM</span></a></div>
							</div>
						</div>`;


					// https://stackoverflow.com/questions/3813294/how-to-get-element-by-innertext          
					ensureDomElementExists('engagement', 'Engagement');
					ensureDomElementExists('volunteer-management', 'Volunteer Management');
					ensureDomElementExists('giving-days', 'Giving Days');
					ensureDomElementExists('events-and-auctions', 'Events and Auctions');
					ensureDomElementExists('nonprofit-crm', 'Nonprofit CRM');
				} else if (whichPricingPageAmIOn == IMPACT_MANAGEMENT) {
					htmlToInsert = `
						${DIV_STARTING_TAG}
							${H2_STARTING_TAG}The right impact management software for your team</h2>
						</div>`;

					htmlToInsert += `
						${DIV_P_CONTAINER_STARTING_TAG}
							${P_STARTING_TAG}
								Designed just for nonprofits and public sector agencies, Bonterra Impact Management empowers you to increase efficiency, measure program impact, and accomplish greater outcomes. With three platform tiers, organizations of every size and scale can achieve peak impact.
							</p>
						</div>
						<div class="container mt-5">
							<div class="row custom-section">
								${EVERYTHING_BEFORE_THE_HREF} href="#forms-and-records"><span class="underline-custom">Forms &amp; Records</span></a></div>
								${EVERYTHING_BEFORE_THE_HREF} href="#case-management"><span class="underline-custom">Case Management</span></a></div>
								${EVERYTHING_BEFORE_THE_HREF} href="#reporting-and-insights"><span class="underline-custom">Reporting</span></a></div>
								${EVERYTHING_BEFORE_THE_HREF} href="#workflow-management"><span class="underline-custom">Workflows</span></a></div>
								${EVERYTHING_BEFORE_THE_HREF} href="#security-and-administration"><span class="underline-custom">Security &amp; Admin</span></a></div>
								${EVERYTHING_BEFORE_THE_HREF} href="#participant-engagement"><span class="underline-custom">Participant Engagement</span></a></div>
								${EVERYTHING_BEFORE_THE_HREF} href="#attendance-inventory-and-bulk-data-entry"><span class="underline-custom">Data Management</span></a></div>
								${EVERYTHING_BEFORE_THE_HREF} href="#imports-and-integrations"><span class="underline-custom">Integrations</span></a></div>
							</div>
						</div>`;

					ensureDomElementExists('forms-and-records', 'Forms and Records');
					ensureDomElementExists('case-management', 'Case Management');
					ensureDomElementExists('reporting-and-insights', 'Reporting and Insights');
					ensureDomElementExists('workflow-management', 'Workflow Management');
					ensureDomElementExists('security-and-administration', 'Security and Administration');
					ensureDomElementExists('participant-engagement', 'Participant Engagement');
					ensureDomElementExists('attendance-inventory-and-bulk-data-entry', 'Attendance, Inventory and Bulk Data Entry');
					ensureDomElementExists('imports-and-integrations', 'Imports and Integrations');

				} else if (whichPricingPageAmIOn == STRATEGIC_PHILANTHROPY) {
					htmlToInsert = `
						${DIV_STARTING_TAG}
							${H2_STARTING_TAG}INDUSTRY-LEADING STRATEGIC PHILANTHROPY SOFTWARE</h2>
						</div>`;


					htmlToInsert += `
						${DIV_P_CONTAINER_STARTING_TAG}
							${P_STARTING_TAG}
								Bonterra Strategic Philanthropy platforms give corporations the tools and technology to boost employee participation, scale corporate funding, and even unify giving and grantmaking. Focus on one program or bring them together in our integrated Enterprise offering.
							</p>
						</div>`;

					htmlToInsert += `<div class="container mt-5">
							<div class="row custom-section">
								${EVERYTHING_BEFORE_THE_HREF} href="#grants-management"><span class="underline-custom">Grants Management</span></a></div>
								${EVERYTHING_BEFORE_THE_HREF} href="#employee-engagement"><span class="underline-custom">Employee Engagement</span></a></div>
								${EVERYTHING_BEFORE_THE_HREF} href="#enterprise"><span class="underline-custom">Strategic Philanthropy Enterprise</span></a></div>
							</div>
						</div>`;

					ensureDomElementExists('grants-management', 'Grants Management');
					ensureDomElementExists('employee-engagement', 'Employee Engagement');
					ensureDomElementExists('enterprise', 'Strategic Philanthropy Enterprise');
				}
				var newFieldItem = document.createElement('div');
				newFieldItem.className = "field__item";
				newFieldItem.insertAdjacentHTML('beforeend', htmlToInsert);

				var outer = document.querySelectorAll('.field.field--name-field-widgets.field--type-entity-reference-revisions')[0];
				var existingFirstFieldItem = outer.querySelectorAll('.field__item')[0];
				var existingH2 = existingFirstFieldItem.querySelectorAll('h2')[0]
				existingH2.style.display = 'none';
				var existingDesription = existingFirstFieldItem.querySelectorAll('div.section-description')[0]
				existingDesription.style.display = 'none';
				outer.prepend(newFieldItem)
			}
		}

		const init = function () {
			waitForElement(".field.field--name-field-widgets.field--type-entity-reference-revisions", run, 50, 15000);
		}

		const initSticky = () => {
			stickyFunc();
			window.addEventListener('scroll', () => {
				stickyFunc();
			})
		}

		const stickyFunc = () => {
			const targetElement = document.querySelector('.custom-section');
			const targetParent = document.querySelector('.custom-section').parentElement;
			const secondaryStickyHeader = document.querySelector('#header-sticky');
			const header = document.querySelector('#header.stuck');
			const headerHeight = header && header.getBoundingClientRect().height;
			let paddingTop = headerHeight;

			if (window.screen.width < 1200) {
				paddingTop = 0;
			}

			if (secondaryStickyHeader && targetParent.getBoundingClientRect().top <= 0) {
				targetElement.classList.add('fe_sticky');
				secondaryStickyHeader.style.setProperty('top', (targetElement.offsetHeight - 2) + 'px', 'important');
				targetParent.style.minHeight = targetElement.offsetHeight+'px';
			} else if (!secondaryStickyHeader && targetParent.getBoundingClientRect().top <= paddingTop) {
				targetElement.classList.add('fe_sticky');
				targetElement.style.top = (paddingTop - 3) + 'px';
				targetParent.style.minHeight = targetElement.offsetHeight+'px';
			}
			else {
				targetElement.classList.remove('fe_sticky');
			}
		}

		if (pillNavActive == true) {
			document.onload = init();
		}

		if (pillNavSticky == true) {
			waitForElement('.custom-section', initSticky, 50, 15000)
		}
	} catch (e) {
		console.log(e, "Error in BT-9.1 Variation");
	}
})();