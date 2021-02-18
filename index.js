//Call SMTP CDN
const smtpScript = document.createElement('script');  
smtpScript.setAttribute('src','https://smtpjs.com/v3/smtp.js');
document.head.appendChild(smtpScript);

//Call html2canvas CDN
const html2canvasScript = document.createElement('script');  
html2canvasScript.setAttribute('src','https://html2canvas.hertzen.com/dist/html2canvas.min.js');
document.head.appendChild(html2canvasScript);

//Screenshot website image as data base64
let screenshotImageBase64;

//++++++++++++++++++++++ Start Code ++++++++++++++++++++++ 

//DOM Side
const createElementsWithStyle = () => {

  document.body.innerHTML += `
    <button id="screenshotButton" onMouseOver="this.style.backgroundColor = '#04334e'" 
    style="position: fixed; bottom: 5px; right: 10px;
    background-color: #0290e2; border: none; color: white;
    padding: 20px; text-align: center; text-decoration: none;
    display: inline-block; font-size: 16px; margin: 4px 2px;
    cursor: pointer; border-radius: 5px; outline: none;" 
    type="submit" onMouseOver="this.style.backgroundColor = '#04334e'"
    onMouseOut="this.style.backgroundColor = '#0290e2'" >Click For Help</button>
  `
}
createElementsWithStyle();

//Get Data From Json File 
const readDataFromJsonFileAndSendMail = () => {

  fetch("setting.json")
  .then(response => response.json())
  .then(setting => sendEmail(setting));

}


//Send Mail Function
const sendEmail = (setting) => {
  //send email via smtp protocol
  Email.send({
      Host: "smtp.gmail.com",
      Username : setting.Username,
      Password : setting.Password,
      To : setting.To,
      From : setting.From,
      Subject : setting.Subject,
      Body : setting.Description,
      Attachments : [
          {
              name : "ClickForHelp.png",
              data : screenshotImageBase64,
              //path : "link "
          }],

      }).then(
          message => alert(`mail sent successfully \n ${message}`)
      );
} 

//ScreenShot Side 
const takeScreenShot = async () => {

  //Hide Button
  screenshotButton.style.display = 'none';
  //Take Screenshot
  html2canvas(document.body).then(canvas => {
    screenshotImageBase64 = canvas.toDataURL('image/png');
    
    //Show Button 
    screenshotButton.style.display = '';

    //Read data from Json Fil and Send Email
    readDataFromJsonFileAndSendMail();  
});
}

screenshotButton.onclick = () => takeScreenShot();




