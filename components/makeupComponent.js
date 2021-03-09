class makeupComponen{

    constructor(choice){
        this.choice=choice;
    }

    render=()=>{

 
        let component=document.createElement('div');
        component.className='interaction__name';

        let name=document.createElement('div');
        name.className='interaction__name';

        let eyeImg = document.createElement('img');
        eyeImg.className='interaction__eye';

        component.appendChild(name);
        component.appendChild(eyeImg);
    
        return component;
    }
}
