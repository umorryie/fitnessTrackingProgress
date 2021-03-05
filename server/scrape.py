import json
import pandas as pd
import requests
from bs4 import BeautifulSoup

URL = "https://developers.google.com/android/reference/com/google/android/gms/fitness/data/WorkoutExercises"

exercises = {}

page = requests.get(URL)

soup = BeautifulSoup(page.content, 'html.parser')
contrains = soup.find(id="constants")
names = contrains.find_all("td", class_="jd-linkcol")
for name in names:
    results = {}
    results['name'] = name.text.strip()
    results['picture'] = ""
    results['bodyPart'] = ""

    exercises[name.text.strip()] = results
with open('exercises.json', 'w') as f:
    json.dump(exercises, f)