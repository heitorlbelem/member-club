const loyaltyCard = document.getElementById("loyalty-card")
const cutsList = loyaltyCard.querySelector("ul[role='list']")

document.addEventListener("DOMContentLoaded", () => {
  for (let index = 0; index < 10; index++) {
    const item = document.createElement("li")
    item.classList.add("flex", "items-center", "justify-center")

    if(index == 9) {
      item.innerHTML = `<img src="./src/assets/icons/gift.svg" alt="">`
    }

    cutsList.appendChild(item)
  }
})