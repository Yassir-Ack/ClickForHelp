// get params value from script...
const {email, password, receiver} = cfh.attributes;

// Array.prototype.forEach.call(cfh.attributes, x => console.log(x.value));

//Call SMTP CDN
const smtpScript = document.createElement('script');  
smtpScript.setAttribute('src','https://smtpjs.com/v3/smtp.js');
document.head.appendChild(smtpScript);

//Call html2canvas CDN
const html2canvasScript = document.createElement('script');  
html2canvasScript.setAttribute('src','https://html2canvas.hertzen.com/dist/html2canvas.min.js');
document.head.appendChild(html2canvasScript);

//Call sweetalert CDN
const sweetalertScript = document.createElement('script');  
sweetalertScript.setAttribute('src','https://unpkg.com/sweetalert/dist/sweetalert.min.js');
document.head.appendChild(sweetalertScript);

//Screenshot website image as data base64
let screenshotImageBase64;

//++++++++++++++++++++++ Start Code ++++++++++++++++++++++ 

//DOM Side
const createElementsWithStyle = () => {

  document.body.innerHTML += `
  <style>.button--primary{position: fixed;bottom: 5px;right: 10px;padding: 10px 22px;background-color: #B94B4C;color: white;text-decoration: none;cursor: pointer;border: 0;transition: all .3s ease-out;}.button--primary:after {position: absolute;content: "";width: 1rem;height: 1rem;background-color: #FFE4E4;right: -0.4rem;top: -0.4rem;transition: all 0.3s ease-out;}.button--primary:hover {text-shadow: 0px 1px 1px #B94B4C;color: white;background-color:#FE6A6B;transform: translate3D(0, -3px, 0);}.button--primary:hover::after {transform: rotate(90deg);}</style><a id="screenshotButton" class="button--primary">Click for help </a>
  `
}
createElementsWithStyle();

//Send Mail Function
const sendEmail = (user, description) => {

  //Check if the user has a description 
  description.trim() ? description = `, and i get the error, ${description}. <br/> Thank you for helping me.` : 
                       description = `. I don't have any idea to descript about this error. <br/> Thank you for helping me.`;

  //send email via smtp protocol
  Email.send({
      Host: "smtp.gmail.com",
      Username : email.value,
      Password : password.value,
      To : receiver.value,
      From : email.value,
      Subject : "Click for help",
      Body : `Hello I'm ${user} ${description}`,
      Attachments : [
          {
              name : "ClickForHelp.png",
              data : screenshotImageBase64,
              //path : "link "
          }],

      }).then(
        swal(`Good job!`, `Keep calm. We gonna help you!`, "success")
      );
} 

//ScreenShot Side 
const takeScreenShot = async (user, description) => {

  //Hide Button
  screenshotButton.style.display = 'none';

  //Take Screenshot
  html2canvas(document.body).then(canvas => {
    //Convert screenshot image to Image Base 64
    screenshotImageBase64 = canvas.toDataURL('image/png');
    
    //Show Button 
    screenshotButton.style.display = '';

    //Send Email 
    sendEmail(user, description);
  }); 
}

// screenshotButton.onclick = () => takeScreenShot();

//Screenshot button on click event  
screenshotButton.onclick = () => {
  swal("Who are you ?", { content: "input" })
  .then((user) => {

    user.trim() ? swal(`Please ${user} could you describe the error here:`, { content: "input", })
    .then((description) => {

      takeScreenShot(user, description);
      }) : swal("Sorry i can't help anonymous person", "You should to enter your name!! try again", "warning");
  });
}

//+++++ Keybindings Part +++++

//Togle display function
const cfhDisplayToggle = () => {
  //toggle button condition
  screenshotButton.style.display == 'none' ? 
  screenshotButton.style.display = '' : screenshotButton.style.display = 'none';
}

//Keyboard event (Ctrl + Alt + H)
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.altKey && (event.key === "h" || event.key === "H" )) {
      cfhDisplayToggle();
    }
});

