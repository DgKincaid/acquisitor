import { AcquireService, SaveService } from '../service/index';
import { Story } from '../model/index';

export class LightNovController{
    public story: Story;

    constructor(){
        this.story = new Story();
    }

    public getStory(url: string){
        let classes = [
            '.block-title',
            '.chapter-content3'
        ];
    }
    
}