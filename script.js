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
            case 'machines':
                content.innerHTML = this.renderMachines();
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
                                Add Machine
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
                        title: "Total Machines",
                        value: 156,
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

    renderMachines() {
        const machines = [
            { id: "M001", name: "CNC Milling Machine #7", status: "Running", location: "Floor A-1", lastMaintenance: "2024-01-15", nextMaintenance: "2024-02-15" },
            { id: "M002", name: "Industrial Robot #3", status: "Maintenance", location: "Floor B-2", lastMaintenance: "2024-01-10", nextMaintenance: "2024-02-10" },
            { id: "M003", name: "Conveyor Belt System A", status: "Running", location: "Floor A-3", lastMaintenance: "2024-01-20", nextMaintenance: "2024-02-20" },
            { id: "M004", name: "Hydraulic Press #12", status: "Critical", location: "Floor C-1", lastMaintenance: "2024-01-05", nextMaintenance: "2024-02-05" },
        ];

        return `
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <h1 class="text-3xl font-bold">Machines</h1>
                    <button class="btn btn-primary">
                        <i data-lucide="plus"></i>
                        Add Machine
                    </button>
                </div>

                <div class="card card-padding">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Machine ID</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Location</th>
                                <th>Last Maintenance</th>
                                <th>Next Maintenance</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${machines.map(machine => `
                                <tr>
                                    <td class="font-medium">${machine.id}</td>
                                    <td>${machine.name}</td>
                                    <td>
                                        <span class="badge badge-${this.getStatusColor(machine.status)}">
                                            ${machine.status}
                                        </span>
                                    </td>
                                    <td>${machine.location}</td>
                                    <td>${machine.lastMaintenance}</td>
                                    <td>${machine.nextMaintenance}</td>
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
            case 'running':
            case 'available':
            case 'completed':
                return 'success';
            case 'maintenance':
            case 'busy':
            case 'pending':
                return 'warning';
            case 'critical':
            case 'off duty':
                return 'destructive';
            default:
                return 'primary';
        }
    }
}

// Initialize the app
const app = new TimelecApp();