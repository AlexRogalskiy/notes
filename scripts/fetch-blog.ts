import fetch from 'node-fetch';
import * as fs from 'fs-extra';
import * as path from 'path';

const FETCH_BASE_URL = 'https://terriblefootballanalysis.com/wp-json/wp/v2';

fetchPosts().catch(console.error);

async function fetchPosts() {
    const response = await fetch(`${FETCH_BASE_URL}/post`);
    const posts: IPost[] = await response.json();

    posts.map((post) => {
        let str = '';

        str = str.concat('---', '\n');
        str = str.concat(`title : "${post.title.rendered.replace(/["]+/g, "'")}"`, '\n');
        str = str.concat(`description : "${post.excerpt.rendered.replace(/["]+/g, "'")}"`, '\n');
        str = str.concat(`tags : []`, '\n');
        str = str.concat(`pageClass : blog-page`, '\n');
        str = str.concat('---', '\n\n');

        str = str.concat(`# ${post.title.rendered}`, '\n');
        str = str.concat(`[[toc]]`, '\n');


        const filteredText = filterText(post.content.rendered);
        str = str.concat(filteredText);

        const filepath = path.join('./blog', post.slug + '.md');
        fs.ensureDirSync(path.dirname(filepath));
        fs.writeFileSync(filepath, str, { encoding: 'utf-8' });
    });

}

function filterText(baseString: string): string {
    let str = baseString;


    // replace tag: <p>
    str = str.replace(/<p.*?>([\w\W]*?)<[\/]p>/g, '\n$1\n');

    // replace tag: <h2>
    str = str.replace(/<h2.*?>([\w\W]*?)<[\/]h2>/g, '\n## $1\n');

    // replace tag: <h3>
    str = str.replace(/<h3.*?>([\w\W]*?)<[\/]h3>/g, '\n### $1\n');

    // replace tag: <strong>
    str = str.replace(/<strong.*?>([\w\W]*?)<[\/]strong>/g, '**$1**');

    // replace tag: <img>
    str = str.replace(/<img.+?src=['"](htt.+?)['"].+?[\/]?>/g, '\n![]($1)\n');

    // replace tag: <figure>
    str = str.replace(/<figure.*?>([\w\W]*?)<[\/]figure>/g, '\n$1\n');


    // replace diymechatronics.com
    str = str.replace(/https:\/\/diymechatronics.com/g, 'https://terriblefootballanalysis.com');

    // replace new-lines
    str = str.replace(/[\n]+/g, '\n\n');

    return str;

}

interface IPost {
    author: number;
    categories: number[];
    content: {
        protected: boolean;
        rendered: string;
    }
    date: string;
    date_gmt: string;
    excerpt: {
        protected: boolean;
        rendered: string;
    }
    modified: string;
    modified_gmt: string;
    title: {
        rendered: string;
    }
    slug: string;
    link: string;
    type: 'post';
}