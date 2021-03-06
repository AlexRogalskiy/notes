import * as fs from 'fs-extra';
import * as Path from 'path';
import * as recc from 'recursive-readdir';
import { AllTags } from './types';
import { themeConfig } from '../.vuepress/config';
import { IFrontmatterData, getFrontmatterFromPath, capitalize } from './util';
import { reccursiveIgnoreFunction } from './check-files';
import * as sharp from 'sharp';

var beautify = require('js-beautify').js;

let sidebars = ['config-files', 'tags', 'snippets', 'replies'];
let readmefiles = ['config-files', 'snippets', 'replies'];

if (!process.env.CI) {
    sidebars = sidebars.concat('edfora');
    readmefiles = readmefiles.concat('edfora');
}

const TAGS_BASE_PATH = './tags';

(async () => {
    await createTagsDirectory();
    createSidebars(sidebars);
    createReadmeFiles(readmefiles);
    updatePrimaryColor();
    generateAllDocsPage();
})().catch(console.error);


async function createTagsDirectory() {
    fs.ensureDirSync(TAGS_BASE_PATH);

    const frontmatterData: IFrontmatterData[] = [];
    (await recc(Path.join('./'), ['README.md', reccursiveIgnoreFunction])).map((file) => {
        frontmatterData.push({
            path: file,
            frontmatter: getFrontmatterFromPath(file)
        });
    });
    createFilesInTagsFolder(frontmatterData);
    createReadmePage();

    function createReadmePage() {
        let readmeData = '';
        readmeData = readmeData.concat('# Tags', '\n\n');
        readmeData = readmeData.concat('<div class="tags-container">', '\n\n');
        Object.keys(AllTags).map((tag) => {
            readmeData = readmeData.concat(`<Tag name="${tag}" />`, '\n');
        });
        readmeData = readmeData.concat(`</div>`);
        fs.writeFileSync(Path.join(TAGS_BASE_PATH, 'README.md'), readmeData);
    }

    function createFilesInTagsFolder(data: IFrontmatterData[]) {
        Object.keys(AllTags).map((tag) => {
            const files = data.filter((d) => {
                if (d.frontmatter && d.frontmatter.tags) {
                    return d.frontmatter.tags.includes(tag);
                }
            }).sort((a, b) => {
                if (a.frontmatter.cover && b.frontmatter.cover) { return 0; }
                if (a.frontmatter.cover && !b.frontmatter.cover) { return -1; }
                if (!a.frontmatter.cover && b.frontmatter.cover) { return 1; }
                return 0;
            });

            let str = '';
            str = str.concat('---', '\n', 'pageClass : sidebar-metacard-container', '\n', `description : ${AllTags[tag].description}`, '\n', '---', '\n\n');
            str = str.concat(`# ${capitalize(tag)}`, '\n\n');
            str = str.concat(`<Header/>`, '\n\n');
            str = str.concat('<div class="tags-container">', '\n\n');
            files.map((file) => {
                str = str.concat(
                    `<MetaCard link="/${file.path.replace('.md', '.html').replace(/[\\/]/g, '/')}" >`,
                    file.frontmatter.cover ? `<img src="${file.frontmatter.cover}"> ` : '',
                    '</MetaCard>', '\n\n'
                );
            });
            str = str.concat('</div>', '\n');
            fs.writeFileSync(Path.join(TAGS_BASE_PATH, tag + '.md'), str);
        });
    }
}

function createReadmeFiles(paths: string[]) {

    paths.map((v) => {
        createReadmeFile(v);
    });

    function createReadmeFile(path: string) {
        fs.readdir(`./${path}`).then((dir) => {
            const files = dir.filter((file) => { return file != 'README.md' });
            const frontmatters = files
                .map((file) => {
                    return getFrontmatterFromPath(Path.join(path, file));
                }).sort((a, b) => {
                    if (a.cover && b.cover) { return 0; }
                    if (a.cover && !b.cover) { return -1; }
                    if (!a.cover && b.cover) { return 1; }
                    return 0;
                });


            let str = '';
            str = str.concat('---', '\n', 'pageClass : no-sidebar-metacard-container', '\n', 'sidebar : false', '\n', '---', '\n\n');
            str = str.concat(capitalize(`# ${path}`), '\n\n');
            str = str.concat('<div class="tags-container">', '\n\n');

            frontmatters.map((frontmatter) => {
                if (frontmatter) {
                    str = str.concat(
                        `<MetaCard link="/${frontmatter.path.replace('.md', '.html').replace(/[\\/]/g, '/')}" >`,
                        frontmatter.cover ? `<img src="${frontmatter.cover}"> ` : '',
                        '</MetaCard>', '\n\n'
                    );
                }
            });
            str = str.concat('</div>', '\n');

            fs.writeFileSync(`./${path}/README.md`, str);
        }).catch((err) => {
            console.log(err);
        });
    }
}


async function updatePrimaryColor() {
    //has to be hex code
    const iconColor = '#020814';
    // const iconColor = '#09c372';
    // const iconColor = '#10dc60';

    //can be rgb
    // const accentColor = '#ff5252';//red
    const accentColor = '#3880ff';//blue
    // const accentColor = '#3b5bdb';//purple
    // const accentColor = '#ffce00';//ionic-warning
    // const accentColor = '#10dc60';//green
    // const accentColor = '#ffce00';//yello
    // const accentColor = '#f04141';//red
    // const accentColor = '#09c372';//fireship green
    // const accentColor = '#fa7c3b';//fireship orange
    // const accentColor = '#020814';//black
    // const accentColor = '#5851ff';//stenciljs purple

    const overrideFilePath = Path.resolve('./.vuepress/override.styl');
    const svgFilePath = Path.resolve(`./.vuepress/public/images/icon-svg.svg`);
    const pngFilePath = Path.resolve(`./.vuepress/public/images/icon.png`);
    const manifestFilePath = Path.resolve(`./.vuepress/public/pwa/manifest.json`);

    let override = fs.readFileSync(overrideFilePath).toString();
    override = override.replace(/\$accentColor.+/, `$accentColor = ${accentColor}`);
    fs.writeFileSync(overrideFilePath, override);

    //svg color
    let svg = fs.readFileSync(svgFilePath).toString();
    svg = svg.replace(/fill="[#0-9a-z(),]+"/g, `fill="${iconColor}"`);
    fs.writeFileSync(svgFilePath, svg);


    //png image
    const imageBuffer = await sharp(svgFilePath)
        .png()
        .toBuffer();
    fs.writeFileSync(pngFilePath, imageBuffer);


    //manifest json color
    const manifest = fs.readJsonSync(manifestFilePath);
    manifest.theme_color = accentColor;
    fs.writeFileSync(manifestFilePath, JSON.stringify(manifest));
}

function createSidebars(paths: string[]) {
    const obj: ISidebarObject = {};
    paths.map((path) => {
        obj[`/${path}/`] = fs.readdirSync(`./${path}`).filter((val) => { return val != 'README.md' })
    });
    const initialObject: ISidebarObject = JSON.parse(JSON.stringify(themeConfig.sidebar));
    const folders = Object.keys(obj);
    folders.map((folder) => {
        obj[folder].sort((a, b) => {
            return initialObject[folder].indexOf(a) - initialObject[folder].indexOf(b)
        });
    });

    fs.readFile('./.vuepress/config.js').then((file) => {
        const str = String().concat('sidebar:', JSON.stringify(Object.assign(initialObject, obj)).replace(/(:|,|\[)/g, '$1\n'));
        const match = file.toString().replace(/sidebar:(.|\n|\s|{)+?}/, str);
        fs.writeFileSync('./.vuepress/config.js', beautify(match));
    }).catch((err) => {
        console.log(err);
    });
}

function generateAllDocsPage() {

    const folders = sidebars.filter((val) => {
        return !val.match(/(tags|all)/);
    });

    let str = ``;
    str = str.concat(`---`, '\n');
    str = str.concat(`description : All docs on one page.`, '\n');
    str = str.concat(`author : nishkal`, '\n');
    str = str.concat(`tags : []`, '\n');
    str = str.concat(`sidebarDepth: 4`, '\n');
    str = str.concat(`---`, '\n');

    str = str.concat(`\n# All Docs\n`);

    folders.map((folder) => {
        str = str.concat('\n', `## ${caps(folder)}`, '\n');

        let files = fs.readdirSync(folder).filter((val) => !val.includes('README.md'));

        const initialObject: ISidebarObject = JSON.parse(JSON.stringify(themeConfig.sidebar));
        files = files.sort((a, b) => {
            return initialObject[`/${folder}/`].indexOf(a) - initialObject[`/${folder}/`].indexOf(b)
        });

        files.map((file) => {
            const frontmatter = getFrontmatterFromPath(Path.join(folder, file));
            let data = fs.readFileSync(Path.join(folder, file)).toString();

            data = data
                .replace(/---([\s\S\n]+?)---/, '')
                .replace(/(#.*?)\s/g, '$1## ')
                .replace(/\[\[toc\]\]/g, '');

            //set heading
            const regex = /[\s\n]#{3}\s(\w+)/;
            const match = data.match(regex);
            if (match) {
                data = data.replace(regex, '### $1');
            } else {
                data = `\n\n### ${file.replace('.md', '')}\n\n`.concat(data);
            }

            if (frontmatter) {
                data = data.replace(/<Header\/>/g, `<Header label="${frontmatter.description}" />`)
            }
            str = str.concat(data, '\n', '________', '\n\n');
        });
    });

    fs.ensureFileSync('./all/README.md');
    fs.writeFileSync('./all/README.md', str);
}

function caps(str: string) {
    str = str[0].toUpperCase() + str.substr(1, str.length);
    return str;
}





interface ISidebarObject {
    [name: string]: string[];
}
