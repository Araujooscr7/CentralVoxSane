// VOXsane - Painel Administrativo
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupEventListeners();
});

function initializeDashboard() {
    console.log('VOXsane Dashboard inicializado');
    updateLiveStats();
    startRealTimeUpdates();
}

function setupEventListeners() {
    // Notificações
    const notificationBtn = document.querySelector('.btn-notification');
    notificationBtn.addEventListener('click', showNotifications);
    
    // Botões de ação dos drones
    const droneButtons = document.querySelectorAll('.btn-small');
    droneButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const droneCard = this.closest('.drone-card');
            const droneName = droneCard.querySelector('h4').textContent;
            handleDroneAction(this, droneName);
        });
    });
    
    // Filtros e ações
    const viewAllBtn = document.querySelector('.btn-view-all');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', showAllComplaints);
    }
    
    const newMissionBtn = document.querySelector('.btn-primary');
    if (newMissionBtn) {
        newMissionBtn.addEventListener('click', createNewMission);
    }
}

function updateLiveStats() {
    // Simular atualização de estatísticas em tempo real
    setInterval(() => {
        const stats = document.querySelectorAll('.stat-content h3');
        stats.forEach(stat => {
            const current = parseInt(stat.textContent);
            const change = Math.random() > 0.5 ? 1 : -1;
            const newValue = Math.max(0, current + change);
            stat.textContent = newValue;
            
            // Animar a mudança
            stat.style.transform = 'scale(1.1)';
            setTimeout(() => {
                stat.style.transform = 'scale(1)';
            }, 300);
        });
    }, 5000);
}

function startRealTimeUpdates() {
    // Simular atualizações em tempo real
    setInterval(() => {
        updateActivityFeed();
        updateDroneStatus();
    }, 10000);
}

function updateActivityFeed() {
    const activities = [
        'Nova denúncia registrada na zona leste',
        'Drone DJI-01 completou missão de mapeamento',
        'Relatório semanal gerado automaticamente',
        'Sistema atualizado para versão 2.1.0'
    ];
    
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    addNewActivity(randomActivity);
}

function addNewActivity(activity) {
    const timeline = document.querySelector('.activity-timeline');
    const newItem = document.createElement('div');
    newItem.className = 'activity-item';
   