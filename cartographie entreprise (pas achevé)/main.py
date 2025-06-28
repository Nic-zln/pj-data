import pandas as pd
import geopandas as gpd
import requests
from shapely.geometry import Point
import time

# 1. Lecture du fichier JSON
import json

with open("pj-gosier-default-rtdb-export.json", "r", encoding="utf-8") as f:
    data = json.load(f)

df = pd.DataFrame(data['associations'])

# 2. Nettoyage de l'adresse
# On construit une colonne adresse complète

df['Adresse_complete'] = df['Adresse'] + ", " + df['Code postal'].astype(str) + " " + df['Ville'] + ", Guadeloupe"

# 3. Fonction de géocodage avec l'API adresse.data.gouv.fr
def geocode(address):
    url = f"https://api-adresse.data.gouv.fr/search/?q={address}&limit=1"
    response = requests.get(url)
    if response.status_code == 200:
        features = response.json()['features']
        if features:
            lon, lat = features[0]['geometry']['coordinates']
            return pd.Series({'lon': lon, 'lat': lat})
    return pd.Series({'lon': None, 'lat': None})

# 4. Application du géocodage (avec tempo pour éviter d'être bloqué par l'API)
results = []
for idx, row in df.iterrows():
    coords = geocode(row['Adresse_complete'])
    results.append(coords)
    time.sleep(1)  # délai pour éviter de surcharger l'API

geocode_df = pd.DataFrame(results)
df = pd.concat([df, geocode_df], axis=1)

# 5. Création du GeoDataFrame
# On élimine les lignes sans coordonnées
valid_df = df.dropna(subset=['lon', 'lat'])
geometry = [Point(xy) for xy in zip(valid_df['lon'], valid_df['lat'])]
gdf = gpd.GeoDataFrame(valid_df, geometry=geometry, crs="EPSG:4326")

# 6. Sauvegarde en shapefile ou GeoJSON pour QGIS
gdf.to_file("gosier_entreprises.geojson", driver="GeoJSON")

print("Traitement terminé, fichier geojson généré.")
