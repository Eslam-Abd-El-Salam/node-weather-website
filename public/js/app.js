console.log("Im Working Finee thanks You");





const weatherForm = document.querySelector("form")
const searchElement = document.querySelector("input") 
const firstMessage = document.querySelector("#Message_1")


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    
    const location = searchElement.value;
    
    getWeather(location)

})



function getWeather(Location){
    firstMessage.textContent="Loading.....!"
    fetch("http://api.weatherstack.com/current?access_key=436adcbe49ace2f1b2392ada514b0f5d&query="+Location+"#").then((response)=>{
    response.json().then((data) =>{
        if (data.error){
            console.log(data.error)
            firstMessage.textContent ="Error!!!!!!"
        }else{
            
            firstMessage.textContent = "Temperature in "+Location +" is "+ data.current.temperature
        }
        
    })

})

}