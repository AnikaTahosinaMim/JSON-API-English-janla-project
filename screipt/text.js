const creatElement = (arr) => {
  const htmlElements = arr.map((el) => `<span class = 'btn'> ${el} </span`);
  console.log(htmlElements.join(" "));
};
const synnouns = ["hello", "hi", "normal"];
creatElement(synnouns);
