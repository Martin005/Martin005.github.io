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
    var termToHighlight;
    var commentToAdd;
    var selectedColor;
    var authorToAdd;
    var shouldMatchPartials;
    var isCaseSensitive;
    var mainDialog = {
        initialize: function(dialog) {
            this.loadDefaults(dialog)
        },
        cancel: function(dialog) {
            return
        },
        destroy: function(dialog) {
            return
        },
        validate: function(dialog) {
            var dialogValues = dialog.store();
            if (dialogValues.str1 == '') {
                app.alert('You must enter the term to highlight.');
                return false
            };
            return true
        },
        commit: function(dialog) {
            var dialogValues = dialog.store();
            var colors = dialogValues.col1;
            for (var colorIndex in colors) {
                if (colors[colorIndex] > 0) {
                    switch (colors[colorIndex]) {
                        case 1:
                            selectedColor = color.yellow;
                            break;
                        case 2:
                            selectedColor = color.red;
                            break;
                        case 3:
                            selectedColor = color.green;
                            break;
                        case 4:
                            selectedColor = color.blue;
                            break;
                        case 5:
                            selectedColor = color.transparent;
                            break
                    };
                    break
                }
            };
            termToHighlight = dialogValues.str1;
            commentToAdd = dialogValues.cmt1;
            authorToAdd = dialogValues.auth;
            shouldMatchPartials = dialogValues.part;
            isCaseSensitive = dialogValues.case
        },
        loadDefaults: function(dialog) {
            dialog.load({
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
    if (app.execDialog(mainDialog) != 'ok') {
        return
    };
    var pageNthWord, pageWordCount;
    var highlightedMatchesCount = 0;
    var highlightedPartialMatchesCount = 0;
    var colorToStrokeWith = color.gray;
    var termsToHighlightArray = new Array();
    if (isCaseSensitive) {
        termsToHighlightArray = termToHighlight.split(' ')
    } else {
        termsToHighlightArray = termToHighlight.toLowerCase().split(' ')
    };
    if (commentToAdd == '') {
        commentToAdd = termToHighlight
    };
    var thermometer = app.thermometer;
    thermometer.duration = this.numPages;
    thermometer.begin();
    if (termsToHighlightArray.length > 1) {
        pagesLoop1: for (var i = 0; i < this.numPages; i++) {
            thermometer.value = i;
            thermometer.text = 'Processing page ' + (i + 1) + '/' + this.numPages;
            pageWordCount = this.getPageNumWords(i);
            for (var j = 0; j < pageWordCount - (termsToHighlightArray.length); j++) {
                pageNthWord = this.getPageNthWord(i, j);
                if (!isCaseSensitive) {
                    pageNthWord = pageNthWord.toLowerCase()
                };
                var numberOfFoundWords = 0;
                if (termsToHighlightArray[0] == pageNthWord) {
                    numberOfFoundWords++;
                    for (var k = 1; k < termsToHighlightArray.length; k++) {
                        nextWord = this.getPageNthWord(i, j + k);
                        if (!isCaseSensitive) {
                            nextWord = nextWord.toLowerCase()
                        };
                        if (termsToHighlightArray[k] == nextWord) {
                            numberOfFoundWords++
                        }
                    }
                };
                if (numberOfFoundWords == termsToHighlightArray.length) {
                    highlightedMatchesCount++;
                    var quadsArray = new Array;
                    for (k = 0; k < termsToHighlightArray.length; k++) {
                        var theNthWordQuads = this.getPageNthWordQuads(i, j + k)
                                                    .toString().split(',');
                        for (q = 0; q < theNthWordQuads.length; q++) {
                            theNthWordQuads[q] = theNthWordQuads[q] * 1
                        };
                        quadsArray[k] = theNthWordQuads
                    };
                    this.addAnnot({
                        page: i,
                        strokeColor: selectedColor,
                        type: 'Highlight',
                        quads: quadsArray,
                        author: authorToAdd,
                        contents: commentToAdd
                    });
                    if (highlightedMatchesCount >= 3) {
                        break pagesLoop1
                    }
                }
            }
        };
    }
    else {
        pagesLoop2: for (var i = 0; i < this.numPages; i++) {
            thermometer.value = i;
            thermometer.text = 'Processing page ' + (i + 1) + '/' + this.numPages;
            pageWordCount = this.getPageNumWords(i);
            for (var j = 0; j < pageWordCount; j++) {
                pageNthWord = this.getPageNthWord(i, j);
                var positionOfMatch;
                if (!isCaseSensitive) {
                    positionOfMatch = pageNthWord.toLowerCase()
                                        .search(termToHighlight.toLowerCase())
                } else {
                    positionOfMatch = pageNthWord.search(termToHighlight)
                };
                if (positionOfMatch > -1) {
                    if (positionOfMatch == 0 && pageNthWord.length == termToHighlight.length) {
                        highlightedMatchesCount++;
                        this.addAnnot({
                            page: i,
                            strokeColor: selectedColor,
                            type: 'Highlight',
                            quads: this.getPageNthWordQuads(i, j),
                            author: authorToAdd,
                            contents: commentToAdd
                        });
                        if (highlightedMatchesCount >= 3) {
                            break pagesLoop2
                        }
                    } else {
                        if (shouldMatchPartials) {
                            highlightedPartialMatchesCount++;
                            this.addAnnot({
                                page: i,
                                strokeColor: colorToStrokeWith,
                                type: 'Highlight',
                                quads: this.getPageNthWordQuads(i, j),
                                author: authorToAdd,
                                contents: commentToAdd + ' (partial)'
                            });
                            if (highlightedPartialMatchesCount >= 3) {
                                break pagesLoop2
                            }
                        }
                    }
                }
            }
        };
    };
    thermometer.end();
    var messageToDisplay = 'Highlighted ' + highlightedMatchesCount + ' matches';
    if (highlightedPartialMatchesCount > 0) {
        messageToDisplay += ' and ' + highlightedPartialMatchesCount + ' partial matches'
    };
    messageToDisplay += '.';
    app.alert(messageToDisplay, 3)
}