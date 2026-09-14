update products
  set image_url = image_url || '?v=2'
  where image_url like '/products/%'
    and image_url not like '%?%';

update products
  set name = 'Vinotherapist Soin Corps Nourrissant'
  where slug = 'caudalie-vinohydra';
