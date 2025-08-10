let currentTest = '';
let currentQuestionIndex = 0;
let answers = [];
let questions = [];

const iqQuestions = [
    {
        type: 'pattern',
        question: '次のパターンで「?」に入る図形を選んでください',
        pattern: [
            ['○', '△', '□'],
            ['△', '□', '○'],
            ['□', '?', '△']
        ],
        options: ['○', '△', '□', '◇'],
        correct: 0,
        points: 10
    },
    {
        type: 'logic',
        question: '次の数列の「?」に入る数字を選んでください：2, 4, 8, 16, ?',
        options: ['24', '28', '32', '36'],
        correct: 2,
        points: 10
    },
    {
        type: 'spatial',
        question: '立方体を展開した時、向かい合う面にくる記号の組み合わせは？\n面1:A, 面2:B, 面3:C, 面4:D, 面5:E, 面6:F',
        options: ['A-D, B-E, C-F', 'A-F, B-D, C-E', 'A-E, B-F, C-D', 'A-C, B-D, E-F'],
        correct: 1,
        points: 15
    },
    {
        type: 'logic',
        question: 'もし「すべての鳥は飛べる」が真で、「ペンギンは鳥である」が真なら、次のうち正しいのはどれ？',
        options: ['ペンギンは飛べる', 'ペンギンは飛べない', '判断できない', 'どちらでもない'],
        correct: 0,
        points: 12
    },
    {
        type: 'math',
        question: '次の計算の答えは？：(15 × 4) ÷ 3 + 7 - 12',
        options: ['15', '17', '19', '21'],
        correct: 0,
        points: 8
    },
    {
        type: 'pattern',
        question: '次の文字列のパターンで「?」に入る文字は？：A, C, F, J, ?',
        options: ['M', 'N', 'O', 'P'],
        correct: 2,
        points: 12
    },
    {
        type: 'logic',
        question: 'ある暗号で「CAT」が「3-1-20」なら、「DOG」は？',
        options: ['4-15-7', '4-14-7', '3-15-7', '4-15-6'],
        correct: 0,
        points: 15
    },
    {
        type: 'spatial',
        question: '時計の針が3時を指している時、鏡に映った時計は何時を指している？',
        options: ['3時', '6時', '9時', '12時'],
        correct: 2,
        points: 10
    },
    {
        type: 'math',
        question: 'ある数の40%が24なら、その数の60%は？',
        options: ['30', '36', '42', '48'],
        correct: 1,
        points: 11
    },
    {
        type: 'logic',
        question: '5人が円卓に座っています。AはBの右隣、CはDの左隣、EはAの向かい、BはDの右隣です。Cの右隣は誰？',
        options: ['A', 'B', 'D', 'E'],
        correct: 3,
        points: 20
    }
];

const eqQuestions = [
    {
        type: 'emotion',
        question: '友人が大切な試験に落ちて落ち込んでいます。あなたはどう対応しますか？',
        options: [
            'すぐに励ましの言葉をかけて、前向きになるよう促す',
            'まず相手の気持ちを聞いて、共感を示す',
            '次回のための具体的なアドバイスをする',
            'そっとしておいて、時間が解決するのを待つ'
        ],
        correct: 1,
        points: 10
    },
    {
        type: 'self-awareness',
        question: '自分がイライラしている時、どのように対処しますか？',
        options: [
            '原因を分析して、論理的に解決策を考える',
            '深呼吸をして、感情を落ち着かせる',
            '信頼できる人に話を聞いてもらう',
            'すべての上記の方法を状況に応じて使い分ける'
        ],
        correct: 3,
        points: 10
    },
    {
        type: 'social',
        question: '会議で自分の意見と対立する意見が出た時、どう対応しますか？',
        options: [
            '自分の意見を強く主張する',
            '相手の意見を聞いて、共通点を探す',
            '議論を避けて、他の人の意見を待つ',
            '上司の判断に委ねる'
        ],
        correct: 1,
        points: 12
    },
    {
        type: 'empathy',
        question: '同僚が最近ミスが多く、様子がおかしいです。どうしますか？',
        options: [
            'ミスを指摘して、改善を求める',
            'プライベートで何か問題がないか気にかける',
            '上司に報告する',
            '何もせずに様子を見る'
        ],
        correct: 1,
        points: 10
    },
    {
        type: 'emotion',
        question: '批判を受けた時、最初に感じる感情をどう扱いますか？',
        options: [
            '感情を抑えて、批判の内容を分析する',
            '感情を認識して、一旦落ち着いてから対応する',
            '即座に反論する',
            '批判を無視する'
        ],
        correct: 1,
        points: 11
    },
    {
        type: 'social',
        question: 'チームの雰囲気が悪い時、リーダーとしてどう行動しますか？',
        options: [
            '個別に話を聞いて、問題を把握する',
            'チーム全体でミーティングを開く',
            '親睦会を企画する',
            '問題が自然に解決するのを待つ'
        ],
        correct: 0,
        points: 13
    },
    {
        type: 'self-awareness',
        question: '自分の感情が仕事に影響している時、どう気づきますか？',
        options: [
            '他人から指摘された時',
            '定期的に自己振り返りをしている',
            'ミスが増えた時',
            '体調に変化が現れた時'
        ],
        correct: 1,
        points: 12
    },
    {
        type: 'empathy',
        question: '文化的背景の異なる人とコミュニケーションを取る時、最も重要なことは？',
        options: [
            '自分の文化を説明する',
            '相手の文化を理解しようとする',
            '共通の言語を使う',
            'ビジネスライクに接する'
        ],
        correct: 1,
        points: 10
    },
    {
        type: 'emotion',
        question: 'ストレスが高まっている時の自分のサインを認識できますか？',
        options: [
            'いつも認識できる',
            '大抵認識できる',
            '時々認識できる',
            'ほとんど認識できない'
        ],
        correct: 0,
        points: 8
    },
    {
        type: 'social',
        question: '初対面の人との会話で、相手が緊張している様子です。どうしますか？',
        options: [
            '直接的に緊張をほぐす言葉をかける',
            '自分の失敗談を話して、場を和ませる',
            '仕事の話に集中する',
            '相手のペースに合わせて、ゆっくり話す'
        ],
        correct: 3,
        points: 12
    }
];

function startTest(testType) {
    currentTest = testType;
    currentQuestionIndex = 0;
    answers = [];
    questions = testType === 'iq' ? [...iqQuestions] : [...eqQuestions];
    
    document.getElementById('startScreen').classList.remove('active');
    document.getElementById('testScreen').classList.add('active');
    document.getElementById('totalQuestions').textContent = questions.length;
    
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('questionTitle').textContent = `問題 ${currentQuestionIndex + 1}`;
    
    const questionTextDiv = document.getElementById('questionText');
    const questionImageDiv = document.getElementById('questionImage');
    const answerOptionsDiv = document.getElementById('answerOptions');
    
    questionTextDiv.textContent = question.question;
    questionImageDiv.innerHTML = '';
    answerOptionsDiv.innerHTML = '';
    
    if (question.type === 'pattern' && question.pattern) {
        const grid = document.createElement('div');
        grid.className = 'pattern-grid';
        
        question.pattern.forEach(row => {
            row.forEach(cell => {
                const cellDiv = document.createElement('div');
                cellDiv.className = 'pattern-cell';
                if (cell === '?') {
                    cellDiv.classList.add('question-mark');
                } else if (cell !== '') {
                    cellDiv.classList.add('filled');
                }
                cellDiv.textContent = cell;
                grid.appendChild(cellDiv);
            });
        });
        
        questionImageDiv.appendChild(grid);
    }
    
    if (question.type === 'pattern' && question.pattern) {
        answerOptionsDiv.className = 'answer-options answer-grid';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'answer-option';
            button.textContent = option;
            button.onclick = () => selectAnswer(index);
            answerOptionsDiv.appendChild(button);
        });
    } else {
        answerOptionsDiv.className = 'answer-options';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'answer-option';
            button.textContent = option;
            button.onclick = () => selectAnswer(index);
            answerOptionsDiv.appendChild(button);
        });
    }
}

function selectAnswer(answerIndex) {
    answers.push({
        questionIndex: currentQuestionIndex,
        answer: answerIndex,
        correct: answerIndex === questions[currentQuestionIndex].correct,
        points: answerIndex === questions[currentQuestionIndex].correct ? questions[currentQuestionIndex].points : 0
    });
    
    nextQuestion();
}

function skipQuestion() {
    answers.push({
        questionIndex: currentQuestionIndex,
        answer: -1,
        correct: false,
        points: 0
    });
    
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex >= questions.length) {
        showResults();
    } else {
        showQuestion();
    }
}

function calculateScore() {
    const totalPoints = answers.reduce((sum, answer) => sum + answer.points, 0);
    const maxPoints = questions.reduce((sum, question) => sum + question.points, 0);
    const percentage = (totalPoints / maxPoints) * 100;
    
    if (currentTest === 'iq') {
        return Math.round(85 + (percentage * 0.3));
    } else {
        return Math.round(60 + (percentage * 0.4));
    }
}

function getScoreDescription(score, testType) {
    if (testType === 'iq') {
        if (score >= 130) return '非常に優秀：上位2%に位置する高い知能指数です。';
        if (score >= 120) return '優秀：上位10%に位置する優れた知能指数です。';
        if (score >= 110) return '平均以上：平均より高い知能指数です。';
        if (score >= 90) return '平均的：標準的な知能指数です。';
        if (score >= 80) return '平均以下：平均よりやや低い知能指数です。';
        return '要改善：さらなる学習と練習が推奨されます。';
    } else {
        if (score >= 120) return '非常に高い感情知能：優れた感情管理と対人スキルを持っています。';
        if (score >= 100) return '高い感情知能：良好な感情理解と社会的スキルがあります。';
        if (score >= 80) return '平均的な感情知能：標準的な感情理解力です。';
        if (score >= 60) return '発展途上：感情知能を高める余地があります。';
        return '要改善：感情認識と管理スキルの向上が推奨されます。';
    }
}

function showResults() {
    document.getElementById('testScreen').classList.remove('active');
    document.getElementById('resultScreen').classList.add('active');
    
    const score = calculateScore();
    const testLabel = currentTest === 'iq' ? 'IQスコア' : 'EQスコア';
    
    document.getElementById('scoreLabel').textContent = testLabel;
    document.getElementById('scoreValue').textContent = score;
    document.getElementById('scoreDescription').textContent = getScoreDescription(score, currentTest);
    
    drawScoreChart(score, currentTest);
}

function drawScoreChart(score, testType) {
    const canvas = document.getElementById('scoreChart');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const maxScore = testType === 'iq' ? 160 : 140;
    const minScore = testType === 'iq' ? 70 : 40;
    const scoreRange = maxScore - minScore;
    const scorePosition = ((score - minScore) / scoreRange) * width;
    
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(0, height/2 - 20, width, 40);
    
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#f5576c');
    gradient.addColorStop(0.5, '#f093fb');
    gradient.addColorStop(1, '#667eea');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, height/2 - 20, scorePosition, 40);
    
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(minScore, 30, height/2 + 50);
    ctx.fillText(maxScore, width - 30, height/2 + 50);
    
    ctx.beginPath();
    ctx.moveTo(scorePosition, height/2 - 30);
    ctx.lineTo(scorePosition - 10, height/2 - 50);
    ctx.lineTo(scorePosition + 10, height/2 - 50);
    ctx.closePath();
    ctx.fillStyle = '#667eea';
    ctx.fill();
    
    ctx.fillStyle = '#667eea';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(score, scorePosition, height/2 - 55);
}

function restartTest() {
    location.reload();
}

function goHome() {
    document.getElementById('resultScreen').classList.remove('active');
    document.getElementById('startScreen').classList.add('active');
}