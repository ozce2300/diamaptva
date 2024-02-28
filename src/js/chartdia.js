import Chart from 'chart.js/auto'


const ctx = document.getElementById('myChart');
const ftx = document.getElementById('myChart-second');


window.onload = getData();
//Funktion för data

async function getData() {
    try {
        let response = await fetch(`https://studenter.miun.se/~mallar/dt211g/`);
        
        if (!response.ok) {
            throw new Error('Något gick fel vid hämtning av data.');
        }

        let data = await response.json();
        kurs(data)
        program(data)

    } catch (error) {
        console.error('Det uppstod ett fel:', error);
    }
}

function kurs(data) {

    let kursData = data.filter(item => item.type === "Kurs");

    let sexStorstaKurserna = kursData.map(item => ({
        name: item.name,
        applicantsTotal: item.applicantsTotal
    }))
    .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
    .slice(0, 6);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sexStorstaKurserna.map(item => item.name),
            datasets: [{
                label: 'Sex Största Kurserna',
                data: sexStorstaKurserna.map(item => item.applicantsTotal),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            aspectRatio: 1.5,
            indexAxis: 'x',
            scales: {
                x: {
                    ticks: {
                        callback: function (value) {
                            value++;
                            if (value.toString().length > 10) {
                                return value.toString().substring(1, 10) + '...';
                            }
                            return value;
                        }
                    }
                }
            }
        }
    });
    
}

function program(data) {

    let programData = data.filter(item => item.type === "Program");
    let femStorsta = programData.map(item => ({
        name: item.name,
        applicantsTotal: item.applicantsTotal
    }))
    .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
    .slice(0, 5);


    new Chart(ftx, {
        type: 'doughnut',
        data: {
            labels: femStorsta.map(item => item.name),
            datasets: [{
                label: 'Fem mest sökta programmen',
                data: femStorsta.map(item => item.applicantsTotal),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true, 
            aspectRatio: 1.3, 
            cutoutPercentage: 50,
            
        }
    });
}