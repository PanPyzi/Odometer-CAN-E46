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
        function startDash() {
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
                ctx = mainCanvas.context;

                // Oblicz długość paska na podstawie RPM_V i maksymalnej wartości 8000
                let maxBarLength = (RPM.width + 7000/9);
                let barLength = maxBarLength - (RPM_V / 7000) * maxBarLength;

                let xPos = this.x + maxBarLength - barLength;

                ctx.fillStyle = "gray";  // Ustaw kolor paska na szary
                ctx.fillRect(xPos, this.y, barLength, this.height);
            }


            }



   function updateCanvas() {
    ctx = mainCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Tworzenie gradientu dla tła
    let gradient = ctx.createLinearGradient(RPM.x, RPM.y, RPM.x + (RPM.width + 7000/9), RPM.y);
    gradient.addColorStop(0, "green");
    gradient.addColorStop(0.5, "yellow");
    gradient.addColorStop(1, "red");

    ctx.fillStyle = gradient;
    ctx.fillRect(RPM.x, RPM.y, RPM.width + 7000/9, RPM.height);

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
        ctx.font = "20px Arial";
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

    let fontSize = 120;
    ctx.font = fontSize + "px Arial";

    let speedometerText = SPEED_V.toString();
    let textWidth = ctx.measureText(speedometerText).width;

    let centerValueX = 498;
    let centerValueY = RPM.y + RPM.height + 170;

    // Stała wielkość prostokąta prędkościomierza
    let fixedRectWidth = 300;
    let fixedRectHeight = 160;
    let rectX = centerValueX - fixedRectWidth / 2;
    let rectY = centerValueY - fixedRectHeight / 2;

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(rectX, rectY, fixedRectWidth, fixedRectHeight);

    let speedometerX = rectX + (fixedRectWidth - textWidth) / 2;
    let speedometerY = rectY + (fixedRectHeight / 2) + (fontSize / 3);
    ctx.fillStyle = "white";
    ctx.fillText(speedometerText, speedometerX, speedometerY);

    let squareSize = 120;
    let squareSpacing = 20;
    let squarePadding = 10;

    let leftSquareX = rectX - squareSpacing - squareSize - 2 * squarePadding;
    let rightSquareX = rectX + fixedRectWidth + squareSpacing;
    let squareY = rectY + (fixedRectHeight - squareSize - 2 * squarePadding) / 2 -50;

    ctx.strokeRect(leftSquareX - 90, squareY, squareSize + 2 * squarePadding + 90, squareSize + 2 * squarePadding);
    ctx.strokeRect(rightSquareX, squareY, squareSize + 2 * squarePadding + 90, squareSize + 2 * squarePadding);

    let labelFontSize = 30;
    ctx.font = labelFontSize + "px Arial";
    let widget_offset = 45;

    let leftLabelText = "OIL TEMP";
    let leftLabelTextWidth = ctx.measureText(leftLabelText).width;
    let leftLabelX = leftSquareX + (squareSize + 2 * squarePadding - leftLabelTextWidth) / 2 - widget_offset;
    let leftLabelY = squareY + squarePadding + labelFontSize;

    let rightLabelText = "WATER TEMP";
    let rightLabelTextWidth = ctx.measureText(rightLabelText).width;
    let rightLabelX = rightSquareX + (squareSize + 2 * squarePadding - rightLabelTextWidth) / 2 + widget_offset;
    let rightLabelY = squareY + squarePadding + labelFontSize;

    ctx.fillStyle = "white";
    ctx.fillText(leftLabelText, leftLabelX, leftLabelY);
    ctx.fillText(rightLabelText, rightLabelX, rightLabelY);

    let valueFontSize = 80;
    ctx.font = valueFontSize + "px Arial";

    let oilValueText = OIL_V.toString();
    let oilValueTextWidth = ctx.measureText(oilValueText).width;
    let oilValueX = leftSquareX + (squareSize + 2 * squarePadding - oilValueTextWidth) / 2 - widget_offset;
    let oilValueY = squareY + squarePadding + squareSize / 2 + valueFontSize / 3 + 20;

    let waterValueText = WATER_V.toString();
    let waterValueTextWidth = ctx.measureText(waterValueText).width;
    let waterValueX = rightSquareX + (squareSize + 2 * squarePadding - waterValueTextWidth) / 2 + widget_offset;
    let waterValueY = squareY + squarePadding + squareSize / 2 + valueFontSize / 3 + 20;

    ctx.fillText(oilValueText, oilValueX, oilValueY);
    ctx.fillText(waterValueText, waterValueX, waterValueY);



    let newSquareY = squareY + squareSize + 30;  // dodajemy 30 pikseli odstępu

    // Rysowanie dodatkowej lewej ramki
    ctx.strokeRect(leftSquareX-90, newSquareY, squareSize + 2 * squarePadding +90, squareSize + 2 * squarePadding);

    // Rysowanie dodatkowej prawej ramki
    ctx.strokeRect(rightSquareX, newSquareY, squareSize + 2 * squarePadding+90, squareSize + 2 * squarePadding);


}


startDash()

socket.on('update', (data) => {
    let parsedData = JSON.parse(data);
    RPM_V=parsedData.RPM
    SPEED_V=parsedData.SPEED
    WATER_V=parsedData.WATER
    OIL_V=parsedData.OIL //do zrobienia w python
    console.log(data)
    //waterTempGauge.refresh(parsedData.Water);
});