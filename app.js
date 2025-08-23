// story section
const defaultStories = [
    {
        title: "The Morning Blossom", story: "Every morning, the little girl would wake up just before sunrise. She would run to the garden barefoot, her hair still messy from sleep, and wait for the first light to touch the flowers. When the sun rose, the tulips and daisies opened their petals, and her eyes sparkled with the same joy. To her, every sunrise was not just another day, but a gift - an unspoken promise that happiness blooms again and again.", name: "Blooming Tales" },
    { 
        title: "Whispers of the Wind", story: "The wind carried stories no one else could hear. It danced through the trees, brushed against the rooftops, and whispered secrets into the ears of those willing to listen. Sometimes it sang of faraway lands, sometimes it carried the laughter of forgotten memories. To the poet who sat beneath the old oak tree, the wind wasn’t just air - it was a messenger of dreams.", name: "Blooming Tales" 
    },
    { 
        title: "The Garden of Dreams", story: "There was a hidden garden where every dream took the shape of a flower. A child’s laughter grew into bright sunflowers, an artist’s imagination bloomed as roses of endless colors, and the quiet hope of a lonely soul became a glowing lily. The garden never stopped growing, because as long as people dreamed, the flowers would never stop blooming.", name: "Blooming Tales" 
    }
];

document.addEventListener("DOMContentLoaded", () => {
    displayStories();

    document.getElementById("submitStory").addEventListener("click", () => {
        const title = document.getElementById("title").value;
        const story = document.getElementById("story").value;
        const name = document.getElementById("name").value;

        const newStory = { title, story, name };

        let stories = JSON.parse(localStorage.getItem("stories")) || [];
        stories.push(newStory);
        localStorage.setItem("stories", JSON.stringify(stories));

        document.getElementById("title").value = "";
        document.getElementById("story").value = "";
        document.getElementById("name").value = "";

        displayStories();
    });
});

function displayStories() {
    const slider = document.getElementById("slider");
    slider.innerHTML = "";

    defaultStories.forEach(st => {
        const card = createStoryCard(st.title, st.story, st.name, false);
        slider.appendChild(card);
    });

    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    stories.forEach((st, index) => {
        const card = createStoryCard(st.title, st.story, st.name, true, index);
        slider.appendChild(card);
    });
}

function slide(direction) {
    const slider = document.getElementById("slider");
    slider.scrollBy({ left: direction * 320, behavior: "smooth" });
}

function deleteStory(index) {
    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    stories.splice(index, 1);
    localStorage.setItem("stories", JSON.stringify(stories));
    displayStories();
}

// write section
function createStoryCard(title, story, name, deletable, index) {
    const card = document.createElement("div");
    card.classList.add("story-card");

    card.innerHTML = `
        ${deletable ? `<button class="delete-btn" onclick="deleteStory(${index})"><i class="fas fa-trash"></i></button>` : ""}
        <h3><a href="read.html?title=${encodeURIComponent(title)}">${title}</a></h3>
        <p>${story}</p>
        <small>- ${name}</small>
      `;

    return card;
}

