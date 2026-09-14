-- Certification NF (AFNOR) exigée sur le rayon EPI.

update categories set
  name = 'EPI — certification NF',
  description = 'Gants, masques, lunettes : sigle NF AFNOR + marquage CE photographiés (NF EN 374, 455, 149, 14683, 166). Sans NF, pas de rayon.'
where slug = 'outils-protection';
