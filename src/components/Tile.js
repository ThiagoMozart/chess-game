import './styles/Tile.css'

class Props{
    constructor(image,number){
        this.image = image;
        this.number = number;
    }
}

export default function tile({number, image}) {
    if (number % 2 === 0){
        return <div className= "tile black-square">
            <img src= {image}/>
            </div>
    }
    else{
        return <div className= "tile white-square">
            <img src= {image}/>
        </div>

    }


}

//Lembrar de por <div key={`x${j}y${i}`} 