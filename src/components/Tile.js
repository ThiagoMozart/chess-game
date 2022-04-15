import './styles/Tile.css'

class Props{
    constructor(image,number){
        this.image = image;
        this.number = number;
    }
}

export default function Tile({number, image}) {

    if (number % 2 === 0){
        return <div className= "tile black-square">
            {image && <div style = {{backgroundImage : `url(${image})`}} className= "chess-piece"></div>}
            </div>
    }
    else{
        return <div className= "tile white-square">
            {image && <div style = {{backgroundImage : `url(${image})`}} className= "chess-piece"></div>}        
            </div>

    }


}

//Lembrar de por <div key={`x${j}y${i}`} 