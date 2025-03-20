### User stories


#### Factures

- En tant qu'artisan, je veux pouvoir créer une facture en envoyant un prix.
La facture doit comporter le prix, la date de création et le status en attente.
Le montant à facturer ne peut pas être supérieur à 500e. 

  - Exemple 1 : J'envoie une demande de facture à 250e le 20/03/2025. Le système doit me renvoyer 
  une facture contenant un prix à 250e, une date de création 20/03/2025 et un status "en attente".
  - Exemple 2 : J'envoie une demande de facture à 750e le 20/03/2025. Le système doit me renvoyer une erreur.

- En tant qu'administrateur, je veux pouvoir valider une facture en envoyant un id de facture. 
Après validation, la facture doit contenir un statut "Validé" et une date de validation

  - Exemple : J'envoie l'id de la facture 1. Le système doit me renvoyer la facture de l'id 1 contenant un statut "Validé" et une date de validation.