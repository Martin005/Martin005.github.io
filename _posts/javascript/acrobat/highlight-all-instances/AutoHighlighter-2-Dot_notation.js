if (app.viewerVersion < 10) {
    app.addMenuItem({
        cName: 'AutoHighlighterDEMO',
        cUser: 'Auto Highlighter (DEMO)',
        cParent: 'Tools',
        nPos: -1,
        cExec: 'highlighterFind_DEMO()',
        cEnable: 'event.rc = (event.target != null);'
    })
} else {
    app.addToolButton({
        cName: 'AutoHighlighterDEMO',
        cLabel: 'Auto Highlighter (DEMO)',
        cTooltext: 'Auto Highlighter (DEMO)',
        cExec: 'highlighterFind_DEMO()',
        cEnable: 'event.rc = (event.target != null);'
    })
};

function highlighterFind_DEMO() {
    app.alert(`This is the DEMO version of this tool.
        It will only highlight up to 3 matches in the file.
        Please purchase the full version to get the unlimited functionality.`, 3);
    var _0x9417x2;
    var _0x9417x3;
    var _0x9417x4;
    var _0x9417x5;
    var _0x9417x6;
    var _0x9417x7;
    var _0x9417x8 = {
        initialize: function(_0x9417x9) {
            this.loadDefaults(_0x9417x9)
        },
        cancel: function(_0x9417x9) {
            return
        },
        destroy: function(_0x9417x9) {
            return
        },
        validate: function(_0x9417x9) {
            var _0x9417xa = _0x9417x9.store();
            if (_0x9417xa.str1 == '') {
                app.alert('You must enter the term to highlight.');
                return false
            };
            return true
        },
        commit: function(_0x9417x9) {
            var _0x9417xa = _0x9417x9.store();
            var _0x9417xb = _0x9417xa.col1;
            for (var _0x9417xc in _0x9417xb) {
                if (_0x9417xb[_0x9417xc] > 0) {
                    switch (_0x9417xb[_0x9417xc]) {
                        case 1:
                            _0x9417x4 = color.yellow;
                            break;
                        case 2:
                            _0x9417x4 = color.red;
                            break;
                        case 3:
                            _0x9417x4 = color.green;
                            break;
                        case 4:
                            _0x9417x4 = color.blue;
                            break;
                        case 5:
                            _0x9417x4 = color.transparent;
                            break
                    };
                    break
                }
            };
            _0x9417x2 = _0x9417xa.str1;
            _0x9417x3 = _0x9417xa.cmt1;
            _0x9417x5 = _0x9417xa.auth;
            _0x9417x6 = _0x9417xa.part;
            _0x9417x7 = _0x9417xa.case
        },
        loadDefaults: function(_0x9417x9) {
            _0x9417x9.load({
                col1: {
                    "Yellow": 1,
                    "Red": -2,
                    "Green": -3,
                    "Blue": -4,
                    "Transparent": -5
                }
            })
        },
        description: {
            name: 'Auto-Highlighter',
            align_children: 'align_right',
            width: 350,
            height: 200,
            elements: [{
                type: 'cluster',
                name: '',
                align_children: 'align_left',
                elements: [{
                    type: 'view',
                    align_children: 'align_distribute',
                    elements: [{
                        type: 'static_text',
                        name: 'The term to highlight: '
                    }, {
                        item_id: 'str1',
                        type: 'edit_text',
                        alignment: 'align_right',
                        width: 300,
                        height: 20
                    }]
                }, {
                    type: 'view',
                    align_children: 'align_distribute',
                    elements: [{
                        type: 'static_text',
                        name: 'The comment to add: '
                    }, {
                        item_id: 'cmt1',
                        type: 'edit_text',
                        alignment: 'align_right',
                        width: 300,
                        height: 20
                    }]
                }, {
                    type: 'view',
                    align_children: 'align_distribute',
                    elements: [{
                        type: 'static_text',
                        name: 'Author: '
                    }, {
                        item_id: 'auth',
                        type: 'edit_text',
                        alignment: 'align_right',
                        width: 300,
                        height: 20
                    }]
                }, {
                    type: 'view',
                    align_children: 'align_distribute',
                    elements: [{
                        type: 'static_text',
                        name: 'Color: '
                    }, {
                        type: 'popup',
                        item_id: 'col1',
                        alignment: 'align_right',
                        width: 100
                    }]
                }, {
                    type: 'view',
                    align_children: 'align_distribute',
                    elements: [{
                        type: 'static_text',
                        name: 'Match partials? (only for single word)'
                    }, {
                        type: 'check_box',
                        item_id: 'part',
                        alignment: 'align_right',
                        width: 300,
                        height: 20
                    }]
                }, {
                    type: 'view',
                    align_children: 'align_distribute',
                    elements: [{
                        type: 'static_text',
                        name: 'Case sensitive?'
                    }, {
                        type: 'check_box',
                        item_id: 'case',
                        alignment: 'align_right',
                        width: 300,
                        height: 20
                    }]
                }, {
                    alignment: 'align_right',
                    type: 'ok_cancel',
                    ok_name: 'OK',
                    cancel_name: 'Cancel'
                }]
            }]
        }
    };
    if (app.execDialog(_0x9417x8) != 'ok') {
        return
    };
    var _0x9417xd, _0x9417xe;
    var _0x9417xf = 0;
    var _0x9417x10 = 0;
    var _0x9417x11 = color.gray;
    var _0x9417x12 = new Array();
    if (_0x9417x7) {
        _0x9417x12 = _0x9417x2.split(' ')
    } else {
        _0x9417x12 = _0x9417x2.toLowerCase().split(' ')
    };
    if (_0x9417x3 == '') {
        _0x9417x3 = _0x9417x2
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
                if (!_0x9417x7) {
                    _0x9417xd = _0x9417xd.toLowerCase()
                };
                var _0x9417x15 = 0;
                if (_0x9417x12[0] == _0x9417xd) {
                    _0x9417x15++;
                    for (var _0x9417x16 = 1; _0x9417x16 < _0x9417x12.length; _0x9417x16++) {
                        nextWord = this.getPageNthWord(_0x9417xc, _0x9417x14 + _0x9417x16);
                        if (!_0x9417x7) {
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
                        strokeColor: _0x9417x4,
                        type: 'Highlight',
                        quads: _0x9417x17,
                        author: _0x9417x5,
                        contents: _0x9417x3
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
                if (!_0x9417x7) {
                    _0x9417x19 = _0x9417xd.toLowerCase().search(_0x9417x2.toLowerCase())
                } else {
                    _0x9417x19 = _0x9417xd.search(_0x9417x2)
                };
                if (_0x9417x19 > -1) {
                    if (_0x9417x19 == 0 && _0x9417xd.length == _0x9417x2.length) {
                        _0x9417xf++;
                        this.addAnnot({
                            page: _0x9417xc,
                            strokeColor: _0x9417x4,
                            type: 'Highlight',
                            quads: this.getPageNthWordQuads(_0x9417xc, _0x9417x14),
                            author: _0x9417x5,
                            contents: _0x9417x3
                        });
                        if (_0x9417xf >= 3) {
                            break pagesLoop2
                        }
                    } else {
                        if (_0x9417x6) {
                            _0x9417x10++;
                            this.addAnnot({
                                page: _0x9417xc,
                                strokeColor: _0x9417x11,
                                type: 'Highlight',
                                quads: this.getPageNthWordQuads(_0x9417xc, _0x9417x14),
                                author: _0x9417x5,
                                contents: _0x9417x3 + ' (partial)'
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