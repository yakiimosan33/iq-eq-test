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

const spiQuestions = [
    {
        type: 'language',
        question: '次の文章の（　）に入る最も適切な語句を選んでください。\n「彼の行動は（　）に反している。」',
        options: ['道徳', '道理', '論理', '倫理'],
        correct: 1,
        points: 10
    },
    {
        type: 'language',
        question: '「賛同」と最も意味が近い語句を選んでください。',
        options: ['同調', '共鳴', '同意', '承認'],
        correct: 2,
        points: 8
    },
    {
        type: 'non-verbal',
        question: '次の数列の法則を見つけて、（　）に入る数字を求めてください。\n2, 6, 18, 54, （　）',
        options: ['108', '162', '216', '324'],
        correct: 1,
        points: 12
    },
    {
        type: 'non-verbal',
        question: 'ある商品が20%引きで売られています。定価が1000円の場合、売価はいくらですか。',
        options: ['200円', '800円', '900円', '1200円'],
        correct: 1,
        points: 10
    },
    {
        type: 'non-verbal',
        question: 'A君とB君の年齢の比は3:4です。A君が15歳の時、B君は何歳ですか。',
        options: ['18歳', '20歳', '21歳', '24歳'],
        correct: 1,
        points: 11
    },
    {
        type: 'personality',
        question: 'チームで作業をする時、あなたはどのような役割を取ることが多いですか。',
        options: [
            'リーダーシップを発揮してまとめる',
            'アイデアを出して創造性を発揮する',
            '計画を立てて段取りを考える',
            'みんなの意見を聞いて調整する'
        ],
        correct: -1,
        points: 5
    },
    {
        type: 'language',
        question: '次の文章で使われている敬語が適切でないものを選んでください。',
        options: [
            '先生がいらっしゃいました',
            'お客様が参られました',
            '部長がお見えになりました',
            '社長がお越しになりました'
        ],
        correct: 1,
        points: 9
    },
    {
        type: 'non-verbal',
        question: '図形の面積を求めてください。正方形の一辺が4cmの時、その正方形に内接する円の面積は？（π=3.14とする）',
        options: ['12.56平方cm', '25.12平方cm', '50.24平方cm', '6.28平方cm'],
        correct: 0,
        points: 13
    },
    {
        type: 'personality',
        question: '困難な状況に直面した時、あなたはどう対処しますか。',
        options: [
            '一人で解決策を考える',
            '他の人に相談する',
            '過去の経験を参考にする',
            'とりあえず行動してみる'
        ],
        correct: -1,
        points: 5
    },
    {
        type: 'non-verbal',
        question: '確率の問題です。赤玉3個、白玉2個が入った袋から1個取り出す時、赤玉が出る確率は？',
        options: ['2/5', '3/5', '1/2', '2/3'],
        correct: 1,
        points: 12
    }
];

const tamatebako = [
    {
        type: 'language',
        question: '次の語句の意味として最も適切なものを選んでください。\n「杞憂」',
        options: ['無用な心配', '深い悲しみ', '激しい怒り', '大きな喜び'],
        correct: 0,
        points: 10
    },
    {
        type: 'calculation',
        question: '次の計算結果を求めてください：125 × 8 ÷ 25',
        options: ['30', '35', '40', '45'],
        correct: 2,
        points: 8
    },
    {
        type: 'calculation',
        question: '月給が25万円の人の年収は、ボーナスが月給の3ヶ月分だとすると？',
        options: ['300万円', '325万円', '350万円', '375万円'],
        correct: 3,
        points: 12
    },
    {
        type: 'english',
        question: 'Choose the correct word to complete the sentence.\n"I am looking forward _____ hearing from you."',
        options: ['for', 'to', 'at', 'in'],
        correct: 1,
        points: 10
    },
    {
        type: 'language',
        question: '次の四字熟語で「努力を重ねること」を意味するものはどれですか。',
        options: ['一石二鳥', '切磋琢磨', '百発百中', '一期一会'],
        correct: 1,
        points: 11
    },
    {
        type: 'calculation',
        question: 'ある商品の原価は600円です。これに30%の利益を上乗せした売価はいくらですか。',
        options: ['780円', '800円', '830円', '900円'],
        correct: 0,
        points: 9
    },
    {
        type: 'english',
        question: 'What does "consecutive" mean?',
        options: ['Following in order', 'Happening rarely', 'Very important', 'Difficult to understand'],
        correct: 0,
        points: 12
    },
    {
        type: 'personality',
        question: 'あなたは新しい環境にどのように適応しますか。',
        options: [
            '積極的に人と関わって情報収集する',
            'まず観察してから行動する',
            '自分のペースで徐々に慣れる',
            '過去の経験を活かして対応する'
        ],
        correct: -1,
        points: 5
    },
    {
        type: 'language',
        question: '「彼の発言は的を射ている」この文の「的を射る」の意味は？',
        options: ['目標を達成する', '要点を捉える', '準備を整える', '注目を集める'],
        correct: 1,
        points: 10
    },
    {
        type: 'calculation',
        question: '時速60kmで2時間30分走った時の走行距離は？',
        options: ['120km', '130km', '140km', '150km'],
        correct: 3,
        points: 11
    }
];

const tgwebQuestions = [
    {
        type: 'figure',
        question: '次の図形の中で、他の3つとは異なる特徴を持つものはどれですか。',
        options: ['正三角形', '正方形', '正五角形', '円'],
        correct: 3,
        points: 12
    },
    {
        type: 'puzzle',
        question: '暗号問題：BOOK = 25, GOOD = 41なら、LOOK = ?',
        options: ['35', '40', '45', '50'],
        correct: 1,
        points: 15
    },
    {
        type: 'space',
        question: '立方体を斜めに切った断面の形は？',
        options: ['三角形', '四角形', '五角形', '六角形'],
        correct: 3,
        points: 13
    },
    {
        type: 'puzzle',
        question: '次の規則に従って：月=1, 火=2, 水=3...なら、金曜日は？',
        options: ['4', '5', '6', '7'],
        correct: 1,
        points: 10
    },
    {
        type: 'figure',
        question: '回転図形：次の図形を90度時計回りに回転させたものは？',
        options: ['図形A', '図形B', '図形C', '図形D'],
        correct: 2,
        points: 14
    },
    {
        type: 'logic',
        question: 'AはBより背が高い。BはCより背が高い。CはDより背が高い。最も背が高いのは？',
        options: ['A', 'B', 'C', 'D'],
        correct: 0,
        points: 8
    },
    {
        type: 'puzzle',
        question: '数字パズル：1=5, 2=25, 3=125, 4=625なら、5=?',
        options: ['1525', '3125', '5525', '6250'],
        correct: 1,
        points: 16
    },
    {
        type: 'space',
        question: '展開図から立体を想像してください。向かい合う面の数字の合計が7になる場合、?の面は？',
        options: ['1', '2', '3', '4'],
        correct: 2,
        points: 15
    },
    {
        type: 'figure',
        question: '対称図形：次の図形で線対称かつ点対称の図形は？',
        options: ['正三角形', '正方形', '正五角形', '長方形'],
        correct: 1,
        points: 11
    },
    {
        type: 'puzzle',
        question: 'コード解読：ABCD = 1234なら、DCBA = ?',
        options: ['4321', '1243', '3412', '2143'],
        correct: 0,
        points: 9
    }
];

const gabQuestions = [
    {
        type: 'verbal',
        question: '次の語句の対義語を選んでください。「繁栄」',
        options: ['衰退', '発展', '成長', '進歩'],
        correct: 0,
        points: 10
    },
    {
        type: 'numerical',
        question: 'グラフ読み取り：売上が1月100万、2月120万、3月80万の場合、平均月売上は？',
        options: ['90万円', '95万円', '100万円', '105万円'],
        correct: 2,
        points: 12
    },
    {
        type: 'logical',
        question: '三段論法：すべての鳥は動物である。すべての動物は生き物である。よって？',
        options: [
            'すべての鳥は生き物である',
            'すべての生き物は鳥である',
            'すべての動物は鳥である',
            '判断できない'
        ],
        correct: 0,
        points: 13
    },
    {
        type: 'verbal',
        question: '慣用句の意味：「雨降って地固まる」の意味は？',
        options: [
            '困難の後に良いことがある',
            '準備が重要である',
            '自然の力は偉大である',
            '時間が解決する'
        ],
        correct: 0,
        points: 11
    },
    {
        type: 'numerical',
        question: '比率計算：A:B = 3:5、B:C = 2:3の時、A:B:C = ?',
        options: ['3:5:3', '6:10:15', '2:5:7', '6:8:12'],
        correct: 1,
        points: 14
    },
    {
        type: 'logical',
        question: '命題：「雨が降れば傘をさす」が真の時、「傘をささなければ？」',
        options: [
            '雨が降らない',
            '雨が降る',
            '判断できない',
            'どれも正しくない'
        ],
        correct: 0,
        points: 15
    },
    {
        type: 'verbal',
        question: '文章理解：次の文で筆者の主張は？「技術の進歩は便利さをもたらすが、同時に新たな問題も生み出す。」',
        options: [
            '技術は不要である',
            '技術には二面性がある',
            '技術は危険である',
            '技術は完璧である'
        ],
        correct: 1,
        points: 12
    },
    {
        type: 'numerical',
        question: '確率：赤玉4個、青玉6個から2個取り出す時、両方青玉の確率は？',
        options: ['1/3', '2/5', '1/2', '3/5'],
        correct: 0,
        points: 16
    },
    {
        type: 'logical',
        question: '推理：AはBより年上、CはBより年下、DはAより年上の場合、年齢順序は？',
        options: ['D>A>B>C', 'A>D>B>C', 'D>B>A>C', '判断できない'],
        correct: 0,
        points: 13
    },
    {
        type: 'verbal',
        question: '語彙：「憂慮」に最も近い意味の語句は？',
        options: ['心配', '怒り', '喜び', '驚き'],
        correct: 0,
        points: 9
    }
];

const cabQuestions = [
    {
        type: 'programming',
        question: 'プログラミング基礎：for文を使って1から10まで出力するコードの結果は？',
        options: ['10回"1"が出力', '1,2,3...10が出力', 'エラーになる', '何も出力されない'],
        correct: 1,
        points: 12
    },
    {
        type: 'logic-circuit',
        question: '論理回路：AND回路で入力がA=1, B=0の時の出力は？',
        options: ['0', '1', 'エラー', '不定'],
        correct: 0,
        points: 10
    },
    {
        type: 'algorithm',
        question: 'データ構造：配列[5,2,8,1,9]をバブルソートで1回目の処理後の配列は？',
        options: ['[2,5,1,8,9]', '[2,5,8,1,9]', '[1,2,5,8,9]', '[5,2,1,8,9]'],
        correct: 0,
        points: 15
    },
    {
        type: 'system',
        question: 'システム設計：データベースで主キーの役割は？',
        options: [
            'データの重複を許可する',
            'レコードを一意に識別する',
            'データを暗号化する',
            'パフォーマンスを低下させる'
        ],
        correct: 1,
        points: 13
    },
    {
        type: 'programming',
        question: '変数：int型で表現できる値の範囲に含まれないものは？',
        options: ['0', '-1', '32768', '2147483648'],
        correct: 3,
        points: 11
    },
    {
        type: 'logic-circuit',
        question: '2進数：10進数の13を2進数で表すと？',
        options: ['1011', '1101', '1110', '1001'],
        correct: 1,
        points: 12
    },
    {
        type: 'network',
        question: 'ネットワーク：IPアドレス192.168.1.1のクラスは？',
        options: ['クラスA', 'クラスB', 'クラスC', 'クラスD'],
        correct: 2,
        points: 14
    },
    {
        type: 'algorithm',
        question: '計算量：線形探索の時間計算量は？（nは要素数）',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correct: 2,
        points: 16
    },
    {
        type: 'system',
        question: 'OS：プロセスとスレッドの主な違いは？',
        options: [
            'メモリ空間の共有',
            '実行速度',
            'プログラムの種類',
            '作成者の違い'
        ],
        correct: 0,
        points: 15
    },
    {
        type: 'programming',
        question: 'オブジェクト指向：継承の目的は？',
        options: [
            'メモリ使用量を増やす',
            '既存クラスの機能を再利用する',
            'プログラムを複雑にする',
            '実行速度を下げる'
        ],
        correct: 1,
        points: 13
    }
];

function startTest(testType) {
    currentTest = testType;
    currentQuestionIndex = 0;
    answers = [];
    switch(testType) {
        case 'iq':
            questions = [...iqQuestions];
            break;
        case 'eq':
            questions = [...eqQuestions];
            break;
        case 'spi':
            questions = [...spiQuestions];
            break;
        case 'tamatebako':
            questions = [...tamatebako];
            break;
        case 'tgweb':
            questions = [...tgwebQuestions];
            break;
        case 'gab':
            questions = [...gabQuestions];
            break;
        case 'cab':
            questions = [...cabQuestions];
            break;
        default:
            questions = [...iqQuestions];
    }
    
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
    
    switch(currentTest) {
        case 'iq':
            return Math.round(85 + (percentage * 0.3));
        case 'eq':
            return Math.round(60 + (percentage * 0.4));
        case 'spi':
            return Math.round(percentage);
        case 'tamatebako':
            return Math.round(percentage);
        case 'tgweb':
            return Math.round(percentage);
        case 'gab':
            return Math.round(percentage);
        case 'cab':
            return Math.round(percentage);
        default:
            return Math.round(percentage);
    }
}

function getScoreDescription(score, testType) {
    switch(testType) {
        case 'iq':
            if (score >= 130) return '非常に優秀：上位2%に位置する高い知能指数です。';
            if (score >= 120) return '優秀：上位10%に位置する優れた知能指数です。';
            if (score >= 110) return '平均以上：平均より高い知能指数です。';
            if (score >= 90) return '平均的：標準的な知能指数です。';
            if (score >= 80) return '平均以下：平均よりやや低い知能指数です。';
            return '要改善：さらなる学習と練習が推奨されます。';
        
        case 'eq':
            if (score >= 120) return '非常に高い感情知能：優れた感情管理と対人スキルを持っています。';
            if (score >= 100) return '高い感情知能：良好な感情理解と社会的スキルがあります。';
            if (score >= 80) return '平均的な感情知能：標準的な感情理解力です。';
            if (score >= 60) return '発展途上：感情知能を高める余地があります。';
            return '要改善：感情認識と管理スキルの向上が推奨されます。';
        
        case 'spi':
            if (score >= 80) return '優秀：企業が求める水準を十分に満たしています。就職活動で有利です。';
            if (score >= 60) return '良好：基本的な能力は身についています。更なる向上で競争力アップ。';
            if (score >= 40) return '標準：平均的な成績です。言語・非言語分野の強化をおすすめします。';
            if (score >= 20) return '要努力：基礎から復習が必要です。継続的な学習で改善できます。';
            return '要対策：集中的な学習が必要です。専門書や問題集での対策をおすすめします。';
        
        case 'tamatebako':
            if (score >= 80) return '優秀：玉手箱形式に適応できています。企業の筆記試験で高評価が期待できます。';
            if (score >= 60) return '良好：基本的な能力は十分です。計算スピードの向上で更に良くなります。';
            if (score >= 40) return '標準：平均的な成績です。各分野のバランス良い学習をおすすめします。';
            if (score >= 20) return '要努力：時間内での正答率向上が課題です。反復練習が効果的です。';
            return '要対策：基礎力強化が急務です。分野別の集中学習をおすすめします。';
        
        case 'tgweb':
            if (score >= 80) return '優秀：高い発想力と論理的思考力を持っています。難関企業でも通用する実力です。';
            if (score >= 60) return '良好：パズル的思考に長けています。図形問題への対応力を更に伸ばしましょう。';
            if (score >= 40) return '標準：基本的な問題は解けています。応用問題への対応力強化が課題です。';
            if (score >= 20) return '要努力：図形・空間認識の基礎力向上が必要です。多様な問題に挑戦しましょう。';
            return '要対策：発想の転換が必要です。パズル系の問題に慣れる練習をおすすめします。';
        
        case 'gab':
            if (score >= 80) return '優秀：総合職に求められる能力を十分に備えています。難関企業への挑戦も可能です。';
            if (score >= 60) return '良好：言語・数理能力のバランスが取れています。実践的な問題演習で更に向上できます。';
            if (score >= 40) return '標準：基礎的な能力は身についています。速度と正確性の両立が課題です。';
            if (score >= 20) return '要努力：言語理解と数的処理の基礎固めが必要です。段階的な学習をおすすめします。';
            return '要対策：総合的な基礎力向上が急務です。各分野の基本から見直しましょう。';
        
        case 'cab':
            if (score >= 80) return '優秀：ITエンジニアに必要な論理的思考力が優秀です。技術系企業で高く評価されるでしょう。';
            if (score >= 60) return '良好：プログラミング的思考ができています。より高度な技術問題への挑戦をおすすめします。';
            if (score >= 40) return '標準：基本的なIT知識は備わっています。アルゴリズム理解の深化が必要です。';
            if (score >= 20) return '要努力：プログラミング基礎の学習が必要です。コーディング練習を重ねましょう。';
            return '要対策：IT基礎知識の習得が急務です。プログラミング学習から始めることをおすすめします。';
        
        default:
            return '結果を分析中です。各分野の詳細な診断をご確認ください。';
    }
}

function showResults() {
    document.getElementById('testScreen').classList.remove('active');
    document.getElementById('resultScreen').classList.add('active');
    
    const score = calculateScore();
    const testLabels = {
        'iq': 'IQスコア',
        'eq': 'EQスコア', 
        'spi': 'SPI3スコア',
        'tamatebako': '玉手箱スコア',
        'tgweb': 'TG-WEBスコア',
        'gab': 'GABスコア',
        'cab': 'CABスコア'
    };
    const testLabel = testLabels[currentTest] || 'テストスコア';
    
    document.getElementById('scoreLabel').textContent = testLabel;
    document.getElementById('scoreValue').textContent = score;
    document.getElementById('scoreDescription').textContent = getScoreDescription(score, currentTest);
    
    drawScoreChart(score, currentTest);
    showPersonalityAnalysis(score, currentTest);
    showSkillsBreakdown();
    drawComparisonChart(score, currentTest);
    showRecommendations(score, currentTest);
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

function showPersonalityAnalysis(score, testType) {
    const analysisDiv = document.getElementById('personalityAnalysis');
    analysisDiv.innerHTML = '';
    
    let traits = [];
    
    switch(testType) {
        case 'iq':
            if (score >= 120) {
                traits = [
                    { icon: '🧠', title: '抽象的思考力', desc: '複雑な概念や理論を理解し、応用する能力に優れています。' },
                    { icon: '🔍', title: '問題解決力', desc: '論理的なアプローチで効率的に問題を解決します。' },
                    { icon: '💡', title: '創造的思考', desc: '独創的なアイデアや解決策を見つける能力があります。' }
                ];
            } else if (score >= 100) {
                traits = [
                    { icon: '🧮', title: '分析的思考', desc: '情報を整理し、論理的に分析することが得意です。' },
                    { icon: '📊', title: 'パターン認識', desc: '規則性やパターンを見つける能力があります。' },
                    { icon: '🎯', title: '集中力', desc: '複雑なタスクに集中して取り組むことができます。' }
                ];
            } else {
                traits = [
                    { icon: '📚', title: '学習意欲', desc: '新しいことを学ぶ意欲と向上心があります。' },
                    { icon: '🔄', title: '継続力', desc: '諦めずに問題に取り組む粘り強さがあります。' }
                ];
            }
            break;
            
        case 'eq':
            if (score >= 100) {
                traits = [
                    { icon: '❤️', title: '共感力', desc: '他人の感情を理解し、共感する能力に優れています。' },
                    { icon: '🤝', title: 'コミュニケーション力', desc: '効果的に他者と意思疎通を図ることができます。' },
                    { icon: '🧘', title: '感情管理力', desc: '自分の感情をコントロールし、適切に表現できます。' }
                ];
            } else if (score >= 80) {
                traits = [
                    { icon: '👂', title: '傾聴力', desc: '相手の話をしっかりと聞く能力があります。' },
                    { icon: '🎭', title: '感情認識力', desc: '自分や他人の感情の変化に気づくことができます。' }
                ];
            } else {
                traits = [
                    { icon: '🌱', title: '成長意欲', desc: '人間関係やコミュニケーションスキルを向上させたいという意識があります。' },
                    { icon: '🤔', title: '自己反省力', desc: '自分の行動や感情を振り返る習慣があります。' }
                ];
            }
            break;
            
        case 'spi':
            if (score >= 70) {
                traits = [
                    { icon: '📝', title: '言語理解力', desc: '文章を正確に読み取り、意図を理解する能力があります。' },
                    { icon: '🧮', title: '計算処理能力', desc: '数的な問題を素早く正確に処理できます。' },
                    { icon: '🎯', title: '就職適性', desc: '企業が求める基本的なビジネススキルを備えています。' }
                ];
            } else if (score >= 50) {
                traits = [
                    { icon: '📖', title: '基礎学力', desc: '言語と数理の基本的な能力を持っています。' },
                    { icon: '💪', title: '向上心', desc: '苦手分野を克服しようとする意欲があります。' }
                ];
            } else {
                traits = [
                    { icon: '🌱', title: '成長ポテンシャル', desc: '継続的な学習により能力向上が期待できます。' },
                    { icon: '🎓', title: '学習意欲', desc: '基礎から着実に学び直す姿勢があります。' }
                ];
            }
            break;
            
        case 'tamatebako':
            if (score >= 70) {
                traits = [
                    { icon: '⚡', title: '処理速度', desc: '短時間で多くの問題を正確に処理できます。' },
                    { icon: '🌐', title: '多角的思考', desc: '言語・計数・英語を総合的に活用できます。' },
                    { icon: '🏆', title: '競争力', desc: 'Web形式の試験で高いパフォーマンスを発揮します。' }
                ];
            } else if (score >= 50) {
                traits = [
                    { icon: '⚖️', title: 'バランス感覚', desc: '各分野において一定の能力を持っています。' },
                    { icon: '🔧', title: '改善意識', desc: '弱点を認識し、向上させる意識があります。' }
                ];
            } else {
                traits = [
                    { icon: '📈', title: '伸び代', desc: '集中的な練習により大幅な改善が見込めます。' },
                    { icon: '💡', title: '学習戦略', desc: '効果的な学習方法を身につけることで成長できます。' }
                ];
            }
            break;
            
        case 'tgweb':
            if (score >= 70) {
                traits = [
                    { icon: '🎨', title: '創造的発想', desc: '従来とは異なる視点で問題にアプローチできます。' },
                    { icon: '🧩', title: 'パズル思考', desc: '複雑な図形や論理問題を解く能力に長けています。' },
                    { icon: '🚀', title: '発想力', desc: '斬新なアイデアと論理的思考を組み合わせられます。' }
                ];
            } else if (score >= 50) {
                traits = [
                    { icon: '🔍', title: '観察力', desc: '細かな違いやパターンに気づく能力があります。' },
                    { icon: '🎯', title: '集中力', desc: '複雑な問題に粘り強く取り組めます。' }
                ];
            } else {
                traits = [
                    { icon: '💭', title: '柔軟性', desc: '固定観念にとらわれない思考の余地があります。' },
                    { icon: '🌟', title: '可能性', desc: '発想転換の練習により飛躍的成長が期待できます。' }
                ];
            }
            break;
            
        case 'gab':
            if (score >= 70) {
                traits = [
                    { icon: '👔', title: '総合職適性', desc: '管理職に求められるバランスの取れた能力があります。' },
                    { icon: '📊', title: '分析力', desc: 'データを読み取り、適切な判断を下せます。' },
                    { icon: '🎯', title: '意思決定力', desc: '複数の情報を統合して結論を導けます。' }
                ];
            } else if (score >= 50) {
                traits = [
                    { icon: '📚', title: '基礎力', desc: '言語・数理の基本的な能力を備えています。' },
                    { icon: '🔧', title: '改善志向', desc: '弱点を認識し、計画的に改善できます。' }
                ];
            } else {
                traits = [
                    { icon: '🌱', title: '成長意欲', desc: '継続的な努力で着実に力をつけられます。' },
                    { icon: '💪', title: '潜在能力', desc: '適切な指導により大きく伸びる可能性があります。' }
                ];
            }
            break;
            
        case 'cab':
            if (score >= 70) {
                traits = [
                    { icon: '💻', title: 'IT適性', desc: 'プログラミングや論理的思考に優れた適性があります。' },
                    { icon: '⚙️', title: 'システム思考', desc: '複雑なシステムを理解し、設計する能力があります。' },
                    { icon: '🔬', title: '論理的分析', desc: '問題を構造化して解決策を見つけられます。' }
                ];
            } else if (score >= 50) {
                traits = [
                    { icon: '🧩', title: '問題解決志向', desc: '技術的な課題に取り組む意欲があります。' },
                    { icon: '📖', title: '学習能力', desc: '新しい技術を習得する基礎力があります。' }
                ];
            } else {
                traits = [
                    { icon: '🌟', title: '技術への関心', desc: 'IT分野への興味と学習意欲があります。' },
                    { icon: '🎯', title: '成長可能性', desc: '基礎から学び直すことで大きく向上できます。' }
                ];
            }
            break;
            
        default:
            traits = [
                { icon: '🎯', title: '総合力', desc: '様々な分野の問題に取り組む能力があります。' },
                { icon: '📈', title: '向上心', desc: '継続的な学習により成長し続けられます。' }
            ];
    }
    
    traits.forEach(trait => {
        const traitDiv = document.createElement('div');
        traitDiv.className = 'trait-item';
        traitDiv.innerHTML = `
            <div class="trait-icon">${trait.icon}</div>
            <div class="trait-content">
                <div class="trait-title">${trait.title}</div>
                <div class="trait-description">${trait.desc}</div>
            </div>
        `;
        analysisDiv.appendChild(traitDiv);
    });
}

function showSkillsBreakdown() {
    const skillsDiv = document.getElementById('skillsBreakdown');
    skillsDiv.innerHTML = '';
    
    let skills = [];
    
    if (currentTest === 'iq') {
        const logicScore = calculateCategoryScore('logic');
        const patternScore = calculateCategoryScore('pattern');
        const mathScore = calculateCategoryScore('math');
        const spatialScore = calculateCategoryScore('spatial');
        
        skills = [
            { name: '論理的推理', score: logicScore },
            { name: 'パターン認識', score: patternScore },
            { name: '数的処理', score: mathScore },
            { name: '空間認識', score: spatialScore }
        ];
    } else {
        const emotionScore = calculateCategoryScore('emotion');
        const empathyScore = calculateCategoryScore('empathy');
        const socialScore = calculateCategoryScore('social');
        const selfAwarenessScore = calculateCategoryScore('self-awareness');
        
        skills = [
            { name: '感情管理', score: emotionScore },
            { name: '共感力', score: empathyScore },
            { name: '社会的スキル', score: socialScore },
            { name: '自己認識', score: selfAwarenessScore }
        ];
    }
    
    skills.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill-item';
        skillDiv.innerHTML = `
            <div class="skill-name">${skill.name}</div>
            <div class="skill-bar">
                <div class="skill-fill" data-skill="${skill.name}"></div>
            </div>
            <div class="skill-score">${skill.score}%</div>
        `;
        skillsDiv.appendChild(skillDiv);
        
        setTimeout(() => {
            const fillElement = skillDiv.querySelector('.skill-fill');
            fillElement.style.width = skill.score + '%';
        }, 500);
    });
}

function calculateCategoryScore(category) {
    const categoryQuestions = questions.filter(q => q.type === category);
    if (categoryQuestions.length === 0) return 0;
    
    const categoryAnswers = answers.filter(a => 
        categoryQuestions.some(q => questions.indexOf(q) === a.questionIndex)
    );
    
    const totalPoints = categoryAnswers.reduce((sum, answer) => sum + answer.points, 0);
    const maxPoints = categoryQuestions.reduce((sum, question) => sum + question.points, 0);
    
    return Math.round((totalPoints / maxPoints) * 100);
}

function drawComparisonChart(score, testType) {
    const canvas = document.getElementById('comparisonChart');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const averageScore = testType === 'iq' ? 100 : 90;
    const data = [
        { label: 'あなた', score: score, color: '#667eea' },
        { label: '平均', score: averageScore, color: '#e0e0e0' },
        { label: '上位10%', score: testType === 'iq' ? 120 : 110, color: '#f093fb' }
    ];
    
    const maxScore = Math.max(...data.map(d => d.score)) * 1.1;
    const barWidth = 60;
    const barSpacing = (width - data.length * barWidth) / (data.length + 1);
    
    data.forEach((item, index) => {
        const x = barSpacing + index * (barWidth + barSpacing);
        const barHeight = (item.score / maxScore) * (height - 80);
        const y = height - barHeight - 40;
        
        ctx.fillStyle = item.color;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        ctx.fillStyle = '#333';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.score, x + barWidth/2, y - 10);
        
        ctx.font = '14px Arial';
        ctx.fillText(item.label, x + barWidth/2, height - 10);
    });
    
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('スコア', 10, 20);
}

function showRecommendations(score, testType) {
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = '';
    
    let recommendations = [];
    
    if (testType === 'iq') {
        if (score < 100) {
            recommendations = [
                { icon: '📚', title: '論理パズルに挑戦', desc: '数独やクロスワードパズルで論理的思考力を鍛えましょう。' },
                { icon: '🧮', title: '計算練習', desc: '暗算や数学問題を定期的に解いて数的処理能力を向上させましょう。' },
                { icon: '📖', title: '読書習慣', desc: '様々なジャンルの本を読んで語彙力と理解力を高めましょう。' }
            ];
        } else if (score < 120) {
            recommendations = [
                { icon: '🎲', title: '戦略ゲーム', desc: 'チェスや将棋などで戦略的思考力を磨きましょう。' },
                { icon: '🔬', title: '科学的思考', desc: '仮説を立てて検証する習慣を身につけましょう。' }
            ];
        } else {
            recommendations = [
                { icon: '🎯', title: '創造的問題解決', desc: '既存の枠にとらわれない新しいアプローチを試してみましょう。' },
                { icon: '👥', title: '知識の共有', desc: '他の人に教えることで自分の理解をさらに深めましょう。' }
            ];
        }
    } else {
        if (score < 80) {
            recommendations = [
                { icon: '🎭', title: '感情日記', desc: '日々の感情の変化を記録して自己理解を深めましょう。' },
                { icon: '👂', title: '積極的傾聴', desc: '相手の話をしっかりと聞く練習をしましょう。' },
                { icon: '🧘', title: 'マインドフルネス', desc: '瞑想や深呼吸で感情をコントロールする技術を学びましょう。' }
            ];
        } else if (score < 100) {
            recommendations = [
                { icon: '🤝', title: 'コミュニケーション練習', desc: '様々な人との対話の機会を増やしましょう。' },
                { icon: '💭', title: '共感力向上', desc: '他人の立場に立って考える習慣を身につけましょう。' }
            ];
        } else {
            recommendations = [
                { icon: '👑', title: 'リーダーシップ発揮', desc: 'チームをまとめる役割に挑戦してスキルを活用しましょう。' },
                { icon: '🌟', title: 'メンタリング', desc: '他の人の成長をサポートする活動に参加しましょう。' }
            ];
        }
    }
    
    recommendations.forEach(rec => {
        const recDiv = document.createElement('div');
        recDiv.className = 'recommendation-item';
        recDiv.innerHTML = `
            <div class="recommendation-icon">${rec.icon}</div>
            <div class="recommendation-content">
                <div class="recommendation-title">${rec.title}</div>
                <div class="recommendation-description">${rec.desc}</div>
            </div>
        `;
        recommendationsDiv.appendChild(recDiv);
    });
}

function goHome() {
    document.getElementById('resultScreen').classList.remove('active');
    document.getElementById('startScreen').classList.add('active');
}