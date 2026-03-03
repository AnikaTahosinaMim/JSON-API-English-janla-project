const loadLevel = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLevel(data.data));
};
loadLevel();
const loadWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
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
      <button onclick = "my_modal_5.showModal()" class="btn bg-[#374957 10] hover:bg-[#37495780]"><i class="fa-solid fa-circle-info"></i></button>
      <button class="btn bg-[#374957 10] hover:bg-[#37495780]"><i class=" fa-solid fa-volume-high"></i></button>
    </div>
  </div>
    `;
    wordContainer.append(newWord);
  }
};

// remove btn color and add:
const displayBtn = () => {
  const selectBtn = document.querySelectorAll(".lever-btn");
  // by dufult remove all acitve class
  selectBtn.forEach(btn => btn.classList.remove("active"))
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
