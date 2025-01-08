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

    // Adjust chart sizes
    function resizeCharts() {
        Chart.instances.forEach(chart => {
            chart.resize();
        });
    }

    // Call resize after the page has fully loaded and on window resize
    window.addEventListener('load', () => setTimeout(resizeCharts, 500));
    window.addEventListener('resize', resizeCharts);

    // Función para generar el PDF
    async function generatePDFWithCharts() {
        const button = document.getElementById('pdfButton');
        const buttonText = document.getElementById('pdfButtonText');
        
        try {
            console.log('Iniciando generación de PDF...');
            button.disabled = true;
            buttonText.textContent = 'Generando PDF...';
            
            // Verificar que jsPDF esté disponible
            if (typeof window.jspdf === 'undefined') {
                throw new Error('jsPDF no está cargado correctamente');
            }

            // Verificar que html2canvas esté disponible
            if (typeof html2canvas === 'undefined') {
                throw new Error('html2canvas no está cargado correctamente');
            }

            await ensureChartsRendered();
            console.log('Gráficos renderizados correctamente');
            
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 10;

            // Función para añadir una página
            const addPage = () => {
                pdf.addPage();
                return pdf.internal.getCurrentPageInfo().pageNumber;
            };

            // Función para añadir texto
            const addText = (text, fontSize, isBold = false) => {
                pdf.setFontSize(fontSize);
                pdf.setFont(undefined, isBold ? 'bold' : 'normal');
                const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
                pdf.text(lines, margin, pdf.internal.getCurrentPageInfo().pageNumber === 1 ? 40 : 20);
                return lines.length * fontSize / 72 * 2.54; // Altura aproximada del texto en cm
            };

            // Función para añadir un gráfico
            const addChart = async (chartId, title) => {
                console.log(`Añadiendo gráfico: ${chartId}`);
                const chart = document.getElementById(chartId);
                if (!chart) {
                    throw new Error(`No se encontró el elemento con id ${chartId}`);
                }
                const chartImage = await html2canvas(chart);
                const imgData = chartImage.toDataURL('image/png');
                const imgWidth = pageWidth - 2 * margin;
                const imgHeight = (chartImage.height * imgWidth) / chartImage.width;
                
                if (pdf.internal.getCurrentPageInfo().pageNumber > 1) {
                    pdf.addPage();
                }
                
                addText(title, 14, true);
                pdf.addImage(imgData, 'PNG', margin, 30, imgWidth, imgHeight);
                console.log(`Gráfico ${chartId} añadido correctamente`);
            };

            // Añadir logo
            console.log('Añadiendo logo...');
            const logo = document.querySelector('header img');
            if (!logo) {
                throw new Error('No se encontró el logo');
            }
            const logoImage = await html2canvas(logo);
            const logoData = logoImage.toDataURL('image/png');
            pdf.addImage(logoData, 'PNG', (pageWidth - 60) / 2, 10, 60, 60 * logoImage.height / logoImage.width);
            console.log('Logo añadido correctamente');

            // Añadir título y subtítulos
            console.log('Añadiendo títulos...');
            let yOffset = 80;
            yOffset += addText('COMPORTAMIENTO OFERTA RESIDENCIAL ORGANIZADA', 16, true);
            yOffset += addText('11 PRINCIPALES CIUDADES DEL ECUADOR', 14);
            yOffset += addText('PERIODO COMPARATIVO 2023 - 2024', 14);

            // Añadir objetivo
            console.log('Añadiendo objetivo...');
            yOffset += 10;
            yOffset += addText('OBJETIVO DEL ARTÍCULO', 14, true);
            const objectiveText = 'Medir el nivel comercial y constructivo de la oferta residencial (casas –departamentos) últimos dos años factor determinante que permite conocer la salud inmobiliaria de cada una de las ciudades analizadas esto resultado de los niveles de absorción promedio. Información actualizada puntualmente por ciudad y proyecto en el último semestre de cada año la cual en la actualidad es una herramienta básica e indispensable para el sector de la construcción, financiero y comercial del país.';
            yOffset += addText(objectiveText, 12);

            // Añadir gráficos
            await addChart('residentialProjectsChart', 'Número Proyectos Residenciales (Casas –Depts) Periodo Comparativo 2023 –2024');
            await addChart('availableUnitsChart', 'Unidades Disponibles (Casas –Depts) 11 Principales Ciudades');
            await addChart('absorptionChart', 'Absorción Promedio Mes Proyectos Residenciales');
            await addChart('projectsDistributionChart', 'Peso Porcentual Oferta por Ciudad');
            await addChart('unitsDistributionChart', 'Peso Porcentual Unidades Disponibles');

            // Añadir pie de página
            console.log('Añadiendo pie de página...');
            const totalPages = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                pdf.setFontSize(10);
                pdf.text(`Página ${i} de ${totalPages}`, pageWidth - 25, pageHeight - 10);
            }

            // Guardar PDF
            console.log('Guardando PDF...');
            pdf.save('informe_inmobiliario_ecuador.pdf');
            
            buttonText.textContent = 'PDF Generado';
            setTimeout(() => {
                buttonText.textContent = 'Descargar PDF';
                button.disabled = false;
            }, 3000);
            console.log('PDF generado y guardado correctamente');
        } catch (err) {
            console.error('Error generating PDF:', err);
            buttonText.textContent = 'Error al generar PDF';
            alert(`Error al generar PDF: ${err.message}`);
            setTimeout(() => {
                buttonText.textContent = 'Descargar PDF';
                button.disabled = false;
            }, 3000);
        }
    }

    // Función para asegurar que los gráficos estén renderizados
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

    // Agregar evento de clic al botón de descarga de PDF
    const pdfButton = document.getElementById('pdfButton');
    if (pdfButton) {
        pdfButton.addEventListener('click', generatePDFWithCharts);
        console.log('Evento de clic añadido al botón de PDF');
    } else {
        console.error('No se encontró el botón de PDF');
    }
});

// Verificar que el script se ha cargado correctamente
console.log('Script cargado correctamente');

