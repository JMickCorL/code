export default {
  data() {
    return {
      statisticalDiagnosis: [
        'Sano',
        'Estrabismo',
        'Cataratas',
        'Glaucoma',
        'Retinopatía diabética',
        'Otros',
      ],
      options: {
        eyelids: [
          {
            value: 'Sin Padecimientos',
            label: 'Sin Padecimientos',
          },
          {
            value: 'Escamas Pestañas',
            label: 'Escamas Pestañas',
          },
          {
            value: 'Secreción Mucos',
            label: 'Secreción Mucosa',
          },
          {
            value: 'Ptosis',
            label: 'Ptosis',
          },
          {
            value: 'Ectropion',
            label: 'Ectropion',
          },
          {
            value: 'Chalazion',
            label: 'Chalazion',
          },
          {
            value: 'Orzuelo',
            label: 'Orzuelo',
          },
          {
            value: 'Distriquiasis',
            label: 'Distriquiasis',
          },
          {
            value: 'Simblelaron',
            label: 'Simblelaron',
          },
        ],
        annexes: [
          {
            value: 'Sin Padecimientos',
            label: 'Sin Padecimientos',
          },
          {
            value: 'Epífora',
            label: 'Epífora',
          },
          {
            value: 'Oclusión de Punto Lagrimal',
            label: 'Oclusión de Punto Lagrimal',
          },
          {
            value: 'Tubo de Vía Lagrimal',
            label: 'Tubo de Vía Lagrimal',
          },
          {
            value: 'Herida de Punto Lagrimal',
            label: 'Herida de Punto Lagrimal',
          },
        ],
        ocularGlobule: [
          {
            value: 'Sin Padecimientos',
            label: 'Sin Padecimientos',
          },
          {
            value: 'Anoftalmos',
            label: 'Anoftalmos',
          },
          {
            value: 'Protesis',
            label: 'Protesis',
          },
          {
            value: 'Exposición de Puntos',
            label: 'Exposición de Puntos',
          },
          {
            value: 'Phtisis Bulbi',
            label: 'Phtisis Bulbi',
          },
        ],
        ocularMotility: [
          {
            value: 'Sin Padecimientos',
            label: 'Sin Padecimientos',
          },
          {
            value: 'Ortoposición PPM',
            label: 'Ortoposición PPM',
          },
          {
            value: 'Endotropía',
            label: 'Endotropía',
          },
          {
            value: 'Exotropía',
            label: 'Exotropía',
          },
          {
            value: 'Hipertropia',
            label: 'Hipertropia',
          },
          {
            value: 'Hipotropia',
            label: 'Hipotropia',
          },
        ],
        conjunctiva: [
          {
            value: 'Sin Padecimientos',
            label: 'Sin Padecimientos',
          },
          {
            value: 'Hiperemia',
            label: 'Hiperemia',
          },
          {
            value: 'Puntos Expuestos',
            label: 'Puntos Expuestos',
          },
          {
            value: 'Herida Conjuntival',
            label: 'Herida Conjuntival',
          },
          {
            value: 'Reaccion Papilar',
            label: 'Reaccion Papilar',
          },
          {
            value: 'Reacción Folicular',
            label: 'Reacción Folicular',
          },
        ],
        sclera: [
          {
            label: '',
            key: 'sclera',
            ops: [
              {
                value: 'Sin Padecimientos',
                label: 'Sin Padecimientos',
              },
              {
                value: 'Integra',
                label: 'Integra',
              },
              {
                value: 'Epiescleritis',
                label: 'Epiescleritis',
              },
              {
                value: 'Escleritis',
                label: 'Escleritis',
              },
              {
                value: 'Herida Escleral',
                label: 'Herida Escleral',
              },
              {
                value: 'Dellen',
                label: 'Dellen',
              },
            ],
          },
          {
            label: 'Adelgazamiento',
            key: 'esclera thinning',
            ops: [
              {
                value: 'Adelgazamiento Con Exposición Uveal',
                label: 'Con Exposición Uveal',
              },
              {
                value: 'Adelgazamiento Sin Exposición Uveal',
                label: 'Sin Exposición Uveal',
              },
            ],
          },
        ],
        cornea: [
          {
            label: '',
            key: 'cornea',
            ops: [
              {
                value: 'Sin Padecimientos',
                label: 'Sin Padecimientos',
              },
              {
                value: 'Transparente',
                label: 'Transparente',
              },
              {
                value: 'Gutatta/Fuchs',
                label: 'Gutatta/Fuchs',
              },
              {
                value: 'Queratopatía Bulosa Pseudofaquica',
                label: 'Queratopatía Bulosa Pseudofaquica',
              },
              {
                value: 'Depósitos Retroqueráticos',
                label: 'Depósitos Retroqueráticos',
              },
              {
                value: 'Pigmentos',
                label: 'Pigmentos',
              },
              {
                value: 'Distrofia',
                label: 'Distrofia',
              },
            ],
          },
          {
            label: 'Herida',
            key: 'cornea wound',
            ops: [
              {
                value: 'Herida Perforante',
                label: 'Perforante',
              },
              {
                value: 'Herida No Perforante',
                label: 'No Perforante',
              },
            ],
          },
          {
            label: 'Úlcera Corneal',
            key: 'cornea ulcer',
            ops: [
              {
                value: 'Úlcera Perforante',
                label: 'Perforante',
              },
              {
                value: 'Úlcera No Perforante',
                label: 'No Perforante',
              },
            ],
          },
          {
            label: 'Adelgazamiento',
            key: 'cornea thinning',
            ops: [
              {
                value: 'Adelgazamiento Perforante',
                label: 'Perforante',
              },
              {
                value: 'Adelgazamiento No Perforante',
                label: 'No Perforante',
              },
            ],
          },
          {
            label: 'Queratocono',
            key: 'cornea queratocono',
            ops: [
              {
                value: 'Queratocono Queratocono',
                label: 'Queratocono',
              },
              {
                value: 'Queratocono Hidrops',
                label: 'Hidrops',
              },
            ],
          },
        ],
        anteriorChamber: [
          {
            label: '',
            key: 'sfpa',
            ops: [
              {
                value: 'Sin Padecimientos',
                label: 'Sin Padecimientos',
              },
              {
                value: 'Formada',
                label: 'Formada',
              },
              {
                value: 'Plana',
                label: 'Plana',
              },
              {
                value: 'Atalamía',
                label: 'Atalamía',
              },
            ],
          },
          {
            label: 'Celularidad',
            key: 'anterior chamber celullarity',
            ops: [
              {
                value: 'Celularidad +1',
                label: '+1',
              },
              {
                value: 'Celularidad +2',
                label: '+2',
              },
              {
                value: 'Celularidad +3',
                label: '+3',
              },
              {
                value: 'Celularidad +4 Flare',
                label: '+4 Flare',
              },
            ],
          },
          {
            label: 'Hiphema',
            key: 'anterior chamber hiphema',
            ops: [
              {
                value: 'Hiphema +1',
                label: '+1',
              },
              {
                value: 'Hiphema +2',
                label: '+2',
              },
              {
                value: 'Hiphema +3',
                label: '+3',
              },
              {
                value: 'Hiphema Bola 8',
                label: 'Bola 8',
              },
            ],
          },
        ],
        iris: [
          {
            value: 'Sin Padecimientos',
            label: 'Sin Padecimientos',
          },
          {
            value: 'Reflejos Presentes',
            label: 'Reflejos Presentes',
          },
          {
            value: 'Midnasis Farmacológica',
            label: 'Midnasis Farmacológica',
          },
          {
            value: 'Asimetría',
            label: 'Asimetría',
          },
          {
            value: 'Rubeosis Iridis',
            label: 'Rubeosis Iridis',
          },
          {
            value: 'Aniridia',
            label: 'Aniridia',
          },
          {
            value: 'Atrófico',
            label: 'Atrófico',
          },
        ],
        ginioscopy: [
          {
            value: 'Diferido',
            label: 'Diferido',
          },
          {
            value: 'Abierto',
            label: 'Abierto',
          },
          {
            value: 'Cerrado',
            label: 'Cerrado',
          },
        ],
        lens: [
          {
            label: '',
            key: ' lens',
            ops: [
              {
                value: 'Transparente',
                label: 'Transparente',
              },
              {
                value: 'Lente Intraocular',
                label: 'Lente Intraocular',
              },
              {
                value: 'Afaquia',
                label: 'Afaquia',
              },
            ],
          },
          {
            label: 'Catarata senil',
            key: 'lens cataracts senil',
            ops: [
              {
                value: 'Catarata Senil LOCS III',
                label: 'LOCS III',
              },
              {
                value: 'Catarata Senil Madura',
                label: 'Madura',
              },
              {
                value: 'Catarata Senil Brunescente',
                label: 'Brunescente',
              },
            ],
          },
          {
            label: 'Catarata Traumática',
            key: 'lens cataracts traumatic',
            ops: [
              {
                value: 'Catarata Traumática Cápsula Integra',
                label: 'Cápsula Integra',
              },
              {
                value: 'Catarata Traumática Cápsula Rota',
                label: 'Cápsula Rota',
              },
            ],
          },
        ],
        retina: [
          {
            value: 'Sin alteraciones',
            label: 'Sin alteraciones',
          },
          {
            value: 'No Valorable por Medios Opacos',
            label: 'No Valorable por Medios Opacos',
          },
          {
            value: 'Desprendimiento Traccional',
            label: 'Desprendimiento Traccional',
          },
          {
            value: 'Desprendimiento Seroso',
            label: 'Desprendimiento Seroso',
          },
        ],
        vitreo: [
          {
            label: '',
            key: 'tdfhs',
            ops: [
              {
                value: 'Transparente',
                label: 'Transparente',
              },
              {
                value: 'Desprendimiento',
                label: 'Desprendimiento',
              },
              {
                value: 'Flotadores',
                label: 'Flotadores',
              },
              {
                value: 'Hialosis Asteroidea',
                label: 'Hialosis Asteroidea',
              },
              {
                value: 'Sinquisis Centellante',
                label: 'Sinquisis Centellante',
              },
            ],
          },
          {
            label: 'Hemovitreo',
            key: 'vitreo hemovitreo',
            ops: [
              {
                value: 'Hemovitreo Grado 1',
                label: 'Grado 1',
              },
              {
                value: 'Hemovitreo Grado 2',
                label: 'Grado 2',
              },
              {
                value: 'Hemovitreo Grado 3',
                label: 'Grado 3',
              },
              {
                value: 'Hemovitreo Bola 8',
                label: 'Bola 8',
              },
            ],
          },
          {
            label: '',
            key: 'hs',
            ops: [
              {
                value: 'Hemorragia Subhialoidea',
                label: 'Hemorragia Subhialoidea',
              },
            ],
          },
        ],
        cupDisk: [
          {
            value: '1',
            label: '0.1',
          },
          {
            value: '2',
            label: '0.2',
          },
          {
            value: '3',
            label: '0.3',
          },
          {
            value: '4',
            label: '1.0',
          },
        ],
        nerve: [
          {
            value: 'Sin Padecimientos',
            label: 'Sin Alteraciones',
          },
          {
            value: 'Pálido',
            label: 'Pálido',
          },
          {
            value: 'Excavación Total',
            label: 'Excavación Total',
          },
          {
            value: 'Papilitis',
            label: 'Papilitis',
          },
          {
            value: 'Papiledema',
            label: 'Papiledema',
          },
          {
            value: 'Neovasos Epipapilares',
            label: 'Neovasos Epipapilares',
          },
        ],
        macula: [
          {
            value: 'Brillo Normal',
            label: 'Brillo Normal',
          },
          {
            value: 'Agujero Macular',
            label: 'Agujero Macular',
          },
          {
            value: 'Sin Brillo',
            label: 'Sin Brillo',
          },
          {
            value: 'Membranas',
            label: 'Membranas',
          },
          {
            value: 'Maculopatía',
            label: 'Maculopatía',
          },
          {
            value: 'Maculopatía Serosa',
            label: 'Maculopatía Serosa',
          },
          {
            value: 'Edema Macular',
            label: 'Edema Macular',
          },
          {
            value: 'Exudados',
            label: 'Exudados',
          },
          {
            value: 'Drusas Algodonosas',
            label: 'Drusas Algodonosas',
          },
          {
            value: 'Drusas Secas',
            label: 'Drusas Secas',
          },
          {
            value: 'Cicatriz Macular',
            label: 'Cicatriz Macular',
          },
          {
            value: 'Atrofia',
            label: 'Atrofia',
          },
        ],
        vessel: [
          {
            label: '',
            key: 'vn',
            ops: [
              {
                value: 'Vasculatura Normal',
                label: 'Vasculatura Normal',
              },
              {
                value: 'Neovasos',
                label: 'Neovasos',
              },
            ],
          },
          {
            label: 'Microhemorragias',
            key: 'vessel microhemorrhages grade',
            ops: [
              {
                value: 'Microhemorragias 1/4',
                label: '1/4',
              },
              {
                value: 'Microhemorragias 2/4',
                label: '2/4',
              },
              {
                value: 'Microhemorragias 3/4',
                label: '3/4',
              },
              {
                value: 'Microhemorragias 4/4',
                label: '4/4',
              },
            ],
          },
          {
            label: 'Exudados',
            key: 'vessel exudates grade',
            ops: [
              {
                value: 'Microhemorragias 1/4',
                label: '1/4',
              },
              {
                value: 'Microhemorragias 2/4',
                label: '2/4',
              },
              {
                value: 'Microhemorragias 3/4',
                label: '3/4',
              },
              {
                value: 'Microhemorragias 4/4',
                label: '4/4',
              },
            ],
          },
          {
            label: '',
            key: 'exangues',
            ops: [
              {
                value: 'Exangües',
                label: 'Exangües',
              },
            ],
          },
        ],
        periphery: [
          {
            value: 'Sin Lesiones Predisponentes',
            label: 'Sin Lesiones Predisponentes',
          },
          {
            value: 'Desgarro',
            label: 'Desgarro',
          },
          {
            value: 'Opérculo',
            label: 'Opérculo',
          },
          {
            value: 'Agujero',
            label: 'Agujero',
          },
          {
            value: 'Lattice',
            label: 'Lattice',
          },
          {
            value: 'Huellas de Láser (PFC)',
            label: 'Huellas de Láser (PFC)',
          },
        ],
        tf: [
          {
            value: true,
            label: 'Si',
          },
          {
            value: false,
            label: 'No',
          },
        ],
      },
    };
  },
};
