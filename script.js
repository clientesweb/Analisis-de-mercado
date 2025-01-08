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
                    top: 20,
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
                        if (context.datasetIndex === 2) {
                            return value.toFixed(1) + '%';
                        }
                        return value.toLocaleString();
                    },
                    anchor: 'end',
                    align: 'top',
                    offset: 5
                }
            },
            barPercentage: 0.8,
            categoryPercentage: 0.7
        }
    };

    // Residential Projects Chart
    const projectsCtx = document.getElementById('residentialProjectsChart').getContext('2d');
    new Chart(projectsCtx, {
        ...barChartConfig,
        data: {
            labels: cities,
            datasets: [
                {
                    label: 'N° Proyectos 2023',
                    data: projects2023,
                    backgroundColor: createGradient(projectsCtx, colors.blue),
                },
                {
                    label: 'N° Proyectos 2024',
                    data: projects2024,
                    backgroundColor: createGradient(projectsCtx, colors.green),
                },
                {
                    label: '% Variación',
                    data: projectsVariation,
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
            }
        }
    });

    // Available Units Chart
    const unitsCtx = document.getElementById('availableUnitsChart').getContext('2d');
    new Chart(unitsCtx, {
        ...barChartConfig,
        data: {
            labels: cities,
            datasets: [
                {
                    label: 'Unidades 2023',
                    data: units2023,
                    backgroundColor: createGradient(unitsCtx, colors.blue),
                },
                {
                    label: 'Unidades 2024',
                    data: units2024,
                    backgroundColor: createGradient(unitsCtx, colors.green),
                },
                {
                    label: '% Variación',
                    data: unitsVariation,
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
            }
        }
    });

    // Absorption Chart
    const absorptionCtx = document.getElementById('absorptionChart').getContext('2d');
    new Chart(absorptionCtx, {
        ...barChartConfig,
        data: {
            labels: cities,
            datasets: [
                {
                    label: 'Absorción 2023',
                    data: absorption2023,
                    backgroundColor: createGradient(absorptionCtx, colors.blue),
                },
                {
                    label: 'Absorción 2024',
                    data: absorption2024,
                    backgroundColor: createGradient(absorptionCtx, colors.green),
                },
                {
                    label: '% Variación',
                    data: absorptionVariation,
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
            }
        }
    });

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
                    formatter: (value) => {
                        return value + '%';
                    }
                }
            }
        }
    };

    // Projects Distribution Chart
    const projectsDistCtx = document.getElementById('projectsDistributionChart').getContext('2d');
    new Chart(projectsDistCtx, {
        ...pieChartConfig,
        data: {
            labels: ['Quito', 'Guayaquil', 'Cuenca', 'Ambato', 'Otras Ciudades'],
            datasets: [{
                data: projectsDistribution,
                backgroundColor: [colors.blue, colors.green, colors.yellow, colors.red, colors.purple]
            }]
        }
    });

    // Units Distribution Chart
    const unitsDistCtx = document.getElementById('unitsDistributionChart').getContext('2d');
    new Chart(unitsDistCtx, {
        ...pieChartConfig,
        data: {
            labels: ['Guayaquil', 'Quito', 'Manta', 'Machala', 'Cuenca', 'Otras Ciudades'],
            datasets: [{
                data: unitsDistribution,
                backgroundColor: [colors.blue, colors.green, colors.yellow, colors.red, colors.purple, colors.gray]
            }]
        }
    });

    // Función de redimensionamiento
    function resizeCharts() {
        Chart.instances.forEach(chart => {
            chart.resize();
        });
    }

    // Llamar a resize después de que la página se haya cargado completamente y en el evento de cambio de tamaño de ventana
    window.addEventListener('load', resizeCharts);
    window.addEventListener('resize', resizeCharts);
});

// Verificar que el script se ha cargado correctamente
console.log('Script cargado correctamente');

