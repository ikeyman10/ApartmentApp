import axios from "axios";
const APIKEY = process.env.REACT_APP_GOOGLE_API_KEY;


export default {

  checkToken: function(){
    return axios.get('/api/checkToken');
  },

  getForecastIndex: function(month, week){
      return axios.get('/api/getHighs', {params: {"month" : month,"week" : week}})
  },
  getUsers: function(){
    return axios.get('/api/users');
  },
  getUser: function(id){
    return axios.get('/api/users/'+ id);
  },
  
  updateUser: function(id,userData) {
    return axios.put("/api/users/" + id, userData);
  },
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  getClasses: function(){
    return axios.get('/api/class');
  },
  getClass: function(id){
    return axios.get('/api/class/'+ id);
  },
  // Saves a book to the database
  saveClass: function(classData) {
    return axios.post("/api/class", classData);
  },
  // Deletes the book with the given id
  deleteClass: function(id) {
    return axios.delete("/api/class/" + id);
  },
  updateClass: function(id,classData) {
    return axios.put("/api/class/" + id, classData);
  },
  updateVideo: function(id,classData) {
    return axios.put("/api/class/updateVideo/" + id, classData);
  },
  addVideo: function(id, videoData) {
    console.log(id + ":" + videoData)
    return axios.post("/api/class/"+id, videoData);
  },
  login: function(username, password) {
    var userData = {email: username, password: password}
    return axios.post("/api/users/login", userData);
  },
  logout: function() {
    return axios.post("/api/users/logout");
  },
  register: function(userData) {
    return axios.post("/api/users", userData);
  },
  deleteVideo: function(id, videoData) {
    console.log(videoData)
    return axios.post("/api/class/updateVideo/" + id, videoData);
  },


  getCoordinates: function(address){
    return axios.get(' https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+APIKEY);
  },

  getPropertyAdmin: function(){
    return axios.get('/api/property');
  },

  getPropertyRealtor: function(){
    //
    const userData = {realtor_id : localStorage.user} 
    return axios.post('api/property/realtor', userData);

  },
  getPropertyRealtorbyId: function(id){
    return axios.get('/api/property/realtor/'+id);
  },

  getPropertyById: function(id){
    return axios.get('/api/property/'+id);
  },
  saveProperty: function(propertyData){
    return axios.post('/api/property', propertyData)
  },
  updateProperty: function(id,propertyData) {
    return axios.put("/api/property/" + id, propertyData);
  },
  deleteProperty: function(id) {
    return axios.delete("/api/property/" + id);
  },
 

  
};
