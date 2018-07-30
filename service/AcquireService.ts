import cheerio from 'cheerio';
import request from 'request-promise';

export class AcquireService {
    public getStoryHtml(url: string, classList: Array<any>): void {
        console.log(url);
        console.log(classList);
    }
}