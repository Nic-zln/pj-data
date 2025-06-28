import pandas as pd
import re

# Fonction principale d'extraction
def extraire_infos(texte):
    texte = str(texte)
    if not texte or texte.lower() == 'nan':
        return pd.Series(['', '', '', ''])

    # Extraire le numéro de téléphone
    match_tel = re.search(
        r'(?:tel|tél)?\s*'
        r'((?:0?[56][ .]?9[046]|0?69[46]|0?9|OS)'
        r'(?:[ .]?\d{2}){3,4})',
        texte,
        re.IGNORECASE
    )
    numero = match_tel.group(1) if match_tel else ''
    texte_sans_tel = texte.replace(numero, '').strip()

    # Séparer le texte
    parties = texte_sans_tel.split()
    if not parties:
        return pd.Series(['', '', '', numero])

    # Cas où la ligne commence par un chiffre (donc adresse)
    if re.match(r'^\d', parties[0]):
        return pd.Series(['', '', texte_sans_tel, numero])

    # Cas où ça commence par un ">" isolé suivi d'un prénom
    if parties[0] == '>' and len(parties) >= 2:
        prenom = parties[1]
        reste_adresse = parties[2:]
        adresse = ' '.join(reste_adresse)
        return pd.Series(['', prenom, adresse, numero])

    # Valider la première entrée comme nom potentiel (MAJ ou >MAJ)
    if not (re.match(r'^[A-ZÉÈÀÂÊÎÔÛÇ\-]+$', parties[0]) or re.match(r'^>[A-ZÉÈÀÂÊÎÔÛÇ\-]+$', parties[0])):
        return pd.Series(['', '', texte_sans_tel, numero])

    # Extraire nom composé (jusqu'à 5 mots majuscules ou >MAJ)
    nom_mots = []
    for i, mot in enumerate(parties[:5]):
        if re.match(r'^[A-ZÉÈÀÂÊÎÔÛÇ\-]+$', mot) or re.match(r'^>[A-ZÉÈÀÂÊÎÔÛÇ\-]+$', mot):
            nom_mots.append(mot)
        else:
            break

    nom = ' '.join(nom_mots)
    reste = parties[len(nom_mots):]

    if not reste:
        return pd.Series([nom, '', '', numero])

    # Prénom
    prenom = reste[0]
    reste_adresse = reste[1:]

    # Vérifie si le prénom commence par chiffre ou n’est pas une majuscule ou >
    if re.match(r'^\d', prenom) or not (prenom[0].isupper() or prenom.startswith('>')):
        adresse = ' '.join([prenom] + reste_adresse)
        prenom = ''
    else:
        adresse = ' '.join(reste_adresse)

    return pd.Series([nom, prenom, adresse, numero])

# Chargement du fichier Excel
fichier = 'ANU-PB-05.xlsx'
xl = pd.read_excel(fichier, sheet_name=None)

# Traitement de chaque feuille
nouvelles_feuilles = {}
for nom_feuille, df in xl.items():
    if df.shape[1] >= 1:
        colonne = df.columns[0]
        df_extrait = df[colonne].apply(extraire_infos)
        df_extrait.columns = ['Nom', 'Prénom', 'Adresse', 'Téléphone']
        nouvelles_feuilles[nom_feuille] = df_extrait

# Sauvegarde du fichier nettoyé
with pd.ExcelWriter('fichier_nettoye_05.xlsx') as writer:
    for nom_feuille, df in nouvelles_feuilles.items():
        df.to_excel(writer, sheet_name=nom_feuille, index=False)
