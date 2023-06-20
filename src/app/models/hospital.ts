export class Hospital{
    name:string;
    locX:number;
    locY:number;
    hotline:string;
    icuType:string;
    icuCapacity:number;
    constructor(name:string,locX:number,locY:number,hotline:string,icuType:string,icuCapacity:number){
        this.name = name;
        this.locX = locX;
        this.locY = locY;
        this.hotline = hotline;
        this.icuType = icuType;
        this.icuCapacity = icuCapacity;
    }
  
}
