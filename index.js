(function App() {
    String.prototype.padStart = function (targetLength, padString) {
        let currStr = String(this);
        if (currStr.length >= targetLength)
            return this;
        const nPads = (targetLength - currStr.length) / padString.length;
        const nCharRemain = (targetLength - currStr.length) % padString.length;
        let resultStr = '';
        for (let i = 0; i < nPads; i++)
            resultStr += padString;
        resultStr += padString.slice(0, nCharRemain);
        resultStr += currStr;
        return resultStr;
    };
    const textForRand = `Was it enough? That was the question he kept asking himself. Was being satisfied enough? He looked around him at everyone yearning to just be satisfied in their daily life and he had reached that goal. He knew that he was satisfied and he also knew it wasn't going to be enough.
    It's always good to bring a slower friend with you on a hike. If you happen to come across bears, the whole group doesn't have to worry. Only the slowest in the group do. That was the lesson they were about to learn that day.
    Dave watched as the forest burned up on the hill, only a few miles from her house. The car had been hastily packed and Marta was inside trying to round up the last of the pets. Dave went through his mental list of the most important papers and documents that they couldn't leave behind. He scolded himself for not having prepared these better in advance and hoped that he had remembered everything that was needed. He continued to wait for Marta to appear with the pets, but she still was nowhere to be seen.
    It had been her dream for years but Dana had failed to take any action toward making it come true. There had always been a good excuse to delay or prioritize another project. As she woke, she realized she was once again at a crossroads. Would it be another excuse or would she finally find the courage to pursue her dream? Dana rose and took her first step.
    She sat in the darkened room waiting. It was now a standoff. He had the power to put her in the room, but not the power to make her repent. It wasn't fair and no matter how long she had to endure the darkness, she wouldn't change her attitude. At three years old, Sandy's stubborn personality had already bloomed into full view.
    It was that terrifying feeling you have as you tightly hold the covers over you with the knowledge that there is something hiding under your bed. You want to look, but you don't at the same time. You're frozen with fear and unable to act. That's where she found herself and she didn't know what to do next
    It was their first date and she had been looking forward to it the entire week. She had her eyes on him for months, and it had taken a convoluted scheme with several friends to make it happen, but he'd finally taken the hint and asked her out. After all the time and effort she'd invested into it, she never thought that it would be anything but wonderful. It goes without saying that things didn't work out quite as she expected.
    Pink ponies and purple giraffes roamed the field. Cotton candy grew from the ground as a chocolate river meandered off to the side. What looked like stones in the pasture were actually rock candy. Everything in her dream seemed to be perfect except for the fact that she had no mouth.
    Since they are still preserved in the rocks for us to see, they must have been formed quite recently, that is, geologically speaking. What can explain these striations and their common orientation? Did you ever hear about the Great Ice Age or the Pleistocene Epoch? Less than one million years ago, in fact, some 12,000 years ago, an ice sheet many thousands of feet thick rode over Burke Mountain in a southeastward direction. The many boulders frozen to the underside of the ice sheet tended to scratch the rocks over which they rode. The scratches or striations seen in the park rocks were caused by these attached boulders. The ice sheet also plucked and rounded Burke Mountain into the shape it possesses today.
    His parents continued to question him. He didn't know what to say to them since they refused to believe the truth. He explained again and again, and they dismissed his explanation as a figment of his imagination. There was no way that grandpa, who had been dead for five years, could have told him where the treasure had been hidden. Of course, it didn't help that grandpa was roaring with laughter in the chair next to him as he tried to explain once again how he'd found it.
    "What is the best way to get what you want?" she asked. He looked down at the ground knowing that she wouldn't like his answer. He hesitated, knowing that the truth would only hurt. How was he going to tell her that the best way for him to get what he wanted was to leave her?
    Don't be scared. The things out there that are unknown aren't scary in themselves. They are just unknown at the moment. Take the time to know them before you list them as scary. Then the world will be a much less scary place for you.
    It wasn't quite yet time to panic. There was still time to salvage the situation. At least that is what she was telling himself. The reality was that it was time to panic and there wasn't time to salvage the situation, but he continued to delude himself into believing there was.`;
    const textArr = textForRand.split(/[ ,.!?\n]+/).filter(val => val !== '');
    const nWords = 300;
    let words = [];
    let currWordPosition = 0;
    let currLine = 0;
    let score = 0;
    let time = 60;
    let timerId = 0;
    let isRunning = false;
    // Controller
    const generateWords = function (numberOfWords) {
        if (!Number.isInteger(numberOfWords) || numberOfWords <= 0)
            return;
        const words = [];
        for (let i = 0; i < nWords; i++) {
            const rand = Math.floor(Math.random() * (textArr.length - 1));
            words.push(textArr[rand]);
        }
        return words;
    };
    const controlTyping = function (content, charPress) {
        const currWord = words[currWordPosition];
        if (charPress === ' ') {
            if (content.trim().length === 0)
                return;
            clearForm();
            updateWord('highlight--wrong', true);
            if (content.split(' ')[0] === currWord) {
                updateWord('word--right');
                controlScore();
                renderScore();
            }
            else {
                updateWord('word--wrong');
            }
            updateWord('word--active', true);
            currWordPosition++;
            if (currWordPosition === words.length)
                controlGetNewWords();
            updateWord('word--active');
            return;
        }
        if (content !== currWord.slice(0, content.length)) {
            updateWord('highlight--wrong');
        }
        else {
            updateWord('highlight--wrong', true);
        }
    };
    const controlTimer = function () {
        time--;
        const minutes = Math.trunc(time / 60);
        const seconds = time % 60;
        if (time <= 0) {
            clearInterval(timerId);
            // handle result
            time = 0;
            return;
        }
        updateTime(minutes, seconds);
    };
    const controlGetNewWords = function () {
        clearForm();
        currWordPosition = 0;
        words = generateWords(nWords);
        renderWords(words);
        updateWord('word--active');
    };
    const controlLineContent = function () {
        currLine++;
        updateTypingContent(getLineHeightTypingContent() * currLine);
    };
    const controlFirstRunning = function () {
        if (!isRunning) {
            timerId = setInterval(controlTimer, 1000);
            isRunning = true;
        }
    };
    const controlScore = function () {
        score++;
    };
    // View
    //// Typing Content View
    const renderWords = function (words) {
        const parent = document.querySelector('.typing-content__all');
        parent.textContent = '';
        parent.style.transform = '';
        const html = words
            .map((word, idx) => `<span class="word" data-position="${idx}">${word}</span>`)
            .join('');
        parent.insertAdjacentHTML('beforeend', html);
    };
    const updateTypingContent = function (transformY) {
        const parent = document.querySelector('.typing-content__all');
        parent.style.transform = `translateY(-${transformY}px)`;
    };
    const updateWord = function (className, remove = false) {
        const words = document.querySelectorAll('.word');
        const word = words[currWordPosition];
        if (remove) {
            word.classList.remove(className);
        }
        else {
            word.classList.add(className);
            if (className === 'word--active') {
                word.dispatchEvent(new CustomEvent('wordactive', { bubbles: true }));
            }
        }
    };
    const addHandlerLineBreak = function (handler) {
        const parent = document.querySelector('.typing-content__all');
        parent.addEventListener('wordactive', function (e) {
            const target = e.target.closest('.word');
            const currPos = +target.dataset.position;
            if (currPos === 0)
                return;
            const prevWord = document.querySelectorAll('.word')[currPos - 1];
            if (prevWord.offsetTop !== target.offsetTop)
                handler();
        });
    };
    const getLineHeightTypingContent = function () {
        const parent = document.querySelector('.word');
        if (!parent)
            return 0;
        const eleStyleComputed = window.getComputedStyle(parent);
        return +eleStyleComputed.lineHeight.split('p')[0];
    };
    //// Score
    const renderScore = function () {
        const parent = document.querySelector('.score__point');
        parent.textContent = `${score}`;
    };
    //// Input Form
    const addHanlerFormKeyDown = function (handler) {
        const parent = document.querySelector('#typing-field');
        parent.addEventListener('keyup', function (e) {
            if (e.key === 'Backspace')
                handler(this.value, e.key);
            if (e.key.length > 1)
                return;
            if (/[a-zA-Z0-9]/.test(e.key) || e.key === ' ')
                handler(this.value, e.key);
        });
    };
    const clearForm = function () {
        const parent = document.querySelector('#typing-field');
        parent.value = '';
    };
    const addHandlerFormSubmit = function (handler) {
        const parent = document.querySelector('.typing-form');
        parent.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        });
    };
    //// Time
    const updateTime = function (minutes, seconds) {
        const parent = document.querySelector('.timer');
        parent.textContent = `${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    // Start app
    (function init() {
        updateTime(Math.trunc(time / 60), time % 60);
        words = generateWords(nWords);
        renderWords(words);
        updateWord('word--active');
        renderScore();
        addHanlerFormKeyDown(controlTyping);
        addHanlerFormKeyDown(controlFirstRunning);
        addHandlerFormSubmit(controlGetNewWords);
        addHandlerLineBreak(controlLineContent);
    })();
})();
