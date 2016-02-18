d3.csv("wc_result.csv", function(data){
	var h = 800;
	var w = 800;
	data = data.splice(0, 200); //処理wordを1200件に絞る

	var random = d3.random.irwinHall(2)

	var countMax = d3.max(data, function(d){ return d.count} );
	var sizeScale = d3.scale.linear().domain([0, countMax]).range([10, 100])
	var colorScale = d3.scale.category20();

	var words = data.map(function(d) {
		return {
		text: d.word,
		size: sizeScale(d.count) //頻出カウントを文字サイズに反映
		};
	});

	d3.layout.cloud().size([w, h])
		.words(words)
		.rotate(function() { return Math.round(1-random()) *90; }) //ランダムに文字を90度回転
		.font("Impact")
		.fontSize(function(d) { return d.size; })
		.on("end", draw) //描画関数の読み込み
		.start();

	//wordcloud 描画
	function draw(words) {
		d3.select("svg")
		.attr({
			"width": w,
			"height": h
		})
		.append("g")
		.attr("transform", "translate(150,150)")
		.selectAll("text")
		.data(words)
		.enter()
		.append("text")
		.style({
			"font-family": "Impact",
			"font-size":function(d) { return d.size + "px"; },
			"fill": function(d, i) { return colorScale(i); }
		})
		.attr({
			"text-anchor":"middle",
			"transform": function(d) {
				return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			}
		})
		.text(function(d) { return d.text; })
		.on("click", function(d, i){
			var url = "http://www.google.co.jp/search?q=" + d.text
			window.open(url, "_blank");
		});

	}

});
