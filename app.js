const input = document.getElementById('search')
const form = document.querySelector('.search-field')


const ipAddress = document.getElementById('ip')
const country = document.getElementById('country')
const region = document.getElementById('region')
const timezone = document.getElementById('timezone')
const isp = document.getElementById('isp')

const API_KEY = 'at_bwePLfE0iKcaMBiRtOOj9iRjaQtoY'
// const URL = `https://geo.ipify.org/api/v2/country?apiKey=${API_KEY}&ipAddress=${ip}`

document.addEventListener('DOMContentLoaded', function(){
    input.focus()
})
let API_RESPONSE


const map = L.map('map')

form.addEventListener('submit', function(e){
    e.preventDefault()
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${input.value}`)
    .then((response)=>response.json())
    .then(function(data){
        if(data.code === 422){
            alert(data.messages);
            input.value = ''
            return ;
        }
        ipAddress.textContent = data.ip
        country.textContent = data.location.country
        region.textContent = data.location.region
        timezone.textContent = data.location.timezone
        isp.textContent = data.isp

        // 
        // using map to leaflet.js to find the map
        map.setView([data.location.lat , data.location.lng], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        L.marker([data.location.lat , data.location.lng]).addTo(map)
        input.value = ''
    })
        
    
})




