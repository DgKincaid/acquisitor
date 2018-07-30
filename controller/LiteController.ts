import { Story } from "../model";

export class LiteController {
    public story: Story;

    constructor() {
        this.story = new Story();
    }

    public getStory(url: string): void {
        console.log('get story');
    }
}