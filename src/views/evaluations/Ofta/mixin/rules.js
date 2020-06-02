export default {
  data() {
    return {
      rules: {
        reason: [
          {
            required: true,
            trigger: 'blur',
            message: 'El campo es requerido.',
          },
        ],
        // 'left.anterior.eyelid': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.anterior.eyelid': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.anterior.annexes': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.anterior.annexes': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.anterior.ocularGlobule': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.anterior.ocularGlobule': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.anterior.ocularMotility': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.anterior.ocularMotility': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.anterior.conjunctiva': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.anterior.conjunctiva': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.anterior.sclera': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.anterior.sclera': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.anterior.cornea': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.anterior.cornea': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.anterior.corneaCondition': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.anterior.corneaCondition': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.anterior.anteriorChamber': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.anterior.anteriorChamber': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.anterior.iris': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.anterior.iris': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.anterior.ginioscopy': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.anterior.ginioscopy': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.anterior.lens': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.anterior.lens': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.posterior.retina': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.posterior.retina': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.posterior.vitreo': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.posterior.vitreo': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.posterior.cupDisc': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.posterior.cupDisc': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.posterior.nerve': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.posterior.nerve': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.posterior.macula': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.posterior.macula': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.posterior.vessel': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.posterior.vessel': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.posterior.periphery': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.posterior.periphery': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.posterior.diagnosis': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.posterior.diagnosis': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'left.posterior.plan': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
        // 'right.posterior.plan': [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: 'El campo es requerido',
        //   },
        // ],
      },
    };
  },
};
