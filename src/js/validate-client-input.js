const clientInput = document.getElementById("client-id")
clientInput.oninput = formatInput

function formatInput() {
  let cleanedValue = clientInput.value.replace(/\D/g, "");
  if (cleanedValue.length > 12) {
    cleanedValue = cleanedValue.slice(0, 12);
  }

  const formattedValue = cleanedValue.replace(/(\d{3})(?=\d)/g, '$1-');
  clientInput.value = formattedValue;

  if (clientInput.value.length >= 15) {
    clientInput.setAttribute('maxlength', 15);
  } else {
    clientInput.removeAttribute('maxlength');
  }
}