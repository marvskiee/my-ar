const markerSounds = {};
const overlay = document.getElementById("overlay");
const overlay_p = document.querySelector("#overlay p");

const audio = document.getElementById("myAudio")
const btn_play = document.getElementById("btn_play")
btn_play.addEventListener("click", function () {
    audio.play();
})
var markers = document.querySelectorAll("a-marker")
markers.forEach(element => {
    element.addEventListener("markerFound", () => clickFunction(element))
});

markers.forEach(element => {
    element.addEventListener("markerLost", () => {
        overlay.style.display = "none";
    })
});


const clickFunction = (element) => {
    const asset = element.querySelector("a-entity").getAttribute("obj-model").obj.replace("obj/", '').replace(".obj", "");
    audio.src = "sounds/" + asset + ".mp3"
    console.log("Found: ", asset)
    btn_play.click()
    overlay.style.display = "block";
    try {
        const pattern = Number(asset)
        console.log(pattern)
        if (typeof pattern < 10)
            overlay_p.innerText = "Number: " + asset;
        else
            overlay_p.innerText = "Letter: " + asset[0] + " for " + asset;
    } catch {
    }
}