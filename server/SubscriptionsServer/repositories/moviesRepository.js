const axios = require("axios")

const URL = 'https://api.tvmaze.com/shows';

const getAllMovies =  () => {
   return axios.get(URL)
}

module.exports = {getAllMovies}