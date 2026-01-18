export type Language = 'en' | 'zh' | 'ja';

export interface Translations {
  // Navigation
  nav: {
    about: string;
    dashboard: string;
    howIsWorking: string;
  };
  
  // Hero Section
  hero: {
    slogan: string;
    buyOnFlap: string;
    learnMore: string;
    contractAddress: string;
    soon: string;
  };
  
  // About Section
  about: {
    title: string;
    description: string;
  };
  
  // How is working Section
  howIsWorking: {
    title: string;
    steps: {
      transactionFee: {
        title: string;
        description: string;
      };
      helpingHorses: {
        title: string;
        description: string;
      };
      growingLiquidity: {
        title: string;
        description: string;
      };
      checkData: {
        title: string;
        description: string;
      };
    };
  };
  
  // Dashboard
  dashboard: {
    title: string;
    donations: string;
    liquidity: string;
    horsesHelped: string;
    loading: string;
    error: string;
  };
  
  // Footer
  footer: {
    copyright: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      about: 'About',
      dashboard: 'Dashboard',
      howIsWorking: 'How is working',
    },
    hero: {
      slogan: "Let's run to save the horses!",
      buyOnFlap: 'Buy on Flap',
      learnMore: 'Learn More',
      contractAddress: 'CA:',
      soon: 'soon',
    },
    about: {
      title: 'What is Uma Musume?',
      description: 'Uma Musume: Pretty Derby is a Japanese anime and game franchise by Cygames that turns legendary real-life racehorses into "horse girls" who train, race, and chase their dreams while honoring the history behind each horse. Beyond entertainment, the Uma Musume community is known for being exceptionally generous and respectful toward real horses. Fans actively support retired racehorses through donations, farm visits, and welfare initiatives, helping give these champions a better life after racing. This year is about more than racing, it\'s about giving back. Let\'s save the horses in their year.',
      paragraphs: [
        'Uma Musume: Pretty Derby is a Japanese anime and game franchise by Cygames that turns legendary real-life racehorses into "horse girls" who train, race, and chase their dreams while honoring the history behind each horse.',
        'Beyond entertainment, the Uma Musume community is known for being exceptionally generous and respectful toward real horses. Fans actively support retired racehorses through donations, farm visits, and welfare initiatives, helping give these champions a better life after racing.',
        'This year is about more than racing, it\'s about giving back. Let\'s save the horses in their year.'
      ]
    },
    howIsWorking: {
      title: 'How is working',
      steps: {
        transactionFee: {
          title: '3% Transaction Fee',
          description: 'Each transaction includes a 3% fee that supports the project and its mission.',
        },
        helpingHorses: {
          title: 'Helping Real Horses',
          description: 'By buying and holding the token, you are helping real horses. Part of what the token generates is used to support horse care and retirement.',
        },
        growingLiquidity: {
          title: 'Growing Liquidity',
          description: 'A portion of the fees is used to add liquidity over time, helping keep the token strong and sustainable.',
        },
        checkData: {
          title: 'Check the Data',
          description: 'All progress can be followed in our public dashboard, where you can see:\n\n• Total fees collected\n• Funds added to token liquidity\n• How many horses have been helped\n\nEverything in one place, easy to follow.',
        },
      },
    },
    dashboard: {
      title: 'DASHBOARD',
      donations: 'Donations',
      liquidity: 'Liquidity',
      horsesHelped: 'Horses Helped',
      loading: 'Loading...',
      error: 'Error',
    },
    footer: {
      copyright: 'Save a uma',
    },
  },
  zh: {
    nav: {
      about: '关于',
      dashboard: '仪表板',
      howIsWorking: '运作方式',
    },
    hero: {
      slogan: '让我们一起奔跑拯救马匹！',
      buyOnFlap: '在Flap上购买',
      learnMore: '了解更多',
      contractAddress: '合约地址：',
      soon: '即将推出',
    },
    about: {
      title: '什么是赛马娘？',
      description: '赛马娘Pretty Derby是由Cygames开发的日本动漫和游戏系列，将传奇的真实赛马转变为"马娘"，她们训练、比赛并追逐梦想，同时尊重每匹马背后的历史。除了娱乐之外，赛马娘社区以其对真实马匹的慷慨和尊重而闻名。粉丝们通过捐款、农场访问和福利倡议积极支持退役赛马，帮助这些冠军在赛马后过上更好的生活。今年不仅仅是赛马，更是回馈。让我们在它们的年份拯救马匹。',
      paragraphs: [
        '赛马娘Pretty Derby是由Cygames开发的日本动漫和游戏系列，将传奇的真实赛马转变为"马娘"，她们训练、比赛并追逐梦想，同时尊重每匹马背后的历史。',
        '除了娱乐之外，赛马娘社区以其对真实马匹的慷慨和尊重而闻名。粉丝们通过捐款、农场访问和福利倡议积极支持退役赛马，帮助这些冠军在赛马后过上更好的生活。',
        '今年不仅仅是赛马，更是回馈。让我们在它们的年份拯救马匹。'
      ]
    },
    howIsWorking: {
      title: '运作方式',
      steps: {
        transactionFee: {
          title: '3%交易手续费',
          description: '每笔交易包含3%的手续费，用于支持项目及其使命。',
        },
        helpingHorses: {
          title: '帮助真实马匹',
          description: '通过购买和持有代币，您正在帮助真实的马匹。代币产生的部分收益用于支持马匹护理和退休。',
        },
        growingLiquidity: {
          title: '增加流动性',
          description: '部分手续费用于逐步增加流动性，帮助代币保持强劲和可持续。',
        },
        checkData: {
          title: '查看数据',
          description: '所有进展都可以在我们的公共仪表板中跟踪，您可以看到：\n\n• 收取的总手续费\n• 添加到代币流动性的资金\n• 帮助了多少马匹\n\n一切尽在一处，易于跟踪。',
        },
      },
    },
    dashboard: {
      title: '仪表板',
      donations: '捐款',
      liquidity: '流动性',
      horsesHelped: '帮助的马匹',
      loading: '加载中...',
      error: '错误',
    },
    footer: {
      copyright: '拯救一匹马',
    },
  },
  ja: {
    nav: {
      about: '概要',
      dashboard: 'ダッシュボード',
      howIsWorking: '仕組み',
    },
    hero: {
      slogan: '馬を救うために走りましょう！',
      buyOnFlap: 'Flapで購入',
      learnMore: '詳細を見る',
      contractAddress: 'コントラクトアドレス：',
      soon: '近日公開',
    },
    about: {
      title: 'ウマ娘とは？',
      description: 'ウマ娘 プリティーダービーは、Cygamesが開発した日本のアニメ・ゲームシリーズで、伝説的な実在の競走馬を「ウマ娘」に変え、それぞれの馬の歴史を尊重しながら、トレーニング、レース、夢を追いかける姿を描いています。エンターテインメントを超えて、ウマ娘コミュニティは実在の馬に対する非常に寛大で敬意のある姿勢で知られています。ファンは寄付、牧場訪問、福祉イニシアチブを通じて、引退した競走馬を積極的に支援し、これらのチャンピオンに競走後のより良い生活を与えることを支援しています。今年はレース以上のものであり、還元についてです。彼らの年に馬を救いましょう。',
      paragraphs: [
        'ウマ娘 プリティーダービーは、Cygamesが開発した日本のアニメ・ゲームシリーズで、伝説的な実在の競走馬を「ウマ娘」に変え、それぞれの馬の歴史を尊重しながら、トレーニング、レース、夢を追いかける姿を描いています。',
        'エンターテインメントを超えて、ウマ娘コミュニティは実在の馬に対する非常に寛大で敬意のある姿勢で知られています。ファンは寄付、牧場訪問、福祉イニシアチブを通じて、引退した競走馬を積極的に支援し、これらのチャンピオンに競走後のより良い生活を与えることを支援しています。',
        '今年はレース以上のものであり、還元についてです。彼らの年に馬を救いましょう。'
      ]
    },
    howIsWorking: {
      title: '仕組み',
      steps: {
        transactionFee: {
          title: '3%取引手数料',
          description: '各取引には3%の手数料が含まれており、プロジェクトとその使命をサポートします。',
        },
        helpingHorses: {
          title: '実在の馬を支援',
          description: 'トークンを購入して保持することで、実在の馬を支援しています。トークンが生成するものの一部は、馬のケアと引退をサポートするために使用されます。',
        },
        growingLiquidity: {
          title: '流動性の成長',
          description: '手数料の一部は時間をかけて流動性を追加するために使用され、トークンを強く持続可能に保つのに役立ちます。',
        },
        checkData: {
          title: 'データを確認',
          description: 'すべての進捗は、パブリックダッシュボードで追跡できます。以下を確認できます：\n\n• 収集された総手数料\n• トークン流動性に追加された資金\n• 支援された馬の数\n\nすべてが一箇所にまとまっており、追跡が簡単です。',
        },
      },
    },
    dashboard: {
      title: 'ダッシュボード',
      donations: '寄付',
      liquidity: '流動性',
      horsesHelped: '支援した馬',
      loading: '読み込み中...',
      error: 'エラー',
    },
    footer: {
      copyright: '馬を救う',
    },
  },
};
