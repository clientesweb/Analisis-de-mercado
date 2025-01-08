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
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
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
                    backgroundColor: 'rgba(96, 165, 250, 0.8)'
                },
                {
                    label: 'N° Proyectos 2024',
                    data: projects2024,
                    backgroundColor: 'rgba(52, 211, 153, 0.8)'
                },
                {
                    label: '% Variación',
                    data: projectsVariation,
                    backgroundColor: 'rgba(251, 191, 36, 0.8)',
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
                    backgroundColor: 'rgba(96, 165, 250, 0.8)'
                },
                {
                    label: 'Unidades 2024',
                    data: units2024,
                    backgroundColor: 'rgba(52, 211, 153, 0.8)'
                },
                {
                    label: '% Variación',
                    data: unitsVariation,
                    backgroundColor: 'rgba(251, 191, 36, 0.8)',
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
                    backgroundColor: 'rgba(96, 165, 250, 0.8)'
                },
                {
                    label: 'Absorción 2024',
                    data: absorption2024,
                    backgroundColor: 'rgba(52, 211, 153, 0.8)'
                },
                {
                    label: '% Variación',
                    data: absorptionVariation,
                    backgroundColor: 'rgba(251, 191, 36, 0.8)',
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
                backgroundColor: ['rgba(96, 165, 250, 0.8)', 'rgba(52, 211, 153, 0.8)', 'rgba(251, 191, 36, 0.8)', 'rgba(248, 113, 113, 0.8)', 'rgba(167, 139, 250, 0.8)']
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
            },
            animation: {
                animateRotate: true,
                animateScale: true
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
                backgroundColor: ['rgba(96, 165, 250, 0.8)', 'rgba(52, 211, 153, 0.8)', 'rgba(251, 191, 36, 0.8)', 'rgba(248, 113, 113, 0.8)', 'rgba(167, 139, 250, 0.8)', 'rgba(75, 85, 99, 0.8)']
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
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    });

    setTimeout(() => {
        Chart.instances.forEach(chart => {
            chart.resize();
        });
    }, 500);
});

async function generatePDFWithCharts() {
    const button = document.getElementById('pdfButton');
    const buttonText = document.getElementById('pdfButtonText');
    
    try {
        button.disabled = true;
        buttonText.textContent = 'Generando PDF...';
        
        await ensureChartsRendered();
        
        const element = document.body;
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: true,
            letterRendering: true,
            allowTaint: true,
            foreignObjectRendering: true
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        
        // Crear un blob con el PDF
        const pdfBlob = pdf.output('blob');
        
        // Crear un URL para el blob
        const pdfUrl = URL.createObjectURL(pdfBlob);
        
        // Crear un enlace temporal y hacer clic en él para descargar
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'informe_inmobiliario_ecuador.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Liberar el URL del objeto
        URL.revokeObjectURL(pdfUrl);
        
        buttonText.textContent = 'PDF Generado';
        setTimeout(() => {
            buttonText.textContent = 'Descargar PDF';
            button.disabled = false;
        }, 3000);
    } catch (err) {
        console.error('Error generating PDF:', err);
        buttonText.textContent = 'Error al generar PDF';
        setTimeout(() => {
            buttonText.textContent = 'Descargar PDF';
            button.disabled = false;
        }, 3000);
    }
}

function ensureChartsRendered() {
    return new Promise((resolve) => {
        const checkCharts = setInterval(() => {
            const allChartsReady = Chart.instances.every(chart => chart.chartArea);
            if (allChartsReady) {
                clearInterval(checkCharts);
                resolve();
            }
        }, 100);
    });
}

// Adjust chart sizes on window resize
window.addEventListener('resize', function() {
    Chart.instances.forEach(chart => {
        chart.resize();
    });
});

// Call resize after the page has fully loaded
window.addEventListener('load', function() {
    setTimeout(() => {
        Chart.instances.forEach(chart => {
            chart.resize();
        });
    }, 500);
});

