function highlighterFind_DEMO() {
/*
    ...
*/
    if (termsToHighlightArray.length > 1) {
        pagesLoop1: for (var i = 0; i < this.numPages; i++) {
            for (var j = 0; j < pageWordCount - (termsToHighlightArray.length); j++) {
            /*
                ...
            */
                if (numberOfFoundWords == termsToHighlightArray.length) {
                    highlightedMatchesCount++;
                    /*
                        ...
                    */
                    if (highlightedMatchesCount >= 3) {
                        break pagesLoop1
                    }
                }
            }
        };
    }
    else {
        pagesLoop2: for (var i = 0; i < this.numPages; i++) {
            for (var j = 0; j < pageWordCount; j++) {
            /*
                ...
            */
                if (positionOfMatch > -1) {
                    if (positionOfMatch == 0 && pageNthWord.length == termToHighlight.length) {
                        highlightedMatchesCount++;
                        /*
                            ...
                        */
                        if (highlightedMatchesCount >= 3) {
                            break pagesLoop2
                        }
                    } else {
                        if (shouldMatchPartials) {
                            highlightedPartialMatchesCount++;
                            /*
                                ...
                            */
                            if (highlightedPartialMatchesCount >= 3) {
                                break pagesLoop2
                            }
                        }
                    }
                }
            }
        };
    };
    /*
        ...
    */
}