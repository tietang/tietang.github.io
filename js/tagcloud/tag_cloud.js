// var fill = d3.scale.category10();

var fill = d3.scale.category20b();
// var words = $("#tag-cloud-tags").text().split(",")
var maxsize = 1;
var layout = d3.layout.cloud()
    .size([800, 800])
    .words(tagWords.map(function (d) {
        return {text: d.text, size: 9 + 100*(d.size / 10)};
    }))
    // .words(words.map(function (d) {
    //     return {text: d, size: 10 + Math.random() * 90};
    // }))
    .padding(5)
    .rotate(function () {
        // return ~~(Math.random() * 2) * 90;
        return (~~(Math.random() * 6) - 3) * 30;
        // return ~~(Math.random() * 5) * 30 - 60;
    })
    .font("Impact")
    .fontSize(function (d) {
        return d.size;
    })
    .on("end", draw);

layout.start();

function draw(words) {
    d3.select("#cloud-tags").append("svg")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function (d) {
            return d.size + "px";
        })
        .style("font-family", "Impact")
        .attr("text-anchor", "middle")
        .attr("fill", function (d) {
            return fill(d.size+Math.random() * 90)
        })
        .attr("transform", function (d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d) {
            return d.text;
        });
}