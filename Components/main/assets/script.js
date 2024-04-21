import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

let loadInterval

function loader(element){
  element.textContent ="";
  loadInterval = setInterval(()=>{
    element.textContent +="."
    if (element.textContent==="...."){
      element.textContent ="";
    }
  },300)
}

function typeText(element,text) {
  let index = 0;
  let interval = setInterval(()=>{
    if (index < text.length){
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  },20)
}

function generateUniqueID(){
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexaDecimal = randomNumber.toString(16);
  return `id-${timestamp}-${hexaDecimal}`
}

function chatStripe(isAI,value,uniqueID){
  return (
    `
    <div class="wrapper ${isAI && "ai"}">
      <div class="chat">
        <div class="profile">
          <img src="${isAI ? bot : user}" alt="${isAI ? "bot" : "user"}">
        </div>
        <div class="message" id="${uniqueID}">
          ${value}
        </div>
      </div>
    </div>
    `
  )
}

const handleSubmit = async(e) => {
  e.preventDefault();
  const data = new FormData(form);

  form.reset()
  //user stripe

  chatContainer.innerHTML +=chatStripe(false,data.get("prompt"))

  //bot stripe

  const uniqueID = generateUniqueID()
  chatContainer.innerHTML += chatStripe(true,"",uniqueID)

  //focus scroll to the bottom

  chatContainer.scrollTop = chatContainer.scrollHeight

  //take the message div
  const messageDiv = document.getElementById(uniqueID)

  loader(messageDiv)

  //capturing the response

  const response = await fetch("http://127.0.0.1:8000/api/",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      prompt:data.get("prompt")
    })
  })

  clearInterval(loadInterval)
  messageDiv.innerHTML = ""

  if (response.ok) {
    const jsonData = await response.json();
    console.log(jsonData); // Log the response object to inspect its structure
  
    // Display the response in the chat interface
    const resp = jsonData.response;
    typeText(messageDiv, resp);
  } else {
    const err = await response.text();
    messageDiv.innerHTML = "Something went wrong";
    alert(err);
  }
  
}

form.addEventListener('submit',handleSubmit);
form.addEventListener('keyup',(e)=>{
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
