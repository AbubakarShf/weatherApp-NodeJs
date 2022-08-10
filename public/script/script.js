const form=document.querySelector('form');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const address=document.querySelector('input').value
    fetch(`http://localhost:8080/weather?address=${encodeURIComponent(address)}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            document.getElementById("message1").innerHTML = "Error: " + data.error
        }else{
            document.getElementById("message2").innerHTML = "Data: " + data.lat+" "+data.lon+" "+data.weather;

        }
    })
})
document.getElementById('weatherForm').reset();
})

