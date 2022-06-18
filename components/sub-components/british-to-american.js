class Translate {
    translate(sentence, american_dataset, british_dataset, american_title_dataset, british_title_dataset) {
        let output_with_tag;
        let array = [];
        let temp = [];
        let british_words = [];
        let american_words = [];
        for (let i = 0; i < british_dataset.length; i++) {
            for (let j = 0; j < british_dataset[i].length; j++) {
                let a = sentence.search(new RegExp(`\\b(${british_dataset[i][j]})\\b`, 'gi'))
                if (a !== -1) {
                    array.push(sentence.slice(a, a + british_dataset[i][j].length));
                }
            }
        }
        british_words = array.filter((c, i) => {
            return array.indexOf(c) === i;
        });
        for (let x = 0; x < british_words.length; x++) {
            for (let i = 0; i < british_dataset.length; i++) {
                for (let j = 0; j < british_dataset[i].length; j++) {
                    let a = british_words[x].search(new RegExp(`\\b(${british_dataset[i][j]})\\b`, 'gi'))
                    if (a !== -1) {
                        temp.push(american_dataset[i][j]);
                    }
                }
            }
        }
        american_words = temp.filter((c, i) => {
            return temp.indexOf(c) === i;
        });
        for (let i = 0; i < british_dataset.length; i++) {
            for (let j = 0; j < british_dataset[i].length; j++) {
                let a = sentence.search(new RegExp(`\\b(${british_dataset[i][j]})\\b`, 'gi'))
                if (a !== -1) {
                    if (american_dataset[i][j] === american_words[american_words.indexOf(american_dataset[i][j])]) {
                        output_with_tag =
                            !output_with_tag ?
                                sentence.replace(new RegExp(`\\b(${british_dataset[i][j]})\\b`, 'gi'), `<span class="highlight">${american_words[american_words.indexOf(american_dataset[i][j])]}</span>`) : 
                                    output_with_tag.replace(new RegExp(`\\b(${british_dataset[i][j]})\\b`, 'gi'), `<span class="highlight">${american_words[american_words.indexOf(american_dataset[i][j])]}</span>`);
                    }
                }
            }
        }
        output_with_tag = !output_with_tag ? sentence : output_with_tag;

        const final_check = this.nameTitle(output_with_tag, american_title_dataset, british_title_dataset);
        if (sentence.charAt(0).match(/[A-Z]/g) !== null) {
            const span_regexp = new RegExp("^(<span class=\"highlight\">)(.+)", "gi");
            const check = span_regexp.exec(final_check);
            if (check !== null) {
                const modify = check[1] + check[2].charAt(0).toUpperCase() + check[2].slice(1);
                return modify;
            } else {
                const modify = final_check.charAt(0).toUpperCase() + final_check.slice(1);
                return modify;
            }
        } else {
            return output_with_tag;
        }
    }
    
    nameTitle(sentence, american_title_dataset, british_title_dataset) {
        let array = [];
        let output_with_tag;
        for (let i = 0; i < british_title_dataset.length; i++) {
            const check = sentence.search(new RegExp(`\\b${british_title_dataset[i]}\(\?\!\\.\)\\b`, 'gi'));
            if (check !== -1) {
                let result = sentence.match(new RegExp(`\\b${british_title_dataset[i]}\(\?\!\\.\)\\b`, 'gi'));
                for (let j = 0; j < result.length; j++) {
                    array.push(result[j]);
                }
            }
        }
        array = array.filter((c, i) => {
            return array.indexOf(c) === i;
        });
        array = array.map(e => {
            return e.toLowerCase();
        })
        for (let i = 0; i < array.length; i++) {
            output_with_tag = 
                !output_with_tag ? 
                    sentence.replaceAll(new RegExp(`\\b${array[i]}\\b`, 'gi'), `<span class="highlight">${american_title_dataset[british_title_dataset.indexOf(array[i].toLowerCase())].charAt(0).toUpperCase() + american_title_dataset[british_title_dataset.indexOf(array[i].toLowerCase())].slice(1).replace("\\.", ".")}</span>`) :
                        `<span class="highlight">${output_with_tag.replaceAll(new RegExp(`\\b${array[i]}\\b`, 'gi'), american_title_dataset[british_title_dataset.indexOf(array[i].toLowerCase())].charAt(0).toUpperCase() + american_title_dataset[british_title_dataset.indexOf(array[i])].slice(1).replace("\\.", "."))}</span>`;
        }
        output_with_tag = !output_with_tag ? sentence : output_with_tag;
        return this.timeCheck(output_with_tag)
    }

    timeCheck(sentence) {
        let output_with_tag;
        if (sentence.search(/\d{1,2}\.\d{1,2}/gi) !== -1) {
            output_with_tag = sentence.replaceAll(/(\d{1,2})\.(\d{1,2})/gi, `<span class="highlight">$1:$2</span>`);
        }
        output_with_tag = !output_with_tag ? sentence : output_with_tag;
        return output_with_tag;
    }
}

module.exports = Translate;