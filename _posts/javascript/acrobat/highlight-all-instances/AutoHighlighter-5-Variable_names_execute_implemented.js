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