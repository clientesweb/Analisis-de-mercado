document.addEventListener('DOMContentLoaded', function() {
    // Data
    const cities = ['Quito', 'Guayaquil', 'Cuenca', 'Manta', 'Ambato', 'Latacunga', 'Riobamba', 'Ibarra', 'Loja', 'Machala', 'Sto Domingo'];
    const projects2023 = [546, 119, 82, 49, 50, 10, 28, 50, 26, 14, 15];
    const projects2024 = [605, 106, 82, 34, 62, 10, 20, 45, 23, 10, 16];
    const projectsVariation = [10.81, -10.92, 0, -30.61, 24, 0, -28.57, -10, -11.54, -28.57, 6.67];

    const units2023 = [10092, 12310, 1194, 1393, 415, 145, 190, 342, 146, 1205, 926];
    const units2024 = [9299, 10865, 992, 1384, 585, 92, 193, 392, 112, 1077, 796];
    const unitsVariation = [-7.86, -11.74, -16.92, -0.65, 40.97, -36.55, 1.58, 14.62, -23.29, -10.62, -14.04];

    const absorption2023 = [0.76, 3.64, 0.76, 1.75, 0.14, 0.21, 0.31, 0.23, 0.32, 2.57, 1.07];
    const absorption2024 = [0.86, 3.24, 0.78, 1.19, 0.18, 0.18, 0.21, 0.25, 0.18, 2.38, 0.65];
    const absorptionVariation = [13.16, -10.99, 2.63, -32, 29, -14.29, -32.26, 9, -43.75, -7.39, -39.25];

    const projectsDistribution = [60, 10, 8, 6, 16];
    const unitsDistribution = [42, 36, 5, 4, 4, 9];

    // Chart configuration
    const config = {
        type: 'bar',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: { 
                        color: 'white',
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    ticks: { color: 'white' }
                }
            },
            plugins: {
                legend: {
                    labels: { color: 'white' }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            hover: {
                mode: 'nearest',
                intersect: true
            }
        }
    };

    // Residential Projects Chart
    new Chart(document.getElementById('residentialProjectsChart'), {
        ...config,
        data: {
            labels: cities,
            datasets: [
                {
                    label: 'N° Proyectos 2023',
                    data: projects2023,
                    backgroundColor: '#60A5FA'
                },
                {
                    label: 'N° Proyectos 2024',
                    data: projects2024,
                    backgroundColor: '#34D399'
                },
                {
                    label: '% Variación',
                    data: projectsVariation,
                    backgroundColor: '#FBBF24',
                    type: 'line',
                    yAxisID: 'percentage'
                }
            ]
        },
        options: {
            ...config.options,
            scales: {
                ...config.options.scales,
                percentage: {
                    position: 'right',
                    ticks: { color: 'white' }
                }
            }
        }
    });

    // Available Units Chart
    new Chart(document.getElementById('availableUnitsChart'), {
        ...config,
        data: {
            labels: cities,
            datasets: [
                {
                    label: 'Unidades 2023',
                    data: units2023,
                    backgroundColor: '#60A5FA'
                },
                {
                    label: 'Unidades 2024',
                    data: units2024,
                    backgroundColor: '#34D399'
                },
                {
                    label: '% Variación',
                    data: unitsVariation,
                    backgroundColor: '#FBBF24',
                    type: 'line',
                    yAxisID: 'percentage'
                }
            ]
        },
        options: {
            ...config.options,
            scales: {
                ...config.options.scales,
                percentage: {
                    position: 'right',
                    ticks: { color: 'white' }
                }
            }
        }
    });

    // Absorption Chart
    new Chart(document.getElementById('absorptionChart'), {
        ...config,
        data: {
            labels: cities,
            datasets: [
                {
                    label: 'Absorción 2023',
                    data: absorption2023,
                    backgroundColor: '#60A5FA'
                },
                {
                    label: 'Absorción 2024',
                    data: absorption2024,
                    backgroundColor: '#34D399'
                },
                {
                    label: '% Variación',
                    data: absorptionVariation,
                    backgroundColor: '#FBBF24',
                    type: 'line',
                    yAxisID: 'percentage'
                }
            ]
        },
        options: {
            ...config.options,
            scales: {
                ...config.options.scales,
                percentage: {
                    position: 'right',
                    ticks: { color: 'white' }
                }
            }
        }
    });

    // Projects Distribution Chart
    new Chart(document.getElementById('projectsDistributionChart'), {
        type: 'pie',
        data: {
            labels: ['Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Otras Ciudades'],
            datasets: [{
                data: projectsDistribution,
                backgroundColor: ['#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: 'white' }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += context.parsed + '%';
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });

    // Units Distribution Chart
    new Chart(document.getElementById('unitsDistributionChart'), {
        type: 'pie',
        data: {
            labels: ['Guayaquil', 'Quito', 'Manta', 'Machala', 'Cuenca', 'Otras Ciudades'],
            datasets: [{
                data: unitsDistribution,
                backgroundColor: ['#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA', '#4B5563']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: 'white' }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += context.parsed + '%';
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
});

// Function to generate PDF
function generatePDF() {
    const element = document.body;
    const opt = {
        margin:       10,
        filename:     'informe_inmobiliario_ecuador.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save().catch(err => console.error('Error generating PDF:', err));
}

// Adjust chart sizes on window resize
window.addEventListener('resize', function() {
    Chart.instances.forEach(chart => {
        chart.resize();
    });
});

