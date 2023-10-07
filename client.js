const socket = io();

        let RPM_V=0
        var canvasWidth = 1024
        var canvasHeight = 600
        var RPMYPosition = 75
        var RPMXPosition = 100
        var check_x=400
        var check_y=400
        var interval = setInterval(updateCanvas, 20)
        let check_orange = new Image();
        check_orange.src = 'images/checkengine_orange.png'; // Ścieżka do obrazka
        let check_gray = new Image();
        check_gray.src = 'images/checkengine_gray.png'; // Ścieżka do obrazka
        let no_beams = new Image();
        no_beams.src = 'images/no_beams.png'; // Ścieżka do obrazka
        let low_beams = new Image();
        low_beams.src = 'images/low_beams.png'; // Ścieżka do obrazka
        let high_beams = new Image();
        high_beams.src = 'images/high_beams.png'; // Ścieżka do obrazka

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

    function DrawRPM(){


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

    //Dodatkowe wskazniki kierunki itp
    ctx.strokeRect(rectX, rectY+170, fixedRectWidth, fixedRectHeight);
    width=40
    height=40
    //Prawo
    ctx.fillStyle = COLOR_R;
    ctx.beginPath();
    ctx.moveTo(rectX+255, rectY+175);
    ctx.lineTo(rectX+255, rectY+175 + height);
    ctx.lineTo(rectX+255 + width, rectY+175 + height / 2);
    ctx.closePath();
    ctx.fill();
    //Lewo
    ctx.fillStyle = COLOR_L;
    ctx.beginPath();
    ctx.moveTo(rectX + width, rectY+175);
    ctx.lineTo(rectX + width, rectY+175 + height);
    ctx.lineTo(rectX, rectY+175 + height / 2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "white";
    let squareSize = 120;
    let squareSpacing = 20;
    let squarePadding = 10;

    let leftSquareX = rectX - squareSpacing - squareSize - 2 * squarePadding;
    let rightSquareX = rectX + fixedRectWidth + squareSpacing;
    let squareY = rectY + (fixedRectHeight - squareSize - 2 * squarePadding) / 2 -50;

    ctx.strokeRect(leftSquareX - 90, squareY, squareSize + 2 * squarePadding + 90, squareSize + 2 * squarePadding);
    ctx.strokeRect(rightSquareX, squareY, squareSize + 2 * squarePadding + 90, squareSize + 2 * squarePadding);

    let newSquareY = squareY + squareSize + 30;  // dodajemy 30 pikseli odstępu

    // Rysowanie dodatkowej lewej ramki
    ctx.strokeRect(leftSquareX-90, newSquareY, squareSize + 2 * squarePadding +90, squareSize + 2 * squarePadding);

    // Rysowanie dodatkowej prawej ramki
    ctx.strokeRect(rightSquareX, newSquareY, squareSize + 2 * squarePadding+90, squareSize + 2 * squarePadding);


    if(OIL_V>=120){
    //Rysuj warning
        ctx.fillStyle = "red";
        ctx.fillRect(0, 450, 1024, 300); // x, y, szerokość, wysokość
        ctx.fillStyle = "black";
        ctx.font = "66px Arial";
        ctx.fillText("WARNING: HIGH OIL TEMP", 70, 545); // tekst, x, y
        ctx.fillStyle = "red";

    }
    let labelFontSize = 30;
    ctx.font = labelFontSize + "px Arial";
    let widget_offset = 45;
    let leftLabelText = "OIL TEMP";
    let leftLabelTextWidth = ctx.measureText(leftLabelText).width;
    let leftLabelX = leftSquareX + (squareSize + 2 * squarePadding - leftLabelTextWidth) / 2 - widget_offset;
    let leftLabelY = squareY + squarePadding + labelFontSize;
    ctx.fillText(leftLabelText, leftLabelX, leftLabelY);
    let valueFontSize = 80;
    ctx.font = valueFontSize + "px Arial";

    let oilValueText = OIL_V.toString();
    let oilValueTextWidth = ctx.measureText(oilValueText).width;
    let oilValueX = leftSquareX + (squareSize + 2 * squarePadding - oilValueTextWidth) / 2 - widget_offset;
    let oilValueY = squareY + squarePadding + squareSize / 2 + valueFontSize / 3 + 20;
    ctx.fillText(oilValueText, oilValueX, oilValueY);

    ctx.fillStyle = "white";

    if(WATER_V>=105){
    //Rysuj warning
        ctx.fillStyle = "red";
        ctx.fillRect(0, 450, 1024, 300); // x, y, szerokość, wysokość
        ctx.fillStyle = "black";
        ctx.font = "66px Arial";
        ctx.fillText("WARNING: HIGH WATER TEMP", 20, 545); // tekst, x, y
        ctx.fillStyle = "red";

    }
    ctx.font = labelFontSize + "px Arial";
    let rightLabelText = "WATER TEMP";
    let rightLabelTextWidth = ctx.measureText(rightLabelText).width;
    let rightLabelX = rightSquareX + (squareSize + 2 * squarePadding - rightLabelTextWidth) / 2 + widget_offset;
    let rightLabelY = squareY + squarePadding + labelFontSize;


    ctx.fillText(rightLabelText, rightLabelX, rightLabelY);
    ctx.font = valueFontSize + "px Arial";
    let waterValueText = WATER_V.toString();
    let waterValueTextWidth = ctx.measureText(waterValueText).width;
    let waterValueX = rightSquareX + (squareSize + 2 * squarePadding - waterValueTextWidth) / 2 + widget_offset;
    let waterValueY = squareY + squarePadding + squareSize / 2 + valueFontSize / 3 + 20;
    ctx.fillText(waterValueText, waterValueX, waterValueY);

    ctx.fillStyle = "white";
////CHECK ENGINE
    ctx.drawImage(check_gray, check_x, check_y,65,65);



    if(CHECK_S==="true"){
         ctx.drawImage(check_orange, check_x, check_y,65,65);
    }
    if(LIGHTS_S==="low"){
         ctx.drawImage(low_beams, check_x+75, check_y+6,53,53);
    }
    else if(LIGHTS_S==="high"){
         ctx.drawImage(high_beams, check_x+75, check_y+6,53,53);
    }else{
        ctx.drawImage(no_beams, check_x+75, check_y+6,53,53);
    }

    let fuelBarX = rightSquareX + squarePadding; // Pozycja X paska paliwa
    let fuelBarY = newSquareY + squarePadding + 80; // Pozycja Y paska paliwa
    let maxFuelBarLength = squareSize*2 -(2*squarePadding+10) ; // Maksymalna długość paska paliwa
    let fuelBarHeight = 40; // Wysokość paska paliwa

    // Oblicz długość paska paliwa na podstawie FUEL_V i maksymalnej wartości
    let fuelBarLength = (FUEL_V / 100) * maxFuelBarLength;

    // Rysuj tło paska paliwa
    ctx.fillStyle = "gray";
    ctx.fillRect(fuelBarX, fuelBarY, maxFuelBarLength, fuelBarHeight);

    // Rysuj pasek paliwa
    ctx.fillStyle = "yellow";
    ctx.fillRect(fuelBarX, fuelBarY, fuelBarLength, fuelBarHeight);

    // Rysuj podziałki paska paliwa
    numberOfTicks = 3; // Liczba głównych podziałek (Full, 1/2, Empty)
    tickSpacing = maxFuelBarLength / (numberOfTicks - 1); // Odstęp między podziałkami
    textOffsetY = -15; // Odstęp tekstu od linii podziałki

    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

    for (let i = 0; i < numberOfTicks; i++) {
        let xPos = fuelBarX + i * tickSpacing;

        // Rysuj główną podziałkę
        ctx.beginPath();
        ctx.moveTo(xPos, fuelBarY - 10);
        ctx.lineTo(xPos, fuelBarY + fuelBarHeight +5);
        ctx.stroke();

        // Rysuj etykiety dla głównych podziałek
        let labels = ["E", "1/2", "F"];
        let labelText = labels[i];
        let labelTextWidth = ctx.measureText(labelText).width;
        ctx.fillText(labelText, xPos - labelTextWidth / 2, fuelBarY + textOffsetY);
    }

    let fuelLabelX = rightSquareX + squarePadding; // Pozycja X etykiety paliwa
    let fuelLabelY = newSquareY + squarePadding;  // Pozycja Y etykiety paliwa

    // Rysuj etykietę wskaźnika paliwa
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";  // Możesz dostosować rozmiar czcionki
    ctx.fillText("FUEL", fuelLabelX+65, fuelLabelY+25);
}


startDash()

socket.on('update', (data) => {
    console.log("Otrzymane dane: ", data);
    let parsedData = JSON.parse(data);
    RPM_V=parsedData.RPM
    SPEED_V=parsedData.SPEED
    WATER_V=parsedData.WATER
    FUEL_V=parsedData.FUEL
    COLOR_L=parsedData.LEFT
    COLOR_R=parsedData.RIGHT
    OIL_V=parsedData.OIL //do zrobienia w python
    CHECK_S=parsedData.CHECKENGINE
    LIGHTS_S=parsedData.LIGHTS
    //waterTempGauge.refresh(parsedData.Water);
});