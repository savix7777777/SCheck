//ported from https://www.drupal.org/project/ukstemmer

const VOWEL = /аеиоуюяіїє/; /* http://uk.wikipedia.org/wiki/Голосний_звук */
const PERFECT_GROUND = /(ив|ивши|ившись|ыв|ывши|ывшись(в|вши|вшись))$/;
const REFLEXIVE = /(с[яьи])$/;  // http://uk.wikipedia.org/wiki/Рефлексивне_дієслово
const ADJECTIVE = /(ими|ій|ий|а|е|ова|ове|ів|є|їй|єє|еє|я|ем|им|ім|их|іх|ою|йми|іми|у|ю|ого|ому|ої)$/; //http://uk.wikipedia.org/wiki/Прикметник + http://wapedia.mobi/uk/Прикметник
const PARTICIPLE = /(ий|ого|ому|им|ім|а|ій|у|ою|і|йми|их)$/; //http://uk.wikipedia.org/wiki/Дієприкметник
const VERB = /(сь|ся|ив|ать|ять|у|ю|ав|али|учи|ячи|вши|ши|е|ме|ати|яти|є)$/; //http://uk.wikipedia.org/wiki/Дієслово
const NOUN = /(а|ев|ов|е|ями|ами|еи|и|ей|ой|ий|й|иям|ям|ием|ем|ам|ом|о|у|ах|иях|ях|ы|ь|ию|ью|ю|ия|ья|я|і|ові|ї|ею|єю|ою|є|еві|єм|ів|їв|'ю)$/; //http://uk.wikipedia.org/wiki/Іменник
const RVRE = /^(.*?[аеиоуюяіїє])(.*)$/;
const DERIVATION = /[^аеиоуюяіїє][аеиоуюяіїє]+[^аеиоуюяіїє]+[аеиоуюяіїє].*сть?$/;

export default function stem (word) {
    if (word == null || !word.length) {
        return word;
    }
    word = word.toLowerCase();
    let stem = word;
    do {
        let p = word.match(RVRE);
        if (!p) break;

        let start = p[1];
        let RV = p[2];
        if (!RV) break;

        // Step 1
        let m = RV.replace(PERFECT_GROUND, '');
        if (m === RV) {
            RV = RV.replace(REFLEXIVE, '');

            m = RV.replace(ADJECTIVE, '');
            if (m === RV) {
                RV = RV.replace(PARTICIPLE, '');
            } else {
                RV = m;
                m = RV.replace(VERB, '');
                if (m === RV) {
                    RV = RV.replace(NOUN, '');
                } else {
                    RV = m;
                }
            }
        } else {
            RV = m;
        }

        // Step 2
        RV = RV.replace(/и$/, '');

        // Step 3
        if (DERIVATION.test(RV)) {
            RV = RV.replace(/ость?$/, '');
        }

        // Step 4
        m = RV.replace(/ь$/, '');
        if (m === RV) {
            RV = RV.replace(/ейше?/, '');
            RV = RV.replace(/нн$/, 'н');
        } else {
            RV = m;
        }

        stem = start + RV;
    } while (false);
    return stem;
}