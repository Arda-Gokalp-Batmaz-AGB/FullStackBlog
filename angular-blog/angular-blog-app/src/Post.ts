interface Entry{
    ID : number;
    title : string;
    author : string;
    body : string;
    favoriete : string;
    createDate : string;
    updateDate : string;
  }
  export class Post implements Entry
  {
      ID: number;
      title: string;
      author: string;
      body: string;
      favoriete: string;
      createDate: string;
      updateDate: string;
  
      constructor(title : string,author : string,body : string)
      {
        this.title = title;
        this.author = author;
        this.body = body;
        this.ID = this.hashCode(this.title+this.author+this.body);
        this.favoriete = "NaN"
        this.createDate =  new Date().toJSON("yyyy/MM/dd HH:mm");;
        this.updateDate = this.createDate;
      }
  
      private hashCode(str: string): number {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; 
        }
        hash = hash + 1;
        return hash;
      }
      equals(postObj : Post) : boolean
      {
          return this.ID == postObj.ID && this.title== postObj.title && this.author == postObj.author && this.body == postObj.body;
      }
      
  }