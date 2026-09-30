// TRAVORA API CLIENT
const API_BASE = window.location.origin + '/api';

export const api = {
  async get(endpoint, params = {}) {
    const url = new URL(API_BASE + endpoint);
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });
    const res = await fetch(url.toString());
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Network error' }));
      throw new Error(err.detail || 'API request failed');
    }
    return res.json();
  },

  async post(endpoint, data = {}) {
    const res = await fetch(API_BASE + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Network error' }));
      throw new Error(err.detail || 'API request failed');
    }
    return res.json();
  },

  async put(endpoint, data = {}) {
    const res = await fetch(API_BASE + endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Network error' }));
      throw new Error(err.detail || 'API request failed');
    }
    return res.json();
  },

  async delete(endpoint) {
    const res = await fetch(API_BASE + endpoint, { method: 'DELETE' });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Network error' }));
      throw new Error(err.detail || 'API request failed');
    }
    return res.json();
  },

  // Auth Endpoints
  register(payload) { return this.post('/auth/register', payload); },
  login(payload) { return this.post('/auth/login', payload); },
  resetPassword(payload) { return this.post('/auth/reset-password', payload); },
  updateProfile(payload) { return this.put('/auth/profile', payload); },
  deleteAccount(payload) { return this.post('/auth/delete-account', payload); },
  deleteUser(userId) { return this.delete(`/users/${userId}`); },

  // Specialized API methods
  getDestinations() { return this.get('/destinations'); },
  getDestinationDetail(id) { return this.get(`/destinations/${id}`); },
  getLandmarks() { return this.get('/landmarks'); },
  getOperators(destination) { return this.get('/operators', { destination }); },
  matchOperators(payload) { return this.post('/operators/match', payload); },
  sensePlaces(payload) { return this.post('/places/sense', payload); },
  planTour(payload) { return this.post('/tours/plan', payload); },
  getTours(params = {}) { return this.get('/tours', params); },
  getTourDetail(id) { return this.get(`/tours/${id}`); },
  deleteTour(tourId) { return this.delete(`/tours/${tourId}`); },
  addTourItem(tourId, payload) { return this.post(`/tours/${tourId}/add-item`, payload); },
  updateTourItem(tourId, payload) { return this.put(`/tours/${tourId}/update-item`, payload); },
  deleteTourItem(tourId, itemId) { return this.delete(`/tours/${tourId}/items/${itemId}`); },
  simulateDisruption(tourId) { return this.post(`/tours/${tourId}/disrupt`); },
  applyAlternative(changeEventId, alternativeId) {
    return this.post('/changes/apply', { change_event_id: changeEventId, alternative_id: alternativeId });
  },
  bookTour(payload) { return this.post('/tours/book', payload); },
  getOperatorDashboard() { return this.get('/operator/dashboard'); },
  getOperatorAlerts() { return this.get('/operator/alerts'); },
  getVendors() { return this.get('/operator/vendors'); },
  getTourGroups() { return this.get('/operator/groups'); },
  getAnalytics() { return this.get('/operator/analytics'); },
  sendAIChat(payload) { return this.post('/ai/chat', payload); },
  getNotifications(role, userId) { return this.get('/notifications', { role, user_id: userId }); },
  markNotificationsRead() { return this.post('/notifications/mark-read'); },
  submitReview(payload) { return this.post('/reviews', payload); },

  // Database CRUD Studio Methods
  getCrudStats() { return this.get('/crud/stats'); },
  getCrudTable(table) { return this.get(`/crud/${table}`); },
  createCrudRecord(table, data) { return this.post(`/crud/${table}`, data); },
  updateCrudRecord(table, id, data) { return this.put(`/crud/${table}/${id}`, data); },
  deleteCrudRecord(table, id) { return this.delete(`/crud/${table}/${id}`); }
};
