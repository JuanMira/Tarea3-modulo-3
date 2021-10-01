const calculate = () => {
  const age = document.getElementById("age").value;
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;
  const gender = document.getElementsByName("gender");
  const result = document.getElementById('result')
  let selected = null;

  if (age > 0 && weight > 0 && height > 0) {
    gender.forEach((data) => {
      if (data.checked) selected = data.value;
    });
    let imc = parseFloat(weight / Math.pow(height / 100, 2)).toFixed(2);

    const imcData = {
      age,
      weight,
      height,
      gender: selected == 1 ? "Hombre" : "Mujer",
      state: "",
    };

    if (imc < 18.5) {      
      imcData.state = "Por debajo de peso";
      imcData.color = "blue"
    } else if (imc > 18.5 || imc < 24.9) {      
      imcData.state = "Saludable";
      imcData.color = "green"
    } else if (imc > 25 || imc < 29.9) {      
      imcData.state = "Con sobrepeso";
      imcData.color = "yellow"
    } else if (imc > 30 || imc < 39.9) {      
      imcData.state = "Obeso";
      imcData.color = "red"
    } else if (imc > 40) {      
      imcData.state = "Obesidad extrema o de alto riesgo";
      imcData.color = "red"
    }          
    
    result.style.color = imcData.color
    result.innerHTML = imc
    
    imcData.id = getRandomInt()   
    insertLocalStorage(imcData) 

  } else {
    alert("Llena los campos faltantes");
  }
};


const getRandomInt = () => Math.floor(Math.random() * (999 - 1)) * 1

const insertLocalStorage = (data) => {
    if(localStorage.getItem('imcList')){
        const imcList =  JSON.parse(localStorage.getItem('imcList'))
        imcList.push(data)
        localStorage.setItem('imcList',JSON.stringify(imcList))
    }else{
        const imcList = []
        imcList.push(data)
        localStorage.setItem('imcList',JSON.stringify(imcList))
    }
}