// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA2BOD5nGBk4J2THpossNHtv7Va7UmS99Y",
  authDomain: "pj-gosier.firebaseapp.com",
  databaseURL: "https://pj-gosier-default-rtdb.firebaseio.com",
  projectId: "pj-gosier",
  storageBucket: "pj-gosier.firebaseapp.com",
  messagingSenderId: "322116200131",
  appId: "1:322116200131:web:c68bc227e827c00549a476",
};

// Initialisation Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

window.ajouterPersonne = function () {
  const nom = document.getElementById("nom").value;
  const adresse = document.getElementById("adresse").value;
  const numero = document.getElementById("numero").value;

  if (!nom || !adresse || !numero) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  db.ref("personnes")
    .push({
      nom,
      adresse,
      numero,
    })
    .then(() => {
      alert("Personne ajoutée !");
      document.getElementById("nom").value = "";
      document.getElementById("adresse").value = "";
      document.getElementById("numero").value = "";
    })
    .catch((error) => {
      alert("Erreur : " + error.message);
    });
};

// Fonction pour afficher les personnes dans le tableau
function afficherPersonnes(snapshot) {
  const tbody = document.querySelector("#personnes-table tbody");
  tbody.innerHTML = "";
  snapshot.forEach(function (childSnapshot) {
    const p = childSnapshot.val();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p["nom"] || ""}</td>
      <td>${p["adresse"] || ""}</td>
      <td>${p["numéro"] || p["numero"] || ""}</td>
      <td></td>
    `;
    tbody.appendChild(tr);
  });
}

// Écoute en temps réel sur la base
firebase.database().ref("personnes").on("value", afficherPersonnes);

// AJOUT ENTREPRISE PUBLIQUE
window.ajouterEntreprisePublique = function () {
  const siren = document.getElementById("siren-epub").value;
  const siret = document.getElementById("siret-epub").value;
  const raison = document.getElementById("raison-epub").value;
  const forme = document.getElementById("forme-epub").value;
  const adresse = document.getElementById("adresse-epub").value;

  if (!siren || !siret || !raison || !forme || !adresse) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  db.ref("entreprises_publiques")
    .push({
      siren,
      siret,
      raison,
      forme,
      adresse,
    })
    .then(() => {
      alert("Entreprise publique ajoutée !");
      document.getElementById("siren-epub").value = "";
      document.getElementById("siret-epub").value = "";
      document.getElementById("raison-epub").value = "";
      document.getElementById("forme-epub").value = "";
      document.getElementById("adresse-epub").value = "";
    })
    .catch((error) => {
      alert("Erreur : " + error.message);
    });
};

function afficherEntreprisesPubliques(snapshot) {
  const tbody = document.querySelector("#entreprises-publiques-table tbody");
  tbody.innerHTML = "";
  snapshot.forEach(function (childSnapshot) {
    const e = childSnapshot.val();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${e["Siren"] || ""}</td>
      <td>${e["Siret"] || ""}</td>
      <td>${e["Raison sociale"] || ""}</td>
      <td>${e["Forme juridique"] || ""}</td>
      <td>${e["Adresse normée ligne 1"] || ""}</td>
      <td></td>
    `;
    tbody.appendChild(tr);
  });
}
firebase
  .database()
  .ref("entreprises_publiques")
  .on("value", afficherEntreprisesPubliques);

// AJOUT ENTREPRISE PRIVEE
window.ajouterEntreprisePrivee = function () {
  const siren = document.getElementById("siren-epr").value;
  const siret = document.getElementById("siret-epr").value;
  const raison = document.getElementById("raison-epr").value;
  const forme = document.getElementById("forme-epr").value;
  const adresse = document.getElementById("adresse-epr").value;

  if (!siren || !siret || !raison || !forme || !adresse) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  db.ref("entreprises_privees")
    .push({
      siren,
      siret,
      raison,
      forme,
      adresse,
    })
    .then(() => {
      alert("Entreprise privée ajoutée !");
      document.getElementById("siren-epr").value = "";
      document.getElementById("siret-epr").value = "";
      document.getElementById("raison-epr").value = "";
      document.getElementById("forme-epr").value = "";
      document.getElementById("adresse-epr").value = "";
    })
    .catch((error) => {
      alert("Erreur : " + error.message);
    });
};

function afficherEntreprisesPrivees(snapshot) {
  const tbody = document.querySelector("#entreprises-privees-table tbody");
  tbody.innerHTML = "";
  snapshot.forEach(function (childSnapshot) {
    const e = childSnapshot.val();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${e["Siren"] || ""}</td>
      <td>${e["Siret"] || ""}</td>
      <td>${e["Raison sociale"] || ""}</td>
      <td>${e["Forme juridique"] || ""}</td>
      <td>${e["Adresse normée ligne 1"] || ""}</td>
      <td></td>
    `;
    tbody.appendChild(tr);
  });
}
firebase
  .database()
  .ref("entreprises_privees")
  .on("value", afficherEntreprisesPrivees);

// AJOUT ASSOCIATION
window.ajouterAssociation = function () {
  const siren = document.getElementById("siren-assoc").value;
  const siret = document.getElementById("siret-assoc").value;
  const raison = document.getElementById("raison-assoc").value;
  const nature = document.getElementById("nature-assoc").value;
  const adresse = document.getElementById("adresse-assoc").value;

  if (!siren || !siret || !raison || !nature || !adresse) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  db.ref("associations")
    .push({
      siren,
      siret,
      raison,
      nature,
      adresse,
    })
    .then(() => {
      alert("Association ajoutée !");
      document.getElementById("siren-assoc").value = "";
      document.getElementById("siret-assoc").value = "";
      document.getElementById("raison-assoc").value = "";
      document.getElementById("nature-assoc").value = "";
      document.getElementById("adresse-assoc").value = "";
    })
    .catch((error) => {
      alert("Erreur : " + error.message);
    });
};

function afficherAssociations(snapshot) {
  console.log("affichage associations");
  const tbody = document.querySelector("#associations-table tbody");
  tbody.innerHTML = "";
  snapshot.forEach(function (childSnapshot) {
    const a = childSnapshot.val();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${a["Siren"] || ""}</td>
      <td>${a["Siret"] || ""}</td>
      <td>${a["Raison sociale"] || ""}</td>
      <td>${a["Nature établissement"] || ""}</td>
      <td>${a["Adresse"] || ""}</td>
      <td></td>
    `;
    tbody.appendChild(tr);
  });
}
firebase.database().ref("associations").on("value", afficherAssociations);

// Fonction pour changer d'onglet
window.openTab = function (tabId) {
  // Masquer tous les contenus d'onglets
  document.querySelectorAll(".tab-content").forEach(function (tabContent) {
    tabContent.classList.remove("active");
  });

  // Retirer l'état actif des onglets
  document.querySelectorAll(".tab").forEach(function (tab) {
    tab.classList.remove("active");
  });

  // Afficher l'onglet sélectionné
  document.getElementById(tabId).classList.add("active");

  // Activer l'onglet dans la barre via data-tab
  document.querySelectorAll(".tab").forEach(function (tab) {
    if (tab.getAttribute("data-tab") === tabId) {
      tab.classList.add("active");
    }
  });
};
