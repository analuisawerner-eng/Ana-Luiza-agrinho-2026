// ========== SPLASH DE ABERTURA (10 SEGUNDOS) ==========
(function() {
    function iniciarSplash() {
        const splash = document.getElementById('splashScreen');
        if (!splash) return;
        
        splash.setAttribute('style', 'display: flex !important; visibility: visible !important; opacity: 1 !important; z-index: 99999 !important; position: fixed !important;');
        
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        
        window.fecharSplash = function() {
            document.body.classList.remove('splash-ativo');
            splash.classList.add('saindo');
            setTimeout(function() {
                if (splash && splash.parentNode) {
                    splash.parentNode.removeChild(splash);
                }
            }, 800);
        };
        
        setTimeout(fecharSplash, 10000);
        splash.addEventListener('click', fecharSplash);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciarSplash);
    } else {
        iniciarSplash();
    }
})();
// ========== VARIÁVEIS GLOBAIS ==========
let dadosRebanho = { numAnimais: 0, estrutura: '', sistemaCriacao: '', estado: '', vacinas: [], cios: [] };
let dadosSuinos = { numAnimais: 0, tipoCriacao: '', vacinas: [], cios: [] };
let dadosAves = { numAves: 0, tipoInstalacao: '', tipoProducao: '' };
let dadosAvesVacinas = [];
let dadosOvelhas = { numAnimais: 0, tipoCriacao: '', vacinas: [] };
let dadosCabras = { numAnimais: 0, tipoCriacao: '', vacinas: [] };
let dadosCavalos = { numAnimais: 0, tipoCriacao: '', vacinas: [], cios: [] };
let tamanhoFonte = 16, leitorAtivo = null;

// ========== ACESSIBILIDADE ==========
function toggleAcessibilidade() { document.getElementById('menuAcessibilidade').classList.toggle('ativo'); }
function aumentarFonte() { tamanhoFonte += 2; if (tamanhoFonte > 24) tamanhoFonte = 24; aplicarTamanhoFonte(); salvarPreferencias(); }
function diminuirFonte() { tamanhoFonte -= 2; if (tamanhoFonte < 12) tamanhoFonte = 12; aplicarTamanhoFonte(); salvarPreferencias(); }
function aplicarTamanhoFonte() { document.querySelectorAll('body, button, input, select, textarea, label, p, h1, h2, h3, h4, h5, li, td, th').forEach(el => el.style.fontSize = tamanhoFonte + 'px'); }
function toggleContraste() { document.body.classList.toggle('modo-escuro'); document.getElementById('btnContraste').innerHTML = document.body.classList.contains('modo-escuro') ? '☀️ Modo Claro' : '🌓 Modo Escuro'; salvarPreferencias(); }
function iniciarLeitura() { pararLeitura(); if ('speechSynthesis' in window) { const t = document.querySelector('.tela.ativa'); if (t) { const f = new SpeechSynthesisUtterance(t.innerText); f.lang = 'pt-BR'; f.rate = 0.9; window.speechSynthesis.speak(f); leitorAtivo = f; } } }
function pararLeitura() { if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); leitorAtivo = null; } }
function salvarPreferencias() { localStorage.setItem('pref', JSON.stringify({ tamanhoFonte, modoEscuro: document.body.classList.contains('modo-escuro') })); }
function carregarPreferencias() { const p = JSON.parse(localStorage.getItem('pref')); if (p) { if (p.tamanhoFonte) { tamanhoFonte = p.tamanhoFonte; aplicarTamanhoFonte(); } if (p.modoEscuro) { document.body.classList.add('modo-escuro'); document.getElementById('btnContraste').innerHTML = '☀️ Modo Claro'; } } dadosRebanho.vacinas = JSON.parse(localStorage.getItem('vacinasRebanho') || '[]'); dadosRebanho.cios = JSON.parse(localStorage.getItem('ciosRebanho') || '[]'); dadosSuinos.vacinas = JSON.parse(localStorage.getItem('vacinasSuinos') || '[]'); dadosSuinos.cios = JSON.parse(localStorage.getItem('ciosSuinos') || '[]'); dadosAvesVacinas = JSON.parse(localStorage.getItem('vacinasAves') || '[]'); dadosOvelhas.vacinas = JSON.parse(localStorage.getItem('vacinasOvelhas') || '[]'); dadosCabras.vacinas = JSON.parse(localStorage.getItem('vacinasCabras') || '[]'); dadosCavalos.vacinas = JSON.parse(localStorage.getItem('vacinasCavalos') || '[]'); dadosCavalos.cios = JSON.parse(localStorage.getItem('ciosCavalos') || '[]'); }

// ========== LOCAL STORAGE HELPERS ==========
function svL() { localStorage.setItem('vacinasRebanho', JSON.stringify(dadosRebanho.vacinas)); }
function scL() { localStorage.setItem('ciosRebanho', JSON.stringify(dadosRebanho.cios)); }
function svS() { localStorage.setItem('vacinasSuinos', JSON.stringify(dadosSuinos.vacinas)); }
function scS() { localStorage.setItem('ciosSuinos', JSON.stringify(dadosSuinos.cios)); }
function svA() { localStorage.setItem('vacinasAves', JSON.stringify(dadosAvesVacinas)); }
function svO() { localStorage.setItem('vacinasOvelhas', JSON.stringify(dadosOvelhas.vacinas)); }
function svC() { localStorage.setItem('vacinasCabras', JSON.stringify(dadosCabras.vacinas)); }
function svCa() { localStorage.setItem('vacinasCavalos', JSON.stringify(dadosCavalos.vacinas)); }
function scCa() { localStorage.setItem('ciosCavalos', JSON.stringify(dadosCavalos.cios)); }

// ========== NAVEGAÇÃO ==========
function mostrarTela(id) { document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa')); document.getElementById(id).classList.add('ativa'); }
function selecionarProducao(tipo) { mostrarTela(tipo === 'agro' ? 'telaAgro' : tipo === 'leite' ? 'telaLeite' : tipo === 'suinos' ? 'telaSuinos' : tipo === 'ovelhas' ? 'telaOvelhas' : tipo === 'cabras' ? 'telaCabras' : tipo === 'cavalos' ? 'telaCavalos' : 'telaAves'); }
function voltarInicio() { mostrarTela('telaInicial'); }
function ftL() { document.getElementById('secaoVacinas').style.display = 'none'; document.getElementById('secaoCio').style.display = 'none'; document.getElementById('secaoHigieneTetos').style.display = 'none'; }
function ftS() { document.getElementById('secaoVacinasSuinos').style.display = 'none'; document.getElementById('secaoReproducaoSuinos').style.display = 'none'; }
function ftA() { document.getElementById('secaoVacinasAves').style.display = 'none'; }
function ftCa() { document.getElementById('secaoVacinasCavalos').style.display = 'none'; document.getElementById('secaoReproducaoCavalos').style.display = 'none'; }

// ========== INFORMAÇÕES ==========
function toggleInformacoes() { document.getElementById('secaoInformacoes').classList.toggle('ativo'); }
function fecharInformacoes() { document.getElementById('secaoInformacoes').classList.remove('ativo'); }

// ========== UTILITÁRIOS ==========
function fd(d) { if (d instanceof Date && !isNaN(d)) return d.toLocaleDateString('pt-BR'); if (typeof d === 'string') { const dt = new Date(d + 'T00:00:00'); if (!isNaN(dt)) return dt.toLocaleDateString('pt-BR'); const p = d.split('/'); if (p.length === 3) { const db = new Date(p[2], p[1]-1, p[0]); if (!isNaN(db)) return db.toLocaleDateString('pt-BR'); } } return d || 'Data inválida'; }

// ========== DOWNLOAD XLSX ==========
function baixarPlanilhaLeite() {
    if (dadosRebanho.vacinas.length === 0 && dadosRebanho.cios.length === 0) { alert('⚠️ Nenhum dado registrado!'); return; }
    let csv = '🌾 AgroGestor - Sistema Inteligente de Gestão Rural\nAgrinho 2026\nGerado em: ' + new Date().toLocaleDateString('pt-BR') + '\n\n';
    csv += '=== INFORMAÇÕES DO REBANHO ===\n';
    csv += 'Total de Animais;' + dadosRebanho.numAnimais + '\nEstrutura;' + dadosRebanho.estrutura + '\nSistema;' + dadosRebanho.sistemaCriacao + '\nEstado;' + dadosRebanho.estado + '\n\n';
    if (dadosRebanho.vacinas.length > 0) { csv += '=== VACINAS ===\nBrinco;Vacina;Data;Obs\n'; dadosRebanho.vacinas.forEach(v => csv += v.brinco + ';' + v.tipo + ';' + fd(v.data) + ';' + v.observacao + '\n'); csv += '\n'; }
    if (dadosRebanho.cios.length > 0) { csv += '=== CIOS ===\nBrinco;Data;Hora;Tipo;Obs\n'; dadosRebanho.cios.forEach(c => { const tp = c.tipoCobertura === 'inseminacao' ? 'IA' : 'Monta'; csv += c.brinco + ';' + fd(c.data) + ';' + c.hora + ';' + tp + ';' + c.observacao + '\n'; }); }
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'AgroGestor_Leite.csv'; link.click();
}

function baixarPlanilhaSuinos() {
    if (dadosSuinos.vacinas.length === 0 && dadosSuinos.cios.length === 0) { alert('⚠️ Nenhum dado registrado!'); return; }
    let csv = '🌾 AgroGestor - Suínos\n\n'; csv += 'Total;' + dadosSuinos.numAnimais + '\nTipo;' + dadosSuinos.tipoCriacao + '\n\n';
    if (dadosSuinos.vacinas.length > 0) { csv += '=== VACINAS ===\nBrinco;Vacina;Data;Obs\n'; dadosSuinos.vacinas.forEach(v => csv += v.brinco + ';' + v.tipo + ';' + fd(v.data) + ';' + v.observacao + '\n'); }
    if (dadosSuinos.cios.length > 0) { csv += '\n=== REPRODUÇÃO ===\nBrinco;Data;Hora;Tipo\n'; dadosSuinos.cios.forEach(c => { const tp = c.tipoCobertura === 'ia' ? 'IA' : 'Monta'; csv += c.brinco + ';' + fd(c.data) + ';' + c.hora + ';' + tp + '\n'; }); }
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'AgroGestor_Suinos.csv'; link.click();
}

function baixarPlanilhaOvelhas() {
    if (dadosOvelhas.vacinas.length === 0) { alert('⚠️ Nenhum dado!'); return; }
    let csv = '🌾 AgroGestor - Ovinos\n\nTotal;' + dadosOvelhas.numAnimais + '\n\n=== VACINAS ===\nBrinco;Vacina;Data;Obs\n';
    dadosOvelhas.vacinas.forEach(v => csv += v.brinco + ';' + v.tipo + ';' + fd(v.data) + ';' + v.observacao + '\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'AgroGestor_Ovinos.csv'; link.click();
}

function baixarPlanilhaCabras() {
    if (dadosCabras.vacinas.length === 0) { alert('⚠️ Nenhum dado!'); return; }
    let csv = '🌾 AgroGestor - Caprinos\n\nTotal;' + dadosCabras.numAnimais + '\n\n=== VACINAS ===\nBrinco;Vacina;Data;Obs\n';
    dadosCabras.vacinas.forEach(v => csv += v.brinco + ';' + v.tipo + ';' + fd(v.data) + ';' + v.observacao + '\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'AgroGestor_Caprinos.csv'; link.click();
}

function baixarPlanilhaCavalos() {
    if (dadosCavalos.vacinas.length === 0 && dadosCavalos.cios.length === 0) { alert('⚠️ Nenhum dado!'); return; }
    let csv = '🌾 AgroGestor - Equinos\n\nTotal;' + dadosCavalos.numAnimais + '\n\n';
    if (dadosCavalos.vacinas.length > 0) { csv += '=== VACINAS ===\nAnimal;Vacina;Data;Obs\n'; dadosCavalos.vacinas.forEach(v => csv += v.brinco + ';' + v.tipo + ';' + fd(v.data) + ';' + v.observacao + '\n'); }
    if (dadosCavalos.cios.length > 0) { csv += '\n=== REPRODUÇÃO ===\nÉgua;Data;Tipo\n'; const tp = { 'monta_natural': 'Monta Natural', 'monta_controlada': 'Monta Controlada', 'ia': 'IA' }; dadosCavalos.cios.forEach(c => csv += c.brinco + ';' + fd(c.data) + ';' + tp[c.tipoCobertura] + '\n'); }
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'AgroGestor_Equinos.csv'; link.click();
}

function baixarPlanilhaAves() {
    if (dadosAvesVacinas.length === 0) { alert('⚠️ Nenhum dado!'); return; }
    let csv = '🌾 AgroGestor - Aves\n\nTotal;' + dadosAves.numAves + '\n\n=== VACINAS ===\nLote;Vacina;Data;Obs\n';
    dadosAvesVacinas.forEach(v => csv += v.lote + ';' + v.tipo + ';' + fd(v.data) + ';' + v.observacao + '\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'AgroGestor_Aves.csv'; link.click();
}

// ========== AGRICULTURA ==========
document.getElementById('formAgro').addEventListener('submit', function(e) {
    e.preventDefault();
    const l = document.getElementById('localizacao').value, m = document.getElementById('tipoManejo').value, cultura = document.getElementById('culturaSelecionada').value;
    const imp = []; document.querySelectorAll('.check-implemento:checked').forEach(c => imp.push(c.value));
    document.getElementById('recomendacoesAgro').innerHTML = '<h4>📌 Informações:</h4><ul><li>📍 ' + l + '</li><li>🌿 Manejo: ' + m + '</li><li>🌾 Cultura: ' + cultura + '</li></ul>';
    if (cultura) { document.getElementById('manejoCultura').innerHTML = gerarManejoCultura(cultura); document.getElementById('manejoCultura').style.display = 'block'; }
    if (imp.length > 0) { document.getElementById('manutencaoMaquinas').innerHTML = gerarManutencao(imp); document.getElementById('manutencaoMaquinas').style.display = 'block'; } else { document.getElementById('manutencaoMaquinas').style.display = 'none'; }
    document.getElementById('resultadoAgro').style.display = 'block';
});

function gerarManutencao(imp) {
    let h = '<h3>🔧 Manutenção de Implementos</h3>';
    if (imp.includes('trator')) h += '<div class="maquina-card"><h4>🚜 Trator</h4><ul><li><strong>10 horas:</strong> Checar nível do óleo do motor.</li><li><strong>50 horas:</strong> Graxar pontos de lubrificação.</li><li><strong>250-500 horas:</strong> Trocar óleo do motor e filtros.</li></ul></div>';
    if (imp.includes('colheitadeira')) h += '<div class="maquina-card"><h4>🌾 Colheitadeira</h4><ul><li><strong>10 horas:</strong> Soprar poeira e palha dos radiadores.</li><li><strong>50 horas:</strong> Lubrificar pontos indicados.</li><li><strong>Pós-safra:</strong> Lavar e limpar completamente.</li></ul></div>';
    if (imp.includes('pulverizador')) h += '<div class="maquina-card"><h4>💨 Pulverizador</h4><ul><li><strong>10 horas:</strong> Circular água limpa no sistema.</li><li><strong>50 horas:</strong> Limpar os filtros de sucção e linha.</li></ul></div>';
    if (imp.includes('plantadeira')) h += '<div class="maquina-card"><h4>🌱 Plantadeira</h4><ul><li><strong>Diária:</strong> Limpar os dosadores de sementes e adubo.</li><li><strong>Pós-safra:</strong> Lavar todo o sistema de adubo.</li></ul></div>';
    if (imp.includes('semeadeira')) h += '<div class="maquina-card"><h4>🌾 Semeadeira</h4><ul><li><strong>Diária:</strong> Verificar discos e regulagem.</li><li><strong>Pós-safra:</strong> Limpeza completa e lubrificação.</li></ul></div>';
    if (imp.includes('grade')) h += '<div class="maquina-card"><h4>⚙️ Grade</h4><ul><li><strong>Diária:</strong> Graxar os mancais das seções.</li><li><strong>Pós-safra:</strong> Aplicar anticorrosivo nos discos.</li></ul></div>';
    h += '<p style="margin-top:15px;"><strong>💡 Consulte sempre o manual do fabricante para instruções detalhadas!</strong></p>';
    return h;
}

function gerarManejoCultura(cultura) {
    const tipoManejo = document.getElementById('tipoManejo').value;
    let h = '<h3>📖 Manejo - ' + cultura + '</h3>';
    
    // ========== INFORMAÇÕES ESPECÍFICAS POR CULTURA ==========
    let infoCultura = '';
    const culturas = {
        'soja': '<h4>🌱 Soja</h4><ul><li><strong>Pré-plantio:</strong> Dessecação 15-20 dias antes. Plantio Direto recomendado.</li><li><strong>Plantio:</strong> Semeadora de precisão. Profundidade 3-5cm. Adubo base.</li><li><strong>Desenvolvimento:</strong> Inoculação com Bradyrhizobium. Monitorar lagartas e percevejos.</li><li><strong>Colheita:</strong> Colhedora. Umidade ideal entre 13-15%.</li></ul>',
        'milho': '<h4>🌽 Milho</h4><ul><li><strong>Plantio:</strong> Semeadora-adubadeira. Nitrogênio em cobertura.</li><li><strong>Desenvolvimento:</strong> Aplicar nitrogênio na fase de 4-6 folhas. Monitorar lagarta-do-cartucho.</li><li><strong>Colheita:</strong> Colhedora. Umidade ideal entre 14-18%.</li></ul>',
        'trigo': '<h4>🌾 Trigo</h4><ul><li><strong>Plantio:</strong> Semeadeira contínua. Nitrogênio em cobertura.</li><li><strong>Desenvolvimento:</strong> Nitrogênio no perfilhamento. Aplicar fungicidas preventivos.</li><li><strong>Colheita:</strong> Colhedora. Umidade ideal entre 13-15%.</li></ul>',
        'feijao': '<h4>🫘 Feijão</h4><ul><li><strong>Plantio:</strong> Semeadora de precisão. Ciclo de 70-90 dias.</li><li><strong>Desenvolvimento:</strong> Irrigação frequente. Monitorar mosca-branca.</li><li><strong>Colheita:</strong> Pode ser manual ou mecanizada.</li></ul>',
        'mandioca': '<h4>🥔 Mandioca</h4><ul><li><strong>Plantio:</strong> Manivas em sulcos. Espaçamento 1m x 0,6m.</li><li><strong>Desenvolvimento:</strong> Controle de plantas daninhas nos primeiros 5 meses.</li><li><strong>Colheita:</strong> Arranquio entre 12-24 meses.</li></ul>',
        'cana': '<h4>🎋 Cana-de-Açúcar</h4><ul><li><strong>Plantio:</strong> Toletes em sulcos.</li><li><strong>Desenvolvimento:</strong> Controle de daninhas. Ciclo de 12-18 meses.</li><li><strong>Colheita:</strong> Mecanizada (recomendado) ou manual.</li></ul>',
        'cafe': '<h4>☕ Café</h4><ul><li><strong>Plantio:</strong> Mudas em covas. Espaçamento 3m x 1m.</li><li><strong>Desenvolvimento:</strong> Podas de formação e produção. Roçadas frequentes.</li><li><strong>Colheita:</strong> Manual ou com derriçadora mecânica.</li></ul>',
        'laranja': '<h4>🍊 Laranja</h4><ul><li><strong>Plantio:</strong> Mudas enxertadas certificadas. Espaçamento 6m x 3m.</li><li><strong>Desenvolvimento:</strong> Adubação NPK. Poda de ramos ladrões.</li><li><strong>Colheita:</strong> Manual. Para indústria: arrancamento. Para mesa: tesoura.</li></ul>',
        'limao': '<h4>🍋 Limão Taiti</h4><ul><li><strong>Plantio:</strong> Mudas enxertadas certificadas. Covas bem adubadas.</li><li><strong>Desenvolvimento:</strong> Adubação NPK. Poda de copa.</li><li><strong>Colheita:</strong> Manual com tesoura. Cortar o pedúnculo.</li></ul>',
        'uva': '<h4>🍇 Uva</h4><ul><li><strong>Plantio:</strong> Mudas enxertadas. Sistema latada (mesa) ou espaldeira (vinho).</li><li><strong>Desenvolvimento:</strong> Poda de inverno. Desbrota, desfolha e raleio de bagas.</li><li><strong>Colheita:</strong> Manual com tesoura. Cachos direto na caixa.</li></ul>',
        'banana': '<h4>🍌 Banana</h4><ul><li><strong>Plantio:</strong> Mudas de rizoma. Covas profundas.</li><li><strong>Desenvolvimento:</strong> Desbaste mantendo a planta-mãe, filha e neta. Corte do coração.</li><li><strong>Colheita:</strong> Cacho inteiro ainda verde. Climatização controlada.</li></ul>',
        'morango': '<h4>🍓 Morango</h4><ul><li><strong>Plantio:</strong> Mudas de estolões. Sistema com mulching ou semi-hidropônico.</li><li><strong>Desenvolvimento:</strong> Gotejamento e fertirrigação. Limpeza de folhas velhas.</li><li><strong>Colheita:</strong> Manual contínua (2 a 3 vezes por semana).</li></ul>',
        'pessego': '<h4>🍑 Pêssego</h4><ul><li><strong>Plantio:</strong> Inverno. Mudas enxertadas. Sistema espaldeira.</li><li><strong>Desenvolvimento:</strong> Poda de inverno e verão. Raleio de frutos.</li><li><strong>Colheita:</strong> Manual. Ponto ideal quando o fundo verde muda para amarelo.</li></ul>',
        'maca': '<h4>🍎 Maçã</h4><ul><li><strong>Plantio:</strong> Inverno. Mudas enxertadas. Necessita horas de frio.</li><li><strong>Desenvolvimento:</strong> Poda de inverno e verão. Raleio de frutos.</li><li><strong>Colheita:</strong> Manual. Frutos firmes no ponto ideal.</li></ul>',
        'ameixa': '<h4>🟣 Ameixa</h4><ul><li><strong>Plantio:</strong> Inverno. Mudas enxertadas.</li><li><strong>Desenvolvimento:</strong> Poda de inverno e verão. Raleio de frutos.</li><li><strong>Colheita:</strong> Manual. Frutos firmes.</li></ul>',
        'bergamota': '<h4>🍊 Bergamota</h4><ul><li><strong>Plantio:</strong> Mudas certificadas. Covas bem adubadas.</li><li><strong>Desenvolvimento:</strong> Adubação NPK. Poda de copa.</li><li><strong>Colheita:</strong> Manual com tesoura. Cortar o pedúnculo.</li></ul>',
        'abacaxi': '<h4>🍍 Abacaxi</h4><ul><li><strong>Plantio:</strong> Mudas de coroa ou filhote. Linhas duplas.</li><li><strong>Desenvolvimento:</strong> Indução floral com carbureto ou ethephon.</li><li><strong>Colheita:</strong> Manual. Base do fruto começando a amarelar.</li></ul>',
        'cebola': '<h4>🧅 Cebola</h4><ul><li><strong>Plantio:</strong> Transplante de mudas.</li><li><strong>Desenvolvimento:</strong> Controle rigoroso de plantas daninhas.</li><li><strong>Colheita:</strong> Quando 70% das folhas estalam. Cura no campo.</li></ul>',
        'batata': '<h4>🥔 Batata</h4><ul><li><strong>Plantio:</strong> Batata-semente em sulcos.</li><li><strong>Desenvolvimento:</strong> Amontoa (cobrir com terra) aos 20cm de altura.</li><li><strong>Colheita:</strong> Dessecar a rama antes. Arranquio das batatas.</li></ul>',
        'ervamate': '<h4>🍃 Erva-Mate</h4><ul><li><strong>Plantio:</strong> Mudas em covas. Meia-sombra no primeiro ano.</li><li><strong>Desenvolvimento:</strong> Podas de formação. Adubação orgânica.</li><li><strong>Colheita:</strong> Manual. Ramos com folhas maduras a cada 18-24 meses.</li></ul>'
    };
    
    if (culturas[cultura]) {
        infoCultura = '<div class="cultura-card">' + culturas[cultura] + '</div>';
    }
    
    // ========== PRAGAS ESPECÍFICAS POR CULTURA ==========
    const pragas = {
        'soja': 'Lagarta-da-soja, percevejo-marrom, mosca-branca',
        'milho': 'Lagarta-do-cartucho, pulgão, cigarrinha',
        'trigo': 'Pulgão, lagarta-do-trigo, percevejo',
        'feijao': 'Mosca-branca, ácaro-rajado, vaquinha',
        'mandioca': 'Mandarová, percevejo-de-renda, ácaros',
        'cana': 'Broca-da-cana, cigarrinha, cupim',
        'cafe': 'Broca-do-café, bicho-mineiro, ácaro-vermelho',
        'laranja': 'Cigarrinha-dos-citros (Greening), bicho-furão, cochonilhas',
        'limao': 'Cigarrinha-dos-citros (Greening), bicho-furão, cochonilhas',
        'uva': 'Pérola-da-terra, tripes, ácaros',
        'banana': 'Broca-da-bananeira (Moleque), trips, nematoides',
        'morango': 'Ácaro-rajado, broca-do-colo, pulgão',
        'pessego': 'Mosca-das-frutas, mariposa-oriental, ácaro-vermelho',
        'maca': 'Mosca-das-frutas, mariposa-oriental, ácaro-vermelho',
        'ameixa': 'Mosca-das-frutas, mariposa-oriental, ácaro-vermelho',
        'bergamota': 'Cigarrinha-dos-citros (Greening), ácaro-da-falsa-ferrugem',
        'abacaxi': 'Cochonilha-do-abacaxi, broca-do-fruto',
        'cebola': 'Tripes, mosca-da-cebola',
        'batata': 'Vaquinha (larva-alfinete), pulgões, tripes'
    };
    
    let infoPragas = '';
    if (pragas[cultura]) {
        infoPragas = '<div class="cultura-card"><h4>🐛 Pragas Principais</h4><p><strong>Pragas comuns:</strong> ' + pragas[cultura] + '</p>';
        
        // Orientações específicas para grupos de culturas
        if (['laranja', 'limao', 'bergamota'].includes(cultura)) {
            infoPragas += '<ul><li><strong>Cigarrinha-dos-citros:</strong> Transmite o Greening (HLB). Controle com vespinha Tamarixia radiata, armadilhas amarelas e erradicação de plantas doentes.</li><li><strong>Bicho-furão:</strong> Lagarta que entra no fruto. Controle: catar frutos caídos + liberação de Trichogramma.</li></ul>';
        } else if (cultura === 'uva') {
            infoPragas += '<ul><li><strong>Pérola-da-terra:</strong> Cochonilha que suga as raízes. Controle: mudas sadias e porta-enxertos resistentes.</li><li><strong>Tripes:</strong> Ataca flores e frutos jovens. Controle: monitoramento na brotação.</li></ul>';
        } else if (cultura === 'banana') {
            infoPragas += '<ul><li><strong>Broca-da-bananeira (Moleque):</strong> Larvas cavam túneis no rizoma. Controle: iscas sanduíche + fungo Beauveria bassiana.</li></ul>';
        } else if (cultura === 'morango') {
            infoPragas += '<ul><li><strong>Ácaro-rajado:</strong> Suga as folhas. Controle: ácaros predadores (fitoseídeos).</li><li><strong>Broca-do-colo:</strong> Lagarta que broca a base. Controle: mudas sadias + fungos benéficos.</li></ul>';
        } else if (['pessego', 'maca', 'ameixa'].includes(cultura)) {
            infoPragas += '<ul><li><strong>Mosca-das-frutas:</strong> Fura o fruto. Controle: armadilhas com atrativo, ensacamento dos frutos.</li><li><strong>Mariposa-oriental:</strong> Ataca ponteiros. Controle: feromônio de confundimento + controle biológico.</li></ul>';
        } else if (cultura === 'abacaxi') {
            infoPragas += '<ul><li><strong>Cochonilha:</strong> Suga a seiva. Controle: controlar formigas + tratar mudas antes do plantio.</li></ul>';
        } else if (cultura === 'cebola') {
            infoPragas += '<ul><li><strong>Tripes:</strong> Raspam as folhas. Controle: inseticidas seletivos, evitar danos às folhas.</li></ul>';
        } else if (cultura === 'batata') {
            infoPragas += '<ul><li><strong>Vaquinha (larva-alfinete):</strong> Fura as batatas. Controle: rotação de culturas + tratamento de sulco.</li><li><strong>Pulgões:</strong> Transmitem viroses. Controle: monitoramento frequente.</li></ul>';
        }
        infoPragas += '</div>';
    }
    
    // MIP geral
    let infoMIP = '<div class="cultura-card"><h4>📋 Manejo Integrado de Pragas (MIP)</h4>';
    infoMIP += '<ul><li><strong>📋 Monitoramento:</strong> Pano de Batida, Armadilhas coloridas/feromônio, Inspeção Visual.</li>';
    infoMIP += '<li><strong>📊 Nível de Dano Econômico:</strong> Só aplicar controle quando a população justificar o custo.</li>';
    infoMIP += '<li><strong>🛡️ Controle Cultural:</strong> Vazio sanitário, rotação de culturas, destruição de restos culturais.</li>';
    infoMIP += '<li><strong>🦋 Controle Biológico:</strong> Trichogramma, joaninhas, fungos (Beauveria, Metarhizium), Bacillus thuringiensis (Bt).</li>';
    infoMIP += '<li><strong>🧬 Controle Genético:</strong> Plantas Bt com área de refúgio (20% da área com plantas não-Bt).</li>';
    infoMIP += '<li><strong>🧪 Controle Químico (último caso):</strong> Produtos seletivos, rotação de princípios ativos.</li></ul>';
    infoMIP += '<p style="margin-top:10px;"><strong>⚠️ Tecnologia de Aplicação:</strong> Evitar ventos acima de 10km/h e temperaturas acima de 30°C. Regular bicos e pressão corretamente.</p></div>';
    
    // ========== MANEJO CONVENCIONAL ==========
    if (tipoManejo === 'convencional') {
        h += '<div class="cultura-card"><h4>🚜 Manejo Convencional</h4><p>O sistema convencional baseia-se na utilização intensiva de insumos externos para maximizar a produtividade. É o modelo mais difundido na agricultura brasileira de larga escala.</p><ul><li><strong>Preparo do Solo:</strong> Utiliza aração profunda com arado de discos ou aivecas, seguida de gradagens niveladoras. Esse revolvimento intenso oxigena o solo, mas pode causar compactação subsuperficial (pé-de-grade) e acelerar a decomposição da matéria orgânica.</li><li><strong>Adubação:</strong> Baseada em fertilizantes minerais solúveis (NPK), aplicados conforme análise de solo. As formulações mais comuns incluem ureia, superfosfato simples/triplo e cloreto de potássio. A adubação de cobertura com nitrogênio é parcelada conforme o estágio da cultura.</li><li><strong>Controle de Pragas:</strong> Uso de defensivos químicos (inseticidas, fungicidas, herbicidas) seguindo receituário agronômico. As aplicações são feitas com pulverizador tratorizado, respeitando o período de carência de cada produto.</li><li><strong>Manejo de Plantas Daninhas:</strong> Controle químico com herbicidas seletivos pré e pós-emergentes, complementado por capinas mecânicas quando necessário.</li><li><strong>Rotação de Culturas:</strong> Embora possível, não é obrigatória. Muitas propriedades adotam a sucessão soja-milho ou soja-trigo para aproveitar a janela climática.</li><li><strong>Irrigação:</strong> Sistemas de pivô central, aspersão ou gotejamento, dependendo da cultura e disponibilidade hídrica.</li></ul><p style="margin-top:10px;"><strong>⚠️ Atenção:</strong> O uso de defensivos exige EPIs completos (luvas, máscara, botas, macacão) e o descarte correto das embalagens vazias segue a Lei 9.974/2000: realizar a tríplice lavagem, furar o fundo e devolver ao posto de coleta indicado na nota fiscal.</p></div>';
    }
    
    // ========== MANEJO ORGÂNICO ==========
    else if (tipoManejo === 'organico') {
        h += '<div class="cultura-card"><h4>🌿 Manejo Orgânico</h4><p>A agricultura orgânica elimina totalmente o uso de agrotóxicos e fertilizantes sintéticos, priorizando processos biológicos e insumos naturais. É regulamentada pela Lei 10.831/2003 e exige certificação para comercialização como produto orgânico.</p><ul><li><strong>Preparo do Solo:</strong> Revolvimento mínimo, apenas quando estritamente necessário. Prioriza-se o uso de cultivos de cobertura e adubação verde para estruturar o solo naturalmente.</li><li><strong>Adubação:</strong> Exclusivamente com fontes orgânicas: esterco curtido de bovinos ou aves, composto orgânico, húmus de minhoca, torta de mamona, farinha de ossos, fosfatos naturais (rochagem) e biofertilizantes líquidos. A compostagem é essencial para estabilizar a matéria orgânica antes da aplicação.</li><li><strong>Controle de Pragas e Doenças:</strong> Utiliza-se caldas naturais (bordalesa, sulfocálcica, viçosa), extratos vegetais (neem, alho, pimenta), controle biológico com inimigos naturais (joaninhas, crisopídeos, baculovírus) e armadilhas com feromônios.</li><li><strong>Manejo de Plantas Daninhas:</strong> Controle mecânico (capina manual ou com cultivador), cobertura morta (palhada), solarização do solo e rotação de culturas.</li><li><strong>Rotação de Culturas:</strong> Obrigatória e estratégica. Alterna-se culturas de diferentes famílias botânicas para quebrar ciclos de pragas e doenças e melhorar a fertilidade do solo. Exemplo: folhosa → leguminosa → gramínea → raiz/tubérculo.</li><li><strong>Certificação:</strong> O produtor deve obter o selo de conformidade orgânica através de certificadoras credenciadas (SisOrg) ou por meio dos Sistemas Participativos de Garantia (SPG).</li></ul><p style="margin-top:10px;"><strong>🌱 Benefício ambiental:</strong> A agricultura orgânica preserva a biodiversidade do solo, protege os recursos hídricos da contaminação por agrotóxicos e contribui para a saúde do agricultor e do consumidor.</p></div>';
    }
    
    // ========== MANEJO AGROECOLÓGICO ==========
    else if (tipoManejo === 'agroecologico') {
        h += '<div class="cultura-card"><h4>🦋 Manejo Agroecológico</h4><p>A agroecologia vai além da simples substituição de insumos: é uma abordagem sistêmica que integra conhecimentos tradicionais e científicos para redesenhar o agroecossistema de forma sustentável, valorizando a agricultura familiar e a soberania alimentar.</p><ul><li><strong>Desenho do Sistema:</strong> A propriedade é planejada como um organismo integrado, combinando cultivos anuais, perenes, criação animal e áreas de preservação. Utiliza-se o conceito de policultivos em vez de monoculturas extensivas.</li><li><strong>Preparo do Solo:</strong> Plantio direto agroecológico ou preparo reduzido. O solo é considerado um organismo vivo, e seu manejo visa alimentar a microbiota com cobertura permanente e diversidade vegetal.</li><li><strong>Adubação:</strong> Integra práticas como adubação verde (crotalária, feijão-de-porco, mucuna), compostagem termofílica, vermicompostagem, biofertilizantes enriquecidos com microrganismos eficientes e pós de rocha remineralizadores.</li><li><strong>Controle de Pragas:</strong> Baseia-se no Manejo Integrado de Pragas (MIP) agroecológico: monitoramento constante, uso de plantas repelentes e atrativas (alelopatia), controle biológico conservativo (manutenção de corredores ecológicos para predadores naturais) e uso de caldas e extratos apenas como último recurso.</li><li><strong>Sistemas Agroflorestais (SAFs):</strong> Frequentemente incorpora o componente arbóreo aos cultivos, criando estratos que imitam a floresta natural, gerando microclimas favoráveis e ciclagem de nutrientes pela serapilheira.</li><li><strong>Manejo da Água:</strong> Técnicas de conservação de água no solo, como curvas de nível, terraços, bacias de infiltração e cobertura morta permanente para reduzir evaporação.</li><li><strong>Integração Animal:</strong> Galinhas, porcos ou bovinos são integrados ao sistema em pastejo rotacionado, contribuindo para o controle de pragas, adubação e limpeza de áreas.</li></ul><p style="margin-top:10px;"><strong>🌍 Diferencial:</strong> A agroecologia fortalece circuitos curtos de comercialização (feiras, cestas, mercados locais), reduzindo a pegada de carbono do transporte de alimentos e valorizando a cultura alimentar regional.</p></div>';
    }
    
    // ========== PLANTIO DIRETO ==========
    else if (tipoManejo === 'plantio_direto') {
        h += '<div class="cultura-card"><h4>🌱 Plantio Direto (Sistema de Plantio Direto - SPD)</h4><p>O Sistema de Plantio Direto é uma tecnologia conservacionista baseada em três pilares fundamentais: não revolvimento do solo, cobertura permanente com palhada e rotação de culturas. É amplamente adotado no Brasil, especialmente nas regiões Sul e Centro-Oeste.</p><ul><li><strong>Não Revolvimento do Solo:</strong> O solo não é arado nem gradeado. A semeadura é feita diretamente sobre a palhada da cultura anterior, utilizando semeadoras específicas com disco de corte. Isso preserva a estrutura física do solo, mantém os canais biológicos (galerias de minhocas e raízes) e reduz drasticamente a erosão.</li><li><strong>Cobertura Permanente (Palhada):</strong> O solo permanece coberto o ano todo por plantas vivas ou por restos culturais. A palhada protege contra o impacto direto da chuva (efeito splash), reduz a temperatura do solo em até 8°C, conserva a umidade e suprime plantas daninhas por barreira física e alelopatia.</li><li><strong>Rotação de Culturas:</strong> Essencial para o sucesso do SPD. Alterna-se culturas com diferentes sistemas radiculares e exigências nutricionais. Modelos comuns: soja → milho safrinha → braquiária → soja; ou trigo → soja → milho → aveia preta. A diversidade de raízes explora diferentes camadas do solo e a braquiária produz até 12 toneladas de matéria seca por hectare.</li><li><strong>Adubação:</strong> Realizada no sulco de semeadura ou a lanço sobre a palhada. A adubação nitrogenada em cobertura é feita sobre a palhada, e a decomposição gradual libera nutrientes de forma sincronizada com a demanda da cultura.</li><li><strong>Controle de Plantas Daninhas:</strong> Baseado em herbicidas dessecantes (glyphosate) aplicados antes da semeadura, combinado com o efeito supressor da palhada. Em sistemas mais avançados, utiliza-se o manejo integrado com rotação de herbicidas de diferentes mecanismos de ação para evitar resistência.</li><li><strong>Plantas de Cobertura:</strong> Uso estratégico de braquiária (Urochloa ruziziensis), milheto, crotalária, nabo forrageiro, aveia preta e ervilhaca. Essas plantas produzem biomassa, reciclam nutrientes das camadas profundas (fósforo e potássio) e algumas fixam nitrogênio atmosférico (leguminosas).</li><li><strong>Benefícios Comprovados:</strong> Redução de até 90% nas perdas de solo por erosão, aumento dos teores de matéria orgânica ao longo dos anos, menor consumo de combustível (elimina operações de preparo), melhor infiltração de água e sequestro de carbono no solo.</li></ul><p style="margin-top:10px;"><strong>🔬 Dado técnico:</strong> Após 5 a 7 anos de SPD bem manejado, o teor de matéria orgânica do solo pode aumentar entre 0,5% e 1,5%, o que representa um acréscimo de aproximadamente 15 a 45 toneladas de carbono estabilizado por hectare.</p></div>';
    }
    
    // Monta o resultado final
    h += infoCultura;
    h += infoPragas;
    h += infoMIP;
    
    return h;
}

// ========== PECUÁRIA LEITEIRA ==========
document.getElementById('formLeite').addEventListener('submit', function(e) {
    e.preventDefault();
    dadosRebanho.numAnimais = parseInt(document.getElementById('numAnimais').value);
    dadosRebanho.estrutura = document.getElementById('estrutura').value;
    dadosRebanho.sistemaCriacao = document.getElementById('sistemaCriacao').value;
    dadosRebanho.estado = document.getElementById('estado').value;
    document.getElementById('infoRebanho').innerHTML = '<p>🐮 Total: <strong>' + dadosRebanho.numAnimais + '</strong></p><p>🏗️: <strong>' + dadosRebanho.estrutura + '</strong></p><p>🏠: <strong>' + dadosRebanho.sistemaCriacao + '</strong></p><p>💉 Vacinas: <strong>' + dadosRebanho.vacinas.length + '</strong></p><p>📅 Cios: <strong>' + dadosRebanho.cios.length + '</strong></p>';
    
    let textoManejo = '';
    let textoAlimentacao = '';
    if (dadosRebanho.sistemaCriacao === 'confinamento') {
        textoManejo = '<h4>🌟 Manejo</h4><ul><li><strong>Rotina Rigorosa:</strong> Vacas leiteiras amam rotina. A ordenha (geralmente 2 a 3 vezes ao dia) e o trato devem acontecer rigorosamente nos mesmos horários.</li><li><strong>Manutenção da Cama:</strong> No barracão, as camas de areia ou borracha devem ser limpas e niveladas diariamente. No confinamento, a cama de serragem precisa ser revirada com trator (enxada rotativa) 2 vezes ao dia para se manter seca. Cama úmida causa <strong>mastite</strong> (infecção no úbere).</li><li><strong>Controle Térmico:</strong> Vacas sofrem muito com o calor (estresse térmico), o que faz o leite despencar. Ventiladores e aspersores (borrifadores de água) na pista de trato e na sala de espera da ordenha são obrigatórios.</li></ul>';
        textoAlimentacao = '<h4>🌾 Alimentação</h4><p>A alimentação é fornecida no cocho como <strong>RMT (Ração Total Misturada)</strong>, onde o volumoso e o concentrado são batidos juntos para a vaca não escolher só o mais gostoso.</p><ul><li><strong>Volumoso (Fibra de alta qualidade):</strong> Silagem de milho de excelente qualidade, silagem de sorgo ou feno de alfafa. Representa cerca de 50% a 60% da dieta.</li><li><strong>Concentrado (Energia e Proteína):</strong> Milho moído (fubá), farelo de soja, farelo de algodão ou polpa cítrica.</li><li><strong>Suplementação Vital:</strong> Sal mineral específico para vacas lactantes, bicarbonato de sódio (para evitar a acidez no rúmen/acidose) e altos níveis de cálcio e fósforo.</li><li><strong>Água:</strong> Consumo gigante. Uma vaca confinada de alta produção pode beber mais de <strong>100 a 140 litros de água limpa por dia</strong>.</li></ul>';
    } else if (dadosRebanho.sistemaCriacao === 'semi') {
        textoManejo = '<h4>🌟 Manejo</h4><ul><li><strong>Divisão do Dia:</strong> As vacas geralmente passam a noite ou as horas mais frescas do dia no pasto. Nos horários mais quentes, ou logo após a ordenha, vão para o galpão/cocho coberto receber o trato concentrado e descansar na sombra.</li><li><strong>Manejo de Cocho:</strong> O espaço de cocho deve ser suficiente para que todas as vacas comam ao mesmo tempo, evitando que as vacas mais mansas fiquem sem comer.</li><li><strong>Sanidade:</strong> Monitoramento constante de carrapatos e bernes, que são mais comuns por causa do acesso ao pasto.</li></ul>';
        textoAlimentacao = '<h4>🌾 Alimentação</h4><p>O pasto serve como a base de fibra barata, mas o cocho garante a alta produção de leite.</p><ul><li><strong>No Pasto:</strong> Pastagens bem manejadas (como Mombaça, Tifton ou Pioneiro).</li><li><strong>No Cocho:</strong> Fornece-se uma ração concentrada comercial ou batida na fazenda (milho + soja + minerais).</li><li><strong>Regra de ouro:</strong> Geralmente oferece-se <strong>1 kg de ração para cada 2,5 kg ou 3 kg de leite produzidos</strong> acima de uma média base que o pasto sozinho sustentaria.</li><li><strong>Na Seca:</strong> Se o pasto secar, é preciso fornecer um volumoso complementar no cocho (silagem ou cana-de-açúcar corrigida com ureia).</li></ul>';
    } else if (dadosRebanho.sistemaCriacao === 'pasto') {
        textoManejo = '<h4>🌟 Manejo</h4><ul><li><strong>Pastejo Rotacionado (Obrigatório):</strong> A propriedade deve ser dividida em piquetes (pequenos pastos cercados). As vacas entram em um piquete com o capim na altura certa, comem por 1 ou 2 dias, e mudam para o próximo. O pasto saído precisa de tempo (20 a 30 dias) para crescer de novo.</li><li><strong>Sombra Natural ou Artificial:</strong> O pasto deve ter árvores ou sombrites. Vaca com calor no sol não come e não produz leite.</li><li><strong>Caminhada Curta:</strong> Os piquetes não podem ser muito longe da sala de ordenha, senão a vaca gasta toda a energia andando e cansa os cascos.</li></ul>';
        textoAlimentacao = '<h4>🌾 Alimentação</h4><ul><li><strong>Nas Águas (Chuva):</strong> O capim verde e novo é rico em proteína e energia. A suplementação é feita com <strong>sal mineral específico para leite</strong> no cocho do pasto e uma pequena quantidade de ração na hora da ordenha (geralmente 1 a 2 kg por dia) apenas para "chamar" a vaca e manter a persistência de leite.</li><li><strong>Na Seca (Inverno/Estiagem):</strong> O capim vira "bucha" (perde proteína e fica duro). Aqui o manejo muda: é preciso fornecer <strong>Sal Proteico/Energético</strong> para ajudar a vaca a digerir o capim seco, ou fornecer cana-de-açúcar + ureia/silagem em cochos espalhados pelo pasto.</li></ul>';
    }
    let textoResumo = '';
    if (dadosRebanho.sistemaCriacao) {
        textoResumo = '<h4>📊 Resumo das Diferenças de Consumo de Água e Comida</h4><ol><li><strong>Confinada:</strong> Come mais comida concentrada e cara, bebe água em bebedouros de alta vazão do lado da cama.</li><li><strong>Semi-confinada:</strong> Equilibra o capim com a ração do cocho. Precisa de água limpa tanto no galpão quanto nos piquetes.</li><li><strong>A Pasto:</strong> Depende 100% da qualidade do capim e do manejo do produtor em adubar a terra. Bebedouros devem ser centrais no meio dos piquetes.</li></ol>';
    }
    document.getElementById('alimentacaoLeite').innerHTML = textoAlimentacao;
    document.getElementById('higieneEquipamentos').innerHTML = textoManejo + textoResumo;
    document.getElementById('resultadoLeite').style.display = 'block';
});

// ========== VACINAS LEITE ==========
function abrirPlanilhaVacinas() {
    ftL();
    document.getElementById('secaoVacinas').style.display = 'block';
    document.getElementById('calendarioOrientacao').innerHTML = '<h4>📅 Calendário</h4><table class="tabela-vacinas"><thead><tr><th>Mês</th><th>Vacina</th></tr></thead><tbody><tr><td>Jan</td><td>Clostridioses</td></tr><tr><td>Mar</td><td>Reprodutivas</td></tr><tr><td>Mai</td><td>Febre Aftosa</td></tr></tbody></table>';
    atv();
}
function fecharPlanilhaVacinas() { document.getElementById('secaoVacinas').style.display = 'none'; }
function adicionarVacina() {
    const b = document.getElementById('brincoAnimal').value.trim();
    const t = document.getElementById('tipoVacina').value;
    const d = document.getElementById('dataVacina').value;
    const o = document.getElementById('obsVacina').value.trim();
    if (!b || !t || !d) { alert('Preencha todos os campos!'); return; }
    dadosRebanho.vacinas.push({ id: Date.now(), brinco: b, tipo: t, data: d, observacao: o || 'Nenhuma' });
    svL();
    document.getElementById('brincoAnimal').value = '';
    document.getElementById('tipoVacina').value = '';
    document.getElementById('dataVacina').value = '';
    document.getElementById('obsVacina').value = '';
    atv();
    document.getElementById('infoRebanho').innerHTML = '<p>🐮 Total: <strong>' + dadosRebanho.numAnimais + '</strong></p><p>💉 Vacinas: <strong>' + dadosRebanho.vacinas.length + '</strong></p>';
}
function atv(f) {
    let l = dadosRebanho.vacinas;
    if (f) l = l.filter(v => v.brinco.toLowerCase().includes(f.toLowerCase()));
    l.sort((a, b) => new Date(b.data) - new Date(a.data));
    const c = document.getElementById('corpoTabelaVacinas');
    if (l.length === 0) { c.innerHTML = '<tr><td colspan="5">Nenhuma</td></tr>'; return; }
    c.innerHTML = l.map(v => '<tr><td>🔢 ' + v.brinco + '</td><td>💉 ' + v.tipo + '</td><td>📅 ' + fd(v.data) + '</td><td>📝 ' + v.observacao + '</td><td><button onclick="ev(' + v.id + ')" class="btn-excluir">🗑️</button></td></tr>').join('');
}
function ev(id) { if (confirm('Excluir?')) { dadosRebanho.vacinas = dadosRebanho.vacinas.filter(v => v.id !== id); svL(); atv(); } }
function filtrarVacinas() { atv(document.getElementById('buscaBrinco').value); }

// ========== CIO LEITE ==========
function abrirPlanilhaCio() { ftL(); document.getElementById('secaoCio').style.display = 'block'; atc(); }
function fecharPlanilhaCio() { document.getElementById('secaoCio').style.display = 'none'; }
function adicionarCio() {
    const b = document.getElementById('brincoCio').value.trim();
    const d = document.getElementById('dataCio').value;
    const h = document.getElementById('horaCio').value;
    const o = document.getElementById('obsCio').value.trim();
    const tp = document.getElementById('tipoCobertura').value;
    if (!b || !d) { alert('Preencha!'); return; }
    dadosRebanho.cios.push({ id: Date.now(), brinco: b, data: d, hora: h || 'Não informada', observacao: o || 'Nenhuma', tipoCobertura: tp });
    scL();
    document.getElementById('brincoCio').value = '';
    document.getElementById('dataCio').value = '';
    document.getElementById('horaCio').value = '';
    document.getElementById('obsCio').value = '';
    atc();
}
function atc(f) {
    let l = dadosRebanho.cios;
    if (f) l = l.filter(c => c.brinco.toLowerCase().includes(f.toLowerCase()));
    l.sort((a, b) => new Date(b.data) - new Date(a.data));
    const c = document.getElementById('corpoTabelaCios');
    if (l.length === 0) { c.innerHTML = '<tr><td colspan="6">Nenhum</td></tr>'; return; }
    c.innerHTML = l.map(cio => '<tr><td>🔢 ' + cio.brinco + '</td><td>📅 ' + fd(cio.data) + '</td><td>🕐 ' + cio.hora + '</td><td>' + (cio.tipoCobertura === 'monta' ? '🐂 Monta' : '🧬 IA') + '</td><td>📝 ' + cio.observacao + '</td><td><button onclick="vp(' + cio.id + ')" class="btn-ver-periodos">📊</button> <button onclick="ec(' + cio.id + ')" class="btn-excluir">🗑️</button></td></tr>').join('');
}
function ec(id) { if (confirm('Excluir?')) { dadosRebanho.cios = dadosRebanho.cios.filter(c => c.id !== id); scL(); atc(); } }
function filtrarCios() { atc(document.getElementById('buscaBrincoCio').value); }
function vp(idCio) {
    const cio = dadosRebanho.cios.find(c => c.id === idCio);
    if (!cio) return;
    let dc = new Date(cio.data + 'T00:00:00');
    if (isNaN(dc.getTime())) { alert('Data inválida!'); return; }
    const parto = new Date(dc.getTime()); parto.setDate(parto.getDate() + 270);
    const f = d => { const a = String(d.getDate()).padStart(2, '0'), b = String(d.getMonth() + 1).padStart(2, '0'); return a + '/' + b + '/' + d.getFullYear(); };
    document.getElementById('periodosReprodutivos').innerHTML = '<h4>📊 Períodos</h4><div class="animal-selecionado">🐄 Brinco <strong>' + cio.brinco + '</strong></div><div class="topicos-reprodutivos"><div class="topico topico-parto"><span class="icone-topico">🔴</span><div class="conteudo-topico"><strong>Parto Previsto:</strong> ' + f(parto) + '<br><small>~270 dias</small></div></div></div>';
}

// ========== HIGIENE TETOS ==========
function abrirHigieneTetos() { ftL(); document.getElementById('secaoHigieneTetos').style.display = 'block'; document.getElementById('conteudoHigieneTetos').innerHTML = '<div class="passo-teto"><h4>🧪 Passo 1: Caneca</h4><p>Retire 3 jatos.</p></div><div class="passo-teto"><h4>🧴 Passo 2: Pré-dipping</h4><p>30-45 segundos.</p></div><div class="passo-teto"><h4>🧻 Passo 3: Secagem</h4><p>Uma folha por vaca.</p></div><div class="passo-teto"><h4>🛡️ Passo 4: Pós-dipping</h4><p>Não secar!</p></div>'; }
function fecharHigieneTetos() { document.getElementById('secaoHigieneTetos').style.display = 'none'; }

// ========== SUÍNOS ==========
document.getElementById('formSuinos').addEventListener('submit', function(e) {
    e.preventDefault();
    dadosSuinos.numAnimais = parseInt(document.getElementById('numSuinos').value);
    dadosSuinos.tipoCriacao = document.getElementById('tipoCriacao').value;
    document.getElementById('infoSuinos').innerHTML = '<p>🐷 Total: <strong>' + dadosSuinos.numAnimais + '</strong></p><p>🏠: <strong>' + (dadosSuinos.tipoCriacao === 'chiqueirao' ? 'Chiqueirão' : 'Chiqueiro') + '</strong></p>';
    let textoGuiaSuinos = '';
    if (dadosSuinos.tipoCriacao === 'chiqueiro') {
        textoGuiaSuinos = '<h3>📖 Guia - Pequena Produção (Chiqueiro)</h3><div class="maquina-card"><h4>🌟 Manejo</h4><p>Instalações simples (chiqueiros ou baias de alvenaria com piso de cimento). É fundamental que tenham uma área coberta para proteção contra sol e chuva, e uma área descoberta (solário) onde os animais possam defecar e urinar. A limpeza deve ser diária, lavando o piso com água para evitar acúmulo de dejetos, mau cheiro e proliferação de moscas. Os leitões recém-nascidos precisam receber ferro injetável nos primeiros dias de vida para evitar anemia.</p></div><div class="maquina-card"><h4>🌾 Alimentação</h4><p>Utilizam-se subprodutos da propriedade, como mandioca, abóbora, soro de leite, cana-de-açúcar e milho moído. Restos de comida caseira (lavagem) podem ser fornecidos, desde que sejam totalmente cozidos antes para eliminar microrganismos causadores de doenças. Essa alimentação caseira deve ser complementada com um núcleo mineral e vitamínico misturado ao milho.</p></div>';
    } else if (dadosSuinos.tipoCriacao === 'chiqueirao') {
        textoGuiaSuinos = '<h3>📖 Guia - Grande Produção (Chiqueirão)</h3><div class="maquina-card"><h4>🌟 Manejo</h4><p>Altamente tecnificado e dividido em quatro setores físicos isolados: <strong>Maternidade, Creche, Crescimento e Terminação</strong>. As instalações possuem piso ripado (com frestas) para que fezes e urina caiam diretamente em canaletas subterrâneas, mantendo os porcos secos. O ambiente é climatizado com cortinas automáticas ou exaustores para manter a temperatura ideal. Controle sanitário rígido com biossegurança (banho e troca de roupas para entrada na granja).</p></div><div class="maquina-card"><h4>🌾 Alimentação</h4><p>Totalmente baseada em rações balanceadas e automatizadas, fornecidas em comedouros automáticos tipo "torta" ou de fluxo constante. As rações são fareladas ou peletizadas, compostas por milho moído e farelo de soja, enriquecidas com aminoácidos sintéticos (lisina e metionina), vitaminas e minerais. Cada fase recebe ração específica: maternidade, pré-inicial, crescimento e terminação.</p></div>';
    }
    document.getElementById('guiaManejoSuinos').innerHTML = textoGuiaSuinos;
    document.getElementById('resultadoSuinos').style.display = 'block';
});

function abrirVacinasSuinos() { ftS(); document.getElementById('secaoVacinasSuinos').style.display = 'block'; atvs(); }
function fecharVacinasSuinos() { document.getElementById('secaoVacinasSuinos').style.display = 'none'; }
function adicionarVacinaSuino() {
    let b = document.getElementById('brincoSuino').value.trim();
    const t = document.getElementById('tipoVacinaSuino').value;
    const d = document.getElementById('dataVacinaSuino').value;
    const o = document.getElementById('obsVacinaSuino').value.trim();
    if (!b || !t || !d) { alert('Preencha!'); return; }
    dadosSuinos.vacinas.push({ id: Date.now(), brinco: b, tipo: t, data: d, observacao: o || 'Nenhuma' });
    svS();
    document.getElementById('brincoSuino').value = '';
    document.getElementById('tipoVacinaSuino').value = '';
    document.getElementById('dataVacinaSuino').value = '';
    document.getElementById('obsVacinaSuino').value = '';
    atvs();
}
function atvs(f) {
    let l = dadosSuinos.vacinas;
    if (f) l = l.filter(v => v.brinco.toLowerCase().includes(f.toLowerCase()));
    l.sort((a, b) => new Date(b.data) - new Date(a.data));
    const c = document.getElementById('corpoTabelaVacinasSuinos');
    if (l.length === 0) { c.innerHTML = '<tr><td colspan="5">Nenhuma</td></tr>'; return; }
    c.innerHTML = l.map(v => '<tr><td>🔢 ' + v.brinco + '</td><td>💉 ' + v.tipo + '</td><td>📅 ' + fd(v.data) + '</td><td>📝 ' + v.observacao + '</td><td><button onclick="evs(' + v.id + ')" class="btn-excluir">🗑️</button></td></tr>').join('');
}
function evs(id) { if (confirm('Excluir?')) { dadosSuinos.vacinas = dadosSuinos.vacinas.filter(v => v.id !== id); svS(); atvs(); } }
function filtrarVacinasSuinos() { atvs(document.getElementById('buscaBrincoSuino').value); }

function abrirReproducaoSuinos() { ftS(); document.getElementById('secaoReproducaoSuinos').style.display = 'block'; atcs(); }
function fecharReproducaoSuinos() { document.getElementById('secaoReproducaoSuinos').style.display = 'none'; }
function adicionarCioSuino() {
    const b = document.getElementById('brincoSuinoCio').value.trim();
    const d = document.getElementById('dataCioSuino').value;
    const h = document.getElementById('horaCioSuino').value;
    const tp = document.getElementById('tipoCoberturaSuino').value;
    if (!b || !d) { alert('Preencha!'); return; }
    dadosSuinos.cios.push({ id: Date.now(), brinco: b, data: d, hora: h || 'Não informada', tipoCobertura: tp });
    scS();
    document.getElementById('brincoSuinoCio').value = '';
    document.getElementById('dataCioSuino').value = '';
    document.getElementById('horaCioSuino').value = '';
    atcs();
}
function atcs(f) {
    let l = dadosSuinos.cios;
    if (f) l = l.filter(c => c.brinco.toLowerCase().includes(f.toLowerCase()));
    l.sort((a, b) => new Date(b.data) - new Date(a.data));
    const c = document.getElementById('corpoTabelaCiosSuinos');
    if (l.length === 0) { c.innerHTML = '<tr><td colspan="5">Nenhum</td></tr>'; return; }
    c.innerHTML = l.map(cio => '<tr><td>🔢 ' + cio.brinco + '</td><td>📅 ' + fd(cio.data) + '</td><td>🕐 ' + cio.hora + '</td><td>' + (cio.tipoCobertura === 'monta' ? '🐷 Monta' : '🧬 IA') + '</td><td><button onclick="vps(' + cio.id + ')" class="btn-ver-periodos">📊</button> <button onclick="ecs(' + cio.id + ')" class="btn-excluir">🗑️</button></td></tr>').join('');
}
function ecs(id) { if (confirm('Excluir?')) { dadosSuinos.cios = dadosSuinos.cios.filter(c => c.id !== id); scS(); atcs(); } }
function filtrarCiosSuinos() { atcs(document.getElementById('buscaBrincoCioSuino').value); }
function vps(idCio) {
    const cio = dadosSuinos.cios.find(c => c.id === idCio);
    if (!cio) return;
    let dc = new Date(cio.data + 'T00:00:00');
    if (isNaN(dc.getTime())) { alert('Data inválida!'); return; }
    const parto = new Date(dc.getTime()); parto.setDate(parto.getDate() + 114);
    const f = d => { const a = String(d.getDate()).padStart(2, '0'), b = String(d.getMonth() + 1).padStart(2, '0'); return a + '/' + b + '/' + d.getFullYear(); };
    document.getElementById('periodosSuinos').innerHTML = '<h4>📊 Períodos</h4><div class="animal-selecionado">🐷 Brinco <strong>' + cio.brinco + '</strong></div><div class="topicos-reprodutivos"><div class="topico topico-parto"><span class="icone-topico">🔴</span><div class="conteudo-topico"><strong>Parto:</strong> ' + f(parto) + '<br><small>~114d</small></div></div></div>';
}

// ========== OVELHAS ==========
document.getElementById('formOvelhas').addEventListener('submit', function(e) {
    e.preventDefault();
    dadosOvelhas.numAnimais = parseInt(document.getElementById('numOvelhas').value);
    dadosOvelhas.tipoCriacao = document.getElementById('tipoCriacaoOvelhas').value;
    document.getElementById('infoOvelhas').innerHTML = '<p>🐑 Total: <strong>' + dadosOvelhas.numAnimais + '</strong></p><p>💉 Vacinas: <strong>' + dadosOvelhas.vacinas.length + '</strong></p>';
    let textoGuiaOvelhas = '';
    if (dadosOvelhas.tipoCriacao === 'pequeno') {
        textoGuiaOvelhas = '<h3>📖 Guia - Ovinos (Pequeno Rebanho)</h3><div class="maquina-card"><h4>🌟 Manejo</h4><p>Abrigos limpos, arejados e, acima de tudo, secos. Esses animais não toleram umidade no chão, que causa o apodrecimento dos cascos (pododermatite). Realizar casqueamento periodicamente. O maior desafio sanitário são as verminoses; utilizar o método Famacha (monitoramento dos olhos) para aplicar vermífugos apenas nos animais com sinais de anemia, evitando resistência.</p></div><div class="maquina-card"><h4>🌾 Alimentação</h4><p>Pastejo livre durante o dia com recolhimento ao abrigo ao final da tarde. Ovelhas preferem gramíneas rentes ao solo. No cocho do abrigo, fornecer sal mineral específico para ovinos. <strong>Atenção:</strong> Ovelhas possuem alta sensibilidade ao cobre, que se acumula no fígado e pode ser fatal — jamais devem consumir sal mineral formulado para bovinos.</p></div>';
    } else if (dadosOvelhas.tipoCriacao === 'grande') {
        textoGuiaOvelhas = '<h3>📖 Guia - Ovinos (Grande Rebanho)</h3><div class="maquina-card"><h4>🌟 Manejo</h4><p>Pastejo rotacionado intensivo com piquetes divididos por cercas de tela ou elétrica multifios. Alojamento principal em aprisco suspenso (cerca de 1 metro do chão com ripas espaçadas), permitindo que fezes caiam e urina escoe. Estação de monta controlada para concentrar nascimentos nas épocas de maior oferta de alimento.</p></div><div class="maquina-card"><h4>🌾 Alimentação</h4><p>Volumoso dos piquetes adubados combinado com suplementação no cocho. Animais em terminação ou matrizes no terço final de gestação/lactação recebem silagem de milho/sorgo ou feno (Coast-Cross ou Alfafa) + concentrado proteico (milho e soja). Utiliza-se <strong>creep-feeding</strong>: cercados com frestas onde apenas cordeiros entram para comer ração especial de crescimento.</p></div>';
    }
    document.getElementById('guiaManejoOvelhas').innerHTML = textoGuiaOvelhas;
    document.getElementById('resultadoOvelhas').style.display = 'block';
});

function abrirVacinasOvelhas() {
    document.getElementById('secaoVacinasOvelhas').style.display = 'block';
    document.getElementById('calendarioOvelhas').innerHTML = '<h4>📅 Calendário</h4><table class="tabela-vacinas"><thead><tr><th>Idade</th><th>Vacina</th></tr></thead><tbody><tr><td>2 meses</td><td>Anticlostridiose</td></tr><tr><td>3 meses</td><td>Reforço</td></tr></tbody></table>';
    atualizarTabelaVacinasOvelhas();
}
function fecharVacinasOvelhas() { document.getElementById('secaoVacinasOvelhas').style.display = 'none'; }
function adicionarVacinaOvelha() {
    let b = document.getElementById('brincoOvelha').value.trim();
    const t = document.getElementById('tipoVacinaOvelha').value;
    const d = document.getElementById('dataVacinaOvelha').value;
    const o = document.getElementById('obsVacinaOvelha').value.trim();
    if (!b || !t || !d) { alert('Preencha!'); return; }
    dadosOvelhas.vacinas.push({ id: Date.now(), brinco: b, tipo: t, data: d, observacao: o || 'Nenhuma' });
    svO();
    document.getElementById('brincoOvelha').value = '';
    document.getElementById('tipoVacinaOvelha').value = '';
    document.getElementById('dataVacinaOvelha').value = '';
    document.getElementById('obsVacinaOvelha').value = '';
    atualizarTabelaVacinasOvelhas();
}
function atualizarTabelaVacinasOvelhas(f) {
    let l = dadosOvelhas.vacinas;
    if (f) l = l.filter(v => v.brinco.toLowerCase().includes(f.toLowerCase()));
    l.sort((a, b) => new Date(b.data) - new Date(a.data));
    const c = document.getElementById('corpoTabelaVacinasOvelhas');
    if (l.length === 0) { c.innerHTML = '<tr><td colspan="5">Nenhuma</td></tr>'; return; }
    c.innerHTML = l.map(v => '<tr><td>🔢 ' + v.brinco + '</td><td>💉 ' + v.tipo + '</td><td>📅 ' + fd(v.data) + '</td><td>📝 ' + v.observacao + '</td><td><button onclick="evo(' + v.id + ')" class="btn-excluir">🗑️</button></td></tr>').join('');
}
function evo(id) { if (confirm('Excluir?')) { dadosOvelhas.vacinas = dadosOvelhas.vacinas.filter(v => v.id !== id); svO(); atualizarTabelaVacinasOvelhas(); } }
function filtrarVacinasOvelhas() { atualizarTabelaVacinasOvelhas(document.getElementById('buscaBrincoOvelha').value); }

// ========== CABRAS ==========
document.getElementById('formCabras').addEventListener('submit', function(e) {
    e.preventDefault();
    dadosCabras.numAnimais = parseInt(document.getElementById('numCabras').value);
    dadosCabras.tipoCriacao = document.getElementById('tipoCriacaoCabras').value;
    document.getElementById('infoCabras').innerHTML = '<p>🐐 Total: <strong>' + dadosCabras.numAnimais + '</strong></p><p>💉 Vacinas: <strong>' + dadosCabras.vacinas.length + '</strong></p>';
    let textoGuiaCabras = '';
    if (dadosCabras.tipoCriacao === 'pequeno') {
        textoGuiaCabras = '<h3>📖 Guia - Caprinos (Pequeno Rebanho)</h3><div class="maquina-card"><h4>🌟 Manejo</h4><p>Abrigos limpos, arejados e secos (não toleram umidade). Casqueamento periódico. Controle de verminoses com método Famacha para evitar resistência aos vermífugos.</p></div><div class="maquina-card"><h4>🌾 Alimentação</h4><p>Pastejo livre com recolhimento ao abrigo. Cabras preferem arbustos, folhas largas e ramos altos (hábito de ramoneio). No cocho, fornecer sal mineral específico para caprinos.</p></div>';
    } else if (dadosCabras.tipoCriacao === 'grande') {
        textoGuiaCabras = '<h3>📖 Guia - Caprinos (Grande Rebanho)</h3><div class="maquina-card"><h4>🌟 Manejo</h4><p>Pastejo rotacionado intensivo com piquetes e cercas elétricas. Aprisco suspenso para manter ambiente seco. Estação de monta controlada.</p></div><div class="maquina-card"><h4>🌾 Alimentação</h4><p>Volumoso dos piquetes + suplementação no cocho com silagem de milho/sorgo ou feno + concentrado proteico (milho e soja). <strong>Creep-feeding</strong> para cabritos com ração especial de crescimento.</p></div>';
    }
    document.getElementById('guiaManejoCabras').innerHTML = textoGuiaCabras;
    document.getElementById('resultadoCabras').style.display = 'block';
});

function abrirVacinasCabras() {
    document.getElementById('secaoVacinasCabras').style.display = 'block';
    document.getElementById('calendarioCabras').innerHTML = '<h4>📅 Calendário</h4><table class="tabela-vacinas"><thead><tr><th>Idade</th><th>Vacina</th></tr></thead><tbody><tr><td>2 meses</td><td>Anticlostridiose</td></tr><tr><td>+30d</td><td>Reforço</td></tr></tbody></table>';
    atualizarTabelaVacinasCabras();
}
function fecharVacinasCabras() { document.getElementById('secaoVacinasCabras').style.display = 'none'; }
function adicionarVacinaCabra() {
    let b = document.getElementById('brincoCabra').value.trim();
    const t = document.getElementById('tipoVacinaCabra').value;
    const d = document.getElementById('dataVacinaCabra').value;
    const o = document.getElementById('obsVacinaCabra').value.trim();
    if (!b || !t || !d) { alert('Preencha!'); return; }
    dadosCabras.vacinas.push({ id: Date.now(), brinco: b, tipo: t, data: d, observacao: o || 'Nenhuma' });
    svC();
    document.getElementById('brincoCabra').value = '';
    document.getElementById('tipoVacinaCabra').value = '';
    document.getElementById('dataVacinaCabra').value = '';
    document.getElementById('obsVacinaCabra').value = '';
    atualizarTabelaVacinasCabras();
}
function atualizarTabelaVacinasCabras(f) {
    let l = dadosCabras.vacinas;
    if (f) l = l.filter(v => v.brinco.toLowerCase().includes(f.toLowerCase()));
    l.sort((a, b) => new Date(b.data) - new Date(a.data));
    const c = document.getElementById('corpoTabelaVacinasCabras');
    if (l.length === 0) { c.innerHTML = '<tr><td colspan="5">Nenhuma</td></tr>'; return; }
    c.innerHTML = l.map(v => '<tr><td>🔢 ' + v.brinco + '</td><td>💉 ' + v.tipo + '</td><td>📅 ' + fd(v.data) + '</td><td>📝 ' + v.observacao + '</td><td><button onclick="evc(' + v.id + ')" class="btn-excluir">🗑️</button></td></tr>').join('');
}
function evc(id) { if (confirm('Excluir?')) { dadosCabras.vacinas = dadosCabras.vacinas.filter(v => v.id !== id); svC(); atualizarTabelaVacinasCabras(); } }
function filtrarVacinasCabras() { atualizarTabelaVacinasCabras(document.getElementById('buscaBrincoCabra').value); }

// ========== CAVALOS ==========
document.getElementById('formCavalos').addEventListener('submit', function(e) {
    e.preventDefault();
    dadosCavalos.numAnimais = parseInt(document.getElementById('numCavalos').value);
    dadosCavalos.tipoCriacao = document.getElementById('tipoCriacaoCavalos').value;
    document.getElementById('infoCavalos').innerHTML = '<p>🐴 Total: <strong>' + dadosCavalos.numAnimais + '</strong></p><p>💉 Vacinas: <strong>' + dadosCavalos.vacinas.length + '</strong></p>';
    let textoGuiaCavalos = '';
    if (dadosCavalos.tipoCriacao === 'pequeno') {
        textoGuiaCavalos = '<h3>📖 Guia - Equinos (Pequena Criação)</h3><div class="maquina-card"><h4>🌟 Manejo</h4><p>Animais soltos no pasto na maior parte do tempo, com abrigo ou baia simples para proteção de tempestades e sol excessivo. Inspeção diária dos cascos para remover pedras e sujeira, e escovação do pelo para identificar ferimentos ou carrapatos.</p></div><div class="maquina-card"><h4>🌾 Alimentação</h4><p>Base no capim verde do pasto. Cavalos de trabalho leve recebem ração comercial (1 kg a 2 kg/dia) dividida em duas porções. Sal mineral próprio para equinos em cochos cobertos. Água corrente e limpa (cavalos rejeitam água suja ou parada).</p></div>';
    } else if (dadosCavalos.tipoCriacao === 'grande') {
        textoGuiaCavalos = '<h3>📖 Guia - Equinos (Haras/Grande)</h3><div class="maquina-card"><h4>🌟 Manejo</h4><p>Baias individuais amplas (3mx3m ou 4mx4m), ventiladas, com camas grossas de maravalha ou serragem limpas e trocadas diariamente. Rotina fixa de exercícios, treinamentos, banhos e escovação. Casqueamento e ferrageamento a cada 40-50 dias. Controle de parasitas com exames de fezes antes da vermifugação.</p></div><div class="maquina-card"><h4>🌾 Alimentação</h4><p>Rigorosamente controlada para evitar cólica e laminite. Base: feno de alta qualidade (Alfafa ou Tifton) fornecido várias vezes ao dia. Ração concentrada balanceada (energia, proteína e óleos) fracionada em 3-4 refeições diárias de no máximo 2 kg cada. Suplementos para articulações, pelagem e musculatura conforme categoria (potros, garanhões, éguas prenhas ou atletas).</p></div>';
    }
    document.getElementById('guiaManejoCavalos').innerHTML = textoGuiaCavalos;
    document.getElementById('resultadoCavalos').style.display = 'block';
});

function abrirVacinasCavalos() {
    ftCa();
    document.getElementById('secaoVacinasCavalos').style.display = 'block';
    document.getElementById('calendarioCavalos').innerHTML = '<h4>📅 Calendário</h4><table class="tabela-vacinas"><thead><tr><th>Idade</th><th>Vacina</th></tr></thead><tbody><tr><td>4-6 meses</td><td>Quádrupla</td></tr><tr><td>+30d</td><td>Reforço</td></tr></tbody></table>';
    atualizarTabelaVacinasCavalos();
}
function fecharVacinasCavalos() { document.getElementById('secaoVacinasCavalos').style.display = 'none'; }
function adicionarVacinaCavalo() {
    let b = document.getElementById('brincoCavalo').value.trim();
    const t = document.getElementById('tipoVacinaCavalo').value;
    const d = document.getElementById('dataVacinaCavalo').value;
    const o = document.getElementById('obsVacinaCavalo').value.trim();
    if (!b || !t || !d) { alert('Preencha!'); return; }
    dadosCavalos.vacinas.push({ id: Date.now(), brinco: b, tipo: t, data: d, observacao: o || 'Nenhuma' });
    svCa();
    document.getElementById('brincoCavalo').value = '';
    document.getElementById('tipoVacinaCavalo').value = '';
    document.getElementById('dataVacinaCavalo').value = '';
    document.getElementById('obsVacinaCavalo').value = '';
    atualizarTabelaVacinasCavalos();
}
function atualizarTabelaVacinasCavalos(f) {
    let l = dadosCavalos.vacinas;
    if (f) l = l.filter(v => v.brinco.toLowerCase().includes(f.toLowerCase()));
    l.sort((a, b) => new Date(b.data) - new Date(a.data));
    const c = document.getElementById('corpoTabelaVacinasCavalos');
    if (l.length === 0) { c.innerHTML = '<tr><td colspan="5">Nenhuma</td></tr>'; return; }
    c.innerHTML = l.map(v => '<tr><td>🔢 ' + v.brinco + '</td><td>💉 ' + v.tipo + '</td><td>📅 ' + fd(v.data) + '</td><td>📝 ' + v.observacao + '</td><td><button onclick="evca(' + v.id + ')" class="btn-excluir">🗑️</button></td></tr>').join('');
}
function evca(id) { if (confirm('Excluir?')) { dadosCavalos.vacinas = dadosCavalos.vacinas.filter(v => v.id !== id); svCa(); atualizarTabelaVacinasCavalos(); } }
function filtrarVacinasCavalos() { atualizarTabelaVacinasCavalos(document.getElementById('buscaBrincoCavalo').value); }

function abrirReproducaoCavalos() { ftCa(); document.getElementById('secaoReproducaoCavalos').style.display = 'block'; atualizarTabelaCiosCavalos(); }
function fecharReproducaoCavalos() { document.getElementById('secaoReproducaoCavalos').style.display = 'none'; }
function adicionarCioCavalo() {
    const b = document.getElementById('brincoCioCavalo').value.trim();
    const d = document.getElementById('dataCioCavalo').value;
    const tp = document.getElementById('tipoCoberturaCavalo').value;
    if (!b || !d) { alert('Preencha!'); return; }
    dadosCavalos.cios.push({ id: Date.now(), brinco: b, data: d, tipoCobertura: tp });
    scCa();
    document.getElementById('brincoCioCavalo').value = '';
    document.getElementById('dataCioCavalo').value = '';
    atualizarTabelaCiosCavalos();
}
function atualizarTabelaCiosCavalos(f) {
    let l = dadosCavalos.cios;
    if (f) l = l.filter(c => c.brinco.toLowerCase().includes(f.toLowerCase()));
    l.sort((a, b) => new Date(b.data) - new Date(a.data));
    const c = document.getElementById('corpoTabelaCiosCavalos');
    const tpLabel = { 'monta_natural': '🐴 Monta Natural', 'monta_controlada': '🛡️ Monta Controlada', 'ia': '🧬 IA' };
    if (l.length === 0) { c.innerHTML = '<tr><td colspan="4">Nenhum</td></tr>'; return; }
    c.innerHTML = l.map(cio => '<tr><td>🔢 ' + cio.brinco + '</td><td>📅 ' + fd(cio.data) + '</td><td>' + (tpLabel[cio.tipoCobertura] || cio.tipoCobertura) + '</td><td><button onclick="ecc(' + cio.id + ')" class="btn-excluir">🗑️</button></td></tr>').join('');
}
function ecc(id) { if (confirm('Excluir?')) { dadosCavalos.cios = dadosCavalos.cios.filter(c => c.id !== id); scCa(); atualizarTabelaCiosCavalos(); } }
function filtrarCiosCavalos() { atualizarTabelaCiosCavalos(document.getElementById('buscaBrincoCioCavalo').value); }

// ========== AVES ==========
document.getElementById('formAves').addEventListener('submit', function(e) {
    e.preventDefault();
    dadosAves.numAves = parseInt(document.getElementById('numAves').value);
    dadosAves.tipoInstalacao = document.getElementById('tipoInstalacao').value;
    dadosAves.tipoProducao = document.getElementById('tipoProducaoAves').value;
    document.getElementById('infoAves').innerHTML = '<p>🐔 Total: <strong>' + dadosAves.numAves + '</strong></p>';
    let textoGuiaAves = '';
    if (dadosAves.tipoProducao === 'ovos') {
        if (dadosAves.tipoInstalacao === 'galinheiro') {
            textoGuiaAves = '<h3>📖 Guia - Aves de Postura (Pequena Produção)</h3><div class="maquina-card"><h4>🌟 Manejo</h4><p>Sistema semiconfinado: galpão/galinheiro coberto para noite, proteção e postura, com acesso a piquetes durante o dia para ciscar. Poleiros para descanso noturno. Ninhos individuais (1 para cada 4-5 galinhas) em locais escuros e silenciosos, forrados com maravalha ou palha seca. Coleta de ovos pelo menos 2 vezes ao dia.</p></div><div class="maquina-card"><h4>🌾 Alimentação</h4><p>Além do pasto (insetos, minhocas, capim) e milho, é fundamental fornecer ração de postura balanceada farelada com níveis elevados de cálcio para formação da casca. A falta de cálcio faz a galinha retirar o mineral dos próprios ossos, gerando ovos de casca mole e risco de bicagem dos ovos.</p></div>';
        } else {
            textoGuiaAves = '<h3>📖 Guia - Aves de Postura (Grande Produção)</h3><div class="maquina-card"><h4>🌟 Manejo</h4><p>Sistema de baterias de gaiolas suspensas ou cage-free (aves soltas com ninhos automáticos). Controle ambiental com climatização por pressão positiva/negativa. <strong>Manejo de iluminação:</strong> programa de luz artificial para 15-16 horas diárias, estimulando a glândula pineal a liberar hormônios de ovulação contínua.</p></div><div class="maquina-card"><h4>🌾 Alimentação</h4><p>Automatizada por calhas ou comedouros tipo corrente. Dividida em fases: inicial (até 6ª semana), crescimento (7ª-15ª), pré-postura e postura (várias fases conforme idade). Ingredientes: milho moído e farelo de soja + aminoácidos sintéticos + vitaminas + calcário calcítico fino e grosso para cálcio disponível durante a noite (formação da casca).</p></div>';
        }
    } else if (dadosAves.tipoProducao === 'carne') {
        if (dadosAves.tipoInstalacao === 'galinheiro') {
            textoGuiaAves = '<h3>📖 Guia - Frango de Corte (Pequena Produção/Caipira)</h3><div class="maquina-card"><h4>🌟 Manejo</h4><p>Linhagens de crescimento lento adaptadas à vida ao ar livre. Pintinhos passam 3-4 semanas em galpão fechado com aquecimento artificial (lâmpadas/campânulas) sobre cama de maravalha. Após a cria, acesso a piquetes durante o dia. Ciclo total: 70 a 90 dias até o abate (carne mais firme e coloração acentuada).</p></div><div class="maquina-card"><h4>🌾 Alimentação</h4><p>Ração comercial de crescimento nas primeiras semanas. Após saída para o pasto, introdução de milho moído/quebrado. Consumo de capim e insetos complementa a nutrição. O caroteno das pastagens verdes e do milho dá a tonalidade amarela intensa à pele e gordura do frango caipira.</p></div>';
        } else {
            textoGuiaAves = '<h3>📖 Guia - Frango de Corte (Grande Produção/Industrial)</h3><div class="maquina-card"><h4>🌟 Manejo</h4><p>Linhagens de altíssimo desempenho genético em galpões Blue House ou Dark House (luz natural bloqueada para controle absoluto de luz/escuridão). Controle de temperatura com exaustores e painéis evaporativos. <strong>Vazio sanitário</strong> de 10-14 dias entre lotes para quebrar ciclo de patógenos. Frango atinge 2,5-3 kg em apenas 42 dias.</p></div><div class="maquina-card"><h4>🌾 Alimentação</h4><p>Sistemas automáticos com rações peletizadas (evita separação de ingredientes). Dieta de alta densidade energética/proteica dividida em: pré-inicial (aparelho digestivo), inicial (estrutura óssea), crescimento/engorda (massa muscular), e ração de retirada/pré-abate (sem medicamentos, para segurança do consumidor).</p></div>';
        }
    } else if (dadosAves.tipoProducao === 'ambos') {
        textoGuiaAves = '';
    }
    document.getElementById('guiaManejoAves').innerHTML = textoGuiaAves;
    document.getElementById('resultadoAves').style.display = 'block';
});

function abrirVacinasAves() {
    ftA();
    document.getElementById('secaoVacinasAves').style.display = 'block';
    document.getElementById('calendarioAves').innerHTML = '<h4>📅 Calendário</h4><table class="tabela-vacinas"><thead><tr><th>Idade</th><th>Vacina</th></tr></thead><tbody><tr><td>1º dia</td><td>Marek</td></tr><tr><td>7º-10º dia</td><td>Newcastle</td></tr></tbody></table>';
    atualizarTabelaVacinasAves();
}
function fecharVacinasAves() { document.getElementById('secaoVacinasAves').style.display = 'none'; }
function adicionarVacinaAve() {
    const lote = document.getElementById('loteAve').value.trim();
    const tipo = document.getElementById('tipoVacinaAve').value;
    const data = document.getElementById('dataVacinaAve').value;
    const obs = document.getElementById('obsVacinaAve').value.trim();
    if (!lote || !tipo || !data) { alert('Preencha!'); return; }
    dadosAvesVacinas.push({ id: Date.now(), lote, tipo, data, observacao: obs || 'Nenhuma' });
    svA();
    document.getElementById('loteAve').value = '';
    document.getElementById('tipoVacinaAve').value = '';
    document.getElementById('dataVacinaAve').value = '';
    document.getElementById('obsVacinaAve').value = '';
    atualizarTabelaVacinasAves();
}
function atualizarTabelaVacinasAves(f) {
    let l = dadosAvesVacinas;
    if (f) l = l.filter(v => v.lote.toLowerCase().includes(f.toLowerCase()));
    l.sort((a, b) => new Date(b.data) - new Date(a.data));
    const c = document.getElementById('corpoTabelaVacinasAves');
    if (l.length === 0) { c.innerHTML = '<tr><td colspan="5">Nenhuma</td></tr>'; return; }
    c.innerHTML = l.map(v => '<tr><td>🔢 ' + v.lote + '</td><td>💉 ' + v.tipo + '</td><td>📅 ' + fd(v.data) + '</td><td>📝 ' + v.observacao + '</td><td><button onclick="eva(' + v.id + ')" class="btn-excluir">🗑️</button></td></tr>').join('');
}
function eva(id) { if (confirm('Excluir?')) { dadosAvesVacinas = dadosAvesVacinas.filter(v => v.id !== id); svA(); atualizarTabelaVacinasAves(); } }
function filtrarVacinasAves() { atualizarTabelaVacinasAves(document.getElementById('buscaLoteAve').value); }

// ========== INICIALIZAÇÃO ==========
window.addEventListener('DOMContentLoaded', function() {
    carregarPreferencias();
    console.log('🚜 AgroGestor pronto!');
});

document.addEventListener('click', function(e) {
    const m = document.getElementById('menuAcessibilidade');
    const b = document.getElementById('btnAcessibilidade');
    if (m && b && !m.contains(e.target) && e.target !== b) {
        m.classList.remove('ativo');
    }
});