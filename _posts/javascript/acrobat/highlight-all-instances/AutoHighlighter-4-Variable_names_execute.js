/*
    ...
    ...
*/
function highlighterFind_DEMO() {
    /*
        ...
        Dialog part
        ...
    */
    var _0x9417xd, _0x9417xe;
    var _0x9417xf = 0;
    var _0x9417x10 = 0;
    var _0x9417x11 = color.gray;
    var _0x9417x12 = new Array();
    if (isCaseSensitive) {
        _0x9417x12 = termToHighlight.split(' ')
    } else {
        _0x9417x12 = termToHighlight.toLowerCase().split(' ')
    };
    if (commentToAdd == '') {
        commentToAdd = termToHighlight
    };
    var _0x9417x13 = app.thermometer;
    _0x9417x13.duration = this.numPages;
    _0x9417x13.begin();
    if (_0x9417x12.length > 1) {
        pagesLoop1: for (var _0x9417xc = 0; _0x9417xc < this.numPages; _0x9417xc++) {
            _0x9417x13.value = _0x9417xc;
            _0x9417x13.text = 'Processing page ' + (_0x9417xc + 1) + '/' + this.numPages;
            _0x9417xe = this.getPageNumWords(_0x9417xc);
            for (var _0x9417x14 = 0; _0x9417x14 < _0x9417xe - (_0x9417x12.length); _0x9417x14++) {
                _0x9417xd = this.getPageNthWord(_0x9417xc, _0x9417x14);
                if (!isCaseSensitive) {
                    _0x9417xd = _0x9417xd.toLowerCase()
                };
                var _0x9417x15 = 0;
                if (_0x9417x12[0] == _0x9417xd) {
                    _0x9417x15++;
                    for (var _0x9417x16 = 1; _0x9417x16 < _0x9417x12.length; _0x9417x16++) {
                        nextWord = this.getPageNthWord(_0x9417xc, _0x9417x14 + _0x9417x16);
                        if (!isCaseSensitive) {
                            nextWord = nextWord.toLowerCase()
                        };
                        if (_0x9417x12[_0x9417x16] == nextWord) {
                            _0x9417x15++
                        }
                    }
                };
                if (_0x9417x15 == _0x9417x12.length) {
                    _0x9417xf++;
                    var _0x9417x17 = new Array;
                    for (_0x9417x16 = 0; _0x9417x16 < _0x9417x12.length; _0x9417x16++) {
                        var _0x9417x18 = this.getPageNthWordQuads(_0x9417xc, _0x9417x14 + _0x9417x16).toString().split(',');
                        for (q = 0; q < _0x9417x18.length; q++) {
                            _0x9417x18[q] = _0x9417x18[q] * 1
                        };
                        _0x9417x17[_0x9417x16] = _0x9417x18
                    };
                    this.addAnnot({
                        page: _0x9417xc,
                        strokeColor: selectedColor,
                        type: 'Highlight',
                        quads: _0x9417x17,
                        author: authorToAdd,
                        contents: commentToAdd
                    });
                    if (_0x9417xf >= 3) {
                        break pagesLoop1
                    }
                }
            }
        };
    }
    else {
        pagesLoop2: for (var _0x9417xc = 0; _0x9417xc < this.numPages; _0x9417xc++) {
            _0x9417x13.value = _0x9417xc;
            _0x9417x13.text = 'Processing page ' + (_0x9417xc + 1) + '/' + this.numPages;
            _0x9417xe = this.getPageNumWords(_0x9417xc);
            for (var _0x9417x14 = 0; _0x9417x14 < _0x9417xe; _0x9417x14++) {
                _0x9417xd = this.getPageNthWord(_0x9417xc, _0x9417x14);
                var _0x9417x19;
                if (!isCaseSensitive) {
                    _0x9417x19 = _0x9417xd.toLowerCase().search(termToHighlight.toLowerCase())
                } else {
                    _0x9417x19 = _0x9417xd.search(termToHighlight)
                };
                if (_0x9417x19 > -1) {
                    if (_0x9417x19 == 0 && _0x9417xd.length == termToHighlight.length) {
                        _0x9417xf++;
                        this.addAnnot({
                            page: _0x9417xc,
                            strokeColor: selectedColor,
                            type: 'Highlight',
                            quads: this.getPageNthWordQuads(_0x9417xc, _0x9417x14),
                            author: authorToAdd,
                            contents: commentToAdd
                        });
                        if (_0x9417xf >= 3) {
                            break pagesLoop2
                        }
                    } else {
                        if (shouldMatchPartials) {
                            _0x9417x10++;
                            this.addAnnot({
                                page: _0x9417xc,
                                strokeColor: _0x9417x11,
                                type: 'Highlight',
                                quads: this.getPageNthWordQuads(_0x9417xc, _0x9417x14),
                                author: authorToAdd,
                                contents: commentToAdd + ' (partial)'
                            });
                            if (_0x9417x10 >= 3) {
                                break pagesLoop2
                            }
                        }
                    }
                }
            }
        };
    };
    _0x9417x13.end();
    var _0x9417x1a = 'Highlighted ' + _0x9417xf + ' matches';
    if (_0x9417x10 > 0) {
        _0x9417x1a += ' and ' + _0x9417x10 + ' partial matches'
    };
    _0x9417x1a += '.';
    app.alert(_0x9417x1a, 3)
}