export default {
  data() {
    return {
      rules: {
        firstName: [
          {
            required: true,
            message: 'El campo es requerido',
            trigger: 'blur',
          },
          {
            min: 2,
            message: 'Campo debe contener al menos 2 caracteres',
            trigger: 'blur',
          },
          {
            max: 60,
            message: 'Campo no puede tener más de 60 caracteres',
            trigger: 'blur',
          },
        ],
        lastName: [
          {
            required: true,
            message: 'El campo es requerido',
            trigger: 'blur',
          },
          {
            min: 2,
            message: 'Campo debe contener al menos 2 caracteres',
            trigger: 'blur',
          },
          {
            max: 60,
            message: 'Campo no puede tener más de 60 caracteres',
            trigger: 'blur',
          },
        ],
        cellPhone: [
          {
            min: 10,
            message: 'Campo debe contener al menos 10 caracteres',
            trigger: 'blur',
          },
          {
            max: 20,
            message: 'Campo no puede tener más de 20 caracteres',
            trigger: 'blur',
          },
        ],
        phone: [
          {
            min: 10,
            message: 'Campo debe contener al menos 10 caracteres',
            trigger: 'blur',
          },
          {
            max: 20,
            message: 'Campo no puede tener más de 20 caracteres',
            trigger: 'blur',
          },
        ],
        birthdate: [
          {
            required: true,
            message: 'El campo es requerido',
            trigger: 'blur',
          },
        ],
        curp: [
          {
            max: 18,
            message: 'Campo no puede tener más de 18 caracteres',
            trigger: 'blur',
          },
        ],
        participateAs: [
          {
            required: true,
            message: 'El campo es requerido',
          },
        ],
        gender: [
          {
            required: true,
            message: 'El campo es requerido',
          },
        ],
        address: [
          {
            required: true,
            message: 'El campo es requerido',
          },
        ],
        city: [
          {
            required: true,
            message: 'El campo es requerido',
          },
        ],
        state: [
          {
            required: true,
            message: 'El campo es requerido',
          },
        ],
        zipCode: [
          {
            required: true,
            message: 'El campo es requerido',
          },
        ],
        country: [
          {
            required: true,
            message: 'El campo es requerido',
          },
        ],
        birthplace: [
          {
            required: true,
            message: 'El campo es requerido',
          },
        ],
        email: [
          {
            type: 'email',
            message: 'El campo no es un correo electrónico válido',
            trigger: 'blur',
          },
        ],
        maritalStatus: [
          {
            required: true,
            message: 'El campo es requerido',
          },
        ],
        etnia: [
          {
            required: true,
            message: 'El campo es requerido',
          },
        ],
        occupation: [
          {
            required: true,
            message: 'El campo es requerido',
          },
        ],
        reference: [
          {
            required: true,
            message: 'El campo es requerido',
          },
        ],
        agree: [
          {
            required: true,
            message: 'El paciente debe aceptar los términos',
          },
        ],
      },
    };
  },
};
