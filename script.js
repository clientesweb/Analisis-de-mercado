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
                            size: 12
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
                            size: 12
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
                            size: 14
                        },
                        padding: 20
                    }
                },
                datalabels: {
                    color: 'white',
                    font: {
                        weight: 'bold',
                        size: 12
                    },
                    formatter: (value, context) => {
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
                                size: 12
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

    // Crear gráficos de barras
    const projectsCtx = document.getElementById('residentialProjectsChart').getContext('2d');
    createBarChart(projectsCtx, projects2023, projects2024, projectsVariation, 'N° Proyectos');

    const unitsCtx = document.getElementById('availableUnitsChart').getContext('2d');
    createBarChart(unitsCtx, units2023, units2024, unitsVariation, 'Unidades');

    const absorptionCtx = document.getElementById('absorptionChart').getContext('2d');
    createBarChart(absorptionCtx, absorption2023, absorption2024, absorptionVariation, 'Absorción');

    // Configuración común para los gráficos de pastel
    const pieChartConfig = {
        type: 'pie',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { 
                        color: 'white',
                        font: {
                            size: 12
                        },
                        padding: 20
                    }
                },
                datalabels: {
                    color: 'white',
                    font: {
                        weight: 'bold',
                        size: 12
                    },
                    formatter: (value, context) => {
                        const label = context.chart.data.labels[context.dataIndex];
                        return `${label}: ${value}%`;
                    },
                    anchor: 'end',
                    align: 'start',
                    offset: 10,
                    textStrokeColor: 'black',
                    textStrokeWidth: 1,
                    textShadowBlur: 5,
                    textShadowColor: 'black'
                }
            }
        }
    };

    // Función para crear gráficos de pastel
    function createPieChart(ctx, data, labels) {
        return new Chart(ctx, {
            ...pieChartConfig,
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: Object.values(colors)
                }]
            }
        });
    }

    // Crear gráficos de pastel
    const projectsDistCtx = document.getElementById('projectsDistributionChart').getContext('2d');
    createPieChart(projectsDistCtx, projectsDistribution, ['Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Otras Ciudades']);

    const unitsDistCtx = document.getElementById('unitsDistributionChart').getContext('2d');
    createPieChart(unitsDistCtx, unitsDistribution, ['Guayaquil', 'Quito', 'Manta', 'Machala', 'Cuenca', 'Otras Ciudades']);
});

// Verificar que el script se ha cargado correctamente
console.log('Script cargado correctamente');

