
/*let username = window.prompt("Enter username: ");
while (username === "" || username === null) {
    username = window.prompt("Username must be entered!: ");
}*/
let currentTable;
let sidebar = document.querySelector('.sidebar-content');
let sidebarMain=document.querySelector('.sidebar');
let scrollDownBtn=document.querySelector('.scroll-down-btn');
let newchat= document.querySelector('.newchat');
let newchatsideBar = document.querySelector('.sidebar-newchat');
let loginBtn=document.querySelector('.authentication');
let logout=document.querySelector('.logout');
let opensidebarBtn=document.querySelector('.toggle-sidebar');
let body=document.querySelector('.body');
let loginPrompt = document.querySelector('.login-prompt');
let logoWelcome=document.querySelector('.logo-welcome');

function chatNameEncoder(name) {
    let str = name.split(" ");
    let newstr = str.join("_");
    return newstr;
  }
  function chatNameDecoder(name) {
    let str = name.split("_");
    let newstr = str.join(" ");
    return newstr;
  }
function escapeHTML(html) {
    return html.replace(/[&<"']/g, function(match) {
        switch(match) {
            case "&":
                return "&amp;";
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case '"':
                return "&quot;";
            case "'":
                return "&#39;";
        }
    });
}

function isLoggedIn() {
    
    // Get all cookies for the current document
    const cookies = document.cookie.split(';');

    // Loop through each cookie
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        // Check if the cookie starts with "loggedIn="
        if (cookie.startsWith('loggedIn=')) {
          //console.log('cookie found!!!!!!')
            // If "loggedIn" cookie exists and its value is "true", user is logged in
            return cookie.substring('loggedIn='.length) === 'true';
        }
    }
    console.log("Cookie not found!!!!!")
    // If "loggedIn" cookie is not found, user is not logged in
    return false;
}

// Function to update login status
function updateLoginStatus() {
    let interactionContainer = document.getElementById('interaction-container');
    if (isLoggedIn()) {
        logout.classList.remove('hidden');
        body.classList.remove('hidden');
        loginPrompt.classList.add('hidden');
        loginBtn.classList.add('hidden');
    } 
    else
    {
        loginBtn.classList.remove('hidden');
        logout.classList.add('hidden');
        body.classList.add('hidden');
        loginPrompt.classList.remove('hidden');
    }
}
// Example usage
updateLoginStatus();

// Check login status periodically
setInterval(updateLoginStatus, 200);
    function copyText() {
        let copymessageBtn = document.querySelectorAll('.copy-btn');
    
    
        copymessageBtn.forEach(button => {
            button.addEventListener('click', () => {
                //console.log('Clicked copy button');
                // Find the parent response message element
                const responseMessage = button.closest('.response-message');
    
                // Get the message content
                const messageContent = responseMessage.querySelector('.message').innerText;
    
                // Create a temporary textarea element
                const textarea = document.createElement('textarea');
                textarea.value = messageContent;
    
                // Append the textarea to the document
                document.body.appendChild(textarea);
    
                // Select the textarea content
                textarea.select();
    
                // Copy the selected content to the clipboard
                document.execCommand('copy');
    
                // Remove the textarea from the document
                document.body.removeChild(textarea);
    
                // Provide visual feedback (optional)
                button.innerHTML = '<span class="copy-msg flex justify-center items-center">Copied!</span>'; // Change button text to indicate copy operation
                setTimeout(() => {
                    button.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5C10.8954 3.5 10 4.39543 10 5.5H14C14 4.39543 13.1046 3.5 12 3.5ZM8.53513 3.5C9.22675 2.3044 10.5194 1.5 12 1.5C13.4806 1.5 14.7733 2.3044 15.4649 3.5H17.25C18.9069 3.5 20.25 4.84315 20.25 6.5V18.5C20.25 20.1569 19.1569 21.5 17.25 21.5H6.75C5.09315 21.5 3.75 20.1569 3.75 18.5V6.5C3.75 4.84315 5.09315 3.5 6.75 3.5H8.53513ZM8 5.5H6.75C6.19772 5.5 5.75 5.94772 5.75 6.5V18.5C5.75 19.0523 6.19772 19.5 6.75 19.5H17.25C18.0523 19.5 18.25 19.0523 18.25 18.5V6.5C18.25 5.94772 17.8023 5.5 17.25 5.5H16C16 6.60457 15.1046 7.5 14 7.5H10C8.89543 7.5 8 6.60457 8 5.5Z" fill="currentColor"></path></svg>'; // Reset button text after a short delay
                }, 1000); // Adjust delay as needed
            });
        });
    }
    function textToSpeechAloud() {
        let textToSpeechBtn = document.querySelectorAll('.read-aloud');
        textToSpeechBtn.forEach(button => {
            button.addEventListener('click', () => {
                //console.log('Clicked read aloud button');
                // Find the parent response message element
                const responseMessage = button.closest('.response-message');
                // Get the message content
                const messageContent = responseMessage.querySelector('.message').innerText;
    
                // Check if speech synthesis is already in progress
                if (!window.speechSynthesis.speaking) {
                    button.innerHTML = `<p class="">Speaking...</p>`;
                    // Create SpeechSynthesisUtterance object
                    const utterance = new SpeechSynthesisUtterance();
                    // Set text to be spoken
                    utterance.text = messageContent;
                    // Optionally, configure other parameters like language and rate
                    utterance.lang = 'en-US'; // Set language to English (United States)
                    utterance.rate = 1.0; // Set speech rate (1.0 is the default)
    
                    // Speak the text using Speech Synthesis API
                    const synth = window.speechSynthesis;
                    synth.speak(utterance);
    
                    // Handle speech synthesis end event
                    utterance.onend = () => {
                        button.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 4.9099C11 4.47485 10.4828 4.24734 10.1621 4.54132L6.67572 7.7372C6.49129 7.90626 6.25019 8.00005 6 8.00005H4C3.44772 8.00005 3 8.44776 3 9.00005V15C3 15.5523 3.44772 16 4 16H6C6.25019 16 6.49129 16.0938 6.67572 16.2629L10.1621 19.4588C10.4828 19.7527 11 19.5252 11 19.0902V4.9099ZM8.81069 3.06701C10.4142 1.59714 13 2.73463 13 4.9099V19.0902C13 21.2655 10.4142 22.403 8.81069 20.9331L5.61102 18H4C2.34315 18 1 16.6569 1 15V9.00005C1 7.34319 2.34315 6.00005 4 6.00005H5.61102L8.81069 3.06701ZM20.3166 6.35665C20.8019 6.09313 21.409 6.27296 21.6725 6.75833C22.5191 8.3176 22.9996 10.1042 22.9996 12.0001C22.9996 13.8507 22.5418 15.5974 21.7323 17.1302C21.4744 17.6185 20.8695 17.8054 20.3811 17.5475C19.8927 17.2896 19.7059 16.6846 19.9638 16.1962C20.6249 14.9444 20.9996 13.5175 20.9996 12.0001C20.9996 10.4458 20.6064 8.98627 19.9149 7.71262C19.6514 7.22726 19.8312 6.62017 20.3166 6.35665ZM15.7994 7.90049C16.241 7.5688 16.8679 7.65789 17.1995 8.09947C18.0156 9.18593 18.4996 10.5379 18.4996 12.0001C18.4996 13.3127 18.1094 14.5372 17.4385 15.5604C17.1357 16.0222 16.5158 16.1511 16.0539 15.8483C15.5921 15.5455 15.4632 14.9255 15.766 14.4637C16.2298 13.7564 16.4996 12.9113 16.4996 12.0001C16.4996 10.9859 16.1653 10.0526 15.6004 9.30063C15.2687 8.85905 15.3578 8.23218 15.7994 7.90049Z" fill="currentColor"></path></svg>`;
                    };
                }
            });
        });
    }
    
    function scrollToBottom() {
        let interactionContainer = document.getElementById('interaction-container');
        interactionContainer.scrollTop = interactionContainer.scrollHeight;
      }
    
    

function summarizer(text) {
    // Split the string into an array of words
    const words = text.trim().split(/\s+/);
    
    // Extract the first four words
    const firstFourWords = words.slice(0, 4).join(' ');
    
    return firstFourWords;
}

  //All important variables declared here 
 
  newchat.addEventListener('click',()=>{
    newchat.classList.add('selected');
    let name = prompt("Enter new chat name");
    while(name.length==0 || name==null)
    {
      name = prompt("Chat name cannot be empty!");
    }

    async function createNewPrompt()
    {
      try{
        let url='http://localhost:8000/app/newchat';
        let response=await fetch(url,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({name:chatNameEncoder(name)})
      });
      let data=await response.json();
      //console.log(data);
      const addSummary = `<div class="summary rounded hover:cursor-pointer h-fit text-center p-2 my-1"><p class="hover:text-white transition-all duration-200">${data}</p>
          </div>`;
          sidebar.insertAdjacentHTML('afterbegin', addSummary);
      }
      
      catch(err)
      {
        console.log(err);
      }
    }
    createNewPrompt();
   // Reload the current page, bypassing the cache
location.reload();
fetchCurrentTable()
    
  });
  newchatsideBar.addEventListener('click',()=>{
    newchatsideBar.classList.add('selected');
    let name = prompt("Enter new chat name");
    while(name.length==0 || name==null)
    {
      name = prompt("Chat name cannot be empty!");
    }
    async function createNewPrompt()
    {
      try{
        let url='http://localhost:8000/app/newchat';
        let response=await fetch(url,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({name:chatNameEncoder(name)})
      });
      let data=await response.json();
      //console.log(data);
      const addSummary = `<div class="summary rounded hover:cursor-pointer h-fit text-center p-2 my-1"><p class="hover:text-white transition-all duration-200">${data}</p>
          </div>`;
          sidebar.insertAdjacentHTML('afterbegin', addSummary);
      }
      
      catch(err)
      {
        console.log(err);
      }
    }
    createNewPrompt();
   // Reload the current page, bypassing the cache
location.reload();
fetchCurrentTable()
    
  });

async function changeTable(tableName) {
    let url = `http://localhost:8000/app/changeTable`;
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tableName: tableName })
        });
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        // Reload the current page, bypassing the cache
        location.reload(true);
    } catch (err) {
        console.log(err);
    }
}

async function fetchCurrentTable()
{
    let url='http://localhost:8000/app/currentTable'
    try{
        let response = await fetch(url);
        let jsonResponse = await response.json();
        //console.log(jsonResponse.res);
        let tables=document.querySelectorAll('.summary-wrapper');
        tables.forEach(element=>{
            if(element.id==jsonResponse.res)
            {
                element.classList.add('bg-[rgb(63,63,63)]');
                element.classList.remove('bg-opacity-50');
            }
        })
    }
    catch(error)
    {
        console.log(error);
    }
}

fetchCurrentTable();

async function fetchOldTableNames()
{
    let url='http://localhost:8000/app/getprev/tables'
    try{
        let response = await fetch(url);
        let jsonResponse = await response.json();
        //console.log(jsonResponse);
        let defaultTable=document.getElementById('default');
        if(jsonResponse.length > 0) {
            defaultTable.classList.add('hidden');
        }    
        for(let i=0; i<jsonResponse.length; i++) {
            //hide login and register details from users
            if(jsonResponse[i]!='authentication' && jsonResponse[i]!='new_chat')
            {
                if(jsonResponse[i]==`new_chat`)
                {
                    const addSummary = `<div class="w-full flex items-center"><button id="table${i}" type="button" value="${jsonResponse[i]}" class="flex justify-between summary rounded hover:cursor-pointer h-fit text-center p-2 my-1">${chatNameDecoder(jsonResponse[i])+` (default table)`}</button><button id=${jsonResponse[i]} class="dropdown-select hover:cursor-pointer rounded-full z-60" data-state="closed"></div>`;
                    sidebar.insertAdjacentHTML('beforeend', addSummary);
                }
                else{
                    const addSummary = `<div id=${jsonResponse[i]} class="my-1 w-full flex items-center summary-wrapper justify-between rounded transition-all duration-150 hover:cursor-pointer"><button id="table${i}" type="button" value="${jsonResponse[i]}" class="flex justify-between summary rounded hover:cursor-pointer h-fit text-center p-2 my-1">${chatNameDecoder(jsonResponse[i])}</button><button id=${jsonResponse[i]} class="dropdown-select hover:cursor-pointer rounded-full z-60" data-state="closed"><button id=${jsonResponse[i]} class="delete-chat-btn p-2 "><svg class="hover:fill-red-700 transition-fill duration-150" fill="white" width="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg></button></button></div>`;
                    sidebar.insertAdjacentHTML('beforeend', addSummary);
                }
                
            }
        }
    }
    catch(error)
    {
        console.log(error);
    }
    dynamicTableChange();
    deleteTable();
}

function deleteTable() {
    try {
        let deleteChat=document.querySelectorAll('.delete-chat-btn');
       //console.log(deleteChat.length);
        //console.log("func called!!");
        deleteChat.forEach(element => {
            console.log("element found!!!"+ element);
            element.addEventListener('click', () => {
                console.log("Delete button clicked!");
                let deleteconfirmation=confirm('Are you sure you want to delete');
                async function deleteTableAsync() {
                    let tableName = element.id;
                    let url = 'http://localhost:8000/app/deleteTable';
                    try {
                        let response = await fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ tableName: tableName })
                        });
                        // Reload the current page, bypassing the cache
                    } catch (error) {
                        console.log(error);
                    }
                }
                if(deleteconfirmation)
                {
                    deleteTableAsync();
                    location.reload();
                    fetchCurrentTable();
                }
            })
        });
    } catch (err) {
        console.log(err);
    }
    
   // console.log(currentTable) 
}


//console.log(currentTable);
async function fetchOldData() {
    let sidebar = document.querySelector('.sidebar-content');
    let interactionContainer = document.getElementById('interaction-container');
    let logoWelcome=document.querySelector('.logo-welcome');
    
    const url = 'http://localhost:8000/app/getprev';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch response from server.');
        }

        const jsonResponse = await response.json();
        if(jsonResponse.length > 0) {
            interactionContainer.classList.remove('hidden');
            logoWelcome.classList.add('hidden');
        }
        //console.log(jsonResponse);
        
        let interaction;
        for (let i = 0; i < jsonResponse.length; i++) {
                interaction = `<div class="response-body min-w-1/3 flex justify-center flex-col gap-2">
                <div class="user-prompt p-2 flex flex-col items-start">
                    <div class="prompt"><p class="font-bold text-lg">You</p></div>
                ${'\n'+escapeHTML(jsonResponse[i].prompt)}
                </div>
                <div class="response-message items-start w-full flex flex-col p-2">
                    <p class="font-bold text-lg">JARVIS</p>
                        <div class="message w-full flex flex-col">
                            ${jsonResponse[i].response}
                            <div class="copy-btn-wrapper items-center flex">
                            <span class="">
                                <button title="Copy Response" class="copy-btn transition-all duration-200 hover:bg-white hover:text-black flex items-center gap-1.5 rounded-md p-1 text-xs text-token-text-tertiary hover:text-token-text-primary">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5C10.8954 3.5 10 4.39543 10 5.5H14C14 4.39543 13.1046 3.5 12 3.5ZM8.53513 3.5C9.22675 2.3044 10.5194 1.5 12 1.5C13.4806 1.5 14.7733 2.3044 15.4649 3.5H17.25C18.9069 3.5 20.25 4.84315 20.25 6.5V18.5C20.25 20.1569 19.1569 21.5 17.25 21.5H6.75C5.09315 21.5 3.75 20.1569 3.75 18.5V6.5C3.75 4.84315 5.09315 3.5 6.75 3.5H8.53513ZM8 5.5H6.75C6.19772 5.5 5.75 5.94772 5.75 6.5V18.5C5.75 19.0523 6.19772 19.5 6.75 19.5H17.25C18.0523 19.5 18.25 19.0523 18.25 18.5V6.5C18.25 5.94772 17.8023 5.5 17.25 5.5H16C16 6.60457 15.1046 7.5 14 7.5H10C8.89543 7.5 8 6.60457 8 5.5Z" fill="currentColor"></path>
                                    </svg>
                                </button>
                            </span>
                            <span class="">
                                <button title="Speak the response" class="read-aloud transition-all duration-200 flex hover:bg-white hover:text-black items-center gap-1.5 rounded-md p-1 text-xs text-token-text-tertiary hover:text-token-text-primary md:group-hover:visible md:group-[.final-completion]:visible"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-md"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 4.9099C11 4.47485 10.4828 4.24734 10.1621 4.54132L6.67572 7.7372C6.49129 7.90626 6.25019 8.00005 6 8.00005H4C3.44772 8.00005 3 8.44776 3 9.00005V15C3 15.5523 3.44772 16 4 16H6C6.25019 16 6.49129 16.0938 6.67572 16.2629L10.1621 19.4588C10.4828 19.7527 11 19.5252 11 19.0902V4.9099ZM8.81069 3.06701C10.4142 1.59714 13 2.73463 13 4.9099V19.0902C13 21.2655 10.4142 22.403 8.81069 20.9331L5.61102 18H4C2.34315 18 1 16.6569 1 15V9.00005C1 7.34319 2.34315 6.00005 4 6.00005H5.61102L8.81069 3.06701ZM20.3166 6.35665C20.8019 6.09313 21.409 6.27296 21.6725 6.75833C22.5191 8.3176 22.9996 10.1042 22.9996 12.0001C22.9996 13.8507 22.5418 15.5974 21.7323 17.1302C21.4744 17.6185 20.8695 17.8054 20.3811 17.5475C19.8927 17.2896 19.7059 16.6846 19.9638 16.1962C20.6249 14.9444 20.9996 13.5175 20.9996 12.0001C20.9996 10.4458 20.6064 8.98627 19.9149 7.71262C19.6514 7.22726 19.8312 6.62017 20.3166 6.35665ZM15.7994 7.90049C16.241 7.5688 16.8679 7.65789 17.1995 8.09947C18.0156 9.18593 18.4996 10.5379 18.4996 12.0001C18.4996 13.3127 18.1094 14.5372 17.4385 15.5604C17.1357 16.0222 16.5158 16.1511 16.0539 15.8483C15.5921 15.5455 15.4632 14.9255 15.766 14.4637C16.2298 13.7564 16.4996 12.9113 16.4996 12.0001C16.4996 10.9859 16.1653 10.0526 15.6004 9.30063C15.2687 8.85905 15.3578 8.23218 15.7994 7.90049Z" fill="currentColor"></path></svg></button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>`;
            
            interactionContainer.insertAdjacentHTML('beforeend', interaction);
            copyText();
            textToSpeechAloud();
            // Prompt summary to be appended to the sidebar
            /*const addSummary = `<div class="summary hover:cursor-pointer h-fit text-center p-2 my-1">
                <p class="hover:text-white transition-all duration-200">${summarizer(jsonResponse[i].prompt)}</p>
            </div>`;
            sidebar.insertAdjacentHTML('afterbegin', addSummary);*/
            document.getElementById('prompt').focus();
            
            scrollToBottom();
        }
    } catch (error) {
        console.error('Error:', error.message);
        // Handle error if necessary
    }
}

fetchOldData();
fetchOldTableNames();

function dynamicTableChange()
{
    let tableElement = document.querySelectorAll('.summary-wrapper');
    //console.log(tableElement.length);
tableElement.forEach(element => {
    //console.log('an element');
    element.addEventListener('click', () => {
        let value = element.id;
        element.classList.add('active');
        //console.log(value);
        changeTable(value);
    });
    fetchCurrentTable();
});
}
//setTimeout(dynamicTableChange,500);
//setTimeout(deleteTable,200);
