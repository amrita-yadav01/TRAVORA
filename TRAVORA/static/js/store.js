// TRAVORA CENTRAL STATE STORE

class Store {
  constructor() {
    const savedUserJson = localStorage.getItem('travora_user');
    let savedUser = null;
    try {
      if (savedUserJson) {
        savedUser = JSON.parse(savedUserJson);
        if (savedUser && typeof savedUser === 'object') {
          if (!savedUser.name) savedUser.name = (savedUser.email ? savedUser.email.split('@')[0] : 'User');
          if (!savedUser.role) savedUser.role = 'traveler';
        } else {
          savedUser = null;
        }
      }
    } catch (e) {
      savedUser = null;
    }

    const isAuthenticated = savedUser !== null;
    const initialRole = savedUser ? (savedUser.role || 'traveler') : 'traveler';
    const initialView = isAuthenticated ? (initialRole === 'operator' ? 'operator_dash' : 'dashboard') : 'auth';

    this.state = {
      isAuthenticated: isAuthenticated,
      user: savedUser,
      activeRole: initialRole, // 'traveler' or 'operator'
      authMode: 'login',       // 'login' or 'signup'
      currentTourId: null,
      currentTour: null,
      tours: [],
      destinations: [],
      notifications: [],
      unreadCount: 0,
      theme: localStorage.getItem('travora_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
      isDisruptionModalOpen: false,
      activeChangeEvent: null,
      isBookingModalOpen: false,
      isReviewModalOpen: false,
      isProfileModalOpen: false,
      isAddExperienceModalOpen: false,
      isOperatorRegisterModalOpen: false,
      selectedOperatorForModal: null,
      addExperienceTargetDay: 1,
      selectedDay: 1,
      toasts: [],
      
      // CRUD Database Studio State
      crudActiveTable: 'users',
      crudTableData: [],
      crudStats: {
        users: 0, destinations: 0, hotels: 0, activities: 0, tours: 0,
        itinerary_items: 0, vendors: 0, bookings: 0, reviews: 0
      }
    };
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    if (partialState.theme) {
      localStorage.setItem('travora_theme', partialState.theme);
      this.applyTheme(partialState.theme);
    }
    if (partialState.user) {
      localStorage.setItem('travora_user', JSON.stringify(partialState.user));
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  toggleTheme() {
    const nextTheme = this.state.theme === 'dark' ? 'light' : 'dark';
    this.setState({ theme: nextTheme });
  }

  login(user) {
    localStorage.setItem('travora_user', JSON.stringify(user));
    this.setState({
      isAuthenticated: true,
      user: user,
      activeRole: user.role,
      currentTourId: null,
      currentTour: null,
      tours: [],
      currentView: user.role === 'operator' ? 'operator_dash' : 'dashboard'
    });
    this.addToast(`Welcome, ${user.name}! Signed in as ${user.role.toUpperCase()}`, 'success');
  }

  logout() {
    localStorage.removeItem('travora_user');
    this.setState({
      isAuthenticated: false,
      user: null,
      currentTourId: null,
      currentTour: null,
      tours: [],
      currentView: 'auth',
      authMode: 'login'
    });
    this.addToast('Logged out successfully', 'info');
  }

  switchRole(role) {
    if (!this.state.isAuthenticated) {
      this.setState({ authRole: role, currentView: 'auth' });
      return;
    }
    const user = this.state.user;
    if (user && user.role !== role) {
      this.addToast(`Switched view to ${role.toUpperCase()} mode`, 'info');
    }
    this.setState({
      activeRole: role,
      currentView: role === 'operator' ? 'operator_dash' : 'dashboard'
    });
  }

  navigate(view, payload = {}) {
    if (!this.state.isAuthenticated && view !== 'auth') {
      this.setState({ currentView: 'auth' });
      return;
    }
    this.setState({
      currentView: view,
      ...payload
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addToast(message, type = 'info', duration = 4000) {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type };
    const updatedToasts = [...this.state.toasts, newToast];
    this.setState({ toasts: updatedToasts });

    setTimeout(() => {
      this.removeToast(id);
    }, duration);
  }

  removeToast(id) {
    this.setState({
      toasts: this.state.toasts.filter(t => t.id !== id)
    });
  }
}

export const store = new Store();
