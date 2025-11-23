((w) => {
	"use strict";

	const tag = "cv-2-0";
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const utils = window["cv-pjs"].utils;

	if (window[tag].variation) return;

	const data = {
		tipsTitle: `Hinweis zur Passform`,
		measureTitle: `Richtig messen`,

		men_top: {
			bodyClass: `mens-top`,
			headerTitle: `Herrenoberteile`,
			headerText: `
			<p>Bei den Maßen in der Größentabelle handelt es sich um Körpermaße. Verwende die Tabelle unten, um deine Größe zu bestimmen. Wenn du waagerecht scrollst, werden dir weitere Größen angezeigt.</p>
			`,
			tipsText: `<p>Wenn du zwischen zwei Größen liegst, bestell die kleinere Größe für eine engere Passform oder die größere Größe für eine weitere Passform. Wenn du für deine Maße für Hüfte und Taillenumfang zwei unterschiedliche Größenvorschläge erhältst, bestelle die Größe nach deinem Hüftumfang.</p>`,
			measureText: `
			<li>BRUST: Führe das Maßband waagerecht um die breiteste Stelle des Oberkörpers.</li>
			<li>TAILLE: Führe das Maßband waagerecht um die Stelle, an der deine Taille am schmalsten ist (normalerweise dort, wo dein Körper sich krümmt, wenn du deinen Oberkörper zur Seite neigst).</li>
			<li>HÜFTE: Miss dort, wo der Hüftumfang am größten ist. Halte das Maßband waagerecht.</li>
			`,
			table: `
			<div class="${tag}__table-wrapper selected-zoll">
				<div class="${tag}__table-header">
					<h3>Größentabelle</h3>
					<div class="toggle-container">
						<div class="toggle-background"></div>
						<div class="toggle-option">
							<input type="radio" id="zoll" name="${tag}__unit" value="zoll" checked="">
							<label for="zoll" style="">Zoll</label>
						</div>
						
						<div class="toggle-option">
							<input type="radio" id="cm" name="${tag}__unit" value="cm">
							<label for="cm">cm</label>
						</div>
					</div>
				</div>
				<div class="${tag}__table-body">
					<article role="region" tabindex="0">
						<table class="size-chart-table">
						<tbody>
							<tr>
								<th scope="row">Größe</th>
								<td data-column="1">XXS</td>
								<td data-column="2">XS</td>
								<td data-column="3">S</td>
								<td data-column="5">M</td>
								<td data-column="7">L</td>
								<td data-column="9">XL</td>
								<td data-column="11">XXL</td>
								<td data-column="13">3XL</td>
								<td data-column="15">4XL</td>
							</tr>
							<tr>
								<th scope="row">
									<span class="in">Brust (Zoll)</span>
									<span class="cm">Brust (cm)</span>
								</th>
								<td>
									<span class="in">28.1 - 31.5</span>
									<span class="cm">72 - 80</span>
								</td>
								<td>
									<span class="in">31.5 - 35</span>
									<span class="cm">80 - 88</span>
								</td>
								<td>
									<span class="in">35 - 37.5</span>
									<span class="cm">88 - 96</span>
								</td>
								<td>
									<span class="in">37.5 - 41</span>
									<span class="cm">96 - 104</span>
								</td>
								<td>
									<span class="in">41 - 44</span>
									<span class="cm">104 - 112</span>
								</td>
								<td>
									<span class="in">44 - 48.5</span>
									<span class="cm">112 - 124</span>
								</td>
								<td>
									<span class="in">48.5 - 53.5</span>
									<span class="cm">124 - 136</span>
								</td>
								<td>
									<span class="in">53.5 - 58</span>
									<span class="cm">136 - 148</span>
								</td>
								<td>
									<span class="in">58 - 63</span>
									<span class="cm">148 - 160</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span class="in">Taille (Zoll)</span>
									<span class="cm">Taille (cm)</span>
								</th>
								<td>
									<span class="in">22.5 - 25.5</span>
									<span class="cm">57 - 65</span>
								</td>
								<td>
									<span class="in">25.5 - 29</span>
									<span class="cm">65 - 73</span>
								</td>
								<td>
									<span class="in">29 - 32</span>
									<span class="cm">73 - 81</span>
								</td>
								<td>
									<span class="in">32 - 35</span>
									<span class="cm">81 - 89</span>
								</td>
								<td>
									<span class="in">35 - 38</span>
									<span class="cm">89 - 97</span>
								</td>
								<td>
									<span class="in">38 - 43</span>
									<span class="cm">97 - 109</span>
								</td>
								<td>
									<span class="in">43 - 47.5</span>
									<span class="cm">109 - 121</span>
								</td>
								<td>
									<span class="in">47.5 - 52.5</span>
									<span class="cm">121 - 133</span>
								</td>
								<td>
									<span class="in">52.5 - 57</span>
									<span class="cm">133 - 145</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span class="in">Hüfte (Zoll)</span>
									<span class="cm">Hüfte (cm)</span>
								</th>
								<td>
									<span class="in">28.5 - 31.5</span>
									<span class="cm">72 - 80</span>
								</td>
								<td>
									<span class="in">31.5 - 35</span>
									<span class="cm">80 - 88</span>
								</td>
								<td>
									<span class="in">35 - 37.5</span>
									<span class="cm">88 - 96</span>
								</td>
								<td>
									<span class="in">37.5 - 41</span>
									<span class="cm">96 - 104</span>
								</td>
								<td>
									<span class="in">41 - 44</span>
									<span class="cm">104 - 112</span>
								</td>
								<td>
									<span class="in">44 - 47</span>
									<span class="cm">112 - 120</span>
								</td>
								<td>
									<span class="in">47 - 50.5</span>
									<span class="cm">120 - 128</span>
								</td>
								<td>
									<span class="in">50.5 - 53.5</span>
									<span class="cm">128 - 136</span>
								</td>
								<td>
									<span class="in">53.5 - 58.5</span>
									<span class="cm">136 - 148</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span class="in">Höhe (Zoll)</span>
									<span class="cm">Höhe (cm)</span>
								</th>
								<td>
									<span class="in">< 5'7"</span>
									<span class="cm">< 170</span>
								</td>
								<td>
									<span class="in">5'7" - 6'0"</span>
									<span class="cm">170 - 183</span>
								</td>
								<td>
									<span class="in">5'7" - 6'0"</span>
									<span class="cm">170 - 183</span>
								</td>
								<td>
									<span class="in">5'7" - 6'0"</span>
									<span class="cm">170 - 183</span>
								</td>
								<td>
									<span class="in">5'7" - 6'0"</span>
									<span class="cm">170 - 183</span>
								</td>
								<td>
									<span class="in">5'7" - 6'0"</span>
									<span class="cm">170 - 183</span>
								</td>
								<td>
									<span class="in">5'7" - 6'0"</span>
									<span class="cm">170 - 183</span>
								</td>
								<td>
									<span class="in">5'7" - 6'0"</span>
									<span class="cm">170 - 183</span>
								</td>
								<td>
									<span class="in">5'7" - 6'0"</span>
									<span class="cm">170 - 183</span>
								</td>
							</tr>
						</tbody>
						</table>
					</article>
					<div class="overflow"></div>
				</div>
			</div>
			`,
		},

		men_bottom: {
			bodyClass: `mens-bottom`,
			headerTitle: `Herrenhosen`,
			headerText: `
			<p>Bei den Maßen in der Größentabelle handelt es sich um Körpermaße. Verwende die Tabelle unten, um deine Größe zu bestimmen. Wenn du waagerecht scrollst, werden dir weitere Größen angezeigt.</p>
			<p>Einige unserer Hosen haben zwei Maße: Taillenbundweite und Beininnenlänge. Größe 32/34 (oder 32×34) beispielsweise hat eine Taillenbundweite von 85 cm und eine Beininnenlänge von 83,5 cm. Die Beininnenlänge bezieht sich auf das Maß von der Schrittnaht bis zum Saum des Kleidungsstücks.</p>
			`,
			tipsText: `
			<p>Wenn du zwischen zwei Größen liegst, bestell die kleinere Größe für eine engere Passform oder die größere für eine weitere Passform. Wenn du für deine Maße für Hüfte und Taillenumfang unterschiedliche Größenempfehlungen erhältst, bestelle die Größe entsprechend deines Hüftumfangs.</p>
			`,
			measureText: `
			<li>TAILLE: Führ das Maßband waagerecht um die Stelle, an der die Taille am schmalsten ist (normalerweise dort, wo der Körper sich krümmt, wenn du deinen Oberkörper zur Seite neigst).</li>
			<li>HÜFTE: Führ das Maßband waagerecht um deine Hüfte und miss den größten Umfang.</li>
			<li>BEININNENLÄNGE: Wird an der Beininnenseite von oben bis zu den Fußsohlen gemessen.</li>
			`,
			table: `
			<div class="${tag}__table-wrapper selected-zoll">
				<div class="${tag}__table-header">
					<h3>Größentabelle</h3>
					<div class="toggle-container">
						<div class="toggle-background"></div>
						<div class="toggle-option">
							<input type="radio" id="zoll" name="${tag}__unit" value="zoll" checked="">
							<label for="zoll" style="">Zoll</label>
						</div>
						
						<div class="toggle-option">
							<input type="radio" id="cm" name="${tag}__unit" value="cm">
							<label for="cm">cm</label>
						</div>
					</div>
				</div>
				<div class="${tag}__table-body">
					<article role="region" tabindex="0">
						<table class="size-chart-table">
						<tbody>
							<tr>
								<th scope="row">Größe</th>
								<td data-column="1">XXS</td>
								<td data-column="2">XS</td>
								<td data-column="3">S</td>
								<td data-column="5">M</td>
								<td data-column="7">L</td>
								<td data-column="9">XL</td>
								<td data-column="11">XXL</td>
								<td data-column="13">3XL</td>
								<td data-column="15">4XL</td>
							</tr>
							<tr>
								<th scope="row">
									<span class="in">Taille (Zoll)</span>
									<span class="cm">Taille (cm)</span>
								</th>
								<td>
									<span class="in">22.5 - 25.5</span>
									<span class="cm">57 - 65</span>
								</td>
								<td>
									<span class="in">25.5 - 29</span>
									<span class="cm">65 - 73</span>
								</td>
								<td>
									<span class="in">29 - 32</span>
									<span class="cm">73 - 81</span>
								</td>
								<td>
									<span class="in">32 - 35</span>
									<span class="cm">81 - 89</span>
								</td>
								<td>
									<span class="in">35 - 38</span>
									<span class="cm">89 - 97</span>
								</td>
								<td>
									<span class="in">38 - 43</span>
									<span class="cm">97 - 109</span>
								</td>
								<td>
									<span class="in">43 - 47.5</span>
									<span class="cm">109 - 121</span>
								</td>
								<td>
									<span class="in">47.5 - 52.5</span>
									<span class="cm">121 - 133</span>
								</td>
								<td>
									<span class="in">52.5 - 57</span>
									<span class="cm">133 - 145</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span class="in">Hüfte (Zoll)</span>
									<span class="cm">Hüfte (cm)</span>
								</th>
								<td>
									<span class="in">28.5 - 31.5</span>
									<span class="cm">72 - 80</span>
								</td>
								<td>
									<span class="in">31.5 - 35</span>
									<span class="cm">80 - 88</span>
								</td>
								<td>
									<span class="in">35 - 37.5</span>
									<span class="cm">88 - 96</span>
								</td>
								<td>
									<span class="in">37.5 - 41</span>
									<span class="cm">96 - 104</span>
								</td>
								<td>
									<span class="in">41 - 44</span>
									<span class="cm">104 - 112</span>
								</td>
								<td>
									<span class="in">44 - 47</span>
									<span class="cm">112 - 120</span>
								</td>
								<td>
									<span class="in">47 - 50.5</span>
									<span class="cm">120 - 128</span>
								</td>
								<td>
									<span class="in">50.5 - 53.5</span>
									<span class="cm">128 - 136</span>
								</td>
								<td>
									<span class="in">53.5 - 58.5</span>
									<span class="cm">136 - 148</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span class="in">Höhe (Zoll)</span>
									<span class="cm">Höhe (cm)</span>
								</th>
								<td>
									<span class="in">< 5'7"</span>
									<span class="cm">< 170</span>
								</td>
								<td>
									<span class="in">5'7" - 6'0"</span>
									<span class="cm">170 - 183</span>
								</td>
								<td>
									<span class="in">5'7" - 6'0"</span>
									<span class="cm">170 - 183</span>
								</td>
								<td>
									<span class="in">5'7" - 6'0"</span>
									<span class="cm">170 - 183</span>
								</td>
								<td>
									<span class="in">5'7" - 6'0"</span>
									<span class="cm">170 - 183</span>
								</td>
								<td>
									<span class="in">5'7" - 6'0"</span>
									<span class="cm">170 - 183</span>
								</td>
								<td>
									<span class="in">5'7" - 6'0"</span>
									<span class="cm">170 - 183</span>
								</td>
								<td>
									<span class="in">5'7" - 6'0"</span>
									<span class="cm">170 - 183</span>
								</td>
								<td>
									<span class="in">5'7" - 6'0"</span>
									<span class="cm">170 - 183</span>
								</td>
							</tr>
						</tbody>
						</table>
					</article>
					<div class="overflow"></div>
				</div>
			</div>
			`,
		},

		women_top: {
			bodyClass: `womens-top`,
			headerTitle: `Damenoberteile`,
			headerText: `
			<p>Bei den Maßen in der Größentabelle handelt es sich um Körpermaße. Verwende die Tabelle unten, um deine Größe zu bestimmen. Wenn du waagerecht scrollst, werden dir weitere Größen angezeigt.</p>
			<p>Die Größen von Nike (M) Styles für Schwangere und Mütter entsprechen den regulären Größen vor der Schwangerschaft.</p>
			`,
			tipsText: `
			<p>Lange Oberteilgrößen: (173 cm bis 183 cm): Die Länge ist 4,5 cm länger als bei normalen Oberteilen. Die Ärmellänge wurde je nach Silhouette proportional angepasst. Lange Größen sind nur für ausgewählte Styles verfügbar.</p>
			<p>Wenn du zwischen zwei Größen liegst, bestell die kleinere Größe für eine engere Passform oder die größere für eine weitere Passform. Wenn du für deine Maße für Brustumfang und Taillenumfang zwei unterschiedliche Größenvorschläge erhältst, bestelle die Größe nach deinem Brustumfang.</p>
			`,
			measureText: `
			<li>BRUSTUMFANG: Führe das Maßband waagerecht um deine Brust und miss den größten Umfang.</li>
			<li>TAILLE: Führe das Maßband waagerecht um die Stelle, an der die Taille am schmalsten ist (normalerweise dort, wo der Körper sich krümmt, wenn du deinen Oberkörper zur Seite neigst).</li>
			<li>HÜFTE: Führe das Maßband waagerecht um deine Hüfte und miss den größten Umfang.</li>
			`,
			table: `
			<div class="${tag}__table-wrapper">
				<div class="${tag}__table-header">
					<h3>Größentabelle (XXS bis XXL)</h3>
				</div>
				<div class="${tag}__table-body">
					<article role="region" tabindex="0">
						<table class="size-chart-table">
						<tbody>
							<tr>
								<th scope="row">Größe</th>
								<td data-column="1">XXS</td>
								<td data-column="2">XS</td>
								<td data-column="3">S</td>
								<td data-column="5">M</td>
								<td data-column="7">L</td>
								<td data-column="9">XL</td>
								<td data-column="11">XXL</td>
							</tr>
							<tr>
								<th scope="row">
									<span>Brust­umfang (Zoll)</span>
								</th>
								<td>
									<span>27.5 - 29.5</span>
								</td>
								<td>
									<span>29.5 - 32.5</span>
								</td>
								<td>
									<span>32.5 - 35.5</span>
								</td>
								<td>
									<span>35.5 - 38</span>
								</td>
								<td>
									<span>38 - 41</span>
								</td>
								<td>
									<span>41 - 44.5</span>
								</td>
								<td>
									<span>44.5 - 48.5</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span>Brust­umfang (cm)</span>
								</th>
								<td>
									<span>70 - 76</span>
								</td>
								<td>
									<span>76 - 83</span>
								</td>
								<td>
									<span>83 - 90</span>
								</td>
								<td>
									<span>90 - 97</span>
								</td>
								<td>
									<span>97 - 104</span>
								</td>
								<td>
									<span>104 - 114</span>
								</td>
								<td>
									<span>114 - 124</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span>Taille (Zoll)</span>
								</th>
								<td>
									<span>21.25 - 23.5</span>
								</td>
								<td>
									<span>23.5 - 26</span>
								</td>
								<td>
									<span>26 - 29</span>
								</td>
								<td>
									<span>29 - 31.5</span>
								</td>
								<td>
									<span>31.5 - 34.5</span>
								</td>
								<td>
									<span>34.5 - 38.5</span>
								</td>
								<td>
									<span>38.5 - 42.5</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span>Taille (cm)</span>
								</th>
								<td>
									<span>54 - 60</span>
								</td>
								<td>
									<span>60 - 67</span>
								</td>
								<td>
									<span>67 - 74</span>
								</td>
								<td>
									<span>74 - 81</span>
								</td>
								<td>
									<span>81 - 88</span>
								</td>
								<td>
									<span>88 - 98</span>
								</td>
								<td>
									<span>98 - 108</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span>Hüfte (Zoll)</span>
								</th>
								<td>
									<span>30.5 - 33</span>
								</td>
								<td>
									<span>33 - 35.5</span>
								</td>
								<td>
									<span>35.5 - 38.5</span>
								</td>
								<td>
									<span>38.5 - 41</span>
								</td>
								<td>
									<span>41 - 44</span>
								</td>
								<td>
									<span>44 - 47</span>
								</td>
								<td>
									<span>47 - 50</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span>Hüfte (cm)</span>
								</th>
								<td>
									<span>78 - 84</span>
								</td>
								<td>
									<span>84 - 91</span>
								</td>
								<td>
									<span>91 -98</span>
								</td>
								<td>
									<span>98 - 105</span>
								</td>
								<td>
									<span>105 - 112</span>
								</td>
								<td>
									<span>112 - 120</span>
								</td>
								<td>
									<span>120 - 128</span>
								</td>
							</tr>
						</tbody>
						</table>
					</article>
					<div class="overflow"></div>
				</div>
			</div>
			<div class="${tag}__table-wrapper">
				<div class="${tag}__table-header">
					<h3>Umrechner für internationale Größen</h3>
				</div>
				<div class="${tag}__table-body">
					<article role="region" tabindex="0">
						<table class="size-chart-table">
						<tbody>
							<tr>
								<th scope="row">Größe</th>
								<td data-column="1">XXS</td>
								<td data-column="2">XS</td>
								<td data-column="3">S</td>
								<td data-column="5">M</td>
								<td data-column="7">L</td>
								<td data-column="9">XL</td>
								<td data-column="11">XXL</td>
							</tr>
							<tr>
								<th scope="row">
									<span>US</span>
								</th>
								<td>
									<span>0</span>
								</td>
								<td>
									<span>0 - 2</span>
								</td>
								<td>
									<span>4 - 6</span>
								</td>
								<td>
									<span>8 - 10</span>
								</td>
								<td>
									<span>12 - 14</span>
								</td>
								<td>
									<span>16 - 18</span>
								</td>
								<td>
									<span>20 - 22</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span>UK</span>
								</th>
								<td>
									<span>2</span>
								</td>
								<td>
									<span>4 - 6</span>
								</td>
								<td>
									<span>8 - 10</span>
								</td>
								<td>
									<span>12 - 14</span>
								</td>
								<td>
									<span>16 - 18</span>
								</td>
								<td>
									<span>20 - 22</span>
								</td>
								<td>
									<span>24 - 26</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span>EU</span>
								</th>
								<td>
									<span>30</span>
								</td>
								<td>
									<span>32 - 34</span>
								</td>
								<td>
									<span>36 - 38</span>
								</td>
								<td>
									<span>40 - 42</span>
								</td>
								<td>
									<span>44 - 46</span>
								</td>
								<td>
									<span>48 - 50</span>
								</td>
								<td>
									<span>52 - 54</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span>FR</span>
								</th>
								<td>
									<span>32</span>
								</td>
								<td>
									<span>34 - 36</span>
								</td>
								<td>
									<span>38 - 40</span>
								</td>
								<td>
									<span>42 - 44</span>
								</td>
								<td>
									<span>46 - 48</span>
								</td>
								<td>
									<span>50 - 52</span>
								</td>
								<td>
									<span>54 - 56</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span>IT</span>
								</th>
								<td>
									<span>34</span>
								</td>
								<td>
									<span>36 - 38</span>
								</td>
								<td>
									<span>40 - 42</span>
								</td>
								<td>
									<span>44 - 46</span>
								</td>
								<td>
									<span>48 - 50</span>
								</td>
								<td>
									<span>52 - 54</span>
								</td>
								<td>
									<span>56 - 58</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span>Koreanische Größe</span>
								</th>
								<td>
									<span>60</span>
								</td>
								<td>
									<span>65</span>
								</td>
								<td>
									<span>70</span>
								</td>
								<td>
									<span>75</span>
								</td>
								<td>
									<span>80</span>
								</td>
								<td>
									<span>85</span>
								</td>
								<td>
									<span>90</span>
								</td>
							</tr>
						</tbody>
						</table>
					</article>
					<div class="overflow"></div>
				</div>
			</div>
			`,
		},

		women_bottom: {
			bodyClass: `womens-bottom`,
			headerTitle: `Damenhose`,
			headerText: `
			<p>Bei den Maßen in der Größentabelle handelt es sich um Körpergrößen. Verwende die Tabelle unten, um deine Größe zu bestimmen. Wenn du waagerecht scrollst, werden dir weitere Größen angezeigt.</p>
			<p>Größen für Nike (M) Umstandsbekleidung entsprechen der Größe vor der Schwangerschaft.</p>
			`,
			tipsText: `
			<p>Kurze Hosenlänge (bis 163 cm): Die Beininnenlänge ist 5 cm kürzer und der Bund 1 cm tiefer geschnitten als bei der normalen Passform.</p>
			<p>Lange Hosenlänge: (173 cm bis 183 cm): Die Beininnenlänge ist 5 cm länger und der Bund 1,5 cm höher geschnitten als bei der normalen Passform.</p>
			<p>Lange und kurze Größen sind nur für ausgewählte Styles verfügbar. Die Beininnenlänge bezieht sich auf die Maße des Materials vom Schritt bis zum Saum. Details zur Beininnenlänge des jeweiligen Styles findest du auf der Produktseite.</p>
			<p>Wenn du zwischen zwei Größen liegst, bestell die kleinere Größe für eine engere Passform oder die größere für eine weitere Passform. Wenn du für deine Maße für Hüfte und Taillenumfang zwei unterschiedliche Größenvorschläge erhältst, bestelle die Größe nach deinem Hüftumfang.</p>
			`,
			measureText: `
			<li>TAILLE: Führe das Maßband waagerecht um die Stelle, an der deine Taille am schmalsten ist (normalerweise dort, wo dein Körper sich krümmt, wenn du deinen Oberkörper zur Seite neigst).</li>
			<li>HÜFTE: Miss dort, wo der Hüftumfang am größten ist. Halte das Maßband waagerecht.</li>
			`,
			table: `
			<div class="${tag}__table-wrapper selected-zoll">
				<div class="${tag}__table-header">
					<h3>Größentabelle (XXS bis 3X)</h3>
					<div class="toggle-container">
						<div class="toggle-background"></div>
						<div class="toggle-option">
							<input type="radio" id="zoll" name="${tag}__unit" value="zoll" checked="">
							<label for="zoll" style="">Zoll</label>
						</div>
						
						<div class="toggle-option">
							<input type="radio" id="cm" name="${tag}__unit" value="cm">
							<label for="cm">cm</label>
						</div>
					</div>
				</div>
				<div class="${tag}__table-body">
					<article role="region" tabindex="0">
						<table class="size-chart-table">
						<tbody>
							<tr>
								<th scope="row">Größe</th>
								<td data-column="1">XXS</td>
								<td data-column="2">XS</td>
								<td data-column="3">S</td>
								<td data-column="5">M</td>
								<td data-column="7">L</td>
								<td data-column="9">XL</td>
								<td data-column="11">XXL</td>
							</tr>
							<tr>
								<th scope="row">
									<span class="in">Taille (Zoll)</span>
									<span class="cm">Taille (cm)</span>
								</th>
								<td>
									<span class="in">21.25 - 23.5</span>
									<span class="cm">54 - 60</span>
								</td>
								<td>
									<span class="in">23.5 - 26</span>
									<span class="cm">60 - 67</span>
								</td>
								<td>
									<span class="in">26 - 29</span>
									<span class="cm">67 - 74</span>
								</td>
								<td>
									<span class="in">29 - 31.5</span>
									<span class="cm">74 - 81</span>
								</td>
								<td>
									<span class="in">31.5 - 34.5</span>
									<span class="cm">81 - 88</span>
								</td>
								<td>
									<span class="in">34.5 - 38.5</span>
									<span class="cm">88 - 98</span>
								</td>
								<td>
									<span class="in">38.5 - 42.5</span>
									<span class="cm">98 - 108</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span class="in">Hüfte (Zoll)</span>
									<span class="cm">Hüfte (cm)</span>
								</th>
								<td>
									<span class="in">30.5 - 33</span>
									<span class="cm">78 - 84</span>
								</td>
								<td>
									<span class="in">33 - 35.5</span>
									<span class="cm">84 - 91</span>
								</td>
								<td>
									<span class="in">35.5 - 38.5</span>
									<span class="cm">91 -98</span>
								</td>
								<td>
									<span class="in">38.5 - 41</span>
									<span class="cm">98 - 105</span>
								</td>
								<td>
									<span class="in">41 - 44</span>
									<span class="cm">105 - 112</span>
								</td>
								<td>
									<span class="in">44 - 47</span>
									<span class="cm">112 - 120</span>
								</td>
								<td>
									<span class="in">47 - 50</span>
									<span class="cm">120 - 128</span>
								</td>
							</tr>
						</tbody>
						</table>
					</article>
					<div class="overflow"></div>
				</div>
			</div>
			<div class="${tag}__table-wrapper selected-zoll">
				<div class="${tag}__table-header">
					<h3>Umrechner für internationale Größen</h3>
					<div class="toggle-container">
						<div class="toggle-background"></div>
						<div class="toggle-option">
							<input type="radio" id="zoll" name="${tag}__unit2" value="zoll" checked="">
							<label for="zoll" style="">Zoll</label>
						</div>
						
						<div class="toggle-option">
							<input type="radio" id="cm" name="${tag}__unit2" value="cm">
							<label for="cm">cm</label>
						</div>
					</div>
				</div>
				<div class="${tag}__table-body">
					<article role="region" tabindex="0">
						<table class="size-chart-table">
						<tbody>
							<tr>
								<th scope="row">Größe</th>
								<td data-column="1">0X</td>
								<td data-column="2">1X</td>
								<td data-column="3">2X</td>
								<td data-column="5">3X</td>
								<td data-column="7">4X</td>
							</tr>
							<tr>
								<th scope="row">
									<span class="in">Taille (Zoll)</span>
									<span class="cm">Taille (cm)</span>
								</th>
								<td>
									<span class="in">40 - 43</span>
									<span class="cm">101.5 - 108.5</span>
								</td>
								<td>
									<span class="in">43 - 45.5</span>
									<span class="cm">108.5 - 115.5</span>
								</td>
								<td>
									<span class="in">45.5 - 49</span>
									<span class="cm">115.5 - 124</span>
								</td>
								<td>
									<span class="in">49 - 53</span>
									<span class="cm">124 - 134</span>
								</td>
								<td>
									<span class="in">53 - 57</span>
									<span class="cm">134 - 144</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span class="in">Hüfte (Zoll)</span>
									<span class="cm">Hüfte (cm)</span>
								</th>
								<td>
									<span class="in">48 - 51</span>
									<span class="cm">122.5 - 129.5</span>
								</td>
								<td>
									<span class="in">51 - 54</span>
									<span class="cm">129.5 - 136.5</span>
								</td>
								<td>
									<span class="in">54 - 57</span>
									<span class="cm">136.5 - 145</span>
								</td>
								<td>
									<span class="in">57 - 61</span>
									<span class="cm">145 - 155</span>
								</td>
								<td>
									<span class="in">61 - 65</span>
									<span class="cm">155 - 165</span>
								</td>
							</tr>
						</tbody>
						</table>
					</article>
					<div class="overflow"></div>
				</div>
			</div>
			<div class="${tag}__table-wrapper">
				<div class="${tag}__table-header">
					<h3>Umrechner für internationale Größen</h3>
				</div>
				<div class="${tag}__table-body">
					<article role="region" tabindex="0">
						<table class="size-chart-table">
						<tbody>
							<tr>
								<th scope="row">Größe</th>
								<td data-column="1">XXS</td>
								<td data-column="2">XS</td>
								<td data-column="3">S</td>
								<td data-column="5">M</td>
								<td data-column="7">L</td>
								<td data-column="9">XL</td>
								<td data-column="11">XXL</td>
							</tr>
							<tr>
								<th scope="row">
									<span>US</span>
								</th>
								<td>
									<span>0</span>
								</td>
								<td>
									<span>0 - 2</span>
								</td>
								<td>
									<span>4 - 6</span>
								</td>
								<td>
									<span>8 - 10</span>
								</td>
								<td>
									<span>12 - 14</span>
								</td>
								<td>
									<span>16 - 18</span>
								</td>
								<td>
									<span>20 - 22</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span>UK</span>
								</th>
								<td>
									<span>2</span>
								</td>
								<td>
									<span>4 - 6</span>
								</td>
								<td>
									<span>8 - 10</span>
								</td>
								<td>
									<span>12 - 14</span>
								</td>
								<td>
									<span>16 - 18</span>
								</td>
								<td>
									<span>20 - 22</span>
								</td>
								<td>
									<span>24 - 26</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span>EU</span>
								</th>
								<td>
									<span>30</span>
								</td>
								<td>
									<span>32 - 34</span>
								</td>
								<td>
									<span>36 - 38</span>
								</td>
								<td>
									<span>40 - 42</span>
								</td>
								<td>
									<span>44 - 46</span>
								</td>
								<td>
									<span>48 - 50</span>
								</td>
								<td>
									<span>52 - 54</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span>FR</span>
								</th>
								<td>
									<span>32</span>
								</td>
								<td>
									<span>34 - 36</span>
								</td>
								<td>
									<span>38 - 40</span>
								</td>
								<td>
									<span>42 - 44</span>
								</td>
								<td>
									<span>46 - 48</span>
								</td>
								<td>
									<span>50 - 52</span>
								</td>
								<td>
									<span>54 - 56</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span>IT</span>
								</th>
								<td>
									<span>34</span>
								</td>
								<td>
									<span>36 - 38</span>
								</td>
								<td>
									<span>40 - 42</span>
								</td>
								<td>
									<span>44 - 46</span>
								</td>
								<td>
									<span>48 - 50</span>
								</td>
								<td>
									<span>52 - 54</span>
								</td>
								<td>
									<span>56 - 58</span>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<span>Koreanische Größe</span>
								</th>
								<td>
									<span>60</span>
								</td>
								<td>
									<span>65</span>
								</td>
								<td>
									<span>70</span>
								</td>
								<td>
									<span>75</span>
								</td>
								<td>
									<span>80</span>
								</td>
								<td>
									<span>85</span>
								</td>
								<td>
									<span>90</span>
								</td>
							</tr>
						</tbody>
						</table>
					</article>
					<div class="overflow"></div>
				</div>
			</div>
			`,
		},
	};

	const sizeChartModal = (data, category) => {
		return `
			<div class="${tag}__size-chart-modal">
				<span class="${tag}__close">
					<svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<rect y="0.5" width="19" height="19" fill="url(#pattern0_6002_1323)"/>
					<defs>
					<pattern id="pattern0_6002_1323" patternContentUnits="objectBoundingBox" width="1" height="1">
					<use xlink:href="#image0_6002_1323" transform="scale(0.00625)"/>
					</pattern>
					<image id="image0_6002_1323" width="160" height="160" preserveAspectRatio="none" xlink:href="data:image/png;base64,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"/>
					</defs>
					</svg>
				</span>
				<div class="${tag}__modal-container">
					<div class="${tag}__container-body">
						<div class="${tag}__header">
							<h2>${category.headerTitle}</h2>
							<div>${category.headerText}</div>
						</div>
						<div class="${tag}__table-container">
							${category.table}
						</div>
						<div class="${tag}__tips">
							<h3>${data.tipsTitle}</h3>
							<div>${category.tipsText}</div>
						</div>
						<div class="${tag}__measure">
							<h3>${data.measureTitle}</h3>
							<ul>
								${category.measureText}
							</ul>
						</div>
					</div>
				</div>
			</div>
		`;
	};

	window[tag].initVariation = () => {
		let ele;

		utils.waitUntil(
			() => {
				ele = document.querySelector("sni-lib-selected-size");

				return !!ele && window[tag].productData;
			},
			() => {
				const pageData = data[`${window[tag].productData.gender}_${window[tag].productData.category}`];

				document.body.classList.add(`${tag}`);
				document.body.classList.add(`${tag}__${pageData.bodyClass}`);

				[`${tag}__size-chart-link`, `${tag}__size-chart-modal`].forEach((className) => {
					if (document.querySelector(`.${className}`)) {
						document.querySelector(`.${className}`).remove();
					}
				});

				ele.insertAdjacentHTML(
					`beforebegin`,
					`
					<div class="${tag}__size-chart-link">
						<p>
							<svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M20.7 5.5V12.25C20.7 12.6478 20.5419 13.0294 20.2606 13.3107C19.9793 13.592 19.5978 13.75 19.2 13.75H2.69995C2.30213 13.75 1.9206 13.592 1.63929 13.3107C1.35799 13.0294 1.19995 12.6478 1.19995 12.25V5.5M4.50795 3.25H17.393" stroke="#484B51" stroke-width="1.5"/>
								<path d="M14.9788 0.598999L17.63 3.249L14.9788 5.902M7.40118 0.598999L4.75 3.249L7.40118 5.902M16.4384 14V11.5M11.19 14V11.5M5.94163 14V11.5" stroke="#484B51" stroke-width="1.5"/>
							</svg>
							Größentabelle
						</p>
					</div>
					`
				);

				const modalString = sizeChartModal(data, pageData);

				document.body.insertAdjacentHTML(`beforeend`, modalString);
				listener();

				utils.log("changes made", tag);
			},
			tag,
			30000
		);

		eventListener();
	};

	const eventListener = () => {
		document.addEventListener(`click`, (e) => {
			const el = e.target;

			if (el.closest(`.${tag}__size-chart-link p`)) {
				document.body.classList.add(`${tag}__sizeChart-visible`);

				utils.segmentUser("[CONV] [2.0] Used Size Guide Segment", "true", tag);
			}

			if (el.closest(`.${tag}__close`)) {
				document.body.classList.remove(`${tag}__sizeChart-visible`);
			}
		});

		document.addEventListener("change", (e) => {
			if (e.target && e.target.name.includes(`${tag}__unit`)) {
				const container = e.target.closest(`.${tag}__table-wrapper`);
				container.classList.remove("selected-zoll", "selected-cm");
				container.classList.add(`selected-${e.target.value}`);
			}
		});
	};

	const listener = ()=> {
		window.addEventListener("locationchange", function () {
			setTimeout(()=>{
				document.body.classList.remove(`${tag}__sizeChart-visible`);
			},20)
		});
		history.pushState = ((f) =>
			function pushState() {
				var ret = f.apply(this, arguments);
				window.dispatchEvent(new Event("pushstate"));
				window.dispatchEvent(new Event("locationchange"));
				return ret;
			})(history.pushState);
		history.replaceState = ((f) =>
			function replaceState() {
				var ret = f.apply(this, arguments);
				window.dispatchEvent(new Event("replacestate"));
				window.dispatchEvent(new Event("locationchange"));
				return ret;
			})(history.replaceState);
		window.addEventListener("popstate", () => {
			window.dispatchEvent(new Event("locationchange"));
		});
	}

	window[tag].variation = "variation-1";
	utils.handleActivation(tag);
})(window);