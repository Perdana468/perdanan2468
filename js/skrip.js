const cardBtn = document.querySelector(".card-button"),
  cardInput = document.querySelector(".card-input"),
  chatOver = document.querySelector(".kata-overlay");

cardBtn.onclick = () => {
  if (cardInput.value == "" || cardInput.value == null) {
    return alert("Tolong masukan namamu untuk menghubungi Kak Gem!");
  }
  pikirKata();
};

async function pikirKata() {
  cardBtn.innerText = "Menghubungi Kak Gem..";
  let paham = "";
  await fetch("katakata.json")
    .then((res) => res.json())
    .then((data) => {
      paham = data[Math.round(Math.random() * data.length)];
    })
    .catch((err) => console.error(err));
  tanya(paham);
}

function tanya(kakgem) {
  let chats = document.querySelectorAll(".kata-overlay > div > div p");
  let chatsBox = document.querySelectorAll(".kata-overlay > div");
  let date = new Date();
  let clock = date.getHours() + "." + date.getMinutes();

  document.querySelectorAll(".clock").forEach((el) => (el.innerText = clock));
  console.log(chats);
  chats[0].innerText = `marsha, kamu ada gak kata-kata yang bisa bikin ${cardInput.value} tertampar? `;
  chats[1].innerText = `kamu kenapa lagi sedih ya?
  ${kakgem}
  KAMU HARUS KUAT YA KAN UDAH ADA AKU ;)`;
  // Animation
  let tl = gsap.timeline();
  tl.set(chatsBox, { opacity: 0, y: 20 });
  tl.to(chatOver, { height: document.body.clientHeight });
  tl.to(chatsBox, { opacity: 1, y: 0, stagger: 1.2, ease: "back" });
}
