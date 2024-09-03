# Application de Gestion d'Événements

## Description

Cette application web de gestion d'événements permet aux utilisateurs de créer, gérer et suivre des événements en ligne. Elle inclut des fonctionnalités telles que la création d'événements, la gestion des participants, ainsi que l'intégration de services de géolocalisation.

## Fonctionnalités

- **Création d'événements** : Ajoutez des événements avec des détails comme le titre, la description, la date, l'heure, et le lieu.
- **Gestion des participants** : Inscription et gestion des participants avec une liste dynamique.
- **Visualisation interactive** : Interface utilisateur réactive pour voir et interagir avec les événements.
- **Intégration d'API** : Utilisation d'API externes pour la géolocalisation.

## Technologies Utilisées

- **Frontend** : HTML, CSS, React.js
- **Backend** : Python (Django)
- **Base de données** : SQL
- **APIs externes** : Géolocalisation

## Installation

1. **Cloner le dépôt** 

2. **Installer les dépendances du frontend** :
    ```bash
    cd frontend
    npm install
    ```

3. **Installer les dépendances du backend** :
    ```bash
    cd backend
    pip install -r requirements.txt
    ```

4. **Configurer la base de données** :
    - Créez une base de données SQL.
    - Mettez à jour les paramètres de connexion dans le fichier `settings.py` de Django.

5. **Lancer le serveur de développement** :

    - Frontend :
      ```bash
      cd frontend
      npm run dev
      ```
    - Backend :
      ```bash
      cd backend
      python manage.py runserver
      ```

