### User stories


#### Factures

- En tant qu'artisan, je veux pouvoir créer une facture en envoyant un prix.
La facture doit comporter le prix, la date de création et le status en attente.
Le montant à facturer ne peut pas être supérieur à 500e. 

  - Exemple 1 : J'envoie une demande de facture à 250e le 20/03/2025. Le système doit me renvoyer 
  une facture contenant un prix à 250e, une date de création 20/03/2025 et un status "en attente".
  - Exemple 2 : J'envoie une demande de facture à 750e le 20/03/2025. Le système doit me renvoyer une erreur.


- En tant qu'administrateur, je veux pouvoir valider une facture en envoyant un id de facture. 
Après validation, la facture doit contenir un statut "Validé" et une date de validation. Je ne peux valider une facture que si elle est en attente.

  - Exemple : J'envoie l'id de la facture 1. Le système doit me renvoyer la facture de l'id 1 contenant un statut "Validé" et une date de validation.
  

- En tant qu'administrateur, je veux pouvoir annuler une facture en envoyant un id de facture. Après annulation, la facture doit contenir le status "Annulé" et contenir la date d'annulation.
La facture ne peut être annulée que si elle est en attente.

  - Exemple 1 : J'envoie l'id de la facture 1 (en attente). Le système doit me renvoyer la facture de l'id 1 contenant un statut "Annulé" et une date d'annulation.


- En tant qu'administrateur, je veux pouvoir payer une facture en envoyant un id de facture. Après paiement, la facture doit contenir le statut "Payé" et la date de paiement. Je ne peux pas payer une facture si elle n'est pas validée. Je ne peux pas payer de facture datant d'il y a plus de 3 mois.

  - Exemple 1 : J'envoie l'id de la facture 1 (validée). Le système doit me renvoyer la facture de l'id 1 contenant un statut "Payé" et une date de paiement.
  - Exemple 2 : J'envoie l'id de la facture 1 (validée) datant de plus de 3 mois. Le système doit me renvoyer une erreur.
  - Exemple 3 : J'envoie l'id de la facture 1 (en attente). Le système doit me renvoyer une erreur.