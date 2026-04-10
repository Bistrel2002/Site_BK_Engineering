---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
classification:
  projectType: "Web App & SaaS B2B Platform"
  domain: "B2B Services / HR Tech / IT Consulting"
  complexity: "Medium-High"
  projectContext: "brownfield"
inputDocuments:
  - product-brief-Site_BK_Engineering.md
  - product-brief-Site_BK_Engineering-distillate.md
workflowType: 'prd'
---

# Product Requirements Document - Site_BK_Engineering

**Author:** Vivienbistrel
**Date:** 2026-04-01T02:04:30+02:00

## Executive Summary

BK Engineering est une Entreprise de Services du Numérique (ESN) complète offrant un accompagnement de bout-en-bout (Conseil SI, Développement Logiciel, Cloud, Intégration, Tests, Transformation Digitale). Le projet consiste à concevoir le site web vitrine qui portera cette offre, en y intégrant un pôle d'acquisition ciblant le Portage Salarial. L'objectif du site web est double : 
1) Convertir les décideurs B2B et les particuliers en clients pour les prestations ESN via un funnel de vente centré sur l'expertise technologique. 
2) Convertir les freelances IT en salariés portés via un simulateur de revenus attractif, fidélisant ainsi un vivier de talents mobilisables sur les missions de l'ESN.

### What Makes This Special

Le produit repose sur une architecture duale asymétrique : le portage salarial n'est pas le produit principal vendu en page d'accueil, c'est un "produit d'appel" tactique. En offrant aux indépendants IT un simulateur transparent couplé à une promesse de sécurité (assurance RC PRO couvrante), BK Engineering attire les talents IT. En retour, l'ESN sécurise sa capacité de production (Delivery) sur ses propres projets clients, là où ses concurrents peinent à recruter.

## Project Classification

- **Type de Projet :** Site Web Vitrine B2B & Lead Generation
- **Domaine :** B2B Services / IT Consulting
- **Complexité :** Moyenne (Site statique axé sur la performance et le SEO)

## Success Criteria

### User Success

- **Pour le Client ESN :** Temps écoulé minimal entre la visite du site, la compréhension claire de l'offre (les 6 pôles) et la prise de contact via le formulaire.
- **Pour le Consultant Freelance :** Transparence et fluidité immédiate lors de l'utilisation du simulateur de revenu en ligne, poussant naturellement à la demande de contact.

### Business Success

- **Acquisition B2B (Moteur ESN) :** Génération continue de leads qualifiés (demandes de devis/contact) à travers les 6 pôles d'expertise présentés.
- **Acquisition Portage :** Génération de leads qualifiés de freelances souhaitant rejoindre la structure de portage BK Engineering.
- **Cross-staffing :** Fort taux de conversion des prospects freelances en consultants mobilisés sur les missions internes de l'ESN.

### Technical Success

- **Séparation hermétique des flux :** Le trafic organique cherchant une ESN B2B ne doit pas être confondu avec celui cherchant une "simulation de salaire".
- **Vitesse et Performance :** Chargement instantané des pages pour maximiser le taux de conversion et le score SEO (Core Web Vitals).


## Project Scoping (Périmètre du Projet)


### Feature Set (Périmètre du Site Web V1)
- **Home & Vitrine ESN :** Design ultra-premium B2B et particulier pour le "Delivery". Architecture gravitant autour des 6 pôles ESN (Pages dédiées).
- **Formulaire de Contact B2B :** Formulaire public de capture de leads avec qualification système (anti-spam, catégorisation du besoin) et notification e-mail.
- **Section Portage (La vitrine Freelance) :** Page(s) expliquant les avantages de BK Portage, l'utilisation de la RC Pro de l'ESN, et l'explication des frais de gestion.
- **Le Simulateur Public :** Un widget interactif 100% front-end. Il permet à l'utilisateur de saisir son Taux Journalier Moyen (TJM) et d'obtenir son estimation de revenu net immédiatement. Ce simulateur inclut un bouton d'appel à l'action "Être rappelé par un conseiller" envoyant le résultat récapitulatif à l'équipe BK.

### Risk Mitigation Strategy (Gestion des Risques du Site)
- **Risque Technique (Calculateur) :** Le simulateur de portage pourrait donner une estimation légèrement imprécise. *Mitigation : Indiquer clairement que la simulation est donnée "à titre indicatif" et lier le résultat au Call-to-Action "Obtenir une simulation précise".*
- **Risque d'UX et SEO :** Confusion entre la cible "PME cherchant un dev" et le "Freelance". *Mitigation : Isolation stricte de la navigation entre la section "Services ESN" et la sous-section "Portage Salarial".*

## User Journeys

### 1. Thomas, le Développeur Indépendant (Le Prospect Porté)
**Situation/Objectif :** Thomas vient de décrocher une mission chez un client, mais n'a aucune structure juridique. Il cherche une simulation rapide pour valider la rentabilité du portage.
**Parcours :** Il atterrit sur le site de BK Engineering via une recherche SEO. Il est rassuré de voir qu'il a affaire à une véritable ESN couverte par une solide RC Pro. Il clique sur l'onglet "Portage", utilise le simulateur interactif de revenu, et trouve le résultat attractif.
**Le Climax :** D'un seul clic, il envoie son résultat au support BK via le bouton "Demander un rappel", initiant une démarche commerciale qualifiée.

### 2. Marie, DSI d'une PME (La Cliente Prospect ESN)
**Situation/Objectif :** Son entreprise doit urgemment moderniser son application logicielle, mais son équipe est saturée. 
**Parcours :** Elle visite la page principale de BK Engineering. Le design est très premium et rassurant (B2B). Elle consulte les 6 grands pôles d'expertise et lit l'offre globale. Elle remplit le formulaire de qualification de projet sans être parasitée par le message "portage salarial".
**Le Climax :** Sa demande structurée (Budget, Stack technique) part par e-mail à l'équipe commerciale, générant un lead à forte valeur ajoutée.

### 3. Julien, le Commercial / Gestionnaire (Admin Interne BK)
**Situation/Objectif :** Julien gère le développement d'affaires au quotidien.
**Parcours :** Aucun back-office compliqué à visiter : il reçoit directement dans sa boîte e-mail les alertes de nouveaux leads B2B (projets ESN) et les demandes de rappels de freelances (avec leur TJM pré-calculé issu du simulateur). 
**Le Climax :** Julien a toutes les informations en main pour qualifier son appel téléphonique en 5 minutes.

### Journey Requirements Summary
Ces parcours exigent la création de :
- **Funnel de Lead Generation B2B** (Marie) qualifié, séparé du tunnel portage.
- **Moteur de Simulation de Salaire** dynamique, côté client, attractif (Thomas).
- **Redirection intelligente de leads** déclenchée depuis le simulateur.

## Spécifications Techniques du Site Web

### Performances & Accessibilité
- **Simulateur Réactif (Client-Side) :** Le simulateur de revenu doit s'exécuter instantanément en JavaScript via le navigateur, sans appels backend massifs.
- **Mobile First :** Le simulateur et les formulaires de mise en relation doivent être parfaitement responsives.

### Contraintes d'Intégration
- **Sécurité basique :** Protection anti-spam (reCAPTCHA) sur les formulaires et protocole SSL exhaustif.

## Functional Requirements

### 1. Découverte & Navigation Corporate (ESN)
- **FR1 :** Tout visiteur public peut naviguer entre la présentation des services B2B (ESN) et l'offre B2C (Portage) via le menu global.
- **FR2 :** Tout visiteur public peut consulter le détail descriptif des 6 domaines d'expertise métier proposés par l'ESN.

### 2. Capture de Leads B2B (Prospects ESN)
- **FR3 :** Le décideur B2B ou particulier peut soumettre une demande d'accompagnement textuelle qualifiée.
- **FR4 :** Le système envoie instantanément les données du formulaire à une adresse e-mail administrateur définie.

### 3. Simulation de Revenus (Acquisition Freelance)
- **FR5 :** Le visiteur peut accéder librement au simulateur de revenus sans création de compte.
- **FR6 :** Le visiteur peut saisir ou ajuster dynamiquement la valeur de son Taux Journalier Moyen (TJM).
- **FR7 :** Le simulateur calcule et affiche quasi-instantanément le salaire net estimé correspondant.
- **FR8 :** Le simulateur explicite clairement dans l'interface (frais de gestion, taxes) que les résultats sont une estimation.

### 4. Conversion Portage (Candidature Freelance)
- **FR9 :** Le visiteur peut déclencher une demande de rappel personnalisée directement depuis l'interface du widget de simulation.
- **FR10 :** La demande de rappel incorpore logiquement les variables calculées par le simulateur (TJM saisi) pour les transmettre à l'ESN.

## Non-Functional Requirements (Critères de Qualité)

### Performance & Référencement (SEO)
- **NFR1 :** Le *Largest Contentful Paint* (LCP - temps d'affichage principal) de chaque page publique s'effectue en **moins de 2.5 secondes** sur un réseau mobile 4G.
- **NFR2 :** L'interaction avec le widget de simulation de revenus affiche ses résultats en **moins de 100 millisecondes**, sans bloquer le navigateur.
- **NFR3 :** Le site obtient un score minimum de **90/100 sur Google Lighthouse** dans les catégories "Performances", "Best Practices" et "SEO".

### Sécurité & Fiabilité
- **NFR4 :** Le flux d'informations du site est chiffré de bout-en-bout via HTTPS (TLS/SSL).
- **NFR5 :** Les formulaires de soumission intègrent un service de vérification invisible (ex: reCaptcha v3) bloquant le trafic robotisé.

### Accessibilité (WCAG)
- **NFR6 :** Le contraste des couleurs de conception passe au minimum le niveau WCAG AA pour une lisibilité optimale sur tous les terminaux.
