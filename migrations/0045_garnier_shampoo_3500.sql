-- Tous les shampoings Garnier Wahre Schätze à 3 500 F.
-- Après-shampoings (Spülung) restent à 2 500 F.

update products
set price_xof = 3500,
    is_active = true
where slug in (
  'garnier-ws-traube',
  'garnier-ws-kokos-shampoo',
  'garnier-ws-kohle',
  'garnier-ws-avocado-shampoo',
  'garnier-ws-honig-shampoo',
  'garnier-ws-reiswasser-shampoo'
);
