// Fila de prioridade de preces
const prayerQueue = [];

document.getElementById('submit-prayer').addEventListener('click', () => {
    const prayerText = document.getElementById('prayer-text').value;
    const prayerType = document.getElementById('prayer-type').value;
    
    if (!prayerText) {
        alert('Por favor, digite sua prece.');
        return;
    }
    
    // Determinar prioridade com base no tipo
    let priority;
    switch(prayerType) {
        case 'health': priority = 1; break;
        case 'money': priority = 2; break;
        case 'love': priority = 3; break;
        default: priority = 3;
    }
    
    const prayer = {
        text: prayerText,
        type: prayerType,
        priority: priority,
        timestamp: new Date()
    };
    
    // Adicionar à fila e ordenar por prioridade
    prayerQueue.push(prayer);
    prayerQueue.sort((a, b) => a.priority - b.priority);
    
    updatePrayerQueueDisplay();
    document.getElementById('prayer-text').value = '';
    
    addConsequence(`Prece por ${getTypeName(prayerType)} recebida e priorizada.`);
});

function updatePrayerQueueDisplay() {
    const queueElement = document.getElementById('prayer-queue');
    queueElement.innerHTML = '';
    
    if (prayerQueue.length === 0) {
        queueElement.innerHTML = '<li>Nenhuma prece pendente.</li>';
        return;
    }
    
    prayerQueue.forEach(prayer => {
        const li = document.createElement('li');
        li.className = `prayer-item ${prayer.type}`;
        
        const typeName = getTypeName(prayer.type);
        const dateStr = prayer.timestamp.toLocaleString();
        
        li.innerHTML = `
            <p><strong>${typeName}</strong> <span class="priority">(Prioridade ${prayer.priority})</span></p>
            <p>${prayer.text}</p>
            <small>Enviado em: ${dateStr}</small>
        `;
        
        queueElement.appendChild(li);
    });
}

function getTypeName(type) {
    switch(type) {
        case 'health': return 'Saúde';
        case 'money': return 'Dinheiro';
        case 'love': return 'Amor';
        default: return 'Geral';
    }
}

// Debugging ético
document.getElementById('apply-solution').addEventListener('click', () => {
    const solution = document.getElementById('ethical-solution').value;
    let consequence;
    
    switch(solution) {
        case 'adjust':
            consequence = "Milagre ajustado: Em vez de neve, o deserto recebeu uma chuva moderada que ajudou na vegetação local sem causar desequilíbrio.";
            break;
        case 'compensate':
            consequence = "Milagre compensado: Enquanto nevou no deserto, uma região fria recebeu aumento de temperatura, mantendo o equilíbrio global.";
            break;
        case 'deny':
            consequence = "Milagre negado: Após análise ética, decidiu-se que alterar radicalmente o clima do deserto traria mais malefícios que benefícios.";
            break;
        default:
            consequence = "Decisão ética aplicada ao milagre solicitado.";
    }
    
    addConsequence(consequence);
});

// Mostrar consequências
function addConsequence(text) {
    const consequencesList = document.getElementById('consequences-list');
    const div = document.createElement('div');
    div.className = 'consequence';
    
    const date = new Date();
    div.innerHTML = `<p><strong>${date.toLocaleString()}:</strong> ${text}</p>`;
    
    consequencesList.prepend(div);
}

// Inicializar
updatePrayerQueueDisplay();
addConsequence("Sistema de preces inicializado. Todas as preces serão processadas de acordo com prioridades éticas.");
