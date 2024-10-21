
// Verse related functions and variables
/************************************************************************/ 
window.addEventListener("load", displayVerse);

const verseContainer = document.getElementById("verse-container"),
      arabicTextContainer = document.getElementById("verse-text"), 
      englishTranslationContainer = document.getElementById("verse-translation-english"), 
      banglaTranslationContainer = document.getElementById("verse-translation-bangla"), 
      verseReferenceContainer = document.getElementById("verse-reference");
      
      
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

    let selectedVerse = Math.floor(Math.random() * 6236) + 1;

    let verseData = await fetchVerseData(selectedVerse);


    arabicTextContainer.textContent = verseData[0].text;
    englishTranslationContainer.textContent = verseData[1].text;
    banglaTranslationContainer.textContent = verseData[2].text;
    verseReferenceContainer.textContent = `${verseData[0].surah.englishName} | Verse: ${verseData[0].numberInSurah}`;
    
}

// Change verse handler 
verseContainer.addEventListener('click', displayVerse)



// Drawer related functions and variables
/*************************************************************************/ 

const drawerContainer = document.getElementById('drawer-container'),
drawerToggle = document.getElementById('drawer-toggle');

document.addEventListener('DOMContentLoaded', function (){
    // handle drawer open and close 
    drawerToggle.addEventListener('click', () => {
        
        drawerContainer.style.transition = 'height 0.3s cubic-bezier(.32,.67,.31,1.05)';
        
        if(drawerContainer.style.height !== '80dvh'){
            // opened state
            drawerContainer.style.height = '80dvh';
            drawerToggle.classList.remove('-top-10');
            drawerToggle.classList.remove('animate-bounce')
            drawerToggle.style.transform = 'rotate(180deg)';
        }
        else{
            drawerContainer.style.height = '0dvh';
            drawerToggle.classList.add('-top-10');
            drawerToggle.classList.add('animate-bounce')
            drawerToggle.style.transform = 'rotate(0deg)';
        }
        
    });
    

    
})




// Save and download related functions and variables
/*************************************************************************/ 


const saveBtn = document.getElementById('save-btn'),
shareBtn = document.getElementById('share-btn'),
imagePreview = document.getElementById('verse-container-wrapper');   // body tag

// Save button event listener
saveBtn.addEventListener('click', function () {
    downloadImage('png'); // jpeg/png
});

// image downloader function 
function downloadImage(format) {
    
    domtoimage.toBlob(imagePreview, { quality: format === 'png' ? 1 : undefined }) // jpeg format will be 0.95
    .then(function (blob) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Ayaat_custom.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    })
    .catch(function (error) {
        console.error('Oops, something went wrong!', error);
    });
}






// Changing background related functions 
/*************************************************************************/ 

function changeSolidBg(value){
    imagePreview.style.backgroundColor = value;
}