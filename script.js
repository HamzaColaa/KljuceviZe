const database = {
    // --- AUDI ---
    "8X": { min: 2011, max: 2019 }, // A1
    "8L": { min: 1997, max: 2003 }, // A3
    "8P": { min: 2004, max: 2013 }, // A3
    "8E": { min: 2001, max: 2008 }, // A4
    "8K": { min: 2008, max: 2016 }, // A4
    "4B": { min: 1998, max: 2005 }, // A6
    "4F": { min: 2005, max: 2011 }, // A6
    "4D": { min: 1997, max: 2002 }, // A8
    "4E": { min: 2002, max: 2010 }, // A8
    "8N": { min: 1999, max: 2006 }, // TT
    "8J": { min: 2006, max: 2015 }, // TT
    "8U": { min: 2012, max: 2019 }, // Q3
    "42": { min: 2008, max: 2016 }, // R8

    // --- VW ---
    "2H": { min: 2010, max: 2016 }, // Amarok
    "1C": { min: 1998, max: 2010 }, // Beetle
    "2K": { min: 2004, max: 2016 }, // Caddy
    "1F": { min: 2006, max: 2018 }, // Eos
    "1K": { min: 2004, max: 2013 }, // Golf 5/6
    "5K": { min: 2008, max: 2013 }, // Golf 6
    "5G": { min: 2012, max: 2014 }, // Golf 7
    "3B": { min: 2001, max: 2005 }, // Passat B5.5
    "3C": { min: 2005, max: 2010 }, // Passat B6
    "9N": { min: 2001, max: 2009 }, // Polo
    "6R": { min: 2009, max: 2014 }, // Polo
    "13": { min: 2008, max: 2019 }, // Scirocco
    "7M": { min: 2001, max: 2010 }, // Sharan
    "5N": { min: 2008, max: 2016 }, // Tiguan
    "1T": { min: 2003, max: 2015 }, // Touran
    "7E": { min: 2010, max: 2019 }, // Transporter

    // --- SKODA & SEAT ---
    "1Z": { min: 2004, max: 2013 }, // Octavia II
    "5J": { min: 2007, max: 2015 }, // Fabia II
    "1P": { min: 2005, max: 2012 }, // Leon II
    "6J": { min: 2008, max: 2016 }, // Ibiza
    "NH": { min: 2012, max: 2021 }  // Rapid
};

const bmwConfig = { min: 2000, max: 2016 };

function provjeriVozilo() {
    const vinInput = document.getElementById('vin-input') || document.querySelector('.vin-input');
    const vin = vinInput.value.toUpperCase().trim();

    if (vin.length !== 17) {
        prikaziModal("error", "Broj šasije mora imati tačno 17 znakova.");
        return; 
    }

    const godinaVozila = dekodirajGodinu(vin.charAt(9));
    
    if (!godinaVozila) {
        prikaziModal("manual_check", "Nismo uspjeli automatski očitati godište (čest slučaj kod starijih vozila). Kontaktirajte nas za potvrdu.");
        return;
    }

    let moze = false;
    const bmwPrefixes = ["WBA", "WBS", "WBY", "WBW"];
    
    if (bmwPrefixes.some(prefix => vin.startsWith(prefix))) {
        if (godinaVozila >= bmwConfig.min && godinaVozila <= bmwConfig.max) {
            moze = true;
        }
    } else {
        const modelKod = vin.substring(6, 8);
        if (database[modelKod]) {
            const podaci = database[modelKod];
            if (godinaVozila >= podaci.min && godinaVozila <= podaci.max) {
                moze = true;
            }
        }
    }

    if (moze) {
        prikaziModal("success", `Možemo uraditi ključ za vaše vozilo. Klikom na dugme ispod možete nas kontaktirati i dogovoriti detalje!`);
    } else {
        prikaziModal("not_found", "Nažalost, trenutno ne možemo uraditi ključ za ovaj model vozila.");
    }
}

function dekodirajGodinu(char) {
    const map = {
        'V': 1997, 'W': 1998, 'X': 1999, 'Y': 2000, '1': 2001, '2': 2002, '3': 2003, '4': 2004, '5': 2005,
        '6': 2006, '7': 2007, '8': 2008, '9': 2009, 'A': 2010, 'B': 2011, 'C': 2012, 'D': 2013, 'E': 2014,
        'F': 2015, 'G': 2016, 'H': 2017, 'J': 2018, 'K': 2019, 'L': 2020, 'M': 2021, 'N': 2022, 'P': 2023, 'R': 2024, 'S': 2025
    };
    return map[char] || null;
}

function prikaziModal(tip, poruka) {
    const modal = document.getElementById("vinModal");
    const title = document.getElementById("modalTitle"); 
    const message = document.getElementById("modalMessage"); 
    const icon = document.getElementById("modalIcon"); 
    const btn = document.getElementById("modalBtn"); 

    if (!title || !message || !btn) {
        console.error("Greška: Neki elementi modala nedostaju u HTML-u!");
        return;
    }

    if (tip === "success") {
        title.innerText = "MOŽEMO URADITI!";
        title.style.color = "#D4AF37"; 
        icon.className = "fas fa-check-circle";
        icon.style.color = "#4BB543"; 
        
        btn.innerText = "KONTAKTIRAJ NAS";
        btn.href = "about.html#contact"; 
        btn.onclick = null; 
    } 
    else if (tip === "manual_check") {
        title.innerText = "PROVJERITE S NAMA";
        title.style.color = "#D4AF37"; 
        icon.className = "fas fa-info-circle"; 
        icon.style.color = "#3498db"; 
        
        btn.innerText = "KONTAKTIRAJ NAS";
        btn.href = "about.html#contact"; 
        btn.onclick = null;
    }
  
    else if (tip === "not_found") {
        title.innerText = "NE MOŽEMO URADITI KLJUČ";
        title.style.color = "#ff4d4d"; 
        icon.className = "fas fa-times-circle";
        icon.style.color = "#ff4d4d";
        
        btn.innerText = "ZATVORI";
        btn.href = "javascript:void(0)";
        btn.onclick = closeModal;
    }

    else { 
        title.innerText = "GREŠKA PRI UNOSU";
        title.style.color = "#FFA500"; 
        icon.className = "fas fa-exclamation-triangle";
        icon.style.color = "#FFA500";
        
        btn.innerText = "POKUŠAJ PONOVO";
        btn.href = "javascript:void(0)";
        btn.onclick = closeModal;
    }

    message.innerText = poruka;
    modal.style.display = "block";
}
function closeModal() {
    const modal = document.getElementById("vinModal");
    if (modal) modal.style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("vinModal");
    if (event.target == modal) {
        closeModal();
    }
}

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, observerOptions);

 document.querySelectorAll('.btn-price, .vin-input, .vin-section').forEach((el) => {
    observer.observe(el);
});

const inputPolje = document.getElementById('vin-input') || document.querySelector('.vin-input');

if (inputPolje) {
    inputPolje.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            provjeriVozilo();
            inputPolje.blur(); 
        }
    });
}