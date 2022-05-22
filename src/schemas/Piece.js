import PeaoW from "../images/peao_w.png"
import PeaoB from "../images/peao_b.png"
import BispoW from "../images/bispo_w.png"
import BispoB from "../images/bispo_b.png"
import CavaloW from "../images/cavalo_w.png"
import CavaloB from "../images/cavalo_b.png"
import RainhaW from "../images/rainha_w.png"
import RainhaB from "../images/rainha_b.png"
import ReiW from "../images/rei_w.png"
import ReiB from "../images/rei_b.png"
import TorreW from "../images/torre_w.png"
import TorreB from "../images/torre_b.png"

export default class Piece {
    constructor(fromPlayer, position, type) {
        this.fromPlayer = fromPlayer;
        this.position = position;
        this.type = type;
        if (type === 'peao' && fromPlayer)
            this.imagePath = PeaoW;
        else if (type === 'torre' && fromPlayer)
            this.imagePath = TorreW;
        else if (type === 'cavalo' && fromPlayer)
            this.imagePath = CavaloW;
        else if (type === 'bispo' && fromPlayer)
            this.imagePath = BispoW;
        else if (type === 'rainha' && fromPlayer)
            this.imagePath = RainhaW;
        else if (type === 'rei' && fromPlayer)
            this.imagePath = ReiW;
        else if (type === 'peao' && !fromPlayer)
            this.imagePath = PeaoB;
        else if (type === 'bispo' && !fromPlayer)
            this.imagePath = BispoB;
        else if (type === 'cavalo' && !fromPlayer)
            this.imagePath = CavaloB;
        else if (type === 'rainha' && !fromPlayer)
            this.imagePath = RainhaB;
        else if (type === 'rei' && !fromPlayer)
            this.imagePath = ReiB;
        else if (type === 'torre' && !fromPlayer)
            this.imagePath = TorreB;

    }
}