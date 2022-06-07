import { Modal, Button } from "react-bootstrap";
export default function GameInfoModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable="true"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Sobre o jogo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Regras do jogo</h4>
        <p>
            <strong>Objetivo do xadrez:</strong>
            <br/>
          O peão avança para uma casa vazia, imediatamente à sua frente na mesma
          coluna ou em seu primeiro lance o peão pode avançar duas casas na
          mesma coluna, desde que ambas estejam vazias.<br></br><br></br>
          
          1 - Rei<br></br>
          1 - Dama<br></br>
          2 - Bispos<br></br>
          2 - Cavalos<br></br>
          2 - Torres<br></br>
          8 - Peões<br></br><br></br>

          Os movimentos são alternados, sendo que o jogador que detém as peças brancas sempre faz o primeiro lance. Um jogador pode "passar a vez" ou deixar de realizar uma jogada.<br></br><br></br>

          O objetivo secundário do jogo é proteger o seu próprio Rei, evitando que ele leve o xeque-mate. É proibido no xadrez colocar o próprio Rei em xeque, ou, quando em xeque, fazer outra jogada que não tirá-lo do xeque.

        </p>
        <p>
            <strong>Movimento e captura das peças:</strong>
            <br/>
            Todas as peças, com exceção do Cavalo, independente de quantas casas andem, têm seu raio de ação limitado pelas outras peças, amigas ou inimigas, ou seja, caso uma peça amiga esteja em seu caminho, ela não poderá parar nesta casa, ou em qualquer outra casa que, para chegar até ela, deva passar pela casa ocupada. No caso de uma peça inimiga, ainda não é permitido chegar em uma casa passando pela casa ocupada, porém, é possível capturar a peça adversária, removendo-a do jogo e posicionando a peça captora na casa que a peça inimiga ocupava no tabuleiro.
        </p>
        <p>
            <strong>Peão:</strong>
            <br/>
            O peão é a única peça do xadrez que nunca retrocede no tabuleiro. O peão pode optar entre andar uma ou duas casas sempre na mesma coluna. Após o primeiro movimento, o peão não mais pode se deslocar duas casas, mesmo que não o tenha feito em seu primeiro movimento. Ao contrário das demais peças do xadrez, quando vai capturar uma peça, seu movimento é diferente: ele desloca-se na diagonal, andando apenas uma casa, sempre para frente. O peão não pode capturar para trás, e não captura peças que obstruem o seu caminho. Assim, qualquer peça, pode parar a marcha de um peão.<br></br><br></br>

            Uma vez que um peão não anda para trás, caso ele alcance a última fileira do tabuleiro (fileira 8 para as brancas ou 1 para as pretas) o jogador deve promover seu peão, transformando-o em qualquer outra peça menos o rei e o peão. O peão pode se transformar em qualquer das quatro peças, dama, torre, bispo ou cavalo, mesmo que haja outras em jogo. É possível, então, possuir duas ou mais damas, três ou mais torres, ou situações semelhantes.

        </p>
        <p>
            <strong>Torre:</strong>
            <br/>
            A torre se movimenta em direções ortogonais, isto é, pelas linhas (horizontais) e colunas (verticais), não podendo se mover pelas diagonais. Ela pode mover quantas casas desejar se estiverem desocupadas pelas colunas e linhas, porém, apenas em um sentido em cada jogada.

        </p>
        <p>
            <strong>Bispo:</strong>
            <br/>
            O bispo se movimenta nas direções diagonais, não podendo se mover pelas ortogonais como as torres. Ele pode mover quantas casas quiser pelas diagonais, porém, apenas em um sentido em cada jogada e desde que as mesmas estejam desobstruídas.

        </p>
        <p>
            <strong>Rainha:</strong>
            <br/>
            A Rainha pode movimentar-se quantas casas queira, tanto na diagonal, como na vertical ou na horizontal, porém, apenas em um sentido em cada jogada.
        </p>
        <p>
            <strong>Rei:</strong>
            <br/>
            Pode mover-se em todas as direções, mas limitado somente à sua casa vizinha. O Rei pode fazer um movimento especial chamado roque com a torre desde que:<br></br><br></br>

            1 - não haja nenhuma peça amiga entre o rei e a torre.<br></br>
            2 - nenhuma das duas peças tenha sido ainda movimentada durante a partida;<br></br>
            3 - nenhuma das casas pelas quais o rei irá passar ou ficar esteja sob ataque de peça inimiga.<br></br><br></br>

            Somente assim podendo ser feito o roque, que pode ser o roque pequeno ou o grande.<br></br><br></br>

            O rei pode capturar, também, qualquer peça adversária, com exceção do rei adversário. Um rei deverá manter distância mínima de duas casas do outro rei, senão será considerado um lance irregular.

        </p>
        <p>
            <strong>Cavalo:</strong>
            <br/>
            O movimento do cavalo corresponde ao movimento em "L". Círculo este que corresponde ao movimento octogonal permitido pelo quadriculado do tabuleiro. Ele pode andar em "forma de L", ou seja, anda duas casas em linha reta e depois uma casa para o lado. Ao colocar uma peça em cada posição disponível do movimento do Cavalo, você verá que elas formam um círculo no tabuleiro. O Cavalo goza de uma liberdade especial em seu movimento, podendo pular qualquer peça, inclusive as do adversário. Captura as peças adversárias que estejam em sua casa de chegada, mas não pode ir para uma casa ocupada por uma peça amiga.

        </p>
        <p>
            <strong>Roque:</strong>
            <br/>
            O roque é um lance do rei com qualquer das suas duas torres situada na mesma fileira e é considerado como um lance de rei apenas. O roque coloca o Rei em segurança e permite colocar a sua torre em uma posição mais centralizada no tabuleiro. O roque tem suas variantes: o roque longo, também chamado de roque do lado da dama e o roque curto, também chamado de roque do lado do rei. Para se executar ambos, move-se o rei duas casas para qualquer lado na horizontal e move-se a torre para a casa imediatamente anterior.<br></br><br></br>

            Para que o roque seja executado deve-se observar certas condições que devem ser seguidas para que o movimento seja válido. São elas:<br></br><br></br>

            1 - Nem o rei nem a torre usada no roque podem ter sido mexidos alguma vez antes no jogo.<br></br>
            2 - O rei não pode estar em xeque antes do roque ser feito e nem pode ficar em xeque após a realização do mesmo.<br></br>
            3 - O caminho da torre e do rei devem estar totalmente desobstruídos, seja por peças amigas ou adversárias.<br></br>
            4 - Nenhuma casa que o rei irá passar para realizar o roque pode estar ameaçada por uma peça adversária.


        </p>
        <p>
            <strong>Tirando o Rei de Xeque:</strong>
            <br/>
            Para retirar o Rei de xeque, o jogador deve tentar os três passos abaixo:<br></br><br></br>

            1 - Movimentar o Rei para uma casa em que ele não esteja em xeque.<br></br>
            2 - Capturar a peça que está dando xeque ao Rei.<br></br>
            3 - Colocar uma peça entre o Rei e a peça que está dando o xeque.<br></br><br></br>
            Quando não há possibilidade de se fazer nenhum desses três passos, caracterizando xeque-mate e a partida acaba imediatamente.

        </p>
        <p>
            <strong>Vitória:</strong>
            <br/>
            Existem dois modos de se obter a vitória durante uma partida de Xadrez:<br></br><br></br>

            1 - Adversário desistir ou abandonar o jogo.<br></br>
            2 - Xeque-mate ao rei adversário.

        </p>
        <p>
            <strong>Empate:</strong>
            <br/>
            Uma partida é considerada empatada, quando:<br></br><br></br>

            1 - O jogador que tiver a vez de jogar não puder realizar nenhuma jogada legal. Esse empate é conhecido como empate por afogamento, rei afogado.<br></br>
            2 - Um dos jogadores propuser e o outro aceitar o empate.

        </p>
        
       
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
}
