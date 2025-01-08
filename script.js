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

    Chart.register(ChartDataLabels);

    // Colores mejorados y consistentes
    const colors = {
        blue: 'rgba(59, 130, 246, 0.8)',
        green: 'rgba(16, 185, 129, 0.8)',
        yellow: 'rgba(245, 158, 11, 0.8)',
        red: 'rgba(239, 68, 68, 0.8)',
        purple: 'rgba(139, 92, 246, 0.8)',
        gray: 'rgba(107, 114, 128, 0.8)'
    };

    // Función para crear degradados
    function createGradient(ctx, color) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, color.replace('0.8', '0.4'));
        return gradient;
    }

    // Función para detectar si es un dispositivo móvil
    function isMobile() {
        return window.matchMedia("(max-width: 768px)").matches;
    }

    // Configuración común para los gráficos de barras
    const barChartConfig = {
        type: 'bar',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 50,
                    right: 20,
                    bottom: 10,
                    left: 10
                }
            },
            scales: {
                x: {
                    ticks: { 
                        color: 'white',
                        font: {
                            size: () => isMobile() ? 8 : 12
                        },
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: { 
                        color: 'white',
                        font: {
                            size: () => isMobile() ? 8 : 12
                        },
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: { 
                        color: 'white',
                        font: {
                            size: () => isMobile() ? 10 : 14
                        },
                        padding: () => isMobile() ? 10 : 20
                    }
                },
                datalabels: {
                    color: 'white',
                    font: {
                        weight: 'bold',
                        size: () => isMobile() ? 0 : 12
                    },
                    formatter: (value, context) => {
                        if (isMobile()) return null;
                        if (context.dataset.type === 'line') {
                            return value.toFixed(1) + '%';
                        }
                        return value.toLocaleString();
                    },
                    anchor: 'end',
                    align: 'top',
                    offset: 0,
                    rotation: -45,
                    textStrokeColor: 'black',
                    textStrokeWidth: 1,
                    textShadowBlur: 5,
                    textShadowColor: 'black'
                }
            },
            barPercentage: 0.8,
            categoryPercentage: 0.7
        }
    };

    // Función para crear gráficos de barras
    function createBarChart(ctx, data2023, data2024, variation, title) {
        return new Chart(ctx, {
            ...barChartConfig,
            data: {
                labels: cities,
                datasets: [
                    {
                        label: title + ' 2023',
                        data: data2023,
                        backgroundColor: createGradient(ctx, colors.blue),
                    },
                    {
                        label: title + ' 2024',
                        data: data2024,
                        backgroundColor: createGradient(ctx, colors.green),
                    },
                    {
                        label: '% Variación',
                        data: variation,
                        type: 'line',
                        borderColor: colors.yellow,
                        backgroundColor: colors.yellow,
                        borderWidth: 2,
                        pointBackgroundColor: colors.yellow,
                        pointRadius: 4,
                        yAxisID: 'percentage',
                    }
                ]
            },
            options: {
                ...barChartConfig.options,
                scales: {
                    ...barChartConfig.options.scales,
                    percentage: {
                        position: 'right',
                        ticks: { 
                            color: 'white',
                            font: {
                                size: () => isMobile() ? 8 : 12
                            },
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    ...barChartConfig.options.plugins,
                    tooltip: {
                        enabled: true,
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y.toLocaleString();
                                }
                                if (context.dataset.type === 'line') {
                                    label += '%';
                                }
                                return label;
                            }
                        }
                    },
                    datalabels: {
                        ...barChartConfig.options.plugins.datalabels,
                        formatter: (value, context) => {
                            if (isMobile()) return null;
                            if (context.dataset.type === 'line') {
                                return value.toFixed(1) + '%';
                            }
                            return value.toLocaleString();
                        },
                        color: (context) => {
                            return context.dataset.type === 'line' ? 'yellow' : 'white';
                        },
                        anchor: (context) => {
                            return context.dataset.type === 'line' ? 'center' : 'end';
                        },
                        align: (context) => {
                            return context.dataset.type === 'line' ? 'bottom' : 'top';
                        },
                        offset: (context) => {
                            return context.dataset.type === 'line' ? 0 : -10;
                        },
                        rotation: (context) => {
                            return context.dataset.type === 'line' ? 0 : -45;
                        }
                    }
                }
            }
        });
    }

    // Configuración común para los gráficos de pastel
    const pieChartConfig = {
        type: 'pie',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 20,
                    bottom: 20
                }
            },
            plugins: {
                legend: {
                    position: () => isMobile() ? 'bottom' : 'right',
                    labels: { 
                        color: 'white',
                        font: {
                            size: () => isMobile() ? 10 : 12
                        },
                        padding: () => isMobile() ? 10 : 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                datalabels: {
                    color: 'white',
                    font: {
                        weight: 'bold',
                        size: () => isMobile() ? 0 : 14
                    },
                    formatter: (value, context) => {
                        if (isMobile()) return null;
                        return `${value}%`;
                    },
                    anchor: 'center',
                    align: 'center',
                    offset: 0,
                    textStrokeColor: 'rgba(0, 0, 0, 0.5)',
                    textStrokeWidth: 2,
                    textShadowBlur: 5,
                    textShadowColor: 'black'
                },
                tooltip: {
                    enabled: true,
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
    };

    // Función para crear gráficos de pastel
    function createPieChart(ctx, data, labels, totals) {
        const chart = new Chart(ctx, {
            ...pieChartConfig,
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.8)', // Azul
                        'rgba(16, 185, 129, 0.8)', // Verde
                        'rgba(245, 158, 11, 0.8)', // Amarillo
                        'rgba(239, 68, 68, 0.8)',  // Rojo
                        'rgba(139, 92, 246, 0.8)', // Morado
                        'rgba(107, 114, 128, 0.8)' // Gris
                    ]
                }]
            },
            options: {
                ...pieChartConfig.options,
                layout: {
                    padding: {
                        top: 60, // Espacio para los totales
                        bottom: 20
                    }
                }
            }
        });

        // Agregar los totales encima del gráfico
        const container = ctx.canvas.parentNode;
        const statsDiv = document.createElement('div');
        statsDiv.className = 'stats-container';
        statsDiv.style.position = 'absolute';
        statsDiv.style.top = '0';
        statsDiv.style.left = '0';
        statsDiv.style.width = '100%';
        statsDiv.style.display = 'grid';
        statsDiv.style.gridTemplateColumns = 'repeat(3, 1fr)';
        statsDiv.style.gap = '1rem';
        statsDiv.style.padding = '1rem';
        statsDiv.style.color = 'white';
        statsDiv.style.textAlign = 'center';

        statsDiv.innerHTML = `
            <div>
                <div style="font-size: 0.875rem; opacity: 0.8">Total 2023</div>
                <div style="font-size: 1.25rem; font-weight: bold">${totals.y2023}</div>
            </div>
            <div>
                <div style="font-size: 0.875rem; opacity: 0.8">Total 2024</div>
                <div style="font-size: 1.25rem; font-weight: bold">${totals.y2024}</div>
            </div>
            <div>
                <div style="font-size: 0.875rem; opacity: 0.8">Variación</div>
                <div style="font-size: 1.25rem; font-weight: bold">${totals.variation}%</div>
            </div>
        `;

        container.style.position = 'relative';
        container.insertBefore(statsDiv, ctx.canvas);

        return chart;
    }

    // Crear gráficos
    const projectsCtx = document.getElementById('residentialProjectsChart').getContext('2d');
    const projectsChart = createBarChart(projectsCtx, projects2023, projects2024, projectsVariation, 'N° Proyectos');

    const unitsCtx = document.getElementById('availableUnitsChart').getContext('2d');
    const unitsChart = createBarChart(unitsCtx, units2023, units2024, unitsVariation, 'Unidades');

    const absorptionCtx = document.getElementById('absorptionChart').getContext('2d');
    const absorptionChart = createBarChart(absorptionCtx, absorption2023, absorption2024, absorptionVariation, 'Absorción');

    const projectsDistCtx = document.getElementById('projectsDistributionChart').getContext('2d');
    const projectsDistChart = createPieChart(
        projectsDistCtx, 
        projectsDistribution, 
        ['Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Otras Ciudades'],
        { y2023: 989, y2024: 1013, variation: 2.43 }
    );

    const unitsDistCtx = document.getElementById('unitsDistributionChart').getContext('2d');
    const unitsDistChart = createPieChart(
        unitsDistCtx, 
        unitsDistribution, 
        ['Guayaquil', 'Quito', 'Manta', 'Machala', 'Cuenca', 'Otras Ciudades'],
        { y2023: 989, y2024: 1013, variation: 2.43 }
    );

    // Función de redimensionamiento
    function resizeCharts() {
        const mobile = isMobile();
        [projectsChart, unitsChart, absorptionChart, projectsDistChart, unitsDistChart].forEach(chart => {
            if (chart.config.type === 'pie') {
                chart.options.plugins.legend.position = mobile ? 'bottom' : 'right';
            }
            chart.options.plugins.datalabels.font.size = mobile ? 0 : 12;
            chart.update();
        });
    }

    // Llamar a resize después de que la página se haya cargado completamente y en el evento de cambio de tamaño de ventana
    window.addEventListener('load', resizeCharts);
    window.addEventListener('resize', resizeCharts);
});

// Verificar que el script se ha cargado correctamente
console.log('Script cargado correctamente');

