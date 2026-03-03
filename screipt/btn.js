const creatElement = (arr) => {
  const htmlElements = arr.map((el) => `<span class = 'btn'> ${el} </span>`);
  return htmlElements.join(" ");
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// const synnouns = ["hello", "hi", "normal"];
// creatElement(synnouns);

const loadLevel = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLevel(data.data));
};
loadLevel();
const loadWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  manageLoading(true);
  fetch(url)
    .then((res) => res.json())
    .then((word) => {
      const clickBtn = document.getElementById(`level-btn-${id}`);
      // console.log(clickBtn);
      // remove all acitve class/
      displayBtn();
      // jekhane click krbo setar active class ta suru dekhabe
      clickBtn.classList.add("active");
      displayWord(word.data);
    });
};

// modal
const loadWordDatails = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayModal(data.data));
};

const manageLoading = (status) => {
  if (status == true) {
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("word-conatiner").classList.add("hidden");
  } else {
    document.getElementById("word-conatiner").classList.remove("hidden");
    document.getElementById("loading").classList.add("hidden");
  }
};

const displayModal = (modal) => {
  console.log(modal);
  const datailsContainer = document.getElementById("datails-container");
  datailsContainer.innerHTML = `
  <div>
        <h2>${modal.word} (<i class="fa-solid fa-microphone-lines"></i> ${modal.pronunciation})</h2>
      </div>
      <div>
        <h2>meaning</h2>
        <p>${modal.meaning}</p>
      </div>

      <div>
        <h2>${modal.sentence}</h2>
        
      </div>

      <div>
        <h2>সমার্থক শব্দ গুলো</h2>
      </div>
      <div>
        <h2>synonem</h2>
        <div class = >${creatElement(modal.synonyms)}</div> 
      </div>
  `;
  document.getElementById("my_modal_5").showModal();
};
const displayWord = (words) => {
  const wordContainer = document.getElementById("word-conatiner");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
     <div class="text-center col-span-full p-10 rounded-xl shadow-2xl bg-sky-50 space-y-2 font-bangla">
    <img class="block mx-auto" src="./assets/alert-error.png" alt="">
    <h2 class="text-sm text-gray-600 font-bold">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h2>
    <h1 class="text-2xl font-bold">নেক্সট Lesson এ যান।</h1>
  </div>
    `;
    manageLoading(false);
    return;
  }
  for (let word of words) {
    console.log(word);
    const newWord = document.createElement("div");
    newWord.innerHTML = `
    <div class="bg-white rounded-xl shadow-sm px-5 text-center py-12 space-y-2 ">
    <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া  যাইনি "}</h2>
    <p class="font-semibold">Meaning /Pronounciation</p>
    <div class="text-2xl font-medium font-bangla">${word.meaning ? word.meaning : "অর্থ  পাওয়া  যাইনি "} /${word.pronunciation ? word.pronunciation : "pronunciation  পাওয়া  যাইনি"}</div>
    <div class="flex  items-center justify-between">
      <button onclick = "loadWordDatails(${word.id})" class="btn bg-[#374957 10] hover:bg-[#37495780]"><i class="fa-solid fa-circle-info"></i></button>
      <button onclick= "pronounceWord('${word.word}')" class="btn bg-[#374957 10] hover:bg-[#37495780]"><i class=" fa-solid fa-volume-high"></i></button>
    </div>
  </div>
    `;
    wordContainer.append(newWord);
  }
  manageLoading(false);
};

// remove btn color and add:
const displayBtn = () => {
  const selectBtn = document.querySelectorAll(".lever-btn");
  // by dufult remove all acitve class
  selectBtn.forEach((btn) => btn.classList.remove("active"));
};

const displayLevel = (level) => {
  //   1.get the container jekhane data rakhbo & empty
  const container = document.getElementById("level-container");
  container.innerHTML = "";
  // 2.get every lesson or foreach()
  for (let item of level) {
    //  3 creat element
    const newElement = document.createElement("div");
    newElement.innerHTML = `
                <button id= "level-btn-${item.level_no}"  onclick = "loadWord(${item.level_no})" 
                class="btn btn-soft btn-primary lever-btn">
               <i class="fa-solid fa-book"> </i> Lesson ${item.level_no}
               </button>
 `;
    //  appened
    container.append(newElement);
  }
  //
};

document.getElementById("btn-search").addEventListener("click", function () {
  displayBtn();

  const input = document.getElementById("input-search");
  const valueSC = input.value.trim().toLowerCase();
  console.log(valueSC);
  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWord = data.data;
      const filterWord = allWord.filter((word) =>
        word.word.toLowerCase().includes(valueSC),
      );
      console.log(filterWord);
      displayWord(filterWord);
    });
});
