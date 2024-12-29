import api from './api'

export default {
 getUsers() {
   return api.get('/user')
 },

 getUser(id) {
   return api.get(`/user/${id}`)
 },

 getUserByEmail(email) {
   return api.get(`/user/email/${email}`) 
 },

 getUsersByRole(role) {
   return api.get(`/user/role/${role}`)
 },

 createUser(userData) {
   return api.post('/user', userData)
 },

 updateUser(id, userData) {
   return api.patch(`/user/${id}`, userData) 
 },

 deleteUser(id) {
   return api.delete(`/user/${id}`)
 },

 toggleUserStatus(id) {
   return api.patch(`/user/${id}/toggle-status`)
 }
}