// TIMELEC Machine Maintenance Management System - Vanilla JavaScript

class TimelecApp {
    constructor() {
        this.currentPage = 'dashboard';
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Set up navigation
        this.setupNavigation();
        
        // Load initial page
        this.loadPage(this.getPageFromHash());
        
        // Handle browser back/forward
        window.addEventListener('hashchange', () => {
            this.loadPage(this.getPageFromHash());
        });
    }

    getPageFromHash() {
        const hash = window.location.hash.substring(2) || 'dashboard';
        return hash;
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.getAttribute('data-page');
                this.navigateToPage(page);
            });
        });
    }

    navigateToPage(page) {
        window.location.hash = `#/${page}`;
    }

    loadPage(page) {
        this.currentPage = page;
        this.updateActiveNavItem();
        this.renderPage(page);
    }

    updateActiveNavItem() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeItem = document.querySelector(`[data-page="${this.currentPage}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    renderPage(page) {
        const content = document.getElementById('page-content');
        
        switch (page) {
            case 'dashboard':
                content.innerHTML = this.renderDashboard();
                break;
            case 'equipements':
                content.innerHTML = this.renderEquipements();
                break;
            case 'maintenance':
                content.innerHTML = this.renderMaintenance();
                break;
            case 'schedule':
                content.innerHTML = this.renderSchedule();
                break;
            case 'technicians':
                content.innerHTML = this.renderTechnicians();
                break;
            case 'reports':
                content.innerHTML = this.renderReports();
                break;
            default:
                content.innerHTML = this.renderNotFound();
        }
        
        // Re-initialize icons after content update
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    renderDashboard() {
        return `
            <div class="space-y-8">
                <!-- Hero Section -->
                <div class="hero-section">
                    <div class="hero-overlay"></div>
                    <div class="hero-content">
                        <div class="hero-text">
                            <h1>TIMELEC Dashboard</h1>
                            <p>Machine Maintenance Management System</p>
                            <p class="subtitle">Monitor, Schedule, and Track All Equipment Maintenance</p>
                        </div>
                        <div class="hero-buttons">
                            <button class="btn btn-secondary btn-lg">
                                <i data-lucide="plus"></i>
                                Add Equipement
                            </button>
                            <button class="btn btn-accent btn-lg">
                                <i data-lucide="calendar"></i>
                                Schedule Maintenance
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    ${this.renderDashboardCard({
                        title: "Total Equipements",
                        value: 756,
                        subtitle: "Active equipment",
                        icon: "settings",
                        variant: "primary",
                        trend: { value: 8, isPositive: true }
                    })}
                    ${this.renderDashboardCard({
                        title: "Pending Maintenance",
                        value: 23,
                        subtitle: "Requires attention",
                        icon: "wrench",
                        variant: "warning",
                        trend: { value: -12, isPositive: false }
                    })}
                    ${this.renderDashboardCard({
                        title: "Critical Issues",
                        value: 4,
                        subtitle: "Urgent repairs needed",
                        icon: "alert-triangle",
                        variant: "destructive",
                        trend: { value: -25, isPositive: true }
                    })}
                    ${this.renderDashboardCard({
                        title: "Completed Today",
                        value: 12,
                        subtitle: "Maintenance tasks",
                        icon: "check-circle",
                        variant: "success",
                        trend: { value: 15, isPositive: true }
                    })}
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Upcoming Maintenance -->
                    <div class="card card-padding">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-xl font-semibold flex items-center gap-2">
                                <i data-lucide="clock" class="text-primary"></i>
                                Upcoming Maintenance
                            </h3>
                            <button class="btn btn-outline btn-sm">View All</button>
                        </div>
                        <div class="content-list">
                            ${this.renderUpcomingMaintenance()}
                        </div>
                    </div>

                    <!-- Recent Activity -->
                    <div class="card card-padding">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-xl font-semibold flex items-center gap-2">
                                <i data-lucide="trending-up" class="text-primary"></i>
                                Recent Activity
                            </h3>
                            <button class="btn btn-outline btn-sm">View All</button>
                        </div>
                        <div class="content-list">
                            ${this.renderRecentActivity()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderDashboardCard({ title, value, subtitle, icon, variant, trend }) {
        return `
            <div class="dashboard-card">
                <div class="dashboard-card-header">
                    <div class="dashboard-card-icon ${variant}">
                        <i data-lucide="${icon}"></i>
                    </div>
                    <div class="dashboard-card-trend ${trend.isPositive ? 'trend-positive' : 'trend-negative'}">
                        <i data-lucide="${trend.isPositive ? 'trending-up' : 'trending-down'}"></i>
                        ${Math.abs(trend.value)}%
                    </div>
                </div>
                <div class="dashboard-card-value">${value}</div>
                <div class="dashboard-card-subtitle">${subtitle}</div>
            </div>
        `;
    }

    renderUpcomingMaintenance() {
        const items = [
            { machine: "CNC Milling Machine #7", type: "Preventive", due: "2 hours", priority: "Medium" },
            { machine: "Conveyor Belt System A", type: "Inspection", due: "4 hours", priority: "Low" },
            { machine: "Industrial Robot #3", type: "Corrective", due: "Tomorrow", priority: "High" },
            { machine: "Hydraulic Press #12", type: "Preventive", due: "2 days", priority: "Medium" },
        ];

        return items.map(item => `
            <div class="list-item">
                <div>
                    <p class="font-medium">${item.machine}</p>
                    <p class="text-sm text-muted">${item.type} • Due in ${item.due}</p>
                </div>
                <span class="badge priority-${item.priority.toLowerCase()}">
                    ${item.priority}
                </span>
            </div>
        `).join('');
    }

    renderRecentActivity() {
        const activities = [
            { action: "Completed maintenance", machine: "Lathe Machine #5", technician: "John Smith", time: "30 min ago" },
            { action: "Started inspection", machine: "Welding Station #8", technician: "Sarah Johnson", time: "1 hour ago" },
            { action: "Reported issue", machine: "Packaging Line B", technician: "Mike Davis", time: "2 hours ago" },
            { action: "Scheduled maintenance", machine: "Compressor Unit #4", technician: "Lisa Wilson", time: "3 hours ago" },
        ];

        return activities.map(activity => `
            <div class="activity-item">
                <div class="activity-dot"></div>
                <div class="activity-content">
                    <p class="font-medium text-sm">${activity.action}</p>
                    <p class="text-sm text-muted">${activity.machine}</p>
                    <div class="activity-meta">
                        <span>${activity.technician}</span>
                        <span>•</span>
                        <span>${activity.time}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderEquipements() {
        const equipements = [
            // PC Equipment
            { id: "15232", name: "PC postes de contrôle 100% P87", status: "ES", location: "Production", lastMaintenance: "2024-01-15", nextMaintenance: "2024-02-15" },
            { id: "15243", name: "PC postes de contrôle 100% A20", status: "ES", location: "Production", lastMaintenance: "2024-01-10", nextMaintenance: "2024-02-10" },
            { id: "15499", name: "PC postes de contrôle 100% A40", status: "ES", location: "Production", lastMaintenance: "2024-01-20", nextMaintenance: "2024-02-20" },
            { id: "15561", name: "PC postes de contrôle 100% SDMO", status: "ES", location: "Production", lastMaintenance: "2024-01-18", nextMaintenance: "2024-02-18" },
            { id: "15570", name: "PC postes de contrôle 100% BET", status: "ES", location: "Production", lastMaintenance: "2024-01-12", nextMaintenance: "2024-02-12" },
            { id: "15628", name: "PC postes de contrôle 100% ATYS-M", status: "ES", location: "Production", lastMaintenance: "2024-01-08", nextMaintenance: "2024-02-08" },
            { id: "16122", name: "PC postes de contrôle 100%", status: "ES", location: "Production", lastMaintenance: "2024-01-25", nextMaintenance: "2024-02-25" },
            { id: "17283", name: "PC  S/E 100%", status: "ES", location: "Production", lastMaintenance: "2024-01-22", nextMaintenance: "2024-02-22" },
            { id: "17284", name: "PC 100% B4", status: "ES", location: "Production", lastMaintenance: "2024-01-19", nextMaintenance: "2024-02-19" },
            { id: "17286", name: "PC  S/E 100%", status: "ES", location: "Production", lastMaintenance: "2024-01-16", nextMaintenance: "2024-02-16" },
            { id: "17294", name: "PC postes de contrôle 100%", status: "ES", location: "Production", lastMaintenance: "2024-01-14", nextMaintenance: "2024-02-14" },
            { id: "17297", name: "PC 100%", status: "ES", location: "Production", lastMaintenance: "2024-01-11", nextMaintenance: "2024-02-11" },
            { id: "17395", name: "PC postes", status: "ES", location: "Production", lastMaintenance: "2024-01-09", nextMaintenance: "2024-02-09" },
            { id: "17656", name: "PC poste", status: "ES", location: "Production", lastMaintenance: "2024-01-07", nextMaintenance: "2024-02-07" },
            { id: "18473", name: "PC  B4", status: "ES", location: "Production", lastMaintenance: "2024-01-06", nextMaintenance: "2024-02-06" },
            { id: "18573", name: "PC postes de contrôle 100% BEL", status: "ES", location: "Production", lastMaintenance: "2024-01-05", nextMaintenance: "2024-02-05" },
            { id: "18579", name: "PC", status: "ES", location: "Production", lastMaintenance: "2024-01-04", nextMaintenance: "2024-02-04" },
            { id: "18580", name: "PC postes de contrôle 100% FUSERBLOC", status: "ES", location: "Production", lastMaintenance: "2024-01-03", nextMaintenance: "2024-02-03" },
            { id: "18583", name: "PC postes de contrôle 100%", status: "ES", location: "Production", lastMaintenance: "2024-01-02", nextMaintenance: "2024-02-02" },
            { id: "18585", name: "PC postes de contrôle 100%", status: "ES", location: "Production", lastMaintenance: "2024-01-01", nextMaintenance: "2024-02-01" },
            { id: "19135", name: "PC postes", status: "ES", location: "Production", lastMaintenance: "2023-12-30", nextMaintenance: "2024-01-30" },
            { id: "19904", name: "PC  S/E 100%", status: "ES", location: "Production", lastMaintenance: "2023-12-29", nextMaintenance: "2024-01-29" },
            { id: "25477", name: "PC poste", status: "ES", location: "Production", lastMaintenance: "2023-12-28", nextMaintenance: "2024-01-28" },
            { id: "25488", name: "PC poste", status: "ES", location: "Production", lastMaintenance: "2023-12-27", nextMaintenance: "2024-01-27" },
            { id: "26261", name: "PC postes", status: "ES", location: "Production", lastMaintenance: "2023-12-26", nextMaintenance: "2024-01-26" },
            { id: "41350", name: "PC postes de contrôle 100% SIRCO MV", status: "ES", location: "Production", lastMaintenance: "2023-12-25", nextMaintenance: "2024-01-25" },
            { id: "45080", name: "PC  B4", status: "ES", location: "Production", lastMaintenance: "2023-12-24", nextMaintenance: "2024-01-24" },
            { id: "45082", name: "PC postes de contrôle", status: "ES", location: "Production", lastMaintenance: "2023-12-23", nextMaintenance: "2024-01-23" },
            { id: "45083", name: "PC postes", status: "ES", location: "Production", lastMaintenance: "2023-12-22", nextMaintenance: "2024-01-22" },
            { id: "45084", name: "PC", status: "ES", location: "Production", lastMaintenance: "2023-12-21", nextMaintenance: "2024-01-21" },
            { id: "45087", name: "PC  S/E 100%", status: "ES", location: "Production", lastMaintenance: "2023-12-20", nextMaintenance: "2024-01-20" },
            { id: "45240", name: "PC  S/E 100%", status: "ES", location: "Production", lastMaintenance: "2023-12-19", nextMaintenance: "2024-01-19" },
            { id: "45249", name: "PC POIGNEE", status: "ES", location: "Production", lastMaintenance: "2023-12-18", nextMaintenance: "2024-01-18" },
            
            // A-Series Equipment
            { id: "A-0003", name: "GABARIT COULISSEAUX", status: "ES", location: "Assembly", lastMaintenance: "2023-12-17", nextMaintenance: "2024-01-17" },
            { id: "A-0004", name: "GABARIT COULISSEAUX", status: "ES", location: "Assembly", lastMaintenance: "2023-12-16", nextMaintenance: "2024-01-16" },
            { id: "A-0010/01", name: "GABARIT ASSEMBLAGE CONTACT", status: "ES", location: "Assembly", lastMaintenance: "2023-12-15", nextMaintenance: "2024-01-15" },
            { id: "A-0024", name: "GABARIT MONTAGE BARREAU B3", status: "ES", location: "Assembly", lastMaintenance: "2023-12-14", nextMaintenance: "2024-01-14" },
            { id: "A-0027/02", name: "GABARIT D'ASSEMBLAGE BARREAUX VM1", status: "ES", location: "Assembly", lastMaintenance: "2023-12-13", nextMaintenance: "2024-01-13" },
            { id: "A-0033", name: "MACHINE SAFIR 130 T", status: "ES", location: "Production", lastMaintenance: "2023-12-12", nextMaintenance: "2024-01-12" },
            { id: "A-0038", name: "GABARIT POSAGE", status: "ES", location: "Assembly", lastMaintenance: "2023-12-11", nextMaintenance: "2024-01-11" },
            { id: "A-0041/06", name: "IMPRIMANTE ZEBRA  DIRIS A20", status: "ES", location: "Office", lastMaintenance: "2023-12-10", nextMaintenance: "2024-01-10" },
            { id: "A-0041/08", name: "IMPRIMANTE Z4M MAGASIN", status: "ES", location: "Warehouse", lastMaintenance: "2023-12-09", nextMaintenance: "2024-01-09" },
            { id: "A-0041/09", name: "IMPRIMANTE ZEBRA XI MAGASIN", status: "ES", location: "Warehouse", lastMaintenance: "2023-12-08", nextMaintenance: "2024-01-08" },
            { id: "A-0041/10", name: "IMPRIMANTE ZEBRA 110 Xi III plus", status: "ES", location: "Office", lastMaintenance: "2023-12-07", nextMaintenance: "2024-01-07" },
            { id: "A-0041/12", name: "IMPRIMANATE RICOH METHODE", status: "ES", location: "Office", lastMaintenance: "2023-12-06", nextMaintenance: "2024-01-06" },
            { id: "A-0041/13", name: "IMPRIMANTE HP 8000", status: "ES", location: "Office", lastMaintenance: "2023-12-05", nextMaintenance: "2024-01-05" },
            { id: "A-0041/14", name: "IMPRIMANTE HP 4000 MAG", status: "ES", location: "Warehouse", lastMaintenance: "2023-12-04", nextMaintenance: "2024-01-04" },
            { id: "A-0041/15", name: "IMPRIMANTE ZEBRA MAGASIN", status: "ES", location: "Warehouse", lastMaintenance: "2023-12-03", nextMaintenance: "2024-01-03" },
            { id: "A-0041/16", name: "IMPRIMANTE RICOH COMPTABILITE", status: "ES", location: "Accounting", lastMaintenance: "2023-12-02", nextMaintenance: "2024-01-02" },
            { id: "A-0041/17", name: "RICOH FAX COMPTABILITE", status: "ES", location: "Accounting", lastMaintenance: "2023-12-01", nextMaintenance: "2024-01-01" },
            { id: "A-0041/18", name: "IMPRIMANTE DELL DIRECTEUR", status: "ES", location: "Management", lastMaintenance: "2023-11-30", nextMaintenance: "2023-12-30" },
            { id: "A-0041/19", name: "IMPRIMANTE HP GRH", status: "ES", location: "HR", lastMaintenance: "2023-11-29", nextMaintenance: "2023-12-29" },
            { id: "A-0041/20", name: "IMPRIMANTE RICOH LOGISTIQUE", status: "ES", location: "Logistics", lastMaintenance: "2023-11-28", nextMaintenance: "2023-12-28" },
            { id: "A-0044", name: "GABARIT MONTAGE BARREAU VM1", status: "ES", location: "Assembly", lastMaintenance: "2023-11-27", nextMaintenance: "2023-12-27" },
            { id: "A-0045", name: "GABARIT MONTAGE CAGE DE COUPURE VM1", status: "ES", location: "Assembly", lastMaintenance: "2023-11-26", nextMaintenance: "2023-12-26" },
            { id: "A-0049", name: "Outil de manœuvre", status: "ES", location: "Tools", lastMaintenance: "2023-11-25", nextMaintenance: "2023-12-25" },
            { id: "A-0050", name: "GABARIT MONTAGE BARREAU VM2", status: "ES", location: "Assembly", lastMaintenance: "2023-11-24", nextMaintenance: "2023-12-24" },
            { id: "A-0052", name: "GABARIT MONTAGE CAGE DE COMMANDE VM2", status: "ES", location: "Assembly", lastMaintenance: "2023-11-23", nextMaintenance: "2023-12-23" },
            { id: "A-0058", name: "GABARIT CLIPSAGE CAPOT VM1/VM2", status: "ES", location: "Assembly", lastMaintenance: "2023-11-22", nextMaintenance: "2023-12-22" },
            { id: "A-0064", name: "Perceuse colonne d'établi CINCINATI PE 15", status: "ES", location: "Workshop", lastMaintenance: "2023-11-21", nextMaintenance: "2023-12-21" },
            { id: "A-0069/01", name: "PRESSE A PASTILLER + BOITIER DE COMMANDE", status: "ES", location: "Production", lastMaintenance: "2023-11-20", nextMaintenance: "2023-12-20" },
            { id: "A-0069/02", name: "PRESSE A PASTILLER + BOITIER DE COMMANDE", status: "ES", location: "Production", lastMaintenance: "2023-11-19", nextMaintenance: "2023-12-19" },
            { id: "A-0085", name: "MACHINE FILL AIR", status: "REBUS", location: "Production", lastMaintenance: "2023-11-18", nextMaintenance: "N/A" },
            { id: "A-0088", name: "GABARIT ASSEMBLAGE CONTACT", status: "ES", location: "Assembly", lastMaintenance: "2023-11-17", nextMaintenance: "2023-12-17" },
            { id: "A-0090/01", name: "PRESSE A SERTIR 4,3T", status: "ES", location: "Production", lastMaintenance: "2023-11-16", nextMaintenance: "2023-12-16" },
            { id: "A-0090/02", name: "PRESSE A SERTIR 4,3T", status: "ES", location: "Production", lastMaintenance: "2023-11-15", nextMaintenance: "2023-12-15" },
            { id: "A-0090/03", name: "PRESSE A SERTIR 3T", status: "ES", location: "Production", lastMaintenance: "2023-11-14", nextMaintenance: "2023-12-14" },
            { id: "A-0098", name: "GABARIT MONTAGE BARREAU B5", status: "ES", location: "Assembly", lastMaintenance: "2023-11-13", nextMaintenance: "2023-12-13" },
            { id: "A-0121", name: "GABARIT DE MONTAGE INSERT A20 & A40", status: "ES", location: "Assembly", lastMaintenance: "2023-11-12", nextMaintenance: "2023-12-12" },
            { id: "A-0123", name: "GABARIT D'ASSEMBLAGE DIRIS A20", status: "ES", location: "Assembly", lastMaintenance: "2023-11-11", nextMaintenance: "2023-12-11" },
            { id: "A-0131/10", name: "FER A SOUDER", status: "ES", location: "Workshop", lastMaintenance: "2023-11-10", nextMaintenance: "2023-12-10" },
            { id: "A-0131/11", name: "FER A SOUDER", status: "ES", location: "Workshop", lastMaintenance: "2023-11-09", nextMaintenance: "2023-12-09" },
            { id: "A-0131/12", name: "FER A SOUDER", status: "ES", location: "Workshop", lastMaintenance: "2023-11-08", nextMaintenance: "2023-12-08" },
            { id: "A-0131/13", name: "FER A SOUDER", status: "ES", location: "Workshop", lastMaintenance: "2023-11-07", nextMaintenance: "2023-12-07" },
            { id: "A-0131/14", name: "FER A SOUDER", status: "ES", location: "Workshop", lastMaintenance: "2023-11-06", nextMaintenance: "2023-12-06" },
            { id: "A-0133/01", name: "TESTEUR DIELECTRIQUE DIRIS A20", status: "ES", location: "Testing", lastMaintenance: "2023-11-05", nextMaintenance: "2023-12-05" },
            { id: "A-0134", name: "BANC D'ENDURACE MECANIQUE 1", status: "ES", location: "Testing", lastMaintenance: "2023-11-04", nextMaintenance: "2023-12-04" },
            
            // Additional sample entries for demonstration (the full list would be too long for this example)
            { id: "G-0002", name: "GERBEUR 1000 FAC", status: "ES", location: "Warehouse", lastMaintenance: "2023-10-15", nextMaintenance: "2023-11-15" },
            { id: "M-0001/01", name: "VISSEUSE PNEUMATIQUE", status: "ES", location: "Workshop", lastMaintenance: "2023-10-10", nextMaintenance: "2023-11-10" },
            { id: "K-0024", name: "Groupe glacee carrier", status: "ES", location: "Utilities", lastMaintenance: "2023-10-05", nextMaintenance: "2023-11-05" },
            { id: "F-3253", name: "MOULE 515428 /515429", status: "ES", location: "Production", lastMaintenance: "2023-10-01", nextMaintenance: "2023-11-01" },
            { id: "D-0003", name: "PRESSE D' INJECTION KM01", status: "ES", location: "Production", lastMaintenance: "2023-09-25", nextMaintenance: "2023-10-25" },
            { id: "B-0001", name: "END-04 BANC D'ENDURANCE SIRCO/SIRCOVER /FUSERBLOC/VM/MV", status: "ES", location: "Testing", lastMaintenance: "2023-09-20", nextMaintenance: "2023-10-20" }
        ];

        return `
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <h1 class="text-3xl font-bold">Equipements</h1>
                    <button class="btn btn-primary">
                        <i data-lucide="plus"></i>
                        Add Equipement
                    </button>
                </div>

                <div class="card card-padding">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Equipement ID</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Location</th>
                                <th>Last Maintenance</th>
                                <th>Next Maintenance</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${equipements.map(equipement => `
                                <tr>
                                    <td class="font-medium">${equipement.id}</td>
                                    <td>${equipement.name}</td>
                                    <td>
                                        <span class="badge badge-${this.getStatusColor(equipement.status)}">
                                            ${equipement.status}
                                        </span>
                                    </td>
                                    <td>${equipement.location}</td>
                                    <td>${equipement.lastMaintenance}</td>
                                    <td>${equipement.nextMaintenance}</td>
                                    <td>
                                        <button class="btn btn-outline btn-sm">
                                            <i data-lucide="eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    renderMaintenance() {
        return `
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <h1 class="text-3xl font-bold">Maintenance Tasks</h1>
                    <button class="btn btn-primary">
                        <i data-lucide="plus"></i>
                        New Task
                    </button>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="card card-padding">
                        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                            <i data-lucide="clock" class="text-warning"></i>
                            Pending (23)
                        </h3>
                        <div class="space-y-3">
                            <div class="p-3 bg-warning/5 border border-warning/20 rounded-lg">
                                <p class="font-medium">Inspect Conveyor Belt</p>
                                <p class="text-sm text-muted">Due: Today 2:00 PM</p>
                                <p class="text-xs text-warning mt-1">High Priority</p>
                            </div>
                            <div class="p-3 bg-muted/30 rounded-lg">
                                <p class="font-medium">Replace Air Filter</p>
                                <p class="text-sm text-muted">Due: Tomorrow</p>
                                <p class="text-xs text-muted mt-1">Medium Priority</p>
                            </div>
                        </div>
                    </div>

                    <div class="card card-padding">
                        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                            <i data-lucide="play" class="text-primary"></i>
                            In Progress (8)
                        </h3>
                        <div class="space-y-3">
                            <div class="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                                <p class="font-medium">Motor Calibration</p>
                                <p class="text-sm text-muted">Started: 1 hour ago</p>
                                <p class="text-xs text-primary mt-1">John Smith</p>
                            </div>
                        </div>
                    </div>

                    <div class="card card-padding">
                        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                            <i data-lucide="check-circle" class="text-success"></i>
                            Completed (12)
                        </h3>
                        <div class="space-y-3">
                            <div class="p-3 bg-success/5 border border-success/20 rounded-lg">
                                <p class="font-medium">Oil Change</p>
                                <p class="text-sm text-muted">Completed: 2 hours ago</p>
                                <p class="text-xs text-success mt-1">Sarah Johnson</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderSchedule() {
        return `
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <h1 class="text-3xl font-bold">Maintenance Schedule</h1>
                    <button class="btn btn-primary">
                        <i data-lucide="calendar-plus"></i>
                        Schedule Maintenance
                    </button>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="card card-padding">
                        <h3 class="text-xl font-semibold mb-4">This Week</h3>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                                <div>
                                    <p class="font-medium">Monday, Jan 29</p>
                                    <p class="text-sm text-muted">3 scheduled tasks</p>
                                </div>
                                <span class="badge badge-primary">Today</span>
                            </div>
                            <div class="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                                <div>
                                    <p class="font-medium">Wednesday, Jan 31</p>
                                    <p class="text-sm text-muted">2 scheduled tasks</p>
                                </div>
                            </div>
                            <div class="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                                <div>
                                    <p class="font-medium">Friday, Feb 2</p>
                                    <p class="text-sm text-muted">4 scheduled tasks</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card card-padding">
                        <h3 class="text-xl font-semibold mb-4">Upcoming</h3>
                        <div class="space-y-4">
                            <div class="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                                <p class="font-medium">Quarterly Safety Inspection</p>
                                <p class="text-sm text-muted">Due: February 15, 2024</p>
                                <p class="text-xs text-warning mt-1">All machines</p>
                            </div>
                            <div class="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                                <p class="font-medium">Annual Equipment Overhaul</p>
                                <p class="text-sm text-muted">Due: March 1, 2024</p>
                                <p class="text-xs text-primary mt-1">Critical systems</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderTechnicians() {
        const technicians = [
            { id: "T001", name: "John Smith", specialization: "Mechanical", activeTasks: 3, completedTasks: 45, status: "Available" },
            { id: "T002", name: "Sarah Johnson", specialization: "Electrical", activeTasks: 2, completedTasks: 38, status: "Busy" },
            { id: "T003", name: "Mike Davis", specialization: "Hydraulics", activeTasks: 1, completedTasks: 52, status: "Available" },
            { id: "T004", name: "Lisa Wilson", specialization: "Electronics", activeTasks: 4, completedTasks: 41, status: "Off Duty" },
        ];

        return `
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <h1 class="text-3xl font-bold">Technicians</h1>
                    <button class="btn btn-primary">
                        <i data-lucide="user-plus"></i>
                        Add Technician
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${technicians.map(tech => `
                        <div class="card card-padding">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                    <i data-lucide="user" class="text-primary"></i>
                                </div>
                                <div>
                                    <h3 class="font-semibold">${tech.name}</h3>
                                    <p class="text-sm text-muted">${tech.specialization}</p>
                                </div>
                            </div>
                            
                            <div class="space-y-2 mb-4">
                                <div class="flex justify-between">
                                    <span class="text-sm">Active Tasks:</span>
                                    <span class="font-medium">${tech.activeTasks}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm">Completed:</span>
                                    <span class="font-medium">${tech.completedTasks}</span>
                                </div>
                            </div>
                            
                            <span class="badge badge-${this.getStatusColor(tech.status)}">
                                ${tech.status}
                            </span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderReports() {
        return `
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <h1 class="text-3xl font-bold">Reports</h1>
                    <button class="btn btn-primary">
                        <i data-lucide="download"></i>
                        Generate Report
                    </button>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="card card-padding">
                        <h3 class="text-xl font-semibold mb-4">Maintenance Statistics</h3>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between p-3 bg-muted/30 rounded">
                                <span>Tasks Completed This Month</span>
                                <span class="font-bold text-success">127</span>
                            </div>
                            <div class="flex items-center justify-between p-3 bg-muted/30 rounded">
                                <span>Average Response Time</span>
                                <span class="font-bold">2.3 hours</span>
                            </div>
                            <div class="flex items-center justify-between p-3 bg-muted/30 rounded">
                                <span>Equipment Uptime</span>
                                <span class="font-bold text-success">98.7%</span>
                            </div>
                        </div>
                    </div>

                    <div class="card card-padding">
                        <h3 class="text-xl font-semibold mb-4">Quick Reports</h3>
                        <div class="space-y-3">
                            <button class="btn btn-outline w-full justify-start">
                                <i data-lucide="file-text"></i>
                                Monthly Maintenance Report
                            </button>
                            <button class="btn btn-outline w-full justify-start">
                                <i data-lucide="bar-chart"></i>
                                Equipment Performance Analysis
                            </button>
                            <button class="btn btn-outline w-full justify-start">
                                <i data-lucide="users"></i>
                                Technician Performance Report
                            </button>
                            <button class="btn btn-outline w-full justify-start">
                                <i data-lucide="calendar"></i>
                                Scheduled Maintenance Overview
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderNotFound() {
        return `
            <div class="flex flex-col items-center justify-center h-96 text-center">
                <h1 class="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <p class="text-muted mb-6">The page you're looking for doesn't exist.</p>
                <button class="btn btn-primary" onclick="window.location.hash = '#/'">
                    <i data-lucide="home"></i>
                    Go to Dashboard
                </button>
            </div>
        `;
    }

    getStatusColor(status) {
        switch (status.toLowerCase()) {
            case 'es':
            case 'running':
            case 'available':
            case 'completed':
                return 'success';
            case 'rebus':
            case 'critical':
            case 'off duty':
                return 'destructive';
            case 'maintenance':
            case 'busy':
            case 'pending':
                return 'warning';
            default:
                return 'primary';
        }
    }
}

// Initialize the app
const app = new TimelecApp();