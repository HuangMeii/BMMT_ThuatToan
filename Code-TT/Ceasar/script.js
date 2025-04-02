function encryptText() {
  let text = document.getElementById("text").value;
  let shift = parseInt(document.getElementById("shift").value);
  let encrypted = caesarCipher(text, shift);
  document.getElementById("encryptedText").value = encrypted;
}

function decryptText() {
  let encryptedText = document.getElementById("encryptedText").value;
  let shift = parseInt(document.getElementById("shift").value);
  let decrypted = caesarCipher(encryptedText, 26 - shift);
  document.getElementById("decryptedText").value = decrypted;
}

function caesarCipher(text, shift) {
  return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
          let code = char.charCodeAt(0);
          let offset = char >= 'A' && char <= 'Z' ? 65 : 97;
          return String.fromCharCode(((code - offset + shift) % 26) + offset);
      }
      return char;
  }).join('');
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.1)";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.body.style.backgroundColor = "white";
}