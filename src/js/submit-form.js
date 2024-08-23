import { getClientById } from "./services/get-client-by-id"

const form = document.querySelector("form")
const clientId = document.getElementById("client-id")
const loyalty = document.getElementById("loyalty-card")
const cutsList = loyalty.querySelector("ul[role='list']")
const idSpan = document.querySelector("#loyalty-card header span")
const progress = document.getElementById("progress-count")
const pendingCuts = document.getElementById("pending-cuts")

form.onsubmit = async (event) => {
  event.preventDefault()

  try {
    const id = clientId.value
    if(!id) {
      return alert("É necessário informar um ID")
    }
    const {
      name,
      clientSince,
      appointmentHistory,
      loyaltyCard
    } = await getClientById({ id })

    fillHeroInformation({ name, clientSince })
    fillLoyaltyCard({ id, loyaltyCard })

    const { totalCuts } = loyaltyCard
    fillProgress({ totalCuts })

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

function fillLoyaltyCard({ id, loyaltyCard }) {
  const cutsDone = loyaltyCard.totalCuts
  idSpan.innerText = `ID: ${id}`
  
  for (let i = 0; i < cutsDone; i++) {
    const item = cutsList.querySelector(`li:nth-child(${i + 1})`)
    item.innerHTML = `<img src="./src/assets/icons/pincheck.svg" alt="" />`
  }
}

function fillProgress({ totalCuts }) {
  progress.innerText = `${totalCuts} de 10`
  pendingCuts.innerHTML = `<strong>${10 - totalCuts}</strong> cortes restantes`

}