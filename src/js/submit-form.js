import { getClientById } from "./services/get-client-by-id"

const form = document.querySelector("form")
const clientId = document.getElementById("client-id")
const loyalty = document.getElementById("loyalty-card")
const cutsList = loyalty.querySelector("ul[role='list']")
const idSpan = document.querySelector("#loyalty-card header span")
const progress = document.getElementById("progress-count")
const pendingCuts = document.getElementById("pending-cuts")
const currentProgressBar =  document.getElementById("current-progress-bar")
const history = document.getElementById("history")
const historyHeader = history.querySelector("header p")
const historyList = history.querySelector("ul[role='list']")

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
    fillHistory({ appointmentHistory })
    const { totalCuts } = loyaltyCard
    fillProgress({ totalCuts })

    if(appointmentHistory.length === 10) {
      return alert("Parabéns! Seu próximo corte é gratuito!")
    }
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
  currentProgressBar.style.setProperty("--progress-percentage", `${totalCuts * 10}%`)
}

function fillHistory({ appointmentHistory }) {
  console.log(appointmentHistory)
  const totalCuts = appointmentHistory.length
  historyHeader.innerText = `${totalCuts} cortes`

  appointmentHistory.forEach(el => {
    console.log(el)

    const li = document.createElement("li")
    li.classList.add("flex", "items-center", "justify-between")
    const p = document.createElement("p")
    p.classList.add("subtitle-sm", "flex", "flex-column")
    console.log(el)
    p.innerHTML = `${el.date} <small>${el.time}</small>`
    const check = document.createElement("span")
    check.innerHTML = "<img src='./src/assets/icons/check.svg' alt=''>"
    li.append(p, check)
    historyList.append(li)
  })
}
