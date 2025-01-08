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

    // Chart configuration
    const config = {
        type: 'bar',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 50,
                    right: 50,
                    bottom: 20,
                    left: 20
                }
            },
            scales: {
                x: {
                    ticks: { 
                        color: 'white',
                        maxRotation: 45,
                        minRotation: 45,
                        font: {
                            size: window.innerWidth < 640 ? 8 : window.innerWidth < 768 ? 9 : 12
                        },
                        padding: 10
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: { 
                        color: 'white',
                        font: {
                            size: window.innerWidth < 640 ? 8 : window.innerWidth < 768 ? 10 : 12
                        },
                        padding: 10
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
                    align: 'start',
                    labels: { 
                        color: 'white',
                        font: {
                            size: window.innerWidth < 640 ? 10 : window.innerWidth < 768 ? 11 : 12
                        },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        boxWidth: 8,
                        boxHeight: 8
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y;
                                if (context.dataset.type === 'line') {
                                    label += '%';
                                }
                            }
                            return label;
                        }
                    },
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1,
                    padding: 12,
                    titleFont: {
                        size: 12
                    },
                    bodyFont: {
                        size: 11
                    }
                },
                datalabels: {
                    color: 'white',
                    font: {
                        weight: 'bold',
                        size: window.innerWidth < 640 ? 9 : window.innerWidth < 768 ? 10 : 11
                    },
                    display: true,
                    formatter: (value, context) => {
                        if (context.datasetIndex === 2) {
                            return value.toFixed(1) + '%';
                        }
                        return value;
                    },
                    anchor: function(context) {
                        const value = context.dataset.data[context.dataIndex];
                        if (context.datasetIndex === 2) {
                            return value >= 0 ? 'bottom' : 'top';
                        }
                        return context.datasetIndex === 0 ? 'end' : 'start';
                    },
                    align: function(context) {
                        const value = context.dataset.data[context.dataIndex];
                        if (context.datasetIndex === 2) {
                            return value >= 0 ? 'bottom' : 'top';
                        }
                        return context.datasetIndex === 0 ? 'end' : 'start';
                    },
                    offset: function(context) {
                        if (context.datasetIndex === 2) {
                            return context.dataset.data[context.dataIndex] >= 0 ? 10 : -10;
                        }
                        return context.datasetIndex === 0 ? 15 : -15;
                    },
                    rotation: 0,
                    textAlign: 'center'
                }
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            },
            barPercentage: 0.7,
            categoryPercentage: 0.6
        }
    };

    const pieConfig = {
        type: 'pie',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 30,
                    right: 30,
                    bottom: 30,
                    left: 30
                }
            },
            plugins: {
                legend: {
                    position: window.innerWidth < 640 ? 'bottom' : window.innerWidth < 768 ? 'bottom' : 'right',
                    align: 'center',
                    labels: { 
                        color: 'white',
                        font: {
                            size: window.innerWidth < 640 ? 10 : window.innerWidth < 768 ? 11 : 12
                        },
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        boxWidth: 8,
                        boxHeight: 8
                    }
                },
                datalabels: {
                    color: 'white',
                    font: {
                        weight: 'bold',
                        size: window.innerWidth < 640 ? 10 : window.innerWidth < 768 ? 11 : 12
                    },
                    formatter: (value, ctx) => {
                        const label = ctx.chart.data.labels[ctx.dataIndex];
                        return `${label}\n${value}%`;
                    },
                    textAlign: 'center',
                    anchor: 'end',
                    align: 'end',
                    offset: 10,
                    display: true
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    };

    // Función mejorada para crear degradados
    function createGradient(ctx, colorStart, colorEnd) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, colorStart);
        gradient.addColorStop(1, colorEnd);
        return gradient;
    }

    // Colores mejorados y consistentes
    const colors = {
        blue: {
            start: 'rgba(96, 165, 250, 0.95)',
            end: 'rgba(96, 165, 250, 0.7)'
        },
        green: {
            start: 'rgba(52, 211, 153, 0.95)',
            end: 'rgba(52, 211, 153, 0.7)'
        },
        yellow: {
            start: 'rgba(251, 191, 36, 0.95)',
            end: 'rgba(251, 191, 36, 0.7)'
        },
        red: {
            start: 'rgba(248, 113, 113, 0.95)',
            end: 'rgba(248, 113, 113, 0.7)'
        },
        purple: {
            start: 'rgba(167, 139, 250, 0.95)',
            end: 'rgba(167, 139, 250, 0.7)'
        },
        gray: {
            start: 'rgba(75, 85, 99, 0.95)',
            end: 'rgba(75, 85, 99, 0.7)'
        }
    };

    // Residential Projects Chart
    const projectsCtx = document.getElementById('residentialProjectsChart').getContext('2d');
    new Chart(projectsCtx, {
        ...config,
        data: {
            labels: cities,
            datasets: [
                {
                    label: 'N° Proyectos 2023',
                    data: projects2023,
                    backgroundColor: createGradient(projectsCtx, colors.blue.start, colors.blue.end),
                    datalabels: {
                        align: 'end',
                        anchor: 'end'
                    }
                },
                {
                    label: 'N° Proyectos 2024',
                    data: projects2024,
                    backgroundColor: createGradient(projectsCtx, colors.green.start, colors.green.end),
                    datalabels: {
                        align: 'start',
                        anchor: 'start'
                    }
                },
                {
                    label: '% Variación',
                    data: projectsVariation,
                    type: 'line',
                    borderColor: colors.yellow.start,
                    backgroundColor: colors.yellow.end,
                    borderWidth: 2,
                    pointBackgroundColor: colors.yellow.start,
                    pointRadius: 4,
                    yAxisID: 'percentage',
                    datalabels: {
                        align: 'top',
                        anchor: 'end'
                    }
                }
            ]
        },
        options: {
            ...config.options,
            scales: {
                ...config.options.scales,
                percentage: {
                    position: 'right',
                    ticks: { 
                        color: 'white',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Available Units Chart
    const unitsCtx = document.getElementById('availableUnitsChart').getContext('2d');
    new Chart(unitsCtx, {
        ...config,
        data: {
            labels: cities,
            datasets: [
                {
                    label: 'Unidades 2023',
                    data: units2023,
                    backgroundColor: createGradient(unitsCtx, colors.blue.start, colors.blue.end),
                    datalabels: {
                        align: 'end',
                        anchor: 'end'
                    }
                },
                {
                    label: 'Unidades 2024',
                    data: units2024,
                    backgroundColor: createGradient(unitsCtx, colors.green.start, colors.green.end),
                    datalabels: {
                        align: 'start',
                        anchor: 'start'
                    }
                },
                {
                    label: '% Variación',
                    data: unitsVariation,
                    type: 'line',
                    borderColor: colors.yellow.start,
                    backgroundColor: colors.yellow.end,
                    borderWidth: 2,
                    pointBackgroundColor: colors.yellow.start,
                    pointRadius: 4,
                    yAxisID: 'percentage',
                    datalabels: {
                        align: 'top',
                        anchor: 'end'
                    }
                }
            ]
        },
        options: {
            ...config.options,
            scales: {
                ...config.options.scales,
                percentage: {
                    position: 'right',
                    ticks: { 
                        color: 'white',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Absorption Chart
    const absorptionCtx = document.getElementById('absorptionChart').getContext('2d');
    new Chart(absorptionCtx, {
        ...config,
        data: {
            labels: cities,
            datasets: [
                {
                    label: 'Absorción 2023',
                    data: absorption2023,
                    backgroundColor: createGradient(absorptionCtx, colors.blue.start, colors.blue.end),
                    datalabels: {
                        align: 'end',
                        anchor: 'end'
                    }
                },
                {
                    label: 'Absorción 2024',
                    data: absorption2024,
                    backgroundColor: createGradient(absorptionCtx, colors.green.start, colors.green.end),
                    datalabels: {
                        align: 'start',
                        anchor: 'start'
                    }
                },
                {
                    label: '% Variación',
                    data: absorptionVariation,
                    type: 'line',
                    borderColor: colors.yellow.start,
                    backgroundColor: colors.yellow.end,
                    borderWidth: 2,
                    pointBackgroundColor: colors.yellow.start,
                    pointRadius: 4,
                    yAxisID: 'percentage',
                    datalabels: {
                        align: 'top',
                        anchor: 'end'
                    }
                }
            ]
        },
        options: {
            ...config.options,
            scales: {
                ...config.options.scales,
                percentage: {
                    position: 'right',
                    ticks: { 
                        color: 'white',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Projects Distribution Chart
    const projectsDistCtx = document.getElementById('projectsDistributionChart').getContext('2d');
    new Chart(projectsDistCtx, {
        ...pieConfig,
        data: {
            labels: ['Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Otras Ciudades'],
            datasets: [{
                data: projectsDistribution,
                backgroundColor: [
                    colors.blue.start,
                    colors.green.start,
                    colors.yellow.start,
                    colors.red.start,
                    colors.purple.start
                ]
            }]
        },
        options: {
            ...pieConfig.options,
            plugins: {
                ...pieConfig.options.plugins,
                datalabels: {
                    ...pieConfig.options.plugins.datalabels,
                    formatter: (value, ctx) => {
                        return ctx.chart.data.labels[ctx.dataIndex] + '\n' + value + '%';
                    },
                    textAlign: 'center',
                    color: 'white',
                    font: {
                        weight: 'bold',
                        size: window.innerWidth < 640 ? 9 : 11
                    }
                }
            }
        }
    });

    // Units Distribution Chart
    const unitsDistCtx = document.getElementById('unitsDistributionChart').getContext('2d');
    new Chart(unitsDistCtx, {
        ...pieConfig,
        data: {
            labels: ['Guayaquil', 'Quito', 'Manta', 'Machala', 'Cuenca', 'Otras Ciudades'],
            datasets: [{
                data: unitsDistribution,
                backgroundColor: [
                    colors.blue.start,
                    colors.green.start,
                    colors.yellow.start,
                    colors.red.start,
                    colors.purple.start,
                    colors.gray.start
                ]
            }]
        },
        options: {
            ...pieConfig.options,
            plugins: {
                ...pieConfig.options.plugins,
                datalabels: {
                    ...pieConfig.options.plugins.datalabels,
                    formatter: (value, ctx) => {
                        return ctx.chart.data.labels[ctx.dataIndex] + '\n' + value + '%';
                    },
                    textAlign: 'center',
                    color: 'white',
                    font: {
                        weight: 'bold',
                        size: window.innerWidth < 640 ? 9 : 11
                    }
                }
            }
        }
    });

    // Función de redimensionamiento mejorada
    function resizeCharts() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isLandscape = width > height;
        const isMobile = width < 640;
        const isTablet = width < 768;

        Chart.instances.forEach(chart => {
            // Ajustar posición de leyendas
            if (chart.config.type === 'pie') {
                chart.options.plugins.legend.position = isMobile ? 'bottom' : 
                                                      isTablet ? 'bottom' : 
                                                      isLandscape ? 'right' : 'bottom';
            } else {
                chart.options.plugins.legend.position = isMobile ? 'bottom' : 'top';
            }
            
            // Ajustar tamaños de fuente
            const fontSize = isMobile ? {
                legend: 10,
                datalabels: 9,
                ticks: 8
            } : isTablet ? {
                legend: 11,
                datalabels: 10,
                ticks: 9
            } : {
                legend: 12,
                datalabels: 11,
                ticks: 12
            };

            // Actualizar fuentes
            chart.options.plugins.legend.labels.font.size = fontSize.legend;
            chart.options.plugins.datalabels.font.size = fontSize.datalabels;
            
            if (chart.options.scales) {
                chart.options.scales.x.ticks.font.size = fontSize.ticks;
                chart.options.scales.y.ticks.font.size = fontSize.ticks;
            }
            
            // Ajustar espaciado
            const padding = isMobile ? {
                top: 30,
                right: 30,
                bottom: 20,
                left: 20
            } : {
                top: 50,
                right: 50,
                bottom: 20,
                left: 20
            };
            
            chart.options.layout.padding = padding;
            
            // Ajustar barras
            if (chart.config.type === 'bar') {
                chart.options.barPercentage = isMobile ? 0.8 : 0.7;
                chart.options.categoryPercentage = isMobile ? 0.7 : 0.6;
            }
            
            // Actualizar sin animación para mejor rendimiento
            chart.update('none');
        });
    }

    // Call resize after the page has fully loaded and on window resize
    window.addEventListener('load', () => setTimeout(resizeCharts, 500));
    window.addEventListener('resize', debounce(resizeCharts, 250));
    window.addEventListener('orientationchange', () => setTimeout(resizeCharts, 250));
});

// Utility function for debouncing resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Verificar que el script se ha cargado correctamente
console.log('Script cargado correctamente');

