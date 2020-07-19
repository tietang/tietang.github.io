var layout = d3.layout.cloud()
    .size([600, 400])
    .canvas(function () {
        return new Canvas(200, 200);
        // return createCanvas(200, 200);
    })
    .padding(2)
    .rotate(function () {
        return (~~(Math.random() * 6) - 3) * 30;
    })
    .font("Impact")
    .fontSize(function (d) {
        return d.size;
    });


//
var fill = d3.scale.category10();
// var fill = d3.scale.category20b();

function tagcloudHelper(tags,words) {
    console(tags)
    if ((!tags || !tags.hasOwnProperty('length'))) {
        tags = this.site.tags;
    }

    if (!tags || !tags.length) return '';
    var result = [];
    tags = tags.sort('name', 1);
    // Ignore tags with zero posts
    tags = tags.filter(function (tag) {
        return tag.length;
    });
    var maxsize = 1;
    tags.sort('length').forEach(function (tag) {
        var length = tag.length;
        if (length > maxsize)
            maxsize = length;
    });
    var arr = [], words;
    tags.forEach(function (tag) {
        arr.push({"name": tag.name, "num": tag.length});
    });
    words = arr.map(function (d) {
        var text = d.name.replace(/[^\x00-\xff]/g, "ab");
        return {name: d.name, text: text, size: Math.log(d.num) / (Math.log(maxsize) - Math.log(1)) * 15 + 30};
    });

    layout.words(words);
    layout.start();
    result.push('<svg width="600" height="400"><g transform="translate(300,200)">');
    words.forEach(function (word, i) {
        result.push(
            '<text text-anchor="middle" fill="' + fill(i) + '" transform="translate(' + word.x + ',' + word.y + ')rotate(' +
            word.rotate + ')" style="font-size:' + word.size + 'px;font-family:Impact">' + word.name + '</text>'
        );
    });
    result.push('</g></svg>');
    return result.join('');
}
