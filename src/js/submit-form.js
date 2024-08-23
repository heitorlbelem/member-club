import { getClientById } from "./services/get-client-by-id"

const form = document.querySelector("form")
const clientId = document.getElementById("client-id")

form.onsubmit = async (event) => {
  event.preventDefault()
  try {
    const id = clientId.value
    if(!id) {
      return alert("É necessário informar um ID")
    }
    const { name, clientSince } = await getClientById({ id })

    fillHeroInformation({ name, clientSince })

  } catch(error) {
    console.error(error)
    return alert("Não foi possível encontrar o cliente")
  }
}

function fillHeroInformation({ name, clientSince }) {
  const clientInfo = document.getElementById("client-info")
  const clientName = clientInfo.querySelector("h1")
  const createdAt = clientInfo.querySelector("p")

  clientName.innerText = name
  createdAt.innerHTML = `Cliente desde ${clientSince}`
}