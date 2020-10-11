const inputModes = [
    { text: '手工输入', value: 0, enum: 'Manual' },
    { text: '列表选择', value: 1, enum: 'ListsSelection' }
]

const selectModes = [
    { text: '单选', value: 0, enum: 'Single' },
    { text: '多选', value: 1, enum: 'Multi' }]

export default {
    getInputModeByEumn(eum) {
        var result;
        inputModes.forEach((item) => {
            if (item.enum == eum) {
                result = JSON.parse(JSON.stringify(item));
                return false;
            }
        });
        return result;
    },
    getInputModeByText(text) {
        var result;
        inputModes.forEach((item) => {
            if (item.text == text) {
                result = JSON.parse(JSON.stringify(item));
                return false;
            }
        });
        return result;
    },
    getSelectModeByEnum(eum) {
        var result;
        selectModes.forEach((item) => {
            if (item.enum == eum) {
                result = JSON.parse(JSON.stringify(item));
                return false;
            }
        });
        return result;
    },
    getInputModes() {
        return JSON.parse(JSON.stringify(inputModes));
    },
    getSelectModes() {
        return JSON.parse(JSON.stringify(selectModes));
    }
}