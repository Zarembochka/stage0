const books = [
    {
        season: 'winter',
        title: 'The Book Eaters',
        author: 'By Sunyi Dean',
        description: 'An unusual sci-fi story about a book eater woman who tries desperately to save her dangerous mind-eater son from tradition and certain death. Complete with dysfunctional family values, light Sapphic romance, and a strong, complex protagonist. Not for the faint of heart.',
        image: 'book_1'
    },
    {
        season: 'winter',
        title: 'Cackle',
        author: 'By Rachel Harrison',
        description: 'Are your Halloween movies of choice The Witches of Eastwick and Practical Magic? Look no further than here - where a woman recovering from a breakup moves to a quaint town in upstate New York and befriends a beautiful witch.',
        image: 'book_2'
    },
    {
        season: 'winter',
        title: 'Dante: Poet of the Secular World',
        author: 'By Erich Auerbach',
        description: "Auerbach's engaging book places the 'Comedy' within the tradition of epic, tragedy, and philosophy in general, arguing for Dante's uniqueness as one who raised the individual and his drama of soul into something of divine significance—an inspired introduction to Dante's main themes.",
        image: 'book_3'
    },
    {
        season: 'winter',
        title: 'The Last Queen',
        author: 'By Clive Irving',
        description: 'A timely and revelatory new biography of Queen Elizabeth (and her family) exploring how the Windsors have evolved and thrived as the modern world has changed around them.',
        image: 'book_4'
    },
    {
        season: 'spring',
        title: 'The Body',
        author: 'By Stephen King',
        description: 'Powerful novel that takes you back to a nostalgic time, exploring both the beauty and danger and loss of innocence that is youth.',
        image: 'book_1'
    },
    {
        season: 'spring',
        title: 'Carry: A Memoir of Survival on Stolen Land',
        author: 'By Toni Jenson',
        description: "This memoir about the author's relationship with gun violence feels both expansive and intimate, resulting in a lyrical indictment of the way things are.",
        image: 'book_2'
    },
    {
        season: 'spring',
        title: 'Days of Distraction',
        author: 'By Alexandra Chang',
        description: "A sardonic view of Silicon Valley culture, a meditation on race, and a journal of displacement and belonging, all in one form-defying package of spare prose.",
        image: 'book_3'
    },
    {
        season: 'spring',
        title: 'Dominicana',
        author: 'By Angie Cruz',
        description: 'A fascinating story of a teenage girl who marries a man twice her age with the promise to bring her to America. Her marriage is an opportunity for her family to eventually immigrate. For fans of Isabel Allende and Julia Alvarez.',
        image: 'book_4'
    },
    {
        season: 'summer',
        title: 'Crude: A Memoir',
        author: 'By Pablo Fajardo & ​​Sophie Tardy-Joubert',
        description: 'Drawing and color by Damien Roudeau | This book illustrates the struggles of a group of indigenous Ecuadoreans as they try to sue the ChevronTexaco company for damage their oil fields did to the Amazon and her people',
        image: 'book_1'
    },
    {
        season: 'summer',
        title: 'Let My People Go Surfing',
        author: 'By Yvon Chouinard',
        description: "Chouinard—climber, businessman, environmentalist—shares tales of courage and persistence from his experience of founding and leading Patagonia, Inc. Full title: Let My People Go Surfing: The Education of a Reluctant Businessman, Including 10 More Years of Business Unusual.",
        image: 'book_2'
    },
    {
        season: 'summer',
        title: 'The Octopus Museum: Poems',
        author: 'By Brenda Shaughnessy',
        description: "This collection of bold and scathingly beautiful feminist poems imagines what comes after our current age of environmental destruction, racism, sexism, and divisive politics.",
        image: 'book_3'
    },
    {
        season: 'summer',
        title: 'Shark Dialogues: A Novel',
        author: 'By Kiana Davenport',
        description: 'An epic saga of seven generations of one family encompasses the tumultuous history of Hawaii as a Hawaiian woman gathers her four granddaughters together in an erotic tale of villains and dreamers, queens and revolutionaries, lepers and healers.',
        image: 'book_4'
    },
    {
        season: 'autumn',
        title: 'Casual Conversation',
        author: 'By Renia White',
        description: "White's impressive debut collection takes readers through and beyond the concepts of conversation and the casual - both what we say to each other and what we don't, examining the possibilities around how we construct and communicate identity.",
        image: 'book_1'
    },
    {
        season: 'autumn',
        title: 'The Great Fire',
        author: 'By Lou Ureneck',
        description: "The harrowing story of an ordinary American and a principled Naval officer who, horrified by the burning of Smyrna, led an extraordinary rescue effort that saved a quarter of a million refugees from the Armenian Genocide",
        image: 'book_2'
    },
    {
        season: 'autumn',
        title: 'Rickey: The Life and Legend',
        author: 'By Howard Bryant',
        description: "With the fall rolling around, one can't help but think of baseball's postseason coming up! And what better way to prepare for it than reading the biography of one of the game's all-time greatest performers, the Man of Steal, Rickey Henderson?",
        image: 'book_3'
    },
    {
        season: 'autumn',
        title: 'Slug: And Other Stories',
        author: 'By Megan Milks',
        description: 'Exes Tegan and Sara find themselves chained together by hairballs of codependency. A father and child experience the shared trauma of giving birth to gods from their wounds.',
        image: 'book_4'
    }
];

// radio
const favoritesItems = document.querySelector('.favorites__items');
const favoritesForm = document.querySelector('.favorites__form');
const favoritesPanel = document.querySelector('.favorites__panel');

let currentSeason = 'winter';
let topPositionfavoritesItems = favoritesItems.offsetTop;

favoritesForm.addEventListener('click', (event) => {
    currentSeason = event.target.value;
    if (currentSeason !== undefined) {
        ChangeFavoriteSeason(currentSeason);
    }
})

function stickyPanel() {
    if (window.pageYOffset >= topPositionfavoritesItems) {
        favoritesPanel.classList.add('favorites__panel-sticky');
    } else {
        favoritesPanel.classList.remove('favorites__panel-sticky');
    }
}

window.addEventListener('scroll', stickyPanel);


favoritesItems.addEventListener("animationend", animationFade);

function animationFade(event) {
    if (event.animationName === 'fade-out') {
        event.srcElement.style.opacity = 0;
        event.srcElement.classList.remove('favorites__items-fadeout');
        loadBooks(currentSeason);
    }

    if (event.animationName === 'fade-in') {
        event.srcElement.style.opacity = 1;
        event.srcElement.classList.remove('favorites__items-fadein');
    }
}

function loadBookTitle(card, book) {
    const bookTitle  = card.querySelector('.favorites__book__title');
    bookTitle.textContent = book.title;
}

function loadBookAuthor(card, book) {
    const bookAuthor  = card.querySelector('.favorites__book__author');
    bookAuthor.textContent = book.author;
}

function loadBookDescription(card, book) {
    const bookDescription  = card.querySelector('.favorites__book__description');
    bookDescription.textContent = book.description;
}

function loadBookImage(card, book) {
    const bookImage  = card.querySelector('.favorites__book__image');
    bookImage.src = `./images/favorites/${book.season}/${book.image}.jpg`;
}

function loadBookCard(card, book) {
    loadBookTitle(card, book);
    loadBookAuthor(card, book);
    loadBookDescription(card, book);
    loadBookImage(card, book);
}

function loadBooks(season) {
    const bookCard = document.querySelectorAll('.favorites__book');
    const seasonBooks = books.filter((element) => element.season === season);
    bookCard.forEach((element, index) => loadBookCard(element, seasonBooks[index]));
}

function ChangeFavoriteSeason(season) {
    favoritesItems.classList.add('favorites__items-fadeout');
    favoritesItems.classList.add('favorites__items-fadein');
};

function addBookToUser() {
    console.log(111);
}