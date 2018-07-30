export class Story {
    public author: string;
    public title: string;
    public pages: number;
    public body: Array<any>;

    constructor() {
        this.author = '';
        this.title = '';
        this.pages = 0;
        this.body = [
        ];
    }
}