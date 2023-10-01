const socket = io();
/*

let waterTempGauge = new JustGage({
    id: "waterTempGauge",
    value: 0,
    min: 0,
    max: 120,
    title: "Temperatura Wody",
    label: "°C"
});
*/
        let RPM_V=0
        var canvasWidth = 1024
        var canvasHeight = 600
        var RPMYPosition = 75
        var RPMXPosition = 100
        var interval = setInterval(updateCanvas, 20)
        function startGame() {
            mainCanvas.start()
            RPM = new createRPM(0,70)
        }

        var mainCanvas = {
            canvas: document.createElement("canvas"),
            start: function() {
                // creating canvas and adding it into id canvas then inserting it before footer
                this.canvas.width = canvasWidth
                this.canvas.height = canvasHeight
                this.context = this.canvas.getContext("2d");
                ft = document.getElementById("footer")
                parentDiv = document.getElementById("canvas")
                parentDiv.insertBefore(this.canvas, ft)
            }
        }

        function createRPM(width, height) {
            this.width = width
            this.height = height
            this.x = RPMXPosition
            this.y = RPMYPosition

            this.draw = function () {
                ctx = mainCanvas.context

                if(RPM_V>=3000 && RPM_V<4500){
                    ctx.fillStyle = "yellow"
                }
                else if(RPM_V>=4500){
                    ctx.fillStyle = "red"
                }
                else {
                ctx.fillStyle = "green"
                }

                ctx.fillRect(this.x,this.y,this.width+RPM_V/9,this.height)
                }
            }
            

function updateCanvas() {
    ctx = mainCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // Wypełnienie obszaru paska kolorem szarym
    ctx.fillStyle = "gray";
    ctx.fillRect(RPM.x, RPM.y, RPM.width + 7000/9, RPM.height);

    // Dodanie ramki dookoła obszaru paska
    ctx.strokeStyle = "#000";  // Ustaw kolor ramki na czarny (lub dowolny inny kolor)
    ctx.lineWidth = 2;  // Ustaw grubość ramki na 2 piksele (możesz dostosować tę wartość)
    ctx.strokeRect(RPM.x, RPM.y, RPM.width + 7000/9, RPM.height);

    // Rysuj pasek RPM
    RPM.draw();
    // Rysuj podziałki
    let numberOfTicks = 7;  // Od 1 do 7
    let tickSpacing = (RPM.width + 7000/9) / numberOfTicks;  // Odstęp między podziałkami
    let smallTickSpacing = tickSpacing / 2;  // Odstęp między małymi podziałkami
    let textOffsetY = -20;  // Odstęp tekstu od linii podziałki

    for (let i = 0; i <= numberOfTicks; i++) {
        let xPos = RPM.x + i * tickSpacing;

        ctx.lineWidth = 5;

        // Rysuj główną podziałkę
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(xPos, RPM.y- 15);
        ctx.lineTo(xPos, RPM.y + RPM.height+15);
        ctx.stroke();

        // Rysuj etykiety dla głównych podziałek
        ctx.font = "15px Arial";
        ctx.fillStyle = "white";
        ctx.fillText((i + 0) , xPos - 5, RPM.y + textOffsetY);

        ctx.lineWidth = 3;

        // Rysuj mniejszą podziałkę co 500
        if (i < numberOfTicks) {
            ctx.beginPath();
            ctx.moveTo(xPos + smallTickSpacing, RPM.y-7);
            ctx.lineTo(xPos + smallTickSpacing, RPM.y + RPM.height+7);
            ctx.stroke();
        }
    }
}


startGame()

socket.on('update', (data) => {
    let parsedData = JSON.parse(data);
    RPM_V=parsedData.RPM
    console.log(data)
    //waterTempGauge.refresh(parsedData.Water);
});