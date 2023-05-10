function getAge(){
    let birthDate = new Date(1994, 8, 30); 
    let today = new Date(); 
    
    let presentDay = today.getFullYear() - birthDate.getFullYear();
    
    
    if((birthDate.getMonth() > today.getMonth()) || (birthDate.getMonth() === today.getMonth() &&  birthDate.getDate() > today.getDate())){
        presentDay--;
     }

    document.getElementById("incrementing-age").innerHTML = presentDay;
}

