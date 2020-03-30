/*
    ...
    ...
*/
function highlighterFind_DEMO() {
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
    /*
        ...
        Execute part
        ...
    */
}