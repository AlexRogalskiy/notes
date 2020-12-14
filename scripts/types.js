exports.AllTags = reverse({
    'javascript': {
        background: 'var(--text-color--dark)',
        color: '#f0db4f',
        description: `JavaScript (JS) is a lightweight interpreted or just-in-time compiled programming language.`
    },
    'typescript': {
        background: 'var(--text-color--dark)',
        color: '#2775c3',
        description: `TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript.`
    },
    'nodejs': {
        background: 'var(--text-color--dark)',
        color: '#90c53f',
        description: `Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.`
    },
    'google-cloud': {
        background: 'var(--text-color--dark)',
        color: '#ff5252',
        description: `Google Cloud Platform is a suite of public cloud computing services offered by Google. The platform includes a range of hosted services for compute, storage and application development that run on Google hardware.`
    },
    'firebase': {
        background: 'var(--text-color--dark)',
        color: '#651fff',
        description: `Firebase is Google's mobile platform that helps you quickly develop high-quality apps and grow your business.`
    },
    'config-files': {
        background: 'var(--text-color--dark)',
        color: '#e040fb',
        description: `Commonly used configuration files.`
    },
    'travis': {
        background: 'var(--text-color--dark)',
        color: '#39aa56',
        description: `Travis CI is a hosted continuous integration service used to build and test software projects hosted at GitHub.`
    },
    'appveyor': {
        background: '#ffffff',
        color: '#322525',
        description: `Continuous Integration solution for Windows and Linux. Build, test, deploy your apps faster, on any platform.`
    },
    'github': {
        background: 'var(--text-color--dark)',
        color: '#3880ff',
        description: `Github and relates resources`
    },
    'email-replies': {
        background: 'var(--text-color--dark)',
        color: '#3880ff',
        description: `Replies to emails.`
    },
    'random': {
        background: 'var(--text-color--dark)',
        color: '#fec042',
        description: `Random`
    }
});

function reverse(tags) {
    // Object.keys(tags).map((tag) => {
    //     const background = tags[tag].background;
    //     const color = tags[tag].color;

    //     tags[tag].background = color;
    //     tags[tag].color = background;
    // });

    for (let tag in tags) {
        const background = tags[tag].background;
        const color = tags[tag].color;

        tags[tag].background = color;
        tags[tag].color = background;
    }
    return tags;
}