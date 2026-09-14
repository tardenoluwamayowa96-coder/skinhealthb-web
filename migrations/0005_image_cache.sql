update products
  set image_url = regexp_replace(image_url, '\?v=[0-9]+$', '?v=3')
  where image_url like '/products/%';

update products
  set image_url = image_url || '?v=3'
  where image_url like '/products/%'
    and image_url not like '%?%';
