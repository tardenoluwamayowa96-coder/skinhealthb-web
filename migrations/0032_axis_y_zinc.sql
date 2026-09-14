-- AXIS-Y Complete No-Stress Ver. 3 : filtre minéral = zinc oxide 17 % non-nano
-- (FDA / INCI officiel). Pas de dioxyde de titane dans cette version.

update products set
  description = $d$AXIS-Y Complete No-Stress Physical Sunscreen SPF50+ PA++++ Ver. 3, 50 ml. Filtre minéral : oxyde de zinc non-nano 17 %. Armoise, niacinamide 2 %, squalane. Formule 6+1+1. Le seul solaire 100 % minéral du rayon — peaux sensibles, acné, grossesse, après peel. Peut laisser un léger voile sur peaux très foncées : estomper.$d$,
  ingredients = $d$Zinc oxide 17 % (non-nano, seul filtre UV actif), aqua, cyclohexasiloxane, niacinamide 2 %, squalane, artemisia capillaris, calendula, green tea. Sans parfum. Liste complète sur le tube.$d$,
  precautions = $d$Usage externe. Filtre minéral : peut laisser un voile blanc, surtout sur peaux foncées — bien estomper. La protection solaire ne remplace pas l'ombre ni le chapeau.$d$
where slug = 'axis-y-physical-sun';
