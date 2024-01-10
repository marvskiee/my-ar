const markerSounds = {};
const audio = document.getElementById("myAudio")
const btn_play = document.getElementById("btn_play")
btn_play.addEventListener("click", function () {
    audio.play();
})
var markers = document.querySelectorAll("a-marker")
markers.forEach(element => {
    element.addEventListener("markerFound", () => clickFunction(element))
});

const clickFunction = (element) => {
    const asset = element.querySelector("a-entity").getAttribute("obj-model").obj.replace("obj/", '').replace(".obj", "");
    audio.src = "/sounds/" + asset + ".mp3"
    console.log("Found: ", asset)
    btn_play.click()
}