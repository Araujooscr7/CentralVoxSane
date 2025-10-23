// script.js - Funcionalidades avançadas para o Dashboard VoxSane

class VoxSaneDashboard {
    constructor() {
        this.currentTheme = 'dark';
        this.reports = [];
        this.charts = {};
        this.drones = [
            { id: 1, name: 'Drone Alpha', battery: 60, status: 'flying', signal: 85, altitude: 120, speed: 45, missionProgress: 65 },
            { id: 2, name: 'Drone Beta', battery: 85, status: 'online', signal: 95, lastMission: '2h atrás', health: 100 },
            { id: 3, name: 'Drone Gamma', battery: 25, status: 'online', signal: 75, lastMission: '4h atrás', health: 90 }
        ];
        this.init();
    }

    init() {
        this.initializeEventListeners();
        this.loadSampleData();
        this.initializeCharts();
        this.generateHeatMap();
        this.updateReportsList();
        this.startRealTimeUpdates();
    }

    initializeEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        
        // Menu toggle for mobile
        document.getElementById('menuToggle').addEventListener('click', () => this.toggleSidebar());
        
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Quick actions
        document.getElementById('newReportBtn').addEventListener('click', () => this.openNewMissionModal());
        document.getElementById('generateReportBtn').addEventListener('click', () => this.generateReport());
        document.getElementById('campaignBtn').addEventListener('click', () => this.launchCampaign());
        document.getElementById('volunteersBtn').addEventListener('click', () => this.manageTeam());
        document.getElementById('alertsBtn').addEventListener('click', () => this.configureAlerts());
        document.getElementById('analyticsBtn').addEventListener('click', () => this.showAdvancedAnalytics());

        // Modal controls
        document.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelMission').addEventListener('click', () => this.closeModal());
        document.getElementById('launchMission').addEventListener('click', () => this.launchMission());
        document.getElementById('newMissionBtn').addEventListener('click', () => this.openNewMissionModal());

        // Time filter
        document.getElementById('timeFilter').addEventListener('change', (e) => this.updateCharts(e.target.value));

        // View all reports
        document.querySelector('.btn-view-all').addEventListener('click', () => this.viewAllReports());

        // Map fullscreen
        document.querySelector('.btn-map-fullscreen').addEventListener('click', () => this.toggleMapFullscreen());

        // Logout
        document.querySelector('.logout-btn').addEventListener('click', () => this.handleLogout());

        // Drone buttons
        document.querySelectorAll('.drone-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleDroneAction(e));
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        const icon = document.querySelector('.btn-theme-toggle i');
        icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        
        this.showNotification('Tema alterado para ' + (this.currentTheme === 'light' ? 'claro' : 'escuro'));
    }

    toggleSidebar() {
        document.querySelector('.sidebar').classList.toggle('active');
    }

    handleNavigation(e) {
        e.preventDefault();
        const target = e.currentTarget.getAttribute('href').substring(1);
        
        // Remove active class from all items
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        // Add active class to clicked item
        e.currentTarget.parentElement.classList.add('active');
        
        this.showNotification(`Navegando para: ${e.currentTarget.querySelector('span').textContent}`);
        
        // In a real application, this would load different content
        console.log(`Loading section: ${target}`);
    }

    openNewMissionModal() {
        document.getElementById('newMissionModal').classList.add('active');
    }

    closeModal() {
        document.getElementById('newMissionModal').classList.remove('active');
        document.getElementById('missionForm').reset();
    }

    launchMission() {
        const form = document.getElementById('missionForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const mission = {
            drone: document.getElementById('droneSelect').value,
            area: document.getElementById('missionArea').value,
            type: document.getElementById('missionType').value,
            duration: document.getElementById('missionDuration').value,
            priority: document.querySelector('input[name="priority"]:checked').value,
            timestamp: new Date().toISOString()
        };

        this.showNotification(`Missão lançada para ${mission.drone} na área ${mission.area}`);
        this.closeModal();
        
        // Simulate drone status update
        setTimeout(() => {
            this.updateDroneStatus(mission.drone, 'flying');
        }, 1000);
    }

    generateReport() {
        // Simulate report generation
        this.showNotification('Relatório sendo gerado...');
        
        setTimeout(() => {
            this.showNotification('Relatório gerado com sucesso!');
            // In a real application, this would download the report
        }, 2000);
    }

    launchCampaign() {
        this.showNotification('Iniciando campanha de divulgação...');
        // Campaign logic would go here
    }

    manageTeam() {
        this.showNotification('Abrindo gerenciador de equipe...');
        // Team management logic would go here
    }

    configureAlerts() {
        this.showNotification('Configurando alertas automáticos...');
        // Alert configuration logic would go here
    }

    showAdvancedAnalytics() {
        this.showNotification('Carregando análise avançada...');
        // Advanced analytics logic would go here
    }

    viewAllReports() {
        this.showNotification('Carregando todos os alertas...');
        // Navigation to full reports page would happen here
    }

    toggleMapFullscreen() {
        const mapContainer = document.querySelector('.map-container');
        mapContainer.classList.toggle('fullscreen');
        
        const icon = document.querySelector('.btn-map-fullscreen i');
        icon.className = mapContainer.classList.contains('fullscreen') ? 'fas fa-compress' : 'fas fa-expand';
        
        this.showNotification('Modo de tela cheia ' + 
            (mapContainer.classList.contains('fullscreen') ? 'ativado' : 'desativado'));
    }

    handleLogout() {
        if (confirm('Tem certeza que deseja sair?')) {
            this.showNotification('Saindo do sistema...');
            // Logout logic would go here
        }
    }

    handleDroneAction(e) {
        const action = e.currentTarget.textContent.trim();
        const droneCard = e.currentTarget.closest('.drone-card');
        const droneName = droneCard.querySelector('h4').textContent;
        
        this.showNotification(`${action} para ${droneName}`);
        
        // Simulate action
        if (action.includes('Ativar')) {
            this.updateDroneStatus(droneName.toLowerCase(), 'flying');
        } else if (action.includes('Pausar')) {
            this.showNotification(`${droneName} pausado temporariamente`);
        } else if (action.includes('Retornar')) {
            setTimeout(() => {
                this.updateDroneStatus(droneName.toLowerCase(), 'online');
            }, 3000);
        }
    }

    updateDroneStatus(droneName, status) {
        const drone = this.drones.find(d => d.name.toLowerCase().includes(droneName));
        if (drone) {
            drone.status = status;
            this.updateDroneCards();
            this.updateSidebarDrones();
        }
    }

    loadSampleData() {
        this.reports = [
            {
                id: 1,
                title: "Vazamento de Água Detectado",
                description: "Vazamento na rede principal - Rua das Flores",
                author: "Drone Alpha",
                time: "15 minutos atrás",
                type: "urgent",
                status: "urgent"
            },
            {
                id: 2,
                title: "Acúmulo de Lixo Identificado",
                description: "Lixo acumulado há mais de 3 dias - Vila Nova",
                author: "Drone Beta",
                time: "2 horas atrás",
                type: "pending",
                status: "pending"
            },
            {
                id: 3,
                title: "Esgoto a Céu Aberto",
                description: "Esgoto correndo na via pública - Bairro Central",
                author: "Drone Gamma",
                time: "4 horas atrás",
                type: "resolved",
                status: "resolved"
            },
            {
                id: 4,
                title: "Falta de Água Relatada",
                description: "Área sem abastecimento há 24h - Jardim Primavera",
                author: "Drone Alpha",
                time: "6 horas atrás",
                type: "pending",
                status: "pending"
            }
        ];
    }

    initializeCharts() {
        // Main chart
        const ctx = document.getElementById('mainChart').getContext('2d');
        this.charts.main = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Zona Norte', 'Zona Sul', 'Zona Leste', 'Zona Oeste', 'Centro'],
                datasets: [{
                    label: 'Áreas Monitoradas',
                    data: [45, 28, 35, 22, 40],
                    backgroundColor: [
                        'rgba(0, 212, 255, 0.8)',
                        'rgba(123, 104, 238, 0.8)',
                        'rgba(0, 255, 136, 0.8)',
                        'rgba(255, 165, 2, 0.8)',
                        'rgba(30, 144, 255, 0.8)'
                    ],
                    borderColor: [
                        'rgb(0, 212, 255)',
                        'rgb(123, 104, 238)',
                        'rgb(0, 255, 136)',
                        'rgb(255, 165, 2)',
                        'rgb(30, 144, 255)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 10
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        });

        // Mini charts for stats
        this.createMiniCharts();
    }

    createMiniCharts() {
        const miniChartConfig = {
            type: 'line',
            data: {
                labels: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
                datasets: [{
                    data: [30, 45, 35, 50, 40, 60, 45],
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                },
                elements: {
                    point: {
                        radius: 0
                    }
                }
            }
        };

        // Apply different colors for each mini chart
        const chartElements = document.querySelectorAll('.mini-chart');
        chartElements.forEach((element, index) => {
            const colors = [
                { border: 'rgba(0, 212, 255, 0.8)', background: 'rgba(0, 212, 255, 0.1)' },
                { border: 'rgba(255, 165, 2, 0.8)', background: 'rgba(255, 165, 2, 0.1)' },
                { border: 'rgba(46, 213, 115, 0.8)', background: 'rgba(46, 213, 115, 0.1)' },
                { border: 'rgba(255, 71, 87, 0.8)', background: 'rgba(255, 71, 87, 0.1)' }
            ];

            const config = JSON.parse(JSON.stringify(miniChartConfig));
            config.data.datasets[0].borderColor = colors[index].border;
            config.data.datasets[0].backgroundColor = colors[index].background;

            this.charts[`mini${index}`] = new Chart(element, config);
        });
    }

    updateCharts(timeRange) {
        // Simulate data update based on time range
        let data;
        switch(timeRange) {
            case '7d':
                data = [25, 15, 20, 12, 22];
                break;
            case '30d':
                data = [45, 28, 35, 22, 40];
                break;
            case '90d':
                data = [120, 75, 95, 65, 110];
                break;
        }

        this.charts.main.data.datasets[0].data = data;
        this.charts.main.update();
        
        this.showNotification(`Gráficos atualizados para: ${this.getTimeRangeText(timeRange)}`);
    }

    getTimeRangeText(range) {
        const ranges = {
            '7d': 'Últimos 7 dias',
            '30d': 'Últimos 30 dias',
            '90d': 'Últimos 90 dias'
        };
        return ranges[range] || range;
    }

    generateHeatMap() {
        const grid = document.querySelector('.map-grid');
        grid.innerHTML = '';

        for (let i = 0; i < 64; i++) {
            const cell = document.createElement('div');
            cell.className = 'map-cell';
            
            // Random coverage intensity for demo
            const intensity = Math.floor(Math.random() * 5);
            cell.style.backgroundColor = this.getCoverageColor(intensity);
            cell.style.opacity = 0.7 + (intensity * 0.06);
            
            cell.addEventListener('click', () => {
                this.showNotification(`Área ${i + 1} selecionada - Cobertura ${intensity + 1}/5`);
            });
            
            grid.appendChild(cell);
        }
    }

    getCoverageColor(intensity) {
        const colors = [
            'rgba(0, 212, 255, 0.1)', // Very low
            'rgba(0, 212, 255, 0.3)', // Low
            'rgba(0, 212, 255, 0.5)', // Medium
            'rgba(0, 212, 255, 0.7)', // High
            'rgba(0, 212, 255, 0.9)'  // Very high
        ];
        return colors[intensity] || colors[0];
    }

    updateReportsList() {
        const container = document.getElementById('reportsList');
        container.innerHTML = '';

        this.reports.forEach(report => {
            const item = document.createElement('div');
            item.className = 'report-item';
            item.innerHTML = `
                <div class="report-icon ${report.status}">
                    <i class="fas ${this.getReportIcon(report.type)}"></i>
                </div>
                <div class="report-content">
                    <div class="report-title">${report.title}</div>
                    <div class="report-meta">Por ${report.author} • ${report.time}</div>
                </div>
                <div class="report-status ${report.status}">
                    ${this.getStatusText(report.status)}
                </div>
            `;
            
            item.addEventListener('click', () => {
                this.showReportDetails(report);
            });
            
            container.appendChild(item);
        });
    }

    getReportIcon(type) {
        const icons = {
            'urgent': 'fa-exclamation',
            'pending': 'fa-clock',
            'resolved': 'fa-check-circle'
        };
        return icons[type] || 'fa-exclamation-circle';
    }

    getStatusText(status) {
        const statusText = {
            'urgent': 'Urgente',
            'pending': 'Pendente',
            'resolved': 'Resolvido'
        };
        return statusText[status] || 'Pendente';
    }

    showReportDetails(report) {
        this.showNotification(`Detalhes do alerta: ${report.title}`);
        // In a real application, this would open a detailed view
    }

    updateDroneCards() {
        const droneCards = document.querySelectorAll('.drone-card');
        droneCards.forEach((card, index) => {
            if (this.drones[index]) {
                const drone = this.drones[index];
                const statusElement = card.querySelector('.drone-status');
                const batteryElement = card.querySelector('.battery-level');
                
                statusElement.textContent = this.getDroneStatusText(drone.status);
                statusElement.className = `drone-status status-${drone.status}`;
                
                // Update battery display
                if (batteryElement) {
                    batteryElement.className = 'battery-level ' + this.getBatteryLevelClass(drone.battery);
                    batteryElement.style.width = `${drone.battery}%`;
                    batteryElement.nextElementSibling.textContent = `${drone.battery}%`;
                }
            }
        });
    }

    updateSidebarDrones() {
        const droneItems = document.querySelectorAll('.drone-status-item');
        droneItems.forEach((item, index) => {
            if (this.drones[index]) {
                const drone = this.drones[index];
                const statusElement = item.querySelector('.drone-status');
                const batteryElement = item.querySelector('.battery-level');
                
                statusElement.textContent = this.getDroneStatusText(drone.status);
                statusElement.className = `drone-status status-${drone.status}`;
                
                batteryElement.className = 'battery-level ' + this.getBatteryLevelClass(drone.battery);
                batteryElement.style.width = `${drone.battery}%`;
                batteryElement.parentElement.nextElementSibling.textContent = `${drone.battery}%`;
            }
        });
    }

    getDroneStatusText(status) {
        const statusText = {
            'online': 'Disponível',
            'offline': 'Offline',
            'flying': 'Em Missão',
            'maintenance': 'Manutenção'
        };
        return statusText[status] || status;
    }

    getBatteryLevelClass(battery) {
        if (battery >= 70) return 'battery-high';
        if (battery >= 30) return 'battery-medium';
        return 'battery-low';
    }

    startRealTimeUpdates() {
        // Simulate real-time battery drain for flying drones
        setInterval(() => {
            this.drones.forEach(drone => {
                if (drone.status === 'flying' && drone.battery > 5) {
                    drone.battery -= Math.random() * 2;
                    drone.battery = Math.max(5, drone.battery);
                    
                    // Update mission progress for flying drones
                    if (drone.missionProgress < 95) {
                        drone.missionProgress += Math.random() * 3;
                    }
                }
            });
            
            this.updateDroneCards();
            this.updateSidebarDrones();
        }, 5000);

        // Simulate new alerts
        setInterval(() => {
            if (Math.random() > 0.7) {
                const newAlert = {
                    id: Date.now(),
                    title: "Nova Anomalia Detectada",
                    description: "Área suspeita identificada por drone",
                    author: "Drone " + ['Alpha', 'Beta', 'Gamma'][Math.floor(Math.random() * 3)],
                    time: "Agora mesmo",
                    type: "urgent",
                    status: "urgent"
                };
                
                this.reports.unshift(newAlert);
                if (this.reports.length > 4) this.reports.pop();
                this.updateReportsList();
                
                // Show notification for urgent alerts
                if (newAlert.type === 'urgent') {
                    this.showNotification(`🚨 ${newAlert.title}`);
                }
            }
        }, 15000);
    }

    showNotification(message) {
        const toast = document.getElementById('notificationToast');
        const messageElement = toast.querySelector('.toast-message');
        
        messageElement.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize the dashboard when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new VoxSaneDashboard();
});
