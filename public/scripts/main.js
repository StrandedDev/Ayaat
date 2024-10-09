
window.addEventListener("load", displayVerse);


const verseContainer = document.getElementById("verse-container"),
      arabicTextContainer = document.getElementById("verse-text"), 
      englishTranslationContainer = document.getElementById("verse-translation-english"), 
      banglaTranslationContainer = document.getElementById("verse-translation-bangla"), 
      verseReferenceContainer = document.getElementById("verse-reference");
      

async function displayVerse(){
    verseContainer.animate([
        {
            opacity: 0
        },{
            opacity: 1
        }
    ],{
        duration: 1500,
        easing: 'ease-in-out',
        fill: 'forwards',
    });

    let totalVerses = 6236;
    let selectedVerse = Math.floor(Math.random() * totalVerses) + 1;

    let verseData = await fetchVerseData(selectedVerse);


    arabicTextContainer.textContent = verseData[0].text;
    englishTranslationContainer.textContent = verseData[1].text;
    banglaTranslationContainer.textContent = verseData[2].text;
    verseReferenceContainer.textContent = `${verseData[0].surah.englishName} | Verse: ${verseData[0].numberInSurah}`;
    
}



async function fetchVerseData(selectedVerse){
    let url = `https://api.alquran.cloud/v1/ayah/${selectedVerse}/editions/quran-uthmani,en.sahih,bn.bengali`;
    
    try{

        let response = await fetch(url);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const resData = await response.json();
        return resData.data; // retuns number of ayahs in selectedSurah

    }
    catch(error){
        console.error("Unexpected Error :", error);
        return;
    }
}



// Click handler 

verseContainer.addEventListener('click', displayVerse)
