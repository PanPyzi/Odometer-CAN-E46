const socket = io();

Highcharts.chart('RPM', {
    chart: {
        type: 'bar'
    },
    xAxis: {
        categories: ['RPM'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        max: 8000, // np. dla obrotów do 8000 RPM
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'RPM',
        data: [6500] // aktualne obroty, np. 6500 RPM
    }]
});


let waterTempGauge = new JustGage({
    id: "waterTempGauge",
    value: 0,
    min: 0,
    max: 120,
    title: "Temperatura Wody",
    label: "°C"
});


socket.on('update', (data) => {
    let parsedData = JSON.parse(data);
    const series = chart.series[0];
    series.addPoint(data, true, false);
    waterTempGauge.refresh(parsedData.Water);
});